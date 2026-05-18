import { useState } from "react"
import { motion } from "framer-motion"

import {
  Moon,
  Sun,
} from "lucide-react"

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(true)

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => setDarkMode(!darkMode)}
      className="
        relative
        flex
        items-center
        w-20
        h-11
        px-1
        rounded-full
        bg-white/10
        border
        border-white/10
        backdrop-blur-lg
      "
    >
      {/* TOGGLE BALL */}
      <motion.div
        animate={{
          x: darkMode ? 36 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className="
          absolute
          w-9
          h-9
          rounded-full
          bg-gradient-to-r
          from-purple-500
          to-blue-500
          shadow-lg
        "
      />

      {/* ICONS */}
      <div className="relative z-10 flex items-center justify-between w-full px-1">
        
        <Sun className="text-yellow-300 w-5 h-5" />

        <Moon className="text-white w-5 h-5" />
      </div>
    </motion.button>
  )
}

export default ThemeToggle