import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)

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
          Welcome Back
        </h1>

        <p className="text-gray-400 mt-2">
          Login to continue learning
        </p>
      </div>

      {/* FORM */}
      <form className="space-y-5">
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
              placeholder="Enter your password"
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

        {/* FORGOT PASSWORD */}
        <div className="flex justify-end">
          <button
            type="button"
            className="
              text-sm
              text-purple-400
              hover:text-purple-300
              transition
            "
          >
            Forgot Password?
          </button>
        </div>

        {/* LOGIN BUTTON */}
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
          Login
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

      {/* SIGNUP */}
      <p className="text-center text-gray-400 text-sm mt-6">
        Don’t have an account?{" "}
        <span className="text-purple-400 cursor-pointer hover:text-purple-300">
          Sign Up
        </span>
      </p>
    </motion.div>
  )
}

export default LoginForm