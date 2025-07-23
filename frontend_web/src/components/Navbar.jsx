import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center px-4 py-2 bg-blue-200'>
        <div className='flex items-center gap-2'>
            <div><img src="/logo.png" alt="Logo" className='w-10' /></div>
            <Link to="/" className='font-bold font'>MEDISTATUS</Link>
        </div>
        <ul className='flex items-center gap-4'>
            <li><Link to="/login">LOG IN</Link></li>
            <li><Link to="/signup">SIGN UP</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar