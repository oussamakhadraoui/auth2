import { EmailTemplate } from '@/components/email-template'
import { Resend } from 'resend'
const KEY = process.env.RESEND_API_KEY

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: '2FA Code',
    html: `<p>Your 2FA code: ${token}</p>`,
  })
}

const resend = new Resend(KEY)
export const sendVerificationEmail = async (email: string, token: string) => {
  const VerificationLink =
    `http://localhost:3000/auth/new-verification?token=${token}` as string
  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [email],
    subject: 'Hello world',
    react: EmailTemplate({ VerificationLink }),
    html: `<p>Click <a href="${VerificationLink}">here</a> to verify email.</p>`,
  })
}

export const sendResetPasswordToken = async (email: string, token: string) => {
  const VerificationLink =
    `http://localhost:3000/auth/new-password?token=${token}` as string
  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [email],
    subject: 'Hello world',
    react: EmailTemplate({ VerificationLink }),
    html: `<p>Click <a href="${VerificationLink}">here</a> to reset password.</p>`,
  })
}
