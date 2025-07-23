import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center px-4 py-2 bg-blue-200'>
        <div className='flex items-center gap-2'>
            <div><img src="/logo.png" alt="Logo" className='w-10' /></div>
            <span className='font-bold font'>MEDISTATUS</span>
        </div>
        <ul className='flex items-center gap-4'>
            <li>LOG IN</li>
            <li>SIGN UP</li>
        </ul>
    </nav>
  )
}

export default Navbar