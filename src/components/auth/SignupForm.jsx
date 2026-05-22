import { useState } from "react"
import { motion } from "framer-motion"
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react"
import { signupUser } from "../../services/api"
import { useNavigate } from "react-router-dom"
const SignupForm = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] =
    useState(false)
  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false)
  const [username, setUsername] =
    useState("")
  const [email, setEmail] =
    useState("")
  const [password, setPassword] =
    useState("")
  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("")
  const [loading, setLoading] =
    useState(false)
  const [error, setError] =
    useState("")
  const handleSignup = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    setLoading(true)
    setError("")
    try {
      const data = await signupUser({
        username,
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
        navigate("/")
      } else {
        setError(
          data.error || "Signup failed"
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
          Create Account
        </h1>
        <p className="text-gray-400 mt-2">
          Start your AI learning journey
        </p>
      </div>
      <form
        className="space-y-5"
        onSubmit={handleSignup}
      >
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
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
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
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
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
            ? "Creating Account..."
            : "Create Account"}
        </button>
      </form>
      <p className="text-gray-400 text-center mt-4 text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-purple-400 hover:underline"
        >
          Login
        </button>
      </p>
    </motion.div>
  )
}
export default SignupForm