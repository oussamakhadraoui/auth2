import { getVerificationTokenByEmail } from '@/components/Data/VerificationToken'
import {v4 as uuid} from 'uuid'
import { db } from './db'
export const generateToken=async (email:string)=>{
const token =  uuid()
const existenceToken = await getVerificationTokenByEmail(email)
if(existenceToken){
 await db.verificationToken.delete({where:{id:existenceToken.id}})
}
const verificationToken= await db.verificationToken.create({data:{
 email,
 token,
 expires:new Date(new Date().getTime()+3600*1000)
}})
return verificationToken
}