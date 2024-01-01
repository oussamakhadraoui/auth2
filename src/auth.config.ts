import credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/Google'
import Github from 'next-auth/providers/Github'
import type { NextAuthConfig } from 'next-auth'
import { LoginSchema } from './lib/validation'
import bcrypt from 'bcryptjs'
import { getUserByEmail } from './components/Data/user'

export default {
  providers: [
    credentials({
      async authorize(credentials) {
        const validation = LoginSchema.safeParse(credentials)
        if (validation.success) {
          const { email, password } = validation.data
          const user = await getUserByEmail(email)
          if (!user || !user.password) {
            return null
          }
          const validatePass = await bcrypt.compare(password, user.password)
          if (validatePass) {
            return user
          }
        }
        return null
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig
