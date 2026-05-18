import { motion } from "framer-motion"
import {
  FileText,
  MoreVertical,
  Clock3,
  Download,
} from "lucide-react"

const files = [
  {
    name: "DBMS Notes.pdf",
    size: "4.2 MB",
    time: "2 hours ago",
  },
  {
    name: "Operating System.pdf",
    size: "8.7 MB",
    time: "5 hours ago",
  },
  {
    name: "Computer Networks.pdf",
    size: "6.1 MB",
    time: "Yesterday",
  },
  {
    name: "AI Research Paper.pdf",
    size: "12.4 MB",
    time: "2 days ago",
  },
]

const RecentFiles = () => {
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
      {/* HEADER */}
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

      {/* FILE LIST */}
      <div className="space-y-4">
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
            {/* LEFT */}
            <div className="flex items-center gap-4">
              
              {/* ICON */}
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

              {/* INFO */}
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

            {/* RIGHT */}
            <div className="flex items-center gap-2">
              
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