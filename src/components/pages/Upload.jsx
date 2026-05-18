import Navbar from "../layout/Navbar"
import Sidebar from "../layout/Sidebar"
import UploadBox from "../pdf/UploadBox"
import PDFList from "../pdf/PDFList"

const Upload = () => {
  return (
    <div className="flex bg-[#0B1120] min-h-screen">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1">
        
        <Navbar />

        <div className="p-6 space-y-10">
          
          {/* UPLOAD */}
          <UploadBox />

          {/* LIST */}
          <PDFList />

        </div>
      </div>
    </div>
  )
}

export default Upload