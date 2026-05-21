import { motion } from "framer-motion"
import {
  FileText,
  Quote,
  ExternalLink,
} from "lucide-react"
const CitationCard = ({ citation }) => {
  const handleOpenSource = () => {
    if (citation.file_url) {
      window.open(
        citation.file_url,
        "_blank"
      )
    }
  }
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="
        max-w-xl
        bg-white/5
        backdrop-blur-lg
        border
        border-white/10
        rounded-2xl
        p-4
        shadow-lg
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div
            className="
              w-12
              h-12
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
            <FileText className="text-white w-6 h-6" />
          </div>
          <div>
            <h3 className="text-white font-semibold">
              {citation.source}
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Page {citation.page}
            </p>
          </div>
        </div>
        <button
          onClick={handleOpenSource}
          className="
            p-2
            rounded-xl
            hover:bg-white/10
            transition-all
            duration-300
          "
        >
          <ExternalLink className="text-gray-300 w-5 h-5" />
        </button>
      </div>
      {citation.quote && (
        <div
          className="
            mt-4
            bg-white/5
            border
            border-white/10
            rounded-2xl
            p-4
          "
        >
          <div className="flex items-start gap-3">
            <Quote className="text-purple-400 w-5 h-5 mt-1" />
            <p className="text-gray-300 text-sm leading-relaxed">
              “{citation.quote}”
            </p>
          </div>
        </div>
      )}
    </motion.div>
  )
}
export default CitationCard