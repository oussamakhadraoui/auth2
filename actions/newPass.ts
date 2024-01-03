'use server'

import { getPassResetTokenByToken } from '@/components/Data/resetPassToken'
import { getUserByEmail } from '@/components/Data/user'
import { db } from '@/lib/db'
import { newPassType, newPassSchema } from '@/lib/validation'
import bcrypt from 'bcryptjs'

export const newPass = async (values: newPassType, token?: string | null) => {
  if (!token) {
    return { error: 'Missing Token' }
  }
  const validation = newPassSchema.safeParse(values)
  if (!validation.success) {
    return { error: 'something went wrong!' }
  }
  const { password } = validation.data

  const existenceToken = await getPassResetTokenByToken(token)
  if (!existenceToken) {
    return { error: 'invalid Token' }
  }
  const hasExpired = new Date(existenceToken.expires) < new Date()
  if (hasExpired) {
    return { error: 'token has expired' }
  }
  const existenceUser = await getUserByEmail(existenceToken.email)
  if (!existenceUser) {
    return { error: 'Email is missing' }
  }
  const hashedPass = await bcrypt.hash(password, 10)
  await db.user.update({
    where: {
      id: existenceUser.id,
    },
    data: {
      password: hashedPass,
    },
  })

  await db.passwordResetToken.delete({
    where: { id: existenceToken.id },
  })
  return { success: 'password updated' }
}
