"use server"

import { getUserByEmail } from '@/components/Data/user';
import { generatePassToken } from '@/lib/GenerateToken';
import { sendResetPasswordToken } from '@/lib/emailSender';
import { ResetSchema, ResetType } from '@/lib/validation';

export const reset=async (values:ResetType)=>{
const validation = ResetSchema.safeParse(values)
if(!validation.success){
 return {error:"missing email"}
}
const {email}= values

const user = await getUserByEmail(email)
if(!user){
 return { error: 'Email Not found' }
}
const passResetToken =await generatePassToken(email)
await sendResetPasswordToken(passResetToken.email, passResetToken.token)
return{success:'reset email send'}


}