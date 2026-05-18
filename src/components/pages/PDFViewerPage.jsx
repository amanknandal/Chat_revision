import Navbar from "../layout/Navbar"
import Sidebar from "../layout/Sidebar"
import PDFViewer from "../pdf/PDFViewer"
import ChatBox from "../chat/ChatBox"

const PDFViewerPage = () => {
  return (
    <div className="flex bg-[#0B1120] min-h-screen">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        
        <Navbar />

        <div className="flex-1 p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* PDF VIEWER */}
          <div className="xl:col-span-2">
            <PDFViewer />
          </div>

          {/* AI CHAT */}
          <div className="xl:col-span-1">
            <ChatBox />
          </div>

        </div>
      </div>
    </div>
  )
}

export default PDFViewerPage