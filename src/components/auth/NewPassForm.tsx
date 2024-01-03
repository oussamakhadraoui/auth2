'use client'
import React, { useState, useTransition } from 'react'
import CardWrap from './CardWrap'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { newPassSchema, newPassType } from '@/lib/validation'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FormError from '../FormError'
import FormSuccess from '../FormSuccess'

import { useSearchParams } from 'next/navigation'
import { newPass } from '../../../actions/newPass'

const NewPassForm = () => {
  const [isPending, startTransition] = useTransition()
  const search = useSearchParams()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const form = useForm<newPassType>({
    resolver: zodResolver(newPassSchema),
    defaultValues: {
      password: '',
    },
  })
  const token = search.get('token')
  const onSubmit = (values: newPassType) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      newPass(values,token).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }
  return (
    <CardWrap
      backButtonLabel='Back to login'
      backButtonHref='/auth/login'
      headerLabel='Forget your password'
    >
      <Form {...form}>
        <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <FormField
              name='password'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='*****'
                      type='password'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type='submit' disabled={isPending} className='w-full'>
            Send reset Password
          </Button>
        </form>
      </Form>
    </CardWrap>
  )
}

export default NewPassForm
