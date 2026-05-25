import { Search,X } from "lucide-react"
import { motion } from "framer-motion"

const SearchBar=({
  value,
  onChange,
  placeholder="Search...",
  onClear,
})=>{
  return(
    <motion.div
      initial={{ opacity:0,y:15 }}
      animate={{ opacity:1,y:0 }}
      className="
        flex
        items-center
        gap-3
        w-full
        bg-white/10
        backdrop-blur-lg
        border
        border-white/10
        rounded-2xl
        px-5
        py-4
        focus-within:border-purple-400/40
        transition-all
        duration-300
      "
    >
      <Search className="text-gray-400 w-5 h-5" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          flex-1
          bg-transparent
          outline-none
          text-white
          placeholder:text-gray-400
        "
      />

      {value && (
        <button
          onClick={onClear}
          className="
            p-1
            rounded-lg
            hover:bg-white/10
            transition-all
            duration-300
          "
        >
          <X className="text-gray-400 w-4 h-4" />
        </button>
      )}
    </motion.div>
  )
}

export default SearchBar