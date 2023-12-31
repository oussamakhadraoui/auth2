import {CheckCircledIcon} from '@radix-ui/react-icons'

import React from 'react'

interface FormErrorProps {
 message?: string
 
}

const FormSuccess = ({message}: FormErrorProps)=> {
if(!message){
 return null
}
  return (
    <div className='bg-emerald-500/15 p-3 flex rounded-md items-center text-sm text-emerald-500 gap-x-2'>
      <CheckCircledIcon className='h-4 w-4' />
  
      <p> {message}</p>
    </div>
  )
}

export default FormSuccess
