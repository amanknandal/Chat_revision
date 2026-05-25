import { motion } from "framer-motion"

const Loader=()=>{
  return(
    <div className="flex items-center justify-center py-10">
      <div className="relative w-20 h-20">
        <motion.div
          animate={{ rotate:360 }}
          transition={{
            duration:2,
            repeat:Infinity,
            ease:"linear",
          }}
          className="
            absolute
            inset-0
            rounded-full
            border-4
            border-purple-500
            border-t-transparent
          "
        />

        <motion.div
          animate={{ rotate:-360 }}
          transition={{
            duration:1.5,
            repeat:Infinity,
            ease:"linear",
          }}
          className="
            absolute
            inset-3
            rounded-full
            border-4
            border-blue-500
            border-b-transparent
          "
        />

        <div
          className="
            absolute
            inset-[34%]
            rounded-full
            bg-white
            shadow-lg
          "
        />
      </div>
    </div>
  )
}

export default Loader