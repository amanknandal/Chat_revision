import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, User, Phone } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import Input from "../ui/Input"
import Button from "../ui/Button"
import axios from "axios"
const Signup = () => {
  const navigate = useNavigate()
  const [username, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const handleSignup = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          username,
          phone,
          email,
          password,
        }
      )
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/")
    } catch (err) {
      setError(
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Signup failed"
      )
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1120] p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
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
        <h1 className="text-white text-3xl font-bold text-center">
          Create Account
        </h1>
        <p className="text-gray-400 text-center mt-2">
          Start your AI-powered learning journey
        </p>
        {error && (
          <div
            className="
              mt-6
              bg-red-500/20
              border
              border-red-500/30
              text-red-300
              px-4
              py-3
              rounded-2xl
              text-sm
            "
          >
            {error}
          </div>
        )}
        <div className="mt-8 space-y-5">
          <Input
            icon={User}
            label="Full Name"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={Phone}
            label="Phone Number"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            icon={Mail}
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            label="Password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </div>
        <p className="text-gray-400 text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-400 cursor-pointer"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
export default Signup