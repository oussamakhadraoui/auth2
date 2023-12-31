import {ExclamationTriangleIcon} from '@radix-ui/react-icons'

import React from 'react'

interface FormErrorProps {
 message?: string
 
}

const FormError = ({message}: FormErrorProps)=> {
if(!message){
 return null
}
  return <div className='bg-destructive/15 p-3 flex rounded-md items-center text-sm text-destructive gap-x-2'>

   <ExclamationTriangleIcon className='h-4 w-4'/>
   {'  '}
   <p>  {message}</p>
  </div>
}

export default FormError
