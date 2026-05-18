import { useState } from "react"
import { motion } from "framer-motion"

import { Mail, Lock, User } from "lucide-react"
import Input from "../ui/Input"
import Button from "../ui/Button"

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = () => {
    console.log({ name, email, password })
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
          Create Account
        </h1>

        <p className="text-gray-400 text-center mt-2">
          Start your AI-powered learning journey
        </p>

        {/* FORM */}
        <div className="mt-8 space-y-5">
          
          <Input
            icon={User}
            label="Full Name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

          <Button fullWidth onClick={handleSignup}>
            Sign Up
          </Button>
        </div>

        {/* FOOTER */}
        <p className="text-gray-400 text-center mt-6 text-sm">
          Already have an account?{" "}
          <span className="text-purple-400 cursor-pointer">
            Login
          </span>
        </p>
      </motion.div>
    </div>
  )
}

export default Signup