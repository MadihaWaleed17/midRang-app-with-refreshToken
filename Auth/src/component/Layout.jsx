import { useEffect, useState } from "react";
import { href, Link, Outlet , useNavigate} from "react-router-dom";
import { httpInterceptor } from "./lib/httpInterceptor";
import { useAuth } from "../context/Authprovider";
import useSWR from 'swr'
import Fetcher from "./lib/fetcher";
const EightMinutMs= (8*60*60)*1000

const Layout = () => {
    const { userInfo } = useAuth()
    const [isOpen, setIsOpen] = useState(false);
    const {data, error, isLoading} = useSWR('/auth/refreshToken', Fetcher, {refreshInterval:EightMinutMs, shouldRetryOnError:false})
    const [showProfile, setShowProfile] = useState(true);
    const [profile, setProfile] = useState(null)
    const navigate = useNavigate()




    useEffect(() => {
        fetchPicture()
    }, [])

    

    const handleProfile = () => {
        try {
            const input = document.createElement("input")

            input.type = "file"
            input.accept = "image/*"
            input.click()

            input.onchange = async () => {
                const pic = document.getElementById('pic')
                const file = input.files[0]
                const formData = new FormData()
                formData.append('picture', file)
                await httpInterceptor.post('file/profile-picture', formData)
                const url = URL.createObjectURL(file)
                pic.src = url


            }
        }
        catch (err) {
            console.log(err.response ? err.response.data.message : err.message)


        }

    }

    const fetchPicture = async () => {
        try {
            const { data } = await httpInterceptor.get('/auth/session')

            if (data.image) {

                const url = `http://localhost:8080/file/profile-picture/${data.image}`
                setProfile(url)
            }




        }
        catch (err) {

            console.log(err.response ? err.response.data.message : err.message)
        }
    }

const logout =async()=>{
   await httpInterceptor.post('/auth/logout')
   navigate('/login')

}


    return (
        <div className="flex min-h-screen bg-slate-100">
            {/* Sidebar */}
            <aside
                className={`overflow-hidden bg-gradient-to-b from-sky-500 to-blue-600 text-white transition-all duration-300 ${showProfile ? "w-72 flex" : "w-0"
                    } flex-col`}

            >

                <div className="p-8 text-center">
                    <img
                        src={profile || "https://i.pravatar.cc/150?img=32"}
                        alt="user"
                        id="pic"
                        className="mx-auto h-24 w-24 rounded-full border-4 border-white object-cover"
                        onClick={handleProfile}
                    />

                    <h2 className="mt-4 text-sm font-bold">
                        {userInfo?.fullname}
                    </h2>

                    <p className="mt-1 text-white">
                        {userInfo?.email}
                    </p>
                </div>

                <nav className="space-y-4 px-8 m-4">
                    <div className="flex flex-col gap-2">
                        <Link to="/dashboard">
                            <button className="w-full rounded-xl bg-rose-400 px-5 py-4 font-medium transition hover:bg-rose-500">
                                Dashboard
                            </button>
                        </Link>
                        <Link to="/dashboard/file">
                            <button className="w-full rounded-xl bg-rose-400 px-5 py-4 font-medium transition hover:bg-rose-500">
                                My Files
                            </button>
                        </Link>

                        <Link to="/dashboard/history">
                            <button className="w-full rounded-xl bg-rose-400 px-5 py-4 font-medium transition hover:bg-rose-500">
                                History
                            </button>
                        </Link>

                        <Link onClick={logout}>
                            <button className="w-full rounded-xl bg-rose-400 px-5 py-4 font-medium transition hover:bg-rose-500">
                                Logout
                            </button>
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* Main */}
            <div className="flex flex-1">
                {/* Content */}
                <div
                    className={`transition-all duration-300 ${isOpen ? "w-full lg:w-[70%]" : "w-full"
                        }`}
                >
                    {/* Navbar */}
                    <header className="flex h-20 items-center justify-between border-b bg-white px-6 shadow-sm">
                        <h1 className="text-4xl font-bold text-slate-900">
                            Filemoon
                        </h1>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowProfile((prev) => !prev)}
                                className="rounded-lg border p-3 hover:bg-slate-100"
                            >
                                ↻
                            </button>

                            <button
                                onClick={() => setIsOpen(true)}
                                className="rounded-lg border p-3 hover:bg-slate-100"
                            >
                                ☰
                            </button>
                        </div>
                    </header>

                    {/* Dummy Table */}
                    <div className="p-6">
                        <Outlet />
                    </div>
                </div>

                {/* Drawer */}
                <div
                    className={`fixed right-0 top-0 z-50 h-screen bg-white shadow-2xl transition-all duration-300 lg:relative ${isOpen
                        ? "w-full sm:w-[450px] lg:w-[30%]"
                        : "w-0"
                        } overflow-hidden`}
                >
                    <div className="h-full p-6">
                        <div className="mb-10 flex items-center justify-between">
                            <h2 className="text-3xl font-bold">
                                Add New File
                            </h2>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-lg text-white"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                </div>

                {/* Overlay */}
                {isOpen && (
                    <div
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-40 bg-black/30 lg:hidden"
                    />
                )}
            </div>
        </div>
    );
};

export default Layout;