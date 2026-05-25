import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  FileText,
  Sparkles,
  Download,
  Copy,
  Loader2,
} from "lucide-react"
import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_URL

const SummaryCard = () => {
  const [summary, setSummary] = useState("")
  const [fileName, setFileName] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSummary()
  }, [])

  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem("token")

      const response = await axios.get(
        `${API_BASE_URL}/summary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setSummary(response.data.summary || "")
      setFileName(response.data.file_name || "PDF File")
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  const copySummary = () => {
    navigator.clipboard.writeText(summary)
  }

  const exportSummary = () => {
    const blob = new Blob([summary], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "summary.txt"
    link.click()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader2 className="w-10 h-10 text-white animate-spin" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="
relative
overflow-hidden
bg-white/10
backdrop-blur-lg
border
border-white/10
rounded-3xl
p-6
shadow-2xl
"
    >
      <div
        className="
absolute
-top-10
-right-10
w-40
h-40
rounded-full
bg-purple-500/20
blur-3xl
"
      />

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-4">
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

          <div>
            <h2 className="text-white text-2xl font-bold">
              AI Summary
            </h2>

            <p className="text-gray-400 mt-1">
              Generated from {fileName}
            </p>
          </div>
        </div>

        <div
          className="
flex
items-center
gap-2
px-4
py-2
rounded-2xl
bg-purple-500/20
text-purple-300
text-sm
font-medium
"
        >
          <Sparkles className="w-4 h-4" />

          AI Generated
        </div>
      </div>

      <div
        className="
relative
z-10
mt-8
bg-white/5
border
border-white/10
rounded-2xl
p-5
"
      >
        {summary ? (
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {summary}
          </p>
        ) : (
          <p className="text-gray-400">
            No summary available
          </p>
        )}
      </div>

      <div className="relative z-10 flex items-center gap-4 mt-6">
        <button
          onClick={exportSummary}
          className="
flex
items-center
gap-2
px-5
py-3
rounded-2xl
bg-gradient-to-r
from-purple-500
to-blue-500
text-white
font-medium
hover:scale-105
transition-all
duration-300
shadow-lg
"
        >
          <Download className="w-5 h-5" />

          Export
        </button>

        <button
          onClick={copySummary}
          className="flex
                    items-center
                    gap-2
                    px-5
                    py-3
                    rounded-2xl
                    bg-white/10
                    border
                    border-white/10
                    text-white
                    hover:bg-white/20
                    transition-all
                    duration-300
"
        >
          <Copy className="w-5 h-5" />

          Copy
        </button>
      </div>
    </motion.div>
  )
}

export default SummaryCard