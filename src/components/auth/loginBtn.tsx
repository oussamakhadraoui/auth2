'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

interface loginBtnProps {
  children: React.ReactNode
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

const LoginBtn = ({ children, asChild, mode = 'redirect' }: loginBtnProps) => {
  const router = useRouter()
  const onClick = () => {
    router.push('/auth/login')
  }
  if (mode === 'modal') {
    return <span>TODO later</span>
  }
  return (
    <span onClick={onClick} className='cursor-pointer'>
      {children}
    </span>
  )
}

export default LoginBtn
