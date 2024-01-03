"use client"
import UserInfo from '@/components/settings/UserInfo'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { currentUser } from '@/lib/auth-user'
import React from 'react'

interface pageProps {}

const Page =  ({}: pageProps) => {
  const user = useCurrentUser()
  return <UserInfo user={user} label='Client Component' />
}

export default Page
