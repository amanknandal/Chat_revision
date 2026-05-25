import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {Brain,RotateCcw,ChevronLeft,ChevronRight,Loader2,} from "lucide-react"
import axios from "axios"
const API_BASE_URL = import.meta.env.VITE_API_URL
const Flashcard = () => {
  const [flipped, setFlipped] = useState(false)
  const [flashcards, setFlashcards] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchFlashcards()
  }, [])
  const fetchFlashcards = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(
        `${API_BASE_URL}/flashcards`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setFlashcards(response.data.flashcards || [])
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }
  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setFlipped(false)
    }
  }
  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setFlipped(false)
    }
  }
  const currentCard = flashcards[currentIndex]
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader2 className="w-10 h-10 text-white animate-spin" />
      </div>
    )
  }
  if (!currentCard) {
    return (
      <div className="text-center text-white text-xl">
        No flashcards available
      </div>
    )
  }
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white">
            AI Flashcards
          </h2>
          <p className="text-gray-400 mt-2">
            Learn faster with smart revision cards
          </p>
        </div>
        <div
          className="
flex
items-center
gap-2
px-4
py-2
rounded-2xl
bg-purple-500/20
text-purple-300
text-sm
font-medium
"
        >
          <Brain className="w-4 h-4" />

          Card {currentIndex + 1} / {flashcards.length}
        </div>
      </div>

      <div
        className="relative h-[350px] perspective-1000"
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          className="
relative
w-full
h-full
cursor-pointer
preserve-3d
"
        >
          <div
            className="
absolute
inset-0
backface-hidden
bg-white/10
backdrop-blur-lg
border
border-white/10
rounded-3xl
p-10
shadow-2xl
flex
flex-col
justify-center
items-center
text-center
"
          >
            <div
              className="
w-20
h-20
rounded-3xl
bg-gradient-to-r
from-purple-500
to-blue-500
flex
items-center
justify-center
shadow-lg
mb-8
"
            >
              <Brain className="text-white w-10 h-10" />
            </div>
            <h2 className="text-white text-3xl font-bold">
              {currentCard.question}
            </h2>
            <p className="text-gray-400 mt-5 text-lg">
              Click to reveal the answer
            </p>
          </div>

          <div
            className="
absolute
inset-0
rotate-y-180
backface-hidden
bg-gradient-to-r
from-purple-500
to-blue-500
rounded-3xl
p-10
shadow-2xl
flex
flex-col
justify-center
items-center
text-center
"
          >
            <h2 className="text-white text-2xl font-bold">
              Answer
            </h2>
            <p className="text-white/90 mt-6 text-lg leading-relaxed">
              {currentCard.answer}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setFlipped(false)
              }}
              className="
mt-8
flex
items-center
gap-2
px-5
py-3
rounded-2xl
bg-white/20
hover:bg-white/30
transition-all
duration-300
text-white
font-medium
"
            >
              <RotateCcw className="w-5 h-5" />
              Flip Again
            </button>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-5 mt-8">
        <button
          onClick={prevCard}
          disabled={currentIndex === 0}
          className="
p-4
rounded-2xl
bg-white/10
hover:bg-white/20
transition-all
duration-300
disabled:opacity-40
"
        >
          <ChevronLeft className="text-white w-6 h-6" />
        </button>

        <button
          className="
px-6
py-3
rounded-2xl
bg-gradient-to-r
from-purple-500
to-blue-500
text-white
font-semibold
shadow-lg
"
        >
          Mark as Learned
        </button>

        <button
          onClick={nextCard}
          disabled={currentIndex === flashcards.length - 1}
          className="
p-4
rounded-2xl
bg-white/10
hover:bg-white/20
transition-all
duration-300
disabled:opacity-40
"
        >
          <ChevronRight className="text-white w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
export default Flashcard