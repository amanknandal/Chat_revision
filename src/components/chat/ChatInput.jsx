import { useRef, useState } from "react"
import { motion } from "framer-motion"
import {
  SendHorizonal,
  Paperclip,
  Mic,
} from "lucide-react"

import {
  uploadPDF,
  askQuestion,
} from "../../services/api"

const ChatInput = ({
  messages,
  setMessages,
  setTyping,
}) => {

  const [message, setMessage] =
    useState("")

  const [uploading, setUploading] =
    useState(false)

  const fileInputRef = useRef(null)

  const handleUploadClick = () => {

    fileInputRef.current.click()
  }

  const handleFileUpload = async (e) => {

    const file = e.target.files[0]

    if (!file) return

    setUploading(true)

    try {

      const data = await uploadPDF(file)

      if (data.session_id) {

        localStorage.setItem(
          "session_id",
          data.session_id
        )

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: "ai",
            text: `${file.name} uploaded successfully.`
          }
        ])
      }

    } catch (err) {

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "ai",
          text: "PDF upload failed."
        }
      ])
    }

    setUploading(false)
  }

  const handleSend = async () => {

    if (!message.trim()) return

    const sessionId =
      localStorage.getItem("session_id")

    if (!sessionId) {

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "ai",
          text: "Please upload a PDF first."
        }
      ])

      return
    }

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: message
    }

    setMessages((prev) => [
      ...prev,
      userMessage
    ])

    const currentQuestion = message

    setMessage("")

    setTyping(true)

    try {

      const data = await askQuestion(
        currentQuestion,
        sessionId
      )

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text:
            data.answer ||
            "No answer found.",
          citation: data.citation
        }
      ])

    } catch (err) {

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "AI request failed."
        }
      ])
    }

    setTyping(false)
  }

  return (
    <div
      className="
        flex
        items-end
        gap-4
      "
    >

      <input
        type="file"
        accept=".pdf"
        hidden
        ref={fileInputRef}
        onChange={handleFileUpload}
      />

      <button
        onClick={handleUploadClick}
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
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder={
            uploading
              ? "Uploading PDF..."
              : "Ask anything from your PDFs..."
          }
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