import { useState } from "react"
import Navbar from "../layout/Navbar"
import Sidebar from "../layout/Sidebar"
import MobileSidebar from "../layout/MobileSidebar"

const Flashcards = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [flashcards, setFlashcards] = useState([])
    const [formData, setFormData] = useState({
        question: "",
        answer: "",
        topic: ""
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
        console.log("Create flashcard", formData)
        setFormData({ question: "", answer: "", topic: "" })
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
                        <h1 className="text-2xl font-semibold text-white">Flashcards</h1>
                        <p className="mt-2 text-slate-400">
                            Create and review flashcards for your studies. The UI is ready; integration will be connected later.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                        <section className="rounded-2xl bg-slate-950 p-6 shadow-lg shadow-slate-900/50">
                            <h2 className="text-xl font-semibold text-white">New Flashcard</h2>
                            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-sm text-slate-300">Question</label>
                                    <textarea
                                        name="question"
                                        value={formData.question}
                                        onChange={handleChange}
                                        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-300">Answer</label>
                                    <textarea
                                        name="answer"
                                        value={formData.answer}
                                        onChange={handleChange}
                                        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-300">Topic</label>
                                    <input
                                        name="topic"
                                        value={formData.topic}
                                        onChange={handleChange}
                                        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
                                        placeholder="Optional topic"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
                                >
                                    Save Flashcard
                                </button>
                            </form>
                        </section>

                        <section className="rounded-2xl bg-slate-950 p-6 shadow-lg shadow-slate-900/50">
                            <h2 className="text-xl font-semibold text-white">Flashcard List</h2>
                            <div className="mt-4 space-y-3">
                                {flashcards.length === 0 ? (
                                    <div className="rounded-2xl border border-dashed border-slate-700 p-6 text-slate-400">
                                        No flashcards yet. They will show up here once connected.
                                    </div>
                                ) : (
                                    flashcards.map((card) => (
                                        <div key={card.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                                            <p className="text-sm text-slate-300">{card.question}</p>
                                            <p className="mt-2 text-white">{card.answer}</p>
                                            <p className="mt-2 text-sm text-slate-500">Topic: {card.topic || "General"}</p>
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

export default Flashcards
