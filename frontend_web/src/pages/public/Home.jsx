const Home = () => {
    return (
        <div className="bg-blue-100">
            <div className="h-[50vh] flex flex-col justify-center items-center gap-4 px-6">
                <span className="text-6xl font-bold">Welcome to MediStatus</span>
                <div className="text-center text-lg">
                    MediStatus is a modern hospital management system designed to simplify how public and government hospitals share information and manage internal resources. From making hospital details and doctor availability timings easily accessible to the public — helping patients avoid unnecessary waiting — to securely managing medicine inventories, MediStatus helps hospitals operate more efficiently with clarity, security, and transparency at its core.
                </div>
            </div>
            <div className="h-[40vh] px-6">
                <div className="text-center text-5xl font-semibold">Key Features</div>
                <div className="flex gap-4 mt-4 p-4">
                    <div className="flex flex-col items-center h-full bg-white w-1/3">
                        <span>Public Access</span>
                        <span>View hospital details and doctor availability at a glance</span>
                    </div>
                    <div className="flex flex-col items-center h-full bg-white w-1/3">
                        <span>Public Access</span>
                        <span>View hospital details and doctor availability at a glance</span>
                    </div>
                    <div className="flex flex-col items-center h-full bg-white w-1/3">
                        <span>Secure & Reliable</span>
                        <span>Protected access for sensitive operations</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home