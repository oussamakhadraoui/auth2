import UserInfo from '@/components/settings/UserInfo'
import { currentUser } from '@/lib/auth-user'
import React from 'react'

interface pageProps {}

const Page = async ({}: pageProps) => {
  const user = await currentUser()
  return <UserInfo user={user} label='Server Component' />
}

export default Page
