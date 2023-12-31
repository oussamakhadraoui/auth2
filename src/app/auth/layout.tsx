import React, { ReactNode } from 'react'

interface layoutProps {
  children: ReactNode
}

const layout = ({ children }: layoutProps) => {
  return (
    <div className='h-full flex items-center justify-center bg-sky-400'>
      {children}
    </div>
  )
}

export default layout
