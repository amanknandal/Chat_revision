import { motion } from "framer-motion"
import ChatMessage from "./ChatMessage"
import ChatInput from "./ChatInput"

const messages = [
  {
    id: 1,
    sender: "user",
    text: "Explain normalization in DBMS in simple words.",
  },
  {
    id: 2,
    sender: "ai",
    text: "Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity.",
    citation: {
      page: 24,
      source: "DBMS Complete Notes.pdf",
    },
  },
]

const ChatBox = () => {
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
      {/* HEADER */}
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

      {/* CHAT AREA */}
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
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      {/* INPUT */}
      <div className="p-5 border-t border-white/10 bg-white/5">
        <ChatInput />
      </div>
    </motion.div>
  )
}

export default ChatBox