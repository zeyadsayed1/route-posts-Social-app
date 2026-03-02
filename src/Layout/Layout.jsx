import React from 'react'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
      <>
      <div className='min-h-screen overflow-y-auto overflow-x-hidden'>
        
                 <Outlet />
       </div>
      </>
  )
}
