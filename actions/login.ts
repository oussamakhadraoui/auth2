'use server'

import { signIn } from '@/auth'
import { LoginType, LoginSchema } from '@/lib/validation'
import { DEFAULT_LOGIN_REDIRECT } from '../routes'
import { AuthError } from 'next-auth'
import { getUserByEmail } from '@/components/Data/user'
import { generateToken } from '@/lib/GenerateToken'
import { sendVerificationEmail } from '@/lib/emailSender'


export const login = async (values: LoginType) => {

  const validation = LoginSchema.safeParse(values)
  if (!validation.success) {
    return { error: 'Invalid fields' }
  }
  const { email, password } = validation.data
  const existenceUser = await getUserByEmail(email)
  if (!existenceUser || !existenceUser.email || !existenceUser.password){
    return {error:'Are You a hacker!'}
  }
  if(!existenceUser.emailVerified){
  const verificationToken = await generateToken(email)
    
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      )
    return {success:"confirmation email sent"}
  }
    try {
      await signIn('credentials', {
        email,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      })
      return { success: 'login sucess' }
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
