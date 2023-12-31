'use client'
import React from 'react'
import CardWrap from './CardWrap'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LoginSchema, LoginType } from '@/lib/validation'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FormError from '../FormError'
import FormSuccess from '../FormSuccess'
interface LoginFormProps {}

const LoginForm = ({}: LoginFormProps) => {
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = (values: LoginFormProps) => {
console.log(values)
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
                    <Input {...field} placeholder='******' type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message=""/>
          <FormSuccess message=''/>
          <Button type='submit' className='w-full'>
            Login
          </Button>
        </form>
      </Form>
    </CardWrap>
  )
}

export default LoginForm
