import Navbar from "../layout/Navbar"
import Sidebar from "../layout/Sidebar"
import PDFViewer from "../pdf/PDFViewer"
import ChatBox from "../chat/ChatBox"
import { useSearchParams } from "react-router-dom"
const PDFViewerPage = () => {
  const [searchParams] = useSearchParams()
  const pdfId = searchParams.get("id")
  const pdfName = searchParams.get("name")
  return (
    <div className="flex bg-[#0B1120] min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <PDFViewer pdfId={pdfId} pdfName={pdfName} />
          </div>
          <div className="xl:col-span-1">
            <ChatBox pdfId={pdfId} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default PDFViewerPage