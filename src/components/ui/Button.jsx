import { motion } from "framer-motion"

const Button=({
  children,
  icon:Icon,
  variant="primary",
  fullWidth=false,
  onClick,
  type="button",
  disabled=false,
  loading=false,
  className="",
})=>{
  const variants={
    primary:`
      bg-gradient-to-r
      from-purple-500
      to-blue-500
      text-white
      hover:scale-[1.02]
      shadow-lg
      disabled:opacity-50
      disabled:cursor-not-allowed
    `,
    secondary:`
      bg-white/10
      border
      border-white/10
      text-white
      hover:bg-white/20
      disabled:opacity-50
      disabled:cursor-not-allowed
    `,
    danger:`
      bg-red-500/20
      border
      border-red-400/20
      text-red-400
      hover:bg-red-500/30
      disabled:opacity-50
      disabled:cursor-not-allowed
    `,
  }

  return(
    <motion.button
      whileTap={!disabled ? { scale:0.96 } : {}}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        flex
        items-center
        justify-center
        gap-2
        px-6
        py-3
        rounded-2xl
        font-semibold
        transition-all
        duration-300
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {loading ? (
        <div
          className="
            w-5
            h-5
            border-2
            border-white/30
            border-t-white
            rounded-full
            animate-spin
          "
        />
      ) : (
        <>
          {Icon && <Icon className="w-5 h-5" />}
          {children}
        </>
      )}
    </motion.button>
  )
}
export default Button