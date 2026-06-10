import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import axios from "axios"
import { Mail, Lock, Loader2 } from "lucide-react"
import Input from "../ui/Input"
import Button from "../ui/Button"
const API_BASE_URL = import.meta.env.VITE_API_URL
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const handleLogin = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        {
          email,
          password,
        }
      )
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard")
    }
    catch (error) {
      setError(
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Login failed"
      )
    }
    finally {
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
          Welcome Back
        </h1>
        <p className="text-gray-400 text-center mt-2">
          Login to continue your AI learning journey
        </p>
        <div className="mt-8 space-y-5">
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <div className="text-red-400 text-sm text-center">
              {error}
            </div>
          )}
          <Button
            fullWidth
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </div>
        <p className="text-gray-400 text-center mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-400 cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
export default Login