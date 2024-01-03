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

export type registerType = z.infer<typeof RegisterSchema>

export type newPassType = z.infer<typeof newPassSchema>
export type LoginType = z.infer<typeof LoginSchema>
export type ResetType = z.infer<typeof ResetSchema>
