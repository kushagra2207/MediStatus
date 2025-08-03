import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
  const { user, setUser } = useAuth()

  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <nav className='flex justify-between items-center px-4 py-2 bg-blue-200'>
      <div className='flex items-center gap-2'>
        <div><img src="/logo.png" alt="Logo" className='w-10' /></div>
        <Link to="/" className='font-bold font'>MEDISTATUS</Link>
      </div>
      {user ? (
        <>
          <ul className='flex items-center gap-4'>
            {user.role === 'admin' && <li><Link to="/admin/dashboard">DASHBOARD</Link></li>}
            {user.role === 'admin' && <li><Link to="/admin/profile">PROFILE</Link></li>}
            {user.role === 'doctor' && <li><Link to="/doctor/dashboard">DASHBOARD</Link></li>}
            {user.role === 'doctor' && <li><Link to="/doctor/profile">PROFILE</Link></li>}
          </ul>
          <div>
            <button
              className='cursor-pointer'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <ul className='flex items-center gap-4'>
          <li><Link to="/login">LOG IN</Link></li>
          <li><Link to="/signup">SIGN UP</Link></li>
        </ul>
      )}
    </nav>
  )
}

export default Navbar