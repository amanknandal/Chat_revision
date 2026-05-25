import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

import {
  Brain,
  FileText,
  MessageSquareText,
  Sparkles,
  ArrowRight,
} from "lucide-react"

const features = [
  {
    title: "AI Chat",
    description:
      "Chat with your PDFs and get instant AI-powered answers.",
    icon: MessageSquareText,
    gradient: "from-blue-500 to-cyan-500",
    route: "/chat",
  },

  {
    title: "PDF Upload",
    description:
      "Upload study material and let AI process your documents.",
    icon: FileText,
    gradient: "from-purple-500 to-pink-500",
    route: "/upload",
  },

  {
    title: "Flashcards",
    description:
      "Generate smart AI flashcards for fast revision.",
    icon: Brain,
    gradient: "from-pink-500 to-rose-500",
    route: "/flashcards",
  },

  {
    title: "Revision Notes",
    description:
      "Create exam-ready notes from your PDFs instantly.",
    icon: Sparkles,
    gradient: "from-orange-500 to-yellow-500",
    route: "/revision-notes",
  },
]

const FeatureGrid = () => {
  const navigate = useNavigate()

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Explore Features
          </h1>

          <p className="text-gray-400 mt-2">
            Powerful AI tools for smarter learning
          </p>
        </div>
      </div>

      {/* GRID */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        "
      >
        {features.map((feature, index) => {
          const Icon = feature.icon

          return (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              onClick={() => navigate(feature.route)}
              className="
                relative
                overflow-hidden
                cursor-pointer
                bg-white/10
                backdrop-blur-lg
                border
                border-white/10
                rounded-3xl
                p-7
                shadow-2xl
                hover:border-white/20
                transition-all
                duration-300
              "
            >
              {/* GLOW */}
              <div
                className={`
                  absolute
                  -top-10
                  -right-10
                  w-40
                  h-40
                  rounded-full
                  blur-3xl
                  bg-gradient-to-r
                  ${feature.gradient}
                  opacity-20
                `}
              />

              {/* CONTENT */}
              <div className="relative z-10">
                <div
                  className={`
                    w-16
                    h-16
                    rounded-2xl
                    bg-gradient-to-r
                    ${feature.gradient}
                    flex
                    items-center
                    justify-center
                    shadow-xl
                  `}
                >
                  <Icon className="text-white w-8 h-8" />
                </div>

                <h2 className="text-white text-2xl font-bold mt-6">
                  {feature.title}
                </h2>

                <p className="text-gray-400 mt-3 leading-relaxed">
                  {feature.description}
                </p>

                {/* BUTTON */}
                <button
                  className="
                    mt-6
                    flex
                    items-center
                    gap-2
                    text-white
                    font-semibold
                  "
                >
                  Explore Feature

                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default FeatureGrid