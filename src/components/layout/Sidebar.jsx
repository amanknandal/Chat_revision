import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Brain,
  BookOpen,
  Settings,
  LogOut,
} from "lucide-react"

import { motion } from "framer-motion"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My PDFs",
    icon: FileText,
  },
  {
    title: "AI Chat",
    icon: MessageSquare,
  },
  {
    title: "Flashcards",
    icon: Brain,
  },
  {
    title: "Revision Notes",
    icon: BookOpen,
  },
]

const Sidebar = () => {
  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="
        hidden
        lg:flex
        flex-col
        justify-between
        w-72
        min-h-screen
        bg-white/10
        backdrop-blur-lg
        border-r
        border-white/10
        p-6
      "
    >
      {/* TOP */}
      <div>
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-10">
          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-gradient-to-r
              from-purple-500
              to-blue-500
              flex
              items-center
              justify-center
              text-white
              font-bold
              text-xl
              shadow-lg
            "
          >
            AI
          </div>

          <div>
            <h1 className="text-white text-lg font-bold">
              Study Assistant
            </h1>

            <p className="text-gray-400 text-xs">
              Smart Learning Platform
            </p>
          </div>
        </div>

        {/* MENU */}
        <div className="space-y-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon

            return (
              <button
                key={index}
                className="
                  w-full
                  flex
                  items-center
                  gap-4
                  px-4
                  py-3
                  rounded-2xl
                  text-gray-300
                  hover:text-white
                  hover:bg-white/10
                  transition-all
                  duration-300
                  group
                "
              >
                <Icon className="w-5 h-5" />

                <span className="font-medium">
                  {item.title}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="space-y-3">
        <button
          className="
            w-full
            flex
            items-center
            gap-4
            px-4
            py-3
            rounded-2xl
            text-gray-300
            hover:text-white
            hover:bg-white/10
            transition-all
            duration-300
          "
        >
          <Settings className="w-5 h-5" />

          <span className="font-medium">
            Settings
          </span>
        </button>

        <button
          className="
            w-full
            flex
            items-center
            gap-4
            px-4
            py-3
            rounded-2xl
            text-red-400
            hover:bg-red-500/10
            transition-all
            duration-300
          "
        >
          <LogOut className="w-5 h-5" />

          <span className="font-medium">
            Logout
          </span>
        </button>
      </div>
    </motion.aside>
  )
}

export default Sidebar