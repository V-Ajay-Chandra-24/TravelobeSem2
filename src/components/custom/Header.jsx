import React from 'react'
import { Button } from '../ui/button'


function Header() {
  return (
    <div className='p-3 shadow-sm flex justify-between px-5'>
      <img src='/TravelobeLogo.png' alt="Logo" className='w-45 h-10'/>
      <div>
        <Button>Sign In</Button>
      </div>
    </div>
    
  )
}

export default Header
