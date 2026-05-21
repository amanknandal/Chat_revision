import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { loginUser } from "../../services/api"
import { useNavigate } from "react-router-dom"
const LoginForm = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] =
    useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] =
    useState(false)
  const [error, setError] = useState("")
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const data = await loginUser({
        email,
        password
      })
      if (data.token) {
        localStorage.setItem(
          "token",
          data.token
        )
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        )
        navigate("/dashboard")
      } else {
        setError(
          data.error || "Login failed"
        )
      }
    } catch (err) {
      setError("Server error")
    }
    setLoading(false)
  }
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
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white">
          Welcome Back
        </h1>
        <p className="text-gray-400 mt-2">
          Login to continue learning
        </p>
      </div>
      <form
        className="space-y-5"
        onSubmit={handleLogin}
      >
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
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
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
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
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
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {showPassword ? (
                <EyeOff className="text-gray-400 w-5 h-5" />
              ) : (
                <Eye className="text-gray-400 w-5 h-5" />
              )}
            </button>

          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
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
          {loading
            ? "Logging in..."
            : "Login"}
        </button>
      </form>
    </motion.div>
  )
}
export default LoginForm