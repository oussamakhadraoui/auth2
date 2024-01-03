'use client'
import React, { useState, useTransition } from 'react'
import CardWrap from './CardWrap'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {  ResetSchema, ResetType } from '@/lib/validation'
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
import { reset } from '../../../actions/reset'





const ResetForm = () => {
  const [isPending, startTransition] = useTransition()


  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const form = useForm<ResetType>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',

    },
  })
  const onSubmit = (values: ResetType) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      reset(values).then((data) => {
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
              name='email'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='email@exmaple.com'
                      type='email'
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
            Send reset Email
          </Button>
        </form>
      </Form>
    </CardWrap>
  )
}

export default ResetForm
