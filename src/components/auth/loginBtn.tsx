'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import LoginForm from './LoginForm'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

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
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className='p-0 w-auto bg-transparent border-none'>
          <LoginForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <span onClick={onClick} className='cursor-pointer'>
      {children}
    </span>
  )
}

export default LoginBtn
