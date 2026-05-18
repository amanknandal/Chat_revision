import { motion } from "framer-motion"

const StatsCard = ({
  title,
  value,
  icon: Icon,
  color,
  increase,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="
        relative
        overflow-hidden
        bg-white/10
        backdrop-blur-lg
        border
        border-white/10
        rounded-3xl
        p-6
        shadow-xl
      "
    >
      {/* GLOW */}
      <div
        className={`
          absolute
          -top-10
          -right-10
          w-32
          h-32
          rounded-full
          blur-3xl
          opacity-20
          ${color}
        `}
      />

      {/* CONTENT */}
      <div className="relative z-10">
        
        {/* TOP */}
        <div className="flex items-center justify-between">
          <div
            className={`
              w-14
              h-14
              rounded-2xl
              flex
              items-center
              justify-center
              ${color}
            `}
          >
            <Icon className="text-white w-7 h-7" />
          </div>

          <span
            className="
              px-3
              py-1
              rounded-xl
              bg-green-500/20
              text-green-400
              text-sm
              font-medium
            "
          >
            +{increase}%
          </span>
        </div>

        {/* TEXT */}
        <div className="mt-6">
          <h3 className="text-gray-400 text-sm font-medium">
            {title}
          </h3>

          <h1 className="text-white text-4xl font-bold mt-2">
            {value}
          </h1>
        </div>
      </div>
    </motion.div>
  )
}

export default StatsCard