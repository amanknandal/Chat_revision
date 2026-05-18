import { motion } from "framer-motion"

const EmptyState = ({
  icon: Icon,
  title,
  description,
  buttonText,
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        flex
        flex-col
        items-center
        justify-center
        text-center
        py-20
        px-6
      "
    >
      {/* ICON */}
      <div
        className="
          w-28
          h-28
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
        {Icon && (
          <Icon className="text-white w-14 h-14" />
        )}
      </div>

      {/* TITLE */}
      <h2 className="text-white text-3xl font-bold mt-8">
        {title}
      </h2>

      {/* DESCRIPTION */}
      <p
        className="
          text-gray-400
          mt-4
          max-w-lg
          leading-relaxed
          text-lg
        "
      >
        {description}
      </p>

      {/* BUTTON */}
      {buttonText && (
        <button
          onClick={onClick}
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
            shadow-xl
          "
        >
          {buttonText}
        </button>
      )}
    </motion.div>
  )
}

export default EmptyState