import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FaHospital, FaUserMd, FaMobileAlt, FaShieldAlt } from 'react-icons/fa';
import { MdMedicalServices, MdDashboard } from 'react-icons/md';

const Home = () => {
    const { loading, serverOnline } = useAuth()

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-50 to-blue-50">
            {(loading || !serverOnline) && (
                <div className="fixed bottom-4 right-4 z-50">
                    {loading && serverOnline && (
                        <div className="rounded-full bg-slate-900/90 text-slate-50 text-xs px-3 py-1.5 shadow-lg flex items-center gap-2" title='First load may take a bit longer due to server cold start'>
                            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                            <span>Waking up server…</span>
                        </div>
                    )}

                    {!loading && !serverOnline && (
                        <div className="rounded-full bg-red-600 text-white text-xs px-3 py-1.5 shadow-lg flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-white/80" />
                            <span>Server unreachable</span>
                        </div>
                    )}
                </div>
            )}
            <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-sky-900 mb-4 sm:mb-6 drop-shadow-sm leading-tight">
                        MediStatus
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-10 px-2">
                        A modern hospital management system designed to simplify how public and government hospitals
                        share information and manage internal resources. From making hospital details and doctor availability
                        timings easily accessible to the public — helping patients avoid unnecessary waiting — to securely
                        managing medicine inventories, MediStatus helps hospitals operate more efficiently with clarity,
                        security, and transparency at its core.
                    </p>
                    <Link
                        to="/hospitals"
                        className="inline-block bg-sky-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-sky-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                    >
                        View Hospitals
                    </Link>
                </div>
            </section>

            <section className="py-16 px-6 bg-gradient-to-r from-blue-50 to-sky-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-5xl font-bold text-center text-sky-900 mb-12">
                        Key Features
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
                            <div className="bg-sky-600 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-md">
                                <FaHospital className="text-white text-3xl" />
                            </div>
                            <h3 className="text-2xl font-semibold text-sky-900 mb-3">
                                Hospital Registration
                            </h3>
                            <p className="text-gray-700">
                                Register new hospitals and view comprehensive directories with contact information searchable by name or location.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
                            <div className="bg-sky-600 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-md">
                                <MdDashboard className="text-white text-3xl" />
                            </div>
                            <h3 className="text-2xl font-semibold text-sky-900 mb-3">
                                Admin Dashboard
                            </h3>
                            <p className="text-gray-700">
                                Comprehensive admin panel to manage medicine inventory, view doctor lists, and oversee hospital operations.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
                            <div className="bg-sky-600 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-md">
                                <FaUserMd className="text-white text-3xl" />
                            </div>
                            <h3 className="text-2xl font-semibold text-sky-900 mb-3">
                                Doctor Portal
                            </h3>
                            <p className="text-gray-700">
                                Dedicated dashboard for doctors to manage their availability schedules and view hospital medicine inventory.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
                            <div className="bg-sky-600 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-md">
                                <MdMedicalServices className="text-white text-3xl" />
                            </div>
                            <h3 className="text-2xl font-semibold text-sky-900 mb-3">
                                Medicine Inventory
                            </h3>
                            <p className="text-gray-700">
                                Secure medicine inventory management with add, update, and delete capabilities for authorized hospital staff.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
                            <div className="bg-sky-600 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-md">
                                <FaShieldAlt className="text-white text-3xl" />
                            </div>
                            <h3 className="text-2xl font-semibold text-sky-900 mb-3">
                                Secure & Reliable
                            </h3>
                            <p className="text-gray-700">
                                JWT-based authentication with OTP verification, password encryption, and role-based access control.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
                            <div className="bg-sky-600 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-md">
                                <FaMobileAlt className="text-white text-3xl" />
                            </div>
                            <h3 className="text-2xl font-semibold text-sky-900 mb-3">
                                Mobile App Access
                            </h3>
                            <p className="text-gray-700">
                                Cross-platform mobile app for patients to browse hospitals and check doctor availability on the go.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 px-6 bg-gradient-to-br from-sky-100 via-blue-50 to-sky-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-5xl font-bold text-center text-sky-900 mb-12">
                        How It Works
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-md">
                            <div className="bg-sky-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                                1
                            </div>
                            <h3 className="text-xl font-semibold text-sky-900 mb-2">
                                Register & Browse
                            </h3>
                            <p className="text-gray-700">
                                Register your hospital or search existing facilities with complete contact information and location details.
                            </p>
                        </div>
                        <div className="text-center bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-md">
                            <div className="bg-sky-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                                2
                            </div>
                            <h3 className="text-xl font-semibold text-sky-900 mb-2">
                                Secure Authentication
                            </h3>
                            <p className="text-gray-700">
                                Staff members sign up with OTP verification and access role-specific dashboards for admins and doctors.
                            </p>
                        </div>
                        <div className="text-center bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-md">
                            <div className="bg-sky-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                                3
                            </div>
                            <h3 className="text-xl font-semibold text-sky-900 mb-3">
                                Manage Resources
                            </h3>
                            <p className="text-gray-700">
                                Hospital staff efficiently manage medicine inventory, doctor schedules, and patient information.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;