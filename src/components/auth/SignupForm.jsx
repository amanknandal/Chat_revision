import { useState } from "react"
import { motion } from "framer-motion"
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react"

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        w-full
        max-w-md
        bg-white/10
        backdrop-blur-lg
        border
        border-white/10
        rounded-3xl
        p-8
        shadow-2xl
      "
    >
      {/* HEADER */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white">
          Create Account
        </h1>

        <p className="text-gray-400 mt-2">
          Start your AI learning journey
        </p>
      </div>

      {/* FORM */}
      <form className="space-y-5">
        {/* NAME */}
        <div>
          <label className="text-sm text-gray-300 mb-2 block">
            Full Name
          </label>

          <div
            className="
              flex
              items-center
              bg-white/10
              border
              border-white/10
              rounded-2xl
              px-4
              py-3
            "
          >
            <User className="text-gray-400 w-5 h-5" />

            <input
              type="text"
              placeholder="Enter your full name"
              className="
                bg-transparent
                outline-none
                text-white
                w-full
                px-3
                placeholder:text-gray-400
              "
            />
          </div>
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm text-gray-300 mb-2 block">
            Email
          </label>

          <div
            className="
              flex
              items-center
              bg-white/10
              border
              border-white/10
              rounded-2xl
              px-4
              py-3
            "
          >
            <Mail className="text-gray-400 w-5 h-5" />

            <input
              type="email"
              placeholder="Enter your email"
              className="
                bg-transparent
                outline-none
                text-white
                w-full
                px-3
                placeholder:text-gray-400
              "
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm text-gray-300 mb-2 block">
            Password
          </label>

          <div
            className="
              flex
              items-center
              bg-white/10
              border
              border-white/10
              rounded-2xl
              px-4
              py-3
            "
          >
            <Lock className="text-gray-400 w-5 h-5" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              className="
                bg-transparent
                outline-none
                text-white
                w-full
                px-3
                placeholder:text-gray-400
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="text-gray-400 w-5 h-5" />
              ) : (
                <Eye className="text-gray-400 w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="text-sm text-gray-300 mb-2 block">
            Confirm Password
          </label>

          <div
            className="
              flex
              items-center
              bg-white/10
              border
              border-white/10
              rounded-2xl
              px-4
              py-3
            "
          >
            <Lock className="text-gray-400 w-5 h-5" />

            <input
              type={
                showConfirmPassword ? "text" : "password"
              }
              placeholder="Confirm password"
              className="
                bg-transparent
                outline-none
                text-white
                w-full
                px-3
                placeholder:text-gray-400
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="text-gray-400 w-5 h-5" />
              ) : (
                <Eye className="text-gray-400 w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* SIGNUP BUTTON */}
        <button
          type="submit"
          className="
            w-full
            py-3
            rounded-2xl
            bg-gradient-to-r
            from-purple-500
            to-blue-500
            text-white
            font-semibold
            hover:scale-[1.02]
            transition-all
            duration-300
            shadow-lg
          "
        >
          Create Account
        </button>
      </form>

      {/* DIVIDER */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-white/10" />

        <span className="text-gray-400 text-sm">
          OR
        </span>

        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* GOOGLE BUTTON */}
      <button
        className="
          w-full
          py-3
          rounded-2xl
          bg-white/10
          border
          border-white/10
          text-white
          font-medium
          hover:bg-white/20
          transition-all
          duration-300
        "
      >
        Continue with Google
      </button>

      {/* LOGIN */}
      <p className="text-center text-gray-400 text-sm mt-6">
        Already have an account?{" "}
        <span className="text-purple-400 cursor-pointer hover:text-purple-300">
          Login
        </span>
      </p>
    </motion.div>
  )
}

export default SignupForm