import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import MainLayout from '../layout/MainLayout'
import ProtectedRoute from '../components/ProtectedRoute'

import Home from '../pages/public/Home'
import Hospitals from '../pages/public/Hospitals'
import HospitalRegister from '../pages/public/HospitalRegister'

import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'

import NotFound from '../pages/NotFound'

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "hospitals", element: <Hospitals /> },
            { path: "login", element: <Login /> },
            { path: "signup", element: <Signup /> },
            { path: "hospitalRegister", element: <HospitalRegister /> }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default function AppRouterProvider() {
    return <RouterProvider router={router} />
}