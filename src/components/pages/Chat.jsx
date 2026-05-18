import Navbar from "../layout/Navbar"
import Sidebar from "../layout/Sidebar"
import ChatBox from "../chat/ChatBox"

const Chat = () => {
  return (
    <div className="flex bg-[#0B1120] min-h-screen">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        
        <Navbar />

        <div className="flex-1 p-6">
          <ChatBox />
        </div>

      </div>
    </div>
  )
}

export default Chat