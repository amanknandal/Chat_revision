import { Menu, Bell, Search } from "lucide-react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate()
  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {}
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    navigate("/login")
  }
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="
        w-full
        h-16
        px-6
        flex
        items-center
        justify-between
        bg-white/10
        backdrop-blur-lg
        border-b
        border-white/10
        sticky
        top-0
        z-50
      "
    >
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="
            lg:hidden
            p-2
            rounded-xl
            hover:bg-white/10
            transition
          "
        >
          <Menu className="text-white w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <div
            className="
              w-10
              h-10
              rounded-2xl
              bg-gradient-to-r
              from-purple-500
              to-blue-500
              flex
              items-center
              justify-center
              font-bold
              text-white
              text-lg
              shadow-lg
            "
          >
            AI
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">
              Study Assistant
            </h1>
            <p className="text-gray-400 text-xs">
              AI PDF Learning Platform
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex items-center w-[40%]">
        <div
          className="
            flex
            items-center
            w-full
            bg-white/10
            border
            border-white/10
            rounded-2xl
            px-4
            py-2
          "
        >
          <Search className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search PDFs, notes, quizzes..."
            className="
              bg-transparent
              outline-none
              text-white
              px-3
              w-full
              placeholder:text-gray-400
            "
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="
            relative
            p-2
            rounded-xl
            hover:bg-white/10
            transition
          "
        >
          <Bell className="text-white w-6 h-6" />

          <span
            className="
              absolute
              top-1
              right-1
              w-2
              h-2
              bg-red-500
              rounded-full
            "
          />
        </button>
        <div
          className="
            flex
            items-center
            gap-3
            bg-white/10
            border
            border-white/10
            px-3
            py-2
            rounded-2xl
          "
        >
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="
              w-10
              h-10
              rounded-full
              object-cover
            "
          />
          <div className="hidden sm:block">
            <h3 className="text-white text-sm font-semibold">
              {user.username || "Student"}
            </h3>
            <p className="text-gray-400 text-xs">
              Student
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="
            px-4
            py-2
            rounded-2xl
            bg-red-500/20
            text-red-400
            hover:bg-red-500/30
            transition-all
            duration-300
          "
        >
          Logout
        </button>
      </div>
    </motion.nav>
  )
}
export default Navbar