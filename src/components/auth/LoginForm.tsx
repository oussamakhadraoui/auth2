'use client'
import React, { useState, useTransition } from 'react'
import CardWrap from './CardWrap'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LoginSchema, LoginType } from '@/lib/validation'
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
import { login } from '../../../actions/login'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
interface LoginFormProps {}

const LoginForm = ({}: LoginFormProps) => {
  const [isPending, startTransition] = useTransition()
  const search = useSearchParams()
  const isAlreadyExist =
    search.get('error') === 'OAuthAccountNotLinked'
      ? 'This email is used by a different user try login with another account!'
      : ''
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = (values: LoginType) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }
  return (
    <CardWrap
      backButtonLabel="Don't have an account"
      backButtonHref='/auth/register'
      headerLabel='Welcome Back'
      showSocial
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
            <FormField
              name='password'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='******'
                      type='password'
                    />
                  </FormControl>
                  <Button
                    size={'sm'}
                    variant={'link'}
                    asChild
                    className='px-0 font-normal'
                  >
                    <Link href='/auth/reset'>Forget password</Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || isAlreadyExist} />
          <FormSuccess message={success} />
          <Button type='submit' disabled={isPending} className='w-full'>
            Login
          </Button>
        </form>
      </Form>
    </CardWrap>
  )
}

export default LoginForm
