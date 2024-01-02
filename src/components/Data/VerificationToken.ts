import { db } from "@/lib/db"

export const getVerificationTokenByEmail=async(email:string)=>{

 try {
   const token = await db.verificationToken.findFirst({where:{email}})
 if(!token )return null
 return token
 } catch (error) {
  return null
 }

}

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const Token = await db.verificationToken.findFirst({ where: { token } })
    if (!Token) return null
    return Token
  } catch (error) {
    return null
  }
}