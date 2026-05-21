import { useState } from "react"
import { motion } from "framer-motion"
import ChatMessage from "./ChatMessage"
import ChatInput from "./ChatInput"
import TypingLoader from "./TypingLoader"
const ChatBox = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Upload a PDF and start asking questions."
    }
  ])
  const [typing, setTyping] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        flex
        flex-col
        h-[85vh]
        bg-white/10
        backdrop-blur-lg
        border
        border-white/10
        rounded-3xl
        overflow-hidden
        shadow-2xl
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          px-6
          py-5
          border-b
          border-white/10
          bg-white/5
        "
      >
        <div>
          <h2 className="text-white text-2xl font-bold">
            AI PDF Chat
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Ask questions from your uploaded documents
          </p>
        </div>
        <div
          className="
            px-4
            py-2
            rounded-2xl
            bg-green-500/20
            text-green-400
            text-sm
            font-medium
          "
        >
          AI Online
        </div>
      </div>
      <div
        className="
          flex-1
          overflow-y-auto
          px-6
          py-6
          space-y-6
        "
      >
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
          />
        ))}
        {typing && <TypingLoader />}
      </div>
      <div className="p-5 border-t border-white/10 bg-white/5">
        <ChatInput
          messages={messages}
          setMessages={setMessages}
          setTyping={setTyping}
        />
      </div>
    </motion.div>
  )
}
export default ChatBox