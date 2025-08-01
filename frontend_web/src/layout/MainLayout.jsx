import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-blue-100">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Slide}
            />
        </div>
    )
}