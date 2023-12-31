import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import LoginBtn from '@/components/auth/loginBtn'
const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})
export default function Home() {
  return (
    <main className='flex flex-col h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
      <div className='space-y-6 text-center'>
        <h1
          className={cn(
            'text-6xl font-semibold text-white drop-shadow-md',
            font.className
          )}
        >
          Auth
        </h1>
        <p className='text-white text-lg'>A simple auth service</p>
        <div>
          <LoginBtn>
            <Button variant={'secondary'} size={'lg'}>
              Sign In
            </Button>
          </LoginBtn>
        </div>
      </div>
    </main>
  )
}
