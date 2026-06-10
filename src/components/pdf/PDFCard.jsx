import { motion } from "framer-motion"
import { FileText, CalendarDays, Trash2, Eye, MessageSquare, } from "lucide-react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
const PDFCard = ({ pdf, refreshPDFs }) => {
  const navigate = useNavigate()
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/pdf/delete/${pdf.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      refreshPDFs()
    } catch (error) {
      console.log(error)
    }
  }
  const handleView = () => {
    navigate(
      `/pdf-viewer?id=${pdf.id}&name=${encodeURIComponent(pdf.name)}`
    )
  }
  const handleChat = () => {
    navigate(
      `/chat?id=${pdf.id}&name=${encodeURIComponent(pdf.name)}`
    )
  }
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="
        relative
        overflow-hidden
        bg-white/10
        backdrop-blur-lg
        border
        border-white/10
        rounded-3xl
        p-6
        shadow-xl
        hover:border-white/20
        transition-all
        duration-300
      "
    >
      <div
        className="
          absolute
          -top-10
          -right-10
          w-36
          h-36
          rounded-full
          bg-purple-500/20
          blur-3xl
        "
      />
      <div className="relative z-10 flex items-start justify-between">
        <div
          className="
            w-16
            h-16
            rounded-2xl
            bg-gradient-to-r
            from-purple-500
            to-blue-500
            flex
            items-center
            justify-center
            shadow-lg
          "
        >
          <FileText className="text-white w-8 h-8" />
        </div>
      </div>
      <div className="relative z-10 mt-6">
        <h2 className="text-white text-xl font-bold line-clamp-1">
          {pdf.name}
        </h2>
        <div className="flex items-center gap-2 mt-3 text-gray-400 text-sm">
          <CalendarDays className="w-4 h-4" />
          <span>
            {new Date(pdf.created_at).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <span
            className="
              px-3
              py-1
              rounded-xl
              bg-white/10
              text-gray-300
              text-sm
            "
          >
            {pdf.file_size || "PDF"}
          </span>
          <span
            className="
              px-3
              py-1
              rounded-xl
              bg-green-500/20
              text-green-400
              text-sm
            "
          >
            Processed
          </span>
        </div>
      </div>
      <div className="relative z-10 flex items-center gap-3 mt-8">
        <button
          onClick={handleChat}
          className="
            flex-1
            flex
            items-center
            justify-center
            gap-2
            py-3
            rounded-2xl
            bg-gradient-to-r
            from-purple-500
            to-blue-500
            text-white
            font-medium
            hover:scale-[1.02]
            transition-all
            duration-300
          "
        >
          <MessageSquare className="w-5 h-5" />
          Chat
        </button>
        <button
          onClick={handleView}
          className="
            p-3
            rounded-2xl
            bg-white/10
            hover:bg-white/20
            transition-all
            duration-300
          "
        >
          <Eye className="text-white w-5 h-5" />
        </button>
        <button
          onClick={handleDelete}
          className="
            p-3
            rounded-2xl
            bg-red-500/10
            hover:bg-red-500/20
            transition-all
            duration-300
          "
        >
          <Trash2 className="text-red-400 w-5 h-5" />
        </button>
      </div>
    </motion.div>
  )
}
export default PDFCard