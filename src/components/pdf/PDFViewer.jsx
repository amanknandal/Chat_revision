import { motion } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
} from "lucide-react"

const PDFViewer = () => {
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
      "
    >
      {/* TOPBAR */}
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
        {/* FILE INFO */}
        <div>
          <h2 className="text-white font-bold text-lg">
            DBMS Complete Notes.pdf
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Page 1 of 120
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          
          <button
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

          <button
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
          </button>
        </div>
      </div>

      {/* PDF CONTENT */}
      <div
        className="
          relative
          flex
          items-center
          justify-center
          bg-[#0B1120]
          min-h-[700px]
          p-8
        "
      >
        {/* PREVIOUS BUTTON */}
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

        {/* PDF PAGE */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="
            w-full
            max-w-4xl
            bg-white
            rounded-2xl
            shadow-2xl
            min-h-[600px]
            p-10
            overflow-hidden
          "
        >
          {/* MOCK PDF CONTENT */}
          <div className="space-y-6">
            <div className="h-8 w-2/3 bg-gray-300 rounded-lg" />

            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded-lg w-full" />
              <div className="h-4 bg-gray-200 rounded-lg w-[95%]" />
              <div className="h-4 bg-gray-200 rounded-lg w-[90%]" />
              <div className="h-4 bg-gray-200 rounded-lg w-[85%]" />
            </div>

            <div className="space-y-3 mt-10">
              <div className="h-4 bg-gray-200 rounded-lg w-full" />
              <div className="h-4 bg-gray-200 rounded-lg w-[92%]" />
              <div className="h-4 bg-gray-200 rounded-lg w-[88%]" />
              <div className="h-4 bg-gray-200 rounded-lg w-[94%]" />
            </div>

            <div
              className="
                mt-10
                h-60
                rounded-2xl
                bg-gray-200
              "
            />

            <div className="space-y-3 mt-10">
              <div className="h-4 bg-gray-200 rounded-lg w-full" />
              <div className="h-4 bg-gray-200 rounded-lg w-[93%]" />
              <div className="h-4 bg-gray-200 rounded-lg w-[87%]" />
            </div>
          </div>
        </motion.div>

        {/* NEXT BUTTON */}
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