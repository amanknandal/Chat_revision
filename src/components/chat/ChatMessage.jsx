import { motion } from "framer-motion"
import { Bot, User } from "lucide-react"
import CitationCard from "./CitationCard"

const ChatMessage = ({ message }) => {
  const isUser = message.sender === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        flex
        ${isUser ? "justify-end" : "justify-start"}
      `}
    >
      <div
        className={`
          flex
          gap-4
          max-w-3xl
          ${isUser ? "flex-row-reverse" : "flex-row"}
        `}
      >
        {/* AVATAR */}
        <div
          className={`
            w-12
            h-12
            rounded-2xl
            flex
            items-center
            justify-center
            shadow-lg
            ${
              isUser
                ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                : "bg-gradient-to-r from-purple-500 to-indigo-500"
            }
          `}
        >
          {isUser ? (
            <User className="text-white w-6 h-6" />
          ) : (
            <Bot className="text-white w-6 h-6" />
          )}
        </div>

        {/* MESSAGE */}
        <div>
          <div
            className={`
              px-5
              py-4
              rounded-3xl
              border
              shadow-lg
              ${
                isUser
                  ? `
                    bg-gradient-to-r
                    from-blue-500
                    to-cyan-500
                    border-blue-400/30
                    text-white
                  `
                  : `
                    bg-white/10
                    border-white/10
                    text-gray-200
                    backdrop-blur-lg
                  `
              }
            `}
          >
            <p className="leading-relaxed whitespace-pre-wrap">
              {message.text}
            </p>
          </div>

          {/* CITATION */}
          {!isUser && message.citation && (
            <div className="mt-3">
              <CitationCard citation={message.citation} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ChatMessage