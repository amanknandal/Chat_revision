import { motion } from "framer-motion"
import { UploadCloud, FileText } from "lucide-react"
import { useRef, useState } from "react"
import { uploadPDF } from "../../services/api"

const UploadBox = () => {
  const fileInputRef = useRef(null)
  const [fileName, setFileName] = useState("")
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")

  const handleFileChange = async (e) => {
    const file = e.target.files[0]

    if (!file) return

    setFileName(file.name)
    setUploading(true)
    setMessage("")

    try {
      const data = await uploadPDF(file)
      if (data.session_id) {
        localStorage.setItem("session_id", data.session_id)
        setMessage("PDF uploaded successfully. You can now chat with it.")
      } else {
        setMessage("Upload succeeded, but no session was returned.")
      }
    } catch (err) {
      setMessage(
        err?.response?.data?.error ||
        "Failed to upload PDF. Check your login and try again."
      )
    }
    setUploading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        relative
        overflow-hidden
        bg-white/10
        backdrop-blur-lg
        border
        border-dashed
        border-white/20
        rounded-3xl
        p-10
        text-center
        shadow-xl
      "
    >
      {/* GLOW */}
      <div
        className="
          absolute
          -top-10
          -right-10
          w-40
          h-40
          rounded-full
          bg-purple-500/20
          blur-3xl
        "
      />

      {/* CONTENT */}
      <div className="relative z-10">

        {/* ICON */}
        <div
          className="
            mx-auto
            w-24
            h-24
            rounded-3xl
            bg-gradient-to-r
            from-purple-500
            to-blue-500
            flex
            items-center
            justify-center
            shadow-2xl
          "
        >
          <UploadCloud className="text-white w-12 h-12" />
        </div>

        {/* TEXT */}
        <h2 className="text-white text-3xl font-bold mt-6">
          Upload Your PDF
        </h2>

        <p className="text-gray-400 mt-3 max-w-lg mx-auto">
          Drag and drop your study materials or click below
          to upload PDFs for AI-powered learning.
        </p>

        {/* BUTTON */}
        <button
          onClick={() => fileInputRef.current.click()}
          className="
            mt-8
            px-8
            py-4
            rounded-2xl
            bg-gradient-to-r
            from-purple-500
            to-blue-500
            text-white
            font-semibold
            hover:scale-105
            transition-all
            duration-300
            shadow-lg
          "
        >
          Choose PDF
        </button>

        {/* INPUT */}
        <input
          type="file"
          accept=".pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {uploading && (
          <p className="mt-4 text-sm text-blue-200">
            Uploading {fileName || "your PDF"}...
          </p>
        )}

        {message && (
          <p
            className={`mt-4 text-sm ${message.includes("Failed")
                ? "text-red-400"
                : "text-green-300"
              }`}
          >
            {message}
          </p>
        )}

        {/* FILE PREVIEW */}
        {fileName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
              mt-8
              flex
              items-center
              justify-center
              gap-4
              bg-white/10
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
              max-w-md
              mx-auto
            "
          >
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-gradient-to-r
                from-purple-500
                to-blue-500
                flex
                items-center
                justify-center
              "
            >
              <FileText className="text-white w-7 h-7" />
            </div>

            <div className="text-left">
              <h3 className="text-white font-semibold">
                {fileName}
              </h3>

              <p className="text-gray-400 text-sm">
                Ready for AI processing
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default UploadBox