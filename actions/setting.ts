'use server'

import { getUserByEmail, getUserById } from '@/components/Data/user'
import { generateToken } from '@/lib/GenerateToken'
import { currentUser } from '@/lib/auth-user'
import { db } from '@/lib/db'
import { sendVerificationEmail } from '@/lib/emailSender'
import { SettingSchema, typeSettings } from '@/lib/validation'
import bcrypt from 'bcryptjs'

export const setting = async (values: typeSettings) => {
  const validation = SettingSchema.safeParse(values)
  if (!validation.success) {
    return { error: 'something goes wrong try again later' }
  }

  const user = await currentUser()
  if (!user) {
    return { error: 'Unauthorized' }
  }
  const dbUser = await getUserById(user.id)
  if (!dbUser) {
    return { error: 'Unauthorized' }
  }
  if (user.isOAuth) {
    validation.data.email = undefined
    validation.data.password = undefined
    validation.data.newPassword = undefined
    validation.data.isTwoFactorEnabled = undefined
  }
  if (validation.data.email && validation.data.email !== user.email) {
    const existenceUser = await getUserByEmail(validation.data.email)
    if (existenceUser && existenceUser.id !== user.id) {
      return { error: 'already in use' }
    }
    const verificationToken = await generateToken(validation.data.email)
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )
    return { success: 'Verification email sent!' }
  }
  if (validation.data && validation.data.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      validation.data.password as string,
      dbUser.password
    )

    if (!passwordsMatch) {
      return { error: 'Incorrect password!' }
    }

    const hashedPassword = await bcrypt.hash(validation.data.newPassword, 10)
    validation.data.password = hashedPassword
    validation.data.newPassword = undefined
  }
  await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...validation.data,
    },
  })
  return { success: 'settings Updated' }
}
