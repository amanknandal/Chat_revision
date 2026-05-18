import { motion } from "framer-motion"

const Input = ({
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  label,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-gray-300 mb-2">
          {label}
        </label>
      )}

      {/* INPUT CONTAINER */}
      <motion.div
        whileFocus={{ scale: 1.01 }}
        className="
          flex
          items-center
          gap-3
          bg-white/10
          backdrop-blur-lg
          border
          border-white/10
          rounded-2xl
          px-4
          py-3
          focus-within:border-purple-400/40
          transition-all
          duration-300
        "
      >
        {Icon && (
          <Icon className="text-gray-400 w-5 h-5" />
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="
            w-full
            bg-transparent
            outline-none
            text-white
            placeholder:text-gray-400
          "
        />
      </motion.div>
    </div>
  )
}

export default Input