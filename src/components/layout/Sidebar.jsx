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
import { NavLink,useNavigate } from "react-router-dom"

const menuItems=[
  {
    title:"Dashboard",
    icon:LayoutDashboard,
    path:"/",
  },
  {
    title:"My PDFs",
    icon:FileText,
    path:"/upload",
  },
  {
    title:"AI Chat",
    icon:MessageSquare,
    path:"/chat",
  },
  {
    title:"Flashcards",
    icon:Brain,
    path:"/flashcards",
  },
  {
    title:"Revision Notes",
    icon:BookOpen,
    path:"/revision-notes",
  },
]

const Sidebar=()=>{
  const navigate=useNavigate()

  const handleLogout=()=>{
    localStorage.removeItem("token")
    navigate("/login")
  }

  return(
    <motion.aside
      initial={{ x:-80,opacity:0 }}
      animate={{ x:0,opacity:1 }}
      transition={{ duration:0.4 }}
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
      <div>
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

        <div className="space-y-3">
          {menuItems.map((item,index)=>{
            const Icon=item.icon

            return(
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive })=>`
                  w-full
                  flex
                  items-center
                  gap-4
                  px-4
                  py-3
                  rounded-2xl
                  transition-all
                  duration-300
                  group
                  ${
                    isActive
                      ? `
                        bg-gradient-to-r
                        from-purple-500
                        to-blue-500
                        text-white
                      `
                      : `
                        text-gray-300
                        hover:text-white
                        hover:bg-white/10
                      `
                  }
                `}
              >
                <Icon className="w-5 h-5" />

                <span className="font-medium">
                  {item.title}
                </span>
              </NavLink>
            )
          })}
        </div>
      </div>

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
          onClick={handleLogout}
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