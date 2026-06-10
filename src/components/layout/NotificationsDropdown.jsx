import { useState } from "react"

const sampleNotifications = [
    { id: 1, title: "PDF processed", body: "Your PDF 'notes.pdf' finished processing.", read: false },
    { id: 2, title: "Reminder", body: "Review your flashcards for Biology.", read: false },
]

const NotificationsDropdown = ({ onClose }) => {
    const [items, setItems] = useState(sampleNotifications)

    const markAllRead = () => {
        setItems(items.map((i) => ({ ...i, read: true })))
    }

    return (
        <div className="absolute right-4 top-16 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-lg z-50">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between">
                <h4 className="text-white font-semibold">Notifications</h4>
                <div className="flex items-center gap-2">
                    <button onClick={markAllRead} className="text-sm text-slate-400 hover:text-white">Mark all read</button>
                    <button onClick={onClose} className="text-sm text-slate-400 hover:text-white">Close</button>
                </div>
            </div>

            <div className="max-h-64 overflow-auto p-2 space-y-2">
                {items.length === 0 ? (
                    <div className="p-3 text-slate-400">No notifications</div>
                ) : (
                    items.map((n) => (
                        <div key={n.id} className={`p-3 rounded-lg ${n.read ? 'bg-slate-800' : 'bg-slate-900'}`}>
                            <div className="text-sm text-white font-semibold">{n.title}</div>
                            <div className="text-xs text-slate-400 mt-1">{n.body}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default NotificationsDropdown
