import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient, UserRole } from '@prisma/client'
import authConfig from './auth.config'
import { getUserById } from './components/Data/user'
import { db } from './lib/db'
import { getTwoFactorConfirmationByUserId } from './components/Data/twoAuth'

const prisma = new PrismaClient()
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true
      const existenceUser = await getUserById(user.id)
      //prevent sign inn without email verification
      if (!existenceUser?.emailVerified) return false

      if (existenceUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existenceUser.id
        )
        if (!twoFactorConfirmation) {
          return false
        }
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        })
      }

      return true
    },
    async jwt({ token }) {
      if (!token.sub) return token
      const user = await getUserById(token.sub)
      if (!user) return token
      token.role = user.role
      token.isTwoFactorEnabled = user.isTwoFactorEnabled
      return token
    },

    async session({ token, session }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      if (session.user && token.role) {
        session.user.role = token.role as UserRole
      }
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
      }
      return session
    },
  },
})
