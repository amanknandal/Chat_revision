import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  FileText,
  MoreVertical,
  Clock3,
  Download,
} from "lucide-react"
const RecentFiles = () => {
  const [files, setFiles] =
    useState([])
  useEffect(() => {
    const storedFiles =
      JSON.parse(
        localStorage.getItem(
          "uploaded_pdfs"
        )
      ) || []
    setFiles(storedFiles)
  }, [])
  const handleDownload = (fileUrl) => {
    if (fileUrl) {
      window.open(
        fileUrl,
        "_blank"
      )
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        bg-white/10
        backdrop-blur-lg
        border
        border-white/10
        rounded-3xl
        p-6
        shadow-xl
      "
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-2xl font-bold">
            Recent Files
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Recently uploaded study materials
          </p>
        </div>
        <button
          className="
            px-4
            py-2
            rounded-2xl
            bg-white/10
            text-white
            hover:bg-white/20
            transition-all
            duration-300
          "
        >
          View All
        </button>
      </div>
      <div className="space-y-4">
        {files.length === 0 && (
          <div
            className="
              text-center
              py-10
              text-gray-400
            "
          >
            No PDFs uploaded yet
          </div>
        )}
        {files.map((file, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.01 }}
            className="
              flex
              items-center
              justify-between
              gap-4
              bg-white/5
              border
              border-white/10
              rounded-2xl
              p-4
              hover:bg-white/10
              transition-all
              duration-300
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  w-14
                  h-14
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
                <FileText className="text-white w-7 h-7" />
              </div>
              <div>
                <h3 className="text-white font-semibold">
                  {file.name}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-gray-400 text-sm">
                    {file.size}
                  </span>
                  <div className="w-1 h-1 bg-gray-500 rounded-full" />
                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <Clock3 className="w-4 h-4" />
                    {file.time}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  handleDownload(
                    file.url
                  )
                }
                className="
                  p-3
                  rounded-xl
                  bg-white/10
                  hover:bg-white/20
                  transition-all
                  duration-300
                "
              >
                <Download className="text-white w-5 h-5" />
              </button>
              <button
                className="
                  p-3
                  rounded-xl
                  bg-white/10
                  hover:bg-white/20
                  transition-all
                  duration-300
                "
              >
                <MoreVertical className="text-white w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
export default RecentFiles