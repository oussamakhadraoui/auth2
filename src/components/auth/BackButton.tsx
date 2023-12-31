'use client'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

interface BackButtonProps {
  label: string
  href: string
}

const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button className='font-normal w-full' size={'sm'} variant={'link'}>
      <Link href={href}>{label}</Link>
    </Button>
  )
}

export default BackButton
