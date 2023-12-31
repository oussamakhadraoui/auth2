import z from "zod"

export const LoginSchema = z.object({
 email:z.string().email({message:"Invalid Email"}),
 password:z.string({required_error:'This field is required'}).min(4,{message:"Need a longer password."})
})
export type LoginType= z.infer<typeof LoginSchema>