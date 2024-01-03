import { db } from '@/lib/db'

export const getPassResetTokenByToken = async (token: string) => {
  try {
    const passToken = await db.passwordResetToken.findUnique({
      where: { token },
    })
    return passToken
  } catch (error) {
    return null
  }
}
export const getPassResetTokenByEmail = async (email: string) => {
  try {
    const passToken = await db.passwordResetToken.findFirst({
      where: { email },
    })
    return passToken
  } catch (error) {
    return null
  }
}
