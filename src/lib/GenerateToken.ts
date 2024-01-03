import { getVerificationTokenByEmail } from '@/components/Data/VerificationToken'
import { v4 as uuid } from 'uuid'
import { db } from './db'
import { getPassResetTokenByEmail } from '@/components/Data/resetPassToken'
import crypto from 'crypto'
import { getTwoFactorTokenByEmail } from '@/components/Data/twoAuth'


export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString()
  const expires = new Date(new Date().getTime() +3600 * 1000)

  const existingToken = await getTwoFactorTokenByEmail(email)

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return twoFactorToken
}



export const generatePassToken = async (email: string) => {
  const token = uuid()

  const existenceToken = await getPassResetTokenByEmail(email)

  if (existenceToken) {
    await db.passwordResetToken.delete({ where: { id: existenceToken.id } })
  }
  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      expires: new Date(new Date().getTime() + 3600 * 1000),
      token,
    },
  })
  return passwordResetToken
}

export const generateToken = async (email: string) => {
  const token = uuid()
  const existenceToken = await getVerificationTokenByEmail(email)
  if (existenceToken) {
    await db.verificationToken.delete({ where: { id: existenceToken.id } })
  }
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires: new Date(new Date().getTime() + 3600 * 1000),
    },
  })
  return verificationToken
}

