import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
} from "lucide-react"
import axios from "axios"
const PDFViewer = ({ pdfId, pdfName }) => {
  const [pdfUrl, setPdfUrl] = useState("")
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/pdf/view/${pdfId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setPdfUrl(response.data.url)
      } catch (error) {
        console.log(error)
      }
    }
    if (pdfId) {
      fetchPDF()
    }
  }, [pdfId])
  const zoomIn = () => {
    setScale((prev) => prev + 0.1)
  }
  const zoomOut = () => {
    if (scale > 0.5) {
      setScale((prev) => prev - 0.1)
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        bg-white/10
        backdrop-blur-lg
        border
        border-white/10
        rounded-3xl
        overflow-hidden
        shadow-2xl
        h-full
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          px-6
          py-4
          border-b
          border-white/10
          bg-white/5
        "
      >
        <div>
          <h2 className="text-white font-bold text-lg">
            {pdfName || "PDF Viewer"}
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            AI PDF Reader
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={zoomOut}
            className="
              p-3
              rounded-2xl
              bg-white/10
              hover:bg-white/20
              transition-all
              duration-300
            "
          >
            <ZoomOut className="text-white w-5 h-5" />
          </button>

          <button
            onClick={zoomIn}
            className="
              p-3
              rounded-2xl
              bg-white/10
              hover:bg-white/20
              transition-all
              duration-300
            "
          >
            <ZoomIn className="text-white w-5 h-5" />
          </button>

          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="
              p-3
              rounded-2xl
              bg-white/10
              hover:bg-white/20
              transition-all
              duration-300
            "
          >
            <Download className="text-white w-5 h-5" />
          </a>
        </div>
      </div>
      <div
        className="
          relative
          flex
          items-center
          justify-center
          bg-[#0B1120]
          min-h-[700px]
          p-8
          overflow-auto
        "
      >
        <button
          className="
            absolute
            left-6
            top-1/2
            -translate-y-1/2
            p-4
            rounded-full
            bg-white/10
            hover:bg-white/20
            transition-all
            duration-300
            z-10
          "
        >
          <ChevronLeft className="text-white w-6 h-6" />
        </button>
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            title="PDF Viewer"
            className="w-full h-[700px] rounded-2xl bg-white"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top center",
            }}
          />
        ) : (
          <div className="text-white text-lg">
            Loading PDF...
          </div>
        )}
        <button
          className="
            absolute
            right-6
            top-1/2
            -translate-y-1/2
            p-4
            rounded-full
            bg-white/10
            hover:bg-white/20
            transition-all
            duration-300
            z-10
          "
        >
          <ChevronRight className="text-white w-6 h-6" />
        </button>
      </div>
    </motion.div>
  )
}
export default PDFViewer