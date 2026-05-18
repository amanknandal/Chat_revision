import { motion, AnimatePresence } from "framer-motion"

import { X } from "lucide-react"

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/60
            backdrop-blur-sm
            p-4
          "
        >
          {/* MODAL */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="
              relative
              w-full
              max-w-2xl
              bg-[#0F172A]
              border
              border-white/10
              rounded-3xl
              shadow-2xl
              overflow-hidden
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
              <h2 className="text-white text-2xl font-bold">
                {title}
              </h2>

              <button
                onClick={onClose}
                className="
                  p-2
                  rounded-xl
                  hover:bg-white/10
                  transition-all
                  duration-300
                "
              >
                <X className="text-white w-5 h-5" />
              </button>
            </div>

            {/* BODY */}
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal