import { motion } from "framer-motion"

import {
  BookOpen,
  Download,
  Copy,
  Sparkles,
} from "lucide-react"

const RevisionNotes = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        relative
        overflow-hidden
        bg-white/10
        backdrop-blur-lg
        border
        border-white/10
        rounded-3xl
        p-8
        shadow-2xl
      "
    >
      {/* GLOW */}
      <div
        className="
          absolute
          -top-10
          -right-10
          w-40
          h-40
          rounded-full
          bg-yellow-500/20
          blur-3xl
        "
      />

      {/* HEADER */}
      <div className="relative z-10 flex items-start justify-between gap-6">
        
        <div className="flex items-center gap-4">
          
          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-gradient-to-r
              from-orange-500
              to-yellow-500
              flex
              items-center
              justify-center
              shadow-lg
            "
          >
            <BookOpen className="text-white w-8 h-8" />
          </div>

          <div>
            <h1 className="text-white text-3xl font-bold">
              Revision Notes
            </h1>

            <p className="text-gray-400 mt-2">
              AI-generated exam preparation notes
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
            bg-yellow-500/20
            text-yellow-300
            text-sm
            font-medium
          "
        >
          <Sparkles className="w-4 h-4" />

          Night Before Exam Mode
        </div>
      </div>

      {/* NOTES */}
      <div
        className="
          relative
          z-10
          mt-8
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-6
          space-y-6
        "
      >
        {/* TOPIC */}
        <div>
          <h2 className="text-white text-xl font-bold">
            1. Normalization
          </h2>

          <ul className="mt-3 space-y-2 text-gray-300 leading-relaxed">
            <li>• Reduces data redundancy</li>
            <li>• Improves data integrity</li>
            <li>• Uses normal forms like 1NF, 2NF, 3NF</li>
            <li>• Helps organize relational databases efficiently</li>
          </ul>
        </div>

        {/* TOPIC */}
        <div>
          <h2 className="text-white text-xl font-bold">
            2. Primary Key
          </h2>

          <ul className="mt-3 space-y-2 text-gray-300 leading-relaxed">
            <li>• Unique identifier for table records</li>
            <li>• Cannot contain NULL values</li>
            <li>• Ensures entity integrity</li>
          </ul>
        </div>

        {/* TOPIC */}
        <div>
          <h2 className="text-white text-xl font-bold">
            3. Foreign Key
          </h2>

          <ul className="mt-3 space-y-2 text-gray-300 leading-relaxed">
            <li>• Creates relationship between tables</li>
            <li>• References primary key of another table</li>
            <li>• Maintains referential integrity</li>
          </ul>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="relative z-10 flex items-center gap-4 mt-8">
        
        <button
          className="
            flex
            items-center
            gap-2
            px-6
            py-3
            rounded-2xl
            bg-gradient-to-r
            from-orange-500
            to-yellow-500
            text-white
            font-semibold
            hover:scale-105
            transition-all
            duration-300
            shadow-lg
          "
        >
          <Download className="w-5 h-5" />

          Export Notes
        </button>

        <button
          className="
            flex
            items-center
            gap-2
            px-6
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

export default RevisionNotes