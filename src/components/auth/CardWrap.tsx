'use client'
import React, { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardFooter } from '../ui/card'
import Header from './Header'
import Social from './Social'
import BackButton from './BackButton'
interface CardWrapProps {
  children: ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

const CardWrap = ({
  backButtonHref,
  backButtonLabel,
  children,
  headerLabel,
  showSocial,
}: CardWrapProps) => {
  return (
    <Card className='w-[400px] shadow-md'>
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial&&(
       <CardFooter>
        <Social/>
       </CardFooter>
      )}
      <CardFooter>
<BackButton label={backButtonLabel} href={backButtonHref}/>

      </CardFooter>
    </Card>
  )
}

export default CardWrap
