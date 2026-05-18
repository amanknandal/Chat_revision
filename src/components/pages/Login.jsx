import { useState } from "react"
import { motion } from "framer-motion"

import { Mail, Lock } from "lucide-react"
import Input from "../ui/Input"
import Button from "../ui/Button"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    console.log({ email, password })
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
        {/* TITLE */}
        <h1 className="text-white text-3xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-gray-400 text-center mt-2">
          Login to continue your AI learning journey
        </p>

        {/* FORM */}
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

          <Button fullWidth onClick={handleLogin}>
            Login
          </Button>
        </div>

        {/* FOOTER */}
        <p className="text-gray-400 text-center mt-6 text-sm">
          Don’t have an account?{" "}
          <span className="text-purple-400 cursor-pointer">
            Sign up
          </span>
        </p>
      </motion.div>
    </div>
  )
}

export default Login