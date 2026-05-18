import { useState } from "react"
import { motion } from "framer-motion"

import {
  SendHorizonal,
  Paperclip,
  Mic,
} from "lucide-react"

const ChatInput = () => {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (!message.trim()) return

    console.log(message)

    setMessage("")
  }

  return (
    <div
      className="
        flex
        items-end
        gap-4
      "
    >
      {/* ATTACH BUTTON */}
      <button
        className="
          p-4
          rounded-2xl
          bg-white/10
          hover:bg-white/20
          transition-all
          duration-300
        "
      >
        <Paperclip className="text-white w-5 h-5" />
      </button>

      {/* INPUT BOX */}
      <div
        className="
          flex-1
          flex
          items-end
          gap-3
          bg-white/10
          backdrop-blur-lg
          border
          border-white/10
          rounded-3xl
          px-5
          py-4
        "
      >
        <textarea
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything from your PDFs..."
          className="
            flex-1
            bg-transparent
            resize-none
            outline-none
            text-white
            placeholder:text-gray-400
            max-h-40
          "
        />

        {/* MIC */}
        <button
          className="
            p-2
            rounded-xl
            hover:bg-white/10
            transition-all
            duration-300
          "
        >
          <Mic className="text-gray-300 w-5 h-5" />
        </button>
      </div>

      {/* SEND BUTTON */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleSend}
        className="
          p-4
          rounded-2xl
          bg-gradient-to-r
          from-purple-500
          to-blue-500
          shadow-lg
          hover:scale-105
          transition-all
          duration-300
        "
      >
        <SendHorizonal className="text-white w-5 h-5" />
      </motion.button>
    </div>
  )
}

export default ChatInput