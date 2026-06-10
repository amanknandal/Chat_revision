import { useState, useEffect } from "react"
import Navbar from "../layout/Navbar"
import Sidebar from "../layout/Sidebar"
import MobileSidebar from "../layout/MobileSidebar"

const Settings = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [username, setUsername] = useState("")
    const [emailNotifications, setEmailNotifications] = useState(true)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user")) || {}
        setUsername(user.username || "")
        const stored = localStorage.getItem("email_notifications")
        if (stored !== null) setEmailNotifications(stored === "true")
    }, [])

    const handleSave = (e) => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem("user")) || {}
        user.username = username
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("email_notifications", emailNotifications)
        alert("Settings saved locally.")
    }

    return (
        <div className="flex bg-[#0B1120] min-h-screen">
            <Sidebar />

            <MobileSidebar
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />

            <div className="flex-1 flex flex-col min-w-0">
                <Navbar toggleSidebar={() => setIsSidebarOpen(true)} />

                <div className="p-4 md:p-6">
                    <div className="rounded-2xl bg-slate-950 p-6 shadow-lg shadow-slate-900/50 max-w-3xl">
                        <h1 className="text-2xl font-semibold text-white">Settings</h1>
                        <form className="mt-6 space-y-4" onSubmit={handleSave}>
                            <div>
                                <label className="block text-sm text-slate-300">Display name</label>
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    id="emailNotifications"
                                    type="checkbox"
                                    checked={emailNotifications}
                                    onChange={(e) => setEmailNotifications(e.target.checked)}
                                />
                                <label htmlFor="emailNotifications" className="text-sm text-slate-300">Enable email notifications</label>
                            </div>

                            <button className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
