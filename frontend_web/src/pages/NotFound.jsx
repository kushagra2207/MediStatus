import { Link } from 'react-router-dom'
import { FaHome, FaExclamationTriangle } from 'react-icons/fa'


const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-50 to-blue-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16 border border-blue-100">
          <div className="bg-sky-600 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FaExclamationTriangle className="text-white text-4xl sm:text-5xl" />
          </div>
          
          <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold text-sky-900 mb-4">
            404
          </h1>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sky-900 mb-4">
            Page Not Found
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
          
          <Link
            to="/"
            className="inline-flex items-center gap-3 bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <FaHome className="text-xl" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}


export default NotFound
