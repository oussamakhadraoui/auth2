import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import { LoginSchema } from './lib/validation'
import bcrypt from 'bcryptjs'
import { getUserByEmail } from './components/Data/user'

import type { NextAuthConfig } from 'next-auth'

export default {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      client: { token_endpoint_auth_method: 'none' },
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      client: { token_endpoint_auth_method: 'none' },
    }),
    Credentials({
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
  ],
  secret: process.env.AUTH_SECRET,
  cookies: {
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true,
      },
    },
  },
} satisfies NextAuthConfig
