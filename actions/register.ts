"use server"
import { getUserByEmail } from '@/components/Data/user'
import { db } from '@/lib/db'
import { registerType, RegisterSchema } from '@/lib/validation'
import bcrypt from 'bcryptjs'
export const Register = async (values: registerType) => {
  const validation = RegisterSchema.safeParse(values)
  if (!validation.success) {
    return { error: 'Invalid fields' }
  }
  const { name, email, password } = validation.data
  const hashedPass = await bcrypt.hash(password, 10)

  const user = await getUserByEmail(email)
  if (user) {
    return { error: 'this email is already taken!' }
  }
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPass,
    },
  })
  return { success: 'User Created' }
}
