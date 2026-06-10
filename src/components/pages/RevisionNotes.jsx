import { useState } from "react"
import Navbar from "../layout/Navbar"
import Sidebar from "../layout/Sidebar"
import MobileSidebar from "../layout/MobileSidebar"

const RevisionNotes = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [notes, setNotes] = useState([])
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        source: ""
    })

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // Placeholder: submit via API once connected
        console.log("Create revision note", formData)
        setFormData({ title: "", content: "", source: "" })
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

                <div className="p-4 md:p-6 space-y-6">
                    <div className="rounded-2xl bg-slate-950 p-6 shadow-lg shadow-slate-900/50">
                        <h1 className="text-2xl font-semibold text-white">Revision Notes</h1>
                        <p className="mt-2 text-slate-400">
                            Draft review notes for study sessions. The page is scaffolded, and API wiring can be added later.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                        <section className="rounded-2xl bg-slate-950 p-6 shadow-lg shadow-slate-900/50">
                            <h2 className="text-xl font-semibold text-white">Add Revision Note</h2>
                            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-sm text-slate-300">Title</label>
                                    <input
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
                                        placeholder="Note title"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-300">Content</label>
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleChange}
                                        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
                                        rows={4}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-300">Source</label>
                                    <input
                                        name="source"
                                        value={formData.source}
                                        onChange={handleChange}
                                        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
                                        placeholder="Related topic or source"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
                                >
                                    Save Note
                                </button>
                            </form>
                        </section>

                        <section className="rounded-2xl bg-slate-950 p-6 shadow-lg shadow-slate-900/50">
                            <h2 className="text-xl font-semibold text-white">Saved Notes</h2>
                            <div className="mt-4 space-y-3">
                                {notes.length === 0 ? (
                                    <div className="rounded-2xl border border-dashed border-slate-700 p-6 text-slate-400">
                                        No revision notes yet. They'll appear here after backend integration.
                                    </div>
                                ) : (
                                    notes.map((note) => (
                                        <div key={note.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                                            <div className="flex items-center justify-between gap-3">
                                                <h3 className="text-white">{note.title}</h3>
                                                <span className="text-sm text-slate-500">{note.source || "General"}</span>
                                            </div>
                                            <p className="mt-3 text-slate-300">{note.content}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RevisionNotes
