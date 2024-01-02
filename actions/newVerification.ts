'use server'

import { getVerificationTokenByToken } from '@/components/Data/VerificationToken'
import { getUserByEmail } from '@/components/Data/user'
import { db } from '@/lib/db'

export const verifyEmail = async (token: string) => {
  const verificationToken = await getVerificationTokenByToken(token)
  if (!verificationToken) {
    return { error: 'there is no email inout data base with this credentials' }
  }
  if (verificationToken.expires < new Date()) {
    return { error: 'Your token is expired' }
  }
  const existenceUser = await getUserByEmail(verificationToken.email)
  if (!existenceUser) {
    return { error: 'This email does not exist!' }
  }
  await db.user.update({
    where: { id: existenceUser.id },
    data: {
      emailVerified: new Date(),
      email: verificationToken.email,
    },
  })
  await db.verificationToken.delete({ where: { id: verificationToken.id } })
  return { success: 'email verified' }
}
