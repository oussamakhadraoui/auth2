import { UserRole } from '@prisma/client'
import z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid Email' }),
  password: z
    .string({ required_error: 'This field is required' })
    .min(4, { message: 'Need a longer password.' }),
  code: z.optional(z.string()),
})

export const ResetSchema = z.object({
  email: z.string().email({ message: 'Invalid Email' }),
})

export const newPassSchema = z.object({
  password: z.string().min(6, { message: 'required' }),
})

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(6, {
    message: 'Minimum 6 characters required',
  }),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
})

export const SettingSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false
      }

      return true
    },
    {
      message: 'New password is required!',
      path: ['newPassword'],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false
      }

      return true
    },
    {
      message: 'Password is required!',
      path: ['password'],
    }
  )
export type typeSettings = z.infer<typeof SettingSchema>
export type registerType = z.infer<typeof RegisterSchema>
export type newPassType = z.infer<typeof newPassSchema>
export type LoginType = z.infer<typeof LoginSchema>
export type ResetType = z.infer<typeof ResetSchema>
