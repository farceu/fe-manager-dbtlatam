import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IconMail, IconLock } from '@tabler/icons-react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Inicio de Sesión',
  description: 'Accede a tu cuenta con tu correo electrónico y contraseña.'
};

export default function SignInViewPage() {
  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col p-10 text-white lg:flex border-r bg-primary'>
        <div className='absolute inset-0 bg-primary' />
        <div className='absolute bottom-0 left-0 right-0 h-[60%] bg-[url("/bg-isotipo.png")] bg-no-repeat bg-center bg-contain' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <Image src="/logo.svg" alt='Logo DBTLatam' width={351} height={250} />
        </div>
        <div className='relative z-20 mt-auto flex flex-col items-center justify-center text-left'>
          <blockquote className='space-y-2'>
            <h3 className='text-3xl font-bold'>
              Tu aplicación de administración de deudas
            </h3>
            <footer className='text-sm'>que te permite gestionar tus deudas de manera fácil y rápida.</footer>
          </blockquote>
        </div>
      </div>
      <div className='flex h-full items-center justify-center p-4 lg:p-8'>
        <div className='flex w-full max-w-md flex-col items-center justify-center space-y-6'>
          <div className='w-full space-y-6'>
            <div className='space-y-2 text-center'>
              <h1 className='text-3xl font-bold'>Bienvenido/as</h1>
              <p className='text-muted-foreground'>
                Por favor, completa los datos para ingresar.
              </p>
            </div>
            <form className='space-y-4'>
              <div className='space-y-2'>
                <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  Email
                </label>
                <div className='relative'>
                  <IconMail className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                  <input
                    type='email'
                    placeholder='tu@email.com'
                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  Contraseña
                </label>
                <div className='relative'>
                  <IconLock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                  <input
                    type='password'
                    placeholder='••••••••'
                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  />
                </div>
              </div>
              <div className='text-center'>
                <Link
                  href='/forgot-password'
                  className='text-sm text-primary hover:underline'
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <button
                type='submit'
                className='w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2'
              >
                Iniciar sesión
              </button>
            </form>
          </div>
          <p className='text-muted-foreground px-8 text-center text-sm'>
            Al iniciar sesión, aceptas nuestros{' '}
            <Link
              href='/terms'
              className='text-blue-600 hover:underline'
            >
              Términos de Servicio
            </Link>{' '}
            y{' '}
            <Link
              href='/privacy'
              className='text-blue-600 hover:underline'
            >
              Política de Privacidad
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
