import { motion } from "framer-motion"
import { Bot } from "lucide-react"

const dotVariants = {
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
    },
  },
}

const TypingLoader = () => {
  return (
    <div className="flex items-start gap-4">
      
      {/* AVATAR */}
      <div
        className="
          w-12
          h-12
          rounded-2xl
          bg-gradient-to-r
          from-purple-500
          to-indigo-500
          flex
          items-center
          justify-center
          shadow-lg
        "
      >
        <Bot className="text-white w-6 h-6" />
      </div>

      {/* LOADER BOX */}
      <div
        className="
          px-5
          py-4
          rounded-3xl
          bg-white/10
          backdrop-blur-lg
          border
          border-white/10
          shadow-lg
        "
      >
        <div className="flex items-center gap-2">
          
          <motion.div
            variants={dotVariants}
            animate="animate"
            className="
              w-3
              h-3
              rounded-full
              bg-purple-400
            "
          />

          <motion.div
            variants={dotVariants}
            animate="animate"
            transition={{ delay: 0.2 }}
            className="
              w-3
              h-3
              rounded-full
              bg-blue-400
            "
          />

          <motion.div
            variants={dotVariants}
            animate="animate"
            transition={{ delay: 0.4 }}
            className="
              w-3
              h-3
              rounded-full
              bg-indigo-400
            "
          />
        </div>
      </div>
    </div>
  )
}

export default TypingLoader