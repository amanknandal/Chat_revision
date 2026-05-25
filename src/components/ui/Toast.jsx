import { motion,AnimatePresence } from "framer-motion"
import {
  CheckCircle2,
  AlertCircle,
  Info,
  X,
} from "lucide-react"

const Toast=({
  show,
  type="success",
  title,
  message,
  onClose,
})=>{
  const icons={
    success:CheckCircle2,
    error:AlertCircle,
    info:Info,
  }

  const styles={
    success:`
      border-green-400/20
      bg-green-500/10
    `,
    error:`
      border-red-400/20
      bg-red-500/10
    `,
    info:`
      border-blue-400/20
      bg-blue-500/10
    `,
  }

  const iconColors={
    success:"text-green-400",
    error:"text-red-400",
    info:"text-blue-400",
  }

  const Icon=icons[type]

  return(
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity:0,y:-30 }}
          animate={{ opacity:1,y:0 }}
          exit={{ opacity:0,y:-30 }}
          transition={{ duration:0.25 }}
          className="
            fixed
            top-6
            right-6
            z-50
            w-full
            max-w-md
          "
        >
          <div
            className={`
              flex
              items-start
              gap-4
              backdrop-blur-xl
              border
              rounded-3xl
              p-5
              shadow-2xl
              ${styles[type]}
            `}
          >
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-white/10
                flex
                items-center
                justify-center
              "
            >
              <Icon
                className={`
                  w-6
                  h-6
                  ${iconColors[type]}
                `}
              />
            </div>

            <div className="flex-1">
              <h3 className="text-white font-bold text-lg">
                {title}
              </h3>

              <p className="text-gray-300 mt-1 text-sm leading-relaxed">
                {message}
              </p>
            </div>

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
              <X className="text-gray-300 w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast