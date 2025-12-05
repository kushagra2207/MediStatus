import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'

const Navbar = () => {
  const { user, setUser } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setIsOpen(false)
  }

  return (
    <nav className='sticky top-0 md:static z-50 flex justify-between items-center px-4 sm:px-6 py-4 bg-sky-800 shadow-md'>
      <div className='flex items-center gap-3'>
        <div><img src="/logo.png" alt="Logo" className='w-8 h-8 sm:w-10 sm:h-10 object-contain' /></div>
        <Link to="/" className='text-lg sm:text-xl font-bold text-white hover:text-sky-100 transition-colors duration-200'>MEDISTATUS</Link>
      </div>

      <div className='flex items-center gap-4'>
        {user ? (
          <>
            <ul className='hidden md:flex items-center gap-6'>
              {user.role === 'admin' && <li><Link to="/admin/dashboard" className='inline-block text-white hover:scale-105 transition'>DASHBOARD</Link></li>}
              {user.role === 'admin' && <li><Link to="/admin/medicines" className='inline-block text-white hover:scale-105 transition'>MEDICINES</Link></li>}
              {user.role === 'admin' && <li><Link to="/admin/doctors" className='inline-block text-white hover:scale-105 transition'>DOCTORS</Link></li>}
              {user.role === 'doctor' && <li><Link to="/doctor/dashboard" className='inline-block text-white hover:scale-105 transition'>DASHBOARD</Link></li>}
              {user.role === 'doctor' && <li><Link to="/doctor/medicines" className='inline-block text-white hover:scale-105 transition'>MEDICINES</Link></li>}
              {user.role === 'doctor' && <li><Link to="/doctor/availability" className='inline-block text-white hover:scale-105 transition'>AVAILABILITY</Link></li>}
            </ul>
            <div className='hidden md:block'>
              <button
                className='cursor-pointer bg-sky-700 hover:bg-sky-600 text-white px-5 py-2 rounded-lg font-medium transition-colors duration-200'
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <ul className='hidden md:flex items-center gap-4'>
            <li><Link to="/login" className='inline-block text-white hover:scale-105 transition'>LOG IN</Link></li>
            <li><Link to="/signup" className='bg-sky-700 hover:bg-sky-600 text-white px-5 py-2 rounded-lg font-medium transition-colors duration-200'>SIGN UP</Link></li>
          </ul>
        )}

        <button 
          className='md:hidden text-white text-3xl z-50'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {isOpen && (
        <div className='absolute top-full left-0 w-full bg-sky-800 md:hidden shadow-lg'>
          {user ? (
            <div className='flex flex-col'>
              {user.role === 'admin' && <Link to="/admin/dashboard" className='text-white px-6 py-3 hover:bg-sky-700 transition' onClick={() => setIsOpen(false)}>DASHBOARD</Link>}
              {user.role === 'admin' && <Link to="/admin/medicines" className='text-white px-6 py-3 hover:bg-sky-700 transition' onClick={() => setIsOpen(false)}>MEDICINES</Link>}
              {user.role === 'admin' && <Link to="/admin/doctors" className='text-white px-6 py-3 hover:bg-sky-700 transition' onClick={() => setIsOpen(false)}>DOCTORS</Link>}
              {user.role === 'doctor' && <Link to="/doctor/dashboard" className='text-white px-6 py-3 hover:bg-sky-700 transition' onClick={() => setIsOpen(false)}>DASHBOARD</Link>}
              {user.role === 'doctor' && <Link to="/doctor/medicines" className='text-white px-6 py-3 hover:bg-sky-700 transition' onClick={() => setIsOpen(false)}>MEDICINES</Link>}
              {user.role === 'doctor' && <Link to="/doctor/availability" className='text-white px-6 py-3 hover:bg-sky-700 transition' onClick={() => setIsOpen(false)}>AVAILABILITY</Link>}
              <button
                className='text-white px-6 py-3 hover:bg-sky-700 transition text-left'
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <div className='flex flex-col'>
              <Link to="/login" className='text-white px-6 py-3 hover:bg-sky-700 transition' onClick={() => setIsOpen(false)}>LOG IN</Link>
              <Link to="/signup" className='text-white px-6 py-3 hover:bg-sky-700 transition' onClick={() => setIsOpen(false)}>SIGN UP</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
