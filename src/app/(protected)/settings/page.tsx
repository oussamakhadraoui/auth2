import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import React from 'react'

interface pageProps {}

const page = async ({}: pageProps) => {
  const session = await auth()
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <Button type='submit'>sign out</Button>
      </form>
    </div>
  )
}

export default page
