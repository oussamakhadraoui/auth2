import React from 'react'
import CardWrap from './CardWrap'

interface LoginFormProps {}

const LoginForm = ({}: LoginFormProps) => {
  return (
    <CardWrap
      backButtonLabel="Don't have an account"
      backButtonHref='/auth/register'
      headerLabel='Welcome Back'
      showSocial
    >
      LoginForm
    </CardWrap>
  )
}

export default LoginForm
