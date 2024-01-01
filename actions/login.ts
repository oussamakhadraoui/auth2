'use server'

import { signIn } from '@/auth'
import { LoginType, LoginSchema } from '@/lib/validation'
import { DEFAULT_LOGIN_REDIRECT } from '../routes'
import { AuthError } from 'next-auth'

export const login = async (values: LoginType) => {
  const validation = LoginSchema.safeParse(values)
  if (!validation.success) {
    return { error: 'Invalid fields' }
  }
  const { email, password } = validation.data
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
    return {success:"login sucess"}
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return { error: 'Invalid Credentials' }
      } else {
        return { error: 'Something went wrong!' }
      }
    }
    console.log(error)
    throw error
  }
}
