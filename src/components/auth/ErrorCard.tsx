import React from 'react'

import CardWrap from './CardWrap'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'



const ErrorCard = () => {
  return (
    <CardWrap
      headerLabel='Oops! You tried to destroy the world and we just stopped you!'
      backButtonHref='/auth/login'
      backButtonLabel='Back to login'
    >
      <div className='w-full flex justify-center items-center'>
        <ExclamationTriangleIcon className='text-destructive' />
      </div>
    </CardWrap>
  )
}

export default ErrorCard
