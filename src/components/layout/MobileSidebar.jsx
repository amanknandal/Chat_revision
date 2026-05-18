import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Brain,
  BookOpen,
  Settings,
  LogOut,
  X,
} from "lucide-react"

import { motion, AnimatePresence } from "framer-motion"

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

const MobileSidebar = ({ isOpen, setIsOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="
              fixed
              inset-0
              bg-black/50
              backdrop-blur-sm
              z-40
              lg:hidden
            "
          />

          {/* SIDEBAR */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="
              fixed
              top-0
              left-0
              w-72
              h-screen
              bg-[#111827]
              border-r
              border-white/10
              z-50
              p-6
              flex
              flex-col
              justify-between
              lg:hidden
            "
          >
            {/* TOP */}
            <div>
              {/* HEADER */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
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
                    "
                  >
                    AI
                  </div>

                  <div>
                    <h1 className="text-white text-lg font-bold">
                      Study Assistant
                    </h1>

                    <p className="text-gray-400 text-xs">
                      Smart Learning
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="
                    p-2
                    rounded-xl
                    hover:bg-white/10
                    transition
                  "
                >
                  <X className="text-white w-6 h-6" />
                </button>
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileSidebar