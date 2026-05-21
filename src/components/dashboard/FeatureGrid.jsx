import { motion } from "framer-motion"
import {
  MessageSquareText,
  Brain,
  FileText,
  BookOpen,
  Sparkles,
  GraduationCap,
} from "lucide-react"
const features = [
  {
    title: "AI Chat",
    description:
      "Ask questions directly from your uploaded PDFs.",
    icon: MessageSquareText,
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    title: "Smart Summaries",
    description:
      "Generate concise notes and revision sheets instantly.",
    icon: FileText,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Flashcards",
    description:
      "Auto-create flashcards for better memory retention.",
    icon: Brain,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Quiz Generator",
    description:
      "Create MCQs and test your understanding quickly.",
    icon: GraduationCap,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Revision Notes",
    description:
      "Generate night-before-exam preparation notes.",
    icon: BookOpen,
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    title: "AI Insights",
    description:
      "Get topic analysis and important concepts instantly.",
    icon: Sparkles,
    gradient: "from-violet-500 to-fuchsia-500",
  },
]
const FeatureGrid = () => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">
          AI Features
        </h2>
        <p className="text-gray-400 mt-2">
          Supercharge your learning with AI-powered tools
        </p>
      </div>
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
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
                group
              "
            >
              <div
                className={`
                  absolute
                  -top-10
                  -right-10
                  w-40
                  h-40
                  rounded-full
                  blur-3xl
                  opacity-20
                  bg-gradient-to-r
                  ${feature.gradient}
                `}
              />
              <div
                className={`
                  relative
                  z-10
                  w-16
                  h-16
                  rounded-2xl
                  bg-gradient-to-r
                  ${feature.gradient}
                  flex
                  items-center
                  justify-center
                  shadow-lg
                `}
              >
                <Icon className="text-white w-8 h-8" />
              </div>
              <div className="relative z-10 mt-6">
                <h3 className="text-white text-xl font-bold">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mt-3 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <button
                className="
                  relative
                  z-10
                  mt-6
                  px-5
                  py-3
                  rounded-2xl
                  bg-white/10
                  text-white
                  font-medium
                  hover:bg-white/20
                  transition-all
                  duration-300
                "
              >
                Explore
              </button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
export default FeatureGrid