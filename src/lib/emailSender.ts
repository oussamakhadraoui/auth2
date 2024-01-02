import { EmailTemplate } from '@/components/email-template'
import { Resend } from 'resend'
const KEY = process.env.RESEND_API_KEY

const resend = new Resend(KEY)
export const sendVerificationEmail = async (email: string, token: string) => {
  const VerificationLink =
    `http://localhost:3000/auth/new-verification?token=${token}` as string
  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [email],
    subject: 'Hello world',
    react: EmailTemplate({ VerificationLink }),
    html: `<p>Click <a href="${VerificationLink}">here</a> to reset password.</p>`,
  })
}
