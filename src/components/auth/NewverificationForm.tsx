"use client"
import React, { useCallback, useEffect, useState } from 'react'
import CardWrap from './CardWrap'
import {BeatLoader} from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { verifyEmail } from '../../../actions/newVerification'
import FormSuccess from '../FormSuccess'
import FormError from '../FormError'
interface NewVerificationFormProps {
  
}

const NewVerificationForm = ({}: NewVerificationFormProps) => {
  const search = useSearchParams()
  const token = search.get('token') 
  const [error,setError]= useState<string | undefined>()
  const [success,setSuccess]= useState<string | undefined>()
  const submit = useCallback(() => {
    if (success || error) return
    if (!token) {
      setError('There is no token to use!')
      return
    }
    verifyEmail(token)
      .then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
      .catch(() => {
        setError('something went wrong in verify email!')
      })
  }, [token, success, error])
  useEffect(() => {
    submit()
  }, [submit])
  return (
    <CardWrap
      headerLabel='Confirming your verification'
      backButtonHref='/auth/login'
      backButtonLabel='Back to login'
    >
      <div className='flex items-center w-full justify-center'>
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrap>
  )
}

export default NewVerificationForm
