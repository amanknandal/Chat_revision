import { motion } from "framer-motion"

import {
  FileText,
  CalendarDays,
  MoreVertical,
  Trash2,
  Eye,
  MessageSquare,
} from "lucide-react"

const PDFCard = ({ pdf }) => {
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
      {/* GLOW */}
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

      {/* TOP */}
      <div className="relative z-10 flex items-start justify-between">
        
        {/* ICON */}
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

        {/* MENU */}
        <button
          className="
            p-2
            rounded-xl
            hover:bg-white/10
            transition
          "
        >
          <MoreVertical className="text-white w-5 h-5" />
        </button>
      </div>

      {/* INFO */}
      <div className="relative z-10 mt-6">
        <h2 className="text-white text-xl font-bold line-clamp-1">
          {pdf.name}
        </h2>

        <div className="flex items-center gap-2 mt-3 text-gray-400 text-sm">
          <CalendarDays className="w-4 h-4" />

          <span>{pdf.date}</span>
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
            {pdf.size}
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

      {/* ACTIONS */}
      <div className="relative z-10 flex items-center gap-3 mt-8">
        
        <button
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