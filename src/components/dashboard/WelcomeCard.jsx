import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

const WelcomeCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        bg-gradient-to-r
        from-purple-600
        via-blue-600
        to-indigo-700
        p-8
        shadow-2xl
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
          absolute
          -top-10
          -right-10
          w-40
          h-40
          bg-white/10
          rounded-full
          blur-3xl
        "
      />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        
        {/* LEFT */}
        <div>
          <div
            className="
              inline-flex
              items-center
              gap-2
              bg-white/10
              px-4
              py-2
              rounded-2xl
              mb-5
            "
          >
            <Sparkles className="w-5 h-5 text-yellow-300" />

            <span className="text-white text-sm font-medium">
              AI Powered Learning
            </span>
          </div>

          <h1
            className="
              text-3xl
              md:text-5xl
              font-bold
              text-white
              leading-tight
            "
          >
            Learn Faster <br />
            With AI Study Assistant
          </h1>

          <p
            className="
              text-white/80
              mt-5
              max-w-2xl
              text-base
              md:text-lg
              leading-relaxed
            "
          >
            Upload PDFs, generate smart notes, ask questions,
            create flashcards, and prepare for exams with AI.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <button
              className="
                px-6
                py-3
                rounded-2xl
                bg-white
                text-black
                font-semibold
                hover:scale-105
                transition-all
                duration-300
                shadow-lg
              "
            >
              Upload PDF
            </button>

            <button
              className="
                px-6
                py-3
                rounded-2xl
                border
                border-white/20
                bg-white/10
                text-white
                font-semibold
                hover:bg-white/20
                transition-all
                duration-300
              "
            >
              Explore Features
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div
          className="
            w-full
            lg:w-[320px]
            bg-white/10
            backdrop-blur-lg
            border
            border-white/10
            rounded-3xl
            p-6
          "
        >
          <h3 className="text-white text-xl font-bold mb-6">
            Today's Progress
          </h3>

          <div className="space-y-5">
            {/* ITEM */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 text-sm">
                  PDFs Studied
                </span>

                <span className="text-white font-semibold">
                  12
                </span>
              </div>

              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[70%] h-full bg-white rounded-full" />
              </div>
            </div>

            {/* ITEM */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 text-sm">
                  Quiz Accuracy
                </span>

                <span className="text-white font-semibold">
                  88%
                </span>
              </div>

              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[88%] h-full bg-green-400 rounded-full" />
              </div>
            </div>

            {/* ITEM */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 text-sm">
                  Revision Goal
                </span>

                <span className="text-white font-semibold">
                  60%
                </span>
              </div>

              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[60%] h-full bg-yellow-300 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default WelcomeCard