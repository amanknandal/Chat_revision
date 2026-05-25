import { useState } from "react"
import Navbar from "../layout/Navbar"
import Sidebar from "../layout/Sidebar"
import MobileSidebar from "../layout/MobileSidebar"
import ChatBox from "../chat/ChatBox"

const Chat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex bg-[#0B1120] min-h-screen">
      <Sidebar />

      <MobileSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar toggleSidebar={() => setIsSidebarOpen(true)} />

        <div className="flex-1 p-4 md:p-6 overflow-hidden">
          <ChatBox />
        </div>
      </div>
    </div>
  )
}

export default Chat