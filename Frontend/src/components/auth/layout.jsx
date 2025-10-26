import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Authlayout() {
  return (
    <div className='flex min-h-screen w-full'>
      <div className='hidden w-1/2 px-12 lg:flex items-center justify-center bg-black'>
       <div className='max-w-md space-y-6 text-center text-primary-foreground'>
        <h1 className='text-4xl font-extrabold tracking-tight'>Welcome to Ecommerce</h1>
       </div>
      </div>
      <div className='flex flex-1 items-center justify-center bg-background lg:px-8 px-4 py-12 sm:px-6'>
        < Outlet />
      </div>
    </div>
  )
}
