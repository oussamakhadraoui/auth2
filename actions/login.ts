'use server'

import { signIn } from '@/auth'
import { LoginType, LoginSchema } from '@/lib/validation'
import { DEFAULT_LOGIN_REDIRECT } from '../routes'
import { AuthError } from 'next-auth'
import { getUserByEmail } from '@/components/Data/user'
import { generateToken, generateTwoFactorToken } from '@/lib/GenerateToken'
import {
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
} from '@/lib/emailSender'
import { getTwoFactorConfirmationByUserId, getTwoFactorTokenByEmail } from '@/components/Data/twoAuth'
import { db } from '@/lib/db'

export const login = async (values: LoginType) => {
  const validation = LoginSchema.safeParse(values)
  if (!validation.success) {
    return { error: 'Invalid fields' }
  }
  const { email, password, code } = validation.data
  const existenceUser = await getUserByEmail(email)
  if (!existenceUser || !existenceUser.email || !existenceUser.password) {
    return { error: 'Are You a hacker!' }
  }
  if (!existenceUser.emailVerified) {
    const verificationToken = await generateToken(email)

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )
    return { success: 'confirmation email sent' }
  }
  if (existenceUser.isTwoFactorEnabled && existenceUser.email) {
    if (code) {
      const twoFactToken = await getTwoFactorTokenByEmail(existenceUser.email)
      if (!twoFactToken) {
        return { error: 'Invalid Code' }
      }
      if (twoFactToken.token !== code) {
        return { error: 'invalid Token' }
      }
      const hasExpired = new Date(twoFactToken.expires) < new Date()
      if (hasExpired) {
        return { error: 'expired Token' }
      }
      await db.twoFactorToken.delete({
        where:{
          id:twoFactToken.id
        }
      })
      const existenceConfirmation = await getTwoFactorConfirmationByUserId(existenceUser.id)
      if(existenceConfirmation){
        await db.twoFactorConfirmation.delete({
          where:{id:existenceConfirmation.id}
        })
      }
      await db.twoFactorConfirmation.create({data:{
        userId:existenceUser.id
      }})
      
    } else {
      const twoFactorToken = await generateTwoFactorToken(existenceUser.email)
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)
      return { twoFactor: true }
    }
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
