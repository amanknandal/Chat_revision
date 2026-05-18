import { useState } from "react"
import { motion } from "framer-motion"

import {
  GraduationCap,
  CheckCircle2,
  XCircle,
} from "lucide-react"

const QuizCard = () => {
  const [selected, setSelected] = useState(null)

  const options = [
    "Reducing data redundancy",
    "Increasing duplicate data",
    "Removing primary keys",
    "Creating random tables",
  ]

  const correctAnswer = 0

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
        max-w-3xl
        mx-auto
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
          bg-blue-500/20
          blur-3xl
        "
      />

      {/* HEADER */}
      <div className="relative z-10 flex items-center gap-4 mb-8">
        
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
          <GraduationCap className="text-white w-8 h-8" />
        </div>

        <div>
          <h2 className="text-white text-2xl font-bold">
            AI Quiz
          </h2>

          <p className="text-gray-400 mt-1">
            Question 1 of 10
          </p>
        </div>
      </div>

      {/* QUESTION */}
      <div className="relative z-10">
        <h3 className="text-white text-2xl font-semibold leading-relaxed">
          What is the primary purpose of normalization in DBMS?
        </h3>

        {/* OPTIONS */}
        <div className="space-y-4 mt-8">
          {options.map((option, index) => {
            const isCorrect = index === correctAnswer
            const isSelected = selected === index

            return (
              <button
                key={index}
                onClick={() => setSelected(index)}
                className={`
                  w-full
                  flex
                  items-center
                  justify-between
                  p-5
                  rounded-2xl
                  border
                  transition-all
                  duration-300
                  text-left

                  ${
                    isSelected
                      ? isCorrect
                        ? `
                          bg-green-500/20
                          border-green-400/40
                        `
                        : `
                          bg-red-500/20
                          border-red-400/40
                        `
                      : `
                          bg-white/5
                          border-white/10
                          hover:bg-white/10
                        `
                  }
                `}
              >
                <span className="text-white text-lg">
                  {option}
                </span>

                {isSelected &&
                  (isCorrect ? (
                    <CheckCircle2 className="text-green-400 w-6 h-6" />
                  ) : (
                    <XCircle className="text-red-400 w-6 h-6" />
                  ))}
              </button>
            )
          })}
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 flex items-center justify-between mt-10">
        
        <div
          className="
            px-4
            py-2
            rounded-2xl
            bg-purple-500/20
            text-purple-300
            text-sm
            font-medium
          "
        >
          Difficulty: Medium
        </div>

        <button
          className="
            px-6
            py-3
            rounded-2xl
            bg-gradient-to-r
            from-purple-500
            to-blue-500
            text-white
            font-semibold
            hover:scale-105
            transition-all
            duration-300
            shadow-lg
          "
        >
          Next Question
        </button>
      </div>
    </motion.div>
  )
}

export default QuizCard