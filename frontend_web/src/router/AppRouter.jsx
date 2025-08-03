import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import MainLayout from '../layout/MainLayout'
import ProtectedRoute from '../components/ProtectedRoute'
import RedirectIfAuthenticated from '../components/RedirectIfAuthenticated'

import Home from '../pages/public/Home'
import Hospitals from '../pages/public/Hospitals'
import HospitalRegister from '../pages/public/HospitalRegister'

import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'

import AdminDashboard from '../pages/admin/Dashboard'
import AdminMedicines from '../pages/admin/Medicines'
import AdminProfile from '../pages/admin/Profile'

import DoctorDashboard from '../pages/doctor/Dashboard'
import DoctorMedicines from '../pages/doctor/Medicines'
import DoctorProfile from '../pages/doctor/Profile'

import NotFound from '../pages/NotFound'

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "hospitals", element: <Hospitals /> },
            { path: "hospitalRegister", element: <HospitalRegister /> },

            { path: "login", element: <RedirectIfAuthenticated><Login /></RedirectIfAuthenticated> },
            { path: "signup", element: <RedirectIfAuthenticated><Signup /></RedirectIfAuthenticated> },

            {
                path: "admin",
                element: <ProtectedRoute role="admin"><Outlet /></ProtectedRoute>,
                children: [
                    { path: "dashboard", element: <AdminDashboard /> },
                    { path: "medicines", element: <AdminMedicines /> },
                    { path: "profile", element: <AdminProfile /> }
                ]
            },

            {
                path: "doctor",
                element: <ProtectedRoute role="doctor"><Outlet /></ProtectedRoute>,
                children: [
                    { path: "dashboard", element: <DoctorDashboard /> },
                    { path: "medicines", element: <DoctorMedicines /> },
                    { path: "profile", element: <DoctorProfile /> }
                ]
            }
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