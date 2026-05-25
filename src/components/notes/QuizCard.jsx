import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {BookOpen,Download,Copy,Sparkles,Loader2,} from "lucide-react"
import axios from "axios"
const API_BASE_URL=import.meta.env.VITE_API_URL
const RevisionNotes=()=>{
const[notes,setNotes]=useState([])
const[loading,setLoading]=useState(true)
useEffect(()=>{
fetchNotes()
},[])
const fetchNotes=async()=>{
try{
const token=localStorage.getItem("token")
const response=await axios.get(
`${API_BASE_URL}/notes`,
{
headers:{
Authorization:`Bearer ${token}`,
},
}
)
setNotes(response.data.notes||[])
}
catch(error){
console.log(error)
}
finally{
setLoading(false)
}
}
const copyNotes=()=>{
const text=notes
.map((note,index)=>`${index+1}. ${note.title}\n${note.points.join("\n")}`)
.join("\n\n")
navigator.clipboard.writeText(text)
}
const exportNotes=()=>{
const text=notes
.map((note,index)=>`${index+1}. ${note.title}\n${note.points.join("\n")}`)
.join("\n\n")
const blob=new Blob([text],{type:"text/plain"})
const url=window.URL.createObjectURL(blob)
const link=document.createElement("a")
link.href=url
link.download="revision-notes.txt"
link.click()
}
if(loading){
return(
<div className="flex items-center justify-center h-[400px]">
<Loader2 className="w-10 h-10 text-white animate-spin"/>
</div>
)
}
return(
<motion.div
initial={{opacity:0,y:25}}
animate={{opacity:1,y:0}}
className="
relative
overflow-hidden
bg-white/10
backdrop-blur-lg
border
border-white/10
rounded-3xl
p-8
shadow-2xl
"
>
<div
className="
absolute
-top-10
-right-10
w-40
h-40
rounded-full
bg-yellow-500/20
blur-3xl
"
/>
<div className="relative z-10 flex items-start justify-between gap-6">
<div className="flex items-center gap-4">
<div
className="
w-16
h-16
rounded-2xl
bg-gradient-to-r
from-orange-500
to-yellow-500
flex
items-center
justify-center
shadow-lg
"
>
<BookOpen className="text-white w-8 h-8"/>
</div>
<div>
<h1 className="text-white text-3xl font-bold">
Revision Notes
</h1>
<p className="text-gray-400 mt-2">
AI-generated exam preparation notes
</p>
</div>
</div>
<div
className="
flex
items-center
gap-2
px-4
py-2
rounded-2xl
bg-yellow-500/20
text-yellow-300
text-sm
font-medium
"
>
<Sparkles className="w-4 h-4"/>
Night Before Exam Mode
</div>
</div>
<div
className="
relative
z-10
mt-8
bg-white/5
border
border-white/10
rounded-3xl
p-6
space-y-6
"
>
{notes.length===0?(
<div className="text-center text-gray-400">
No revision notes available
</div>
):(
notes.map((note,index)=>(
<div key={index}>
<h2 className="text-white text-xl font-bold">
{index+1}. {note.title}
</h2>
<ul className="mt-3 space-y-2 text-gray-300 leading-relaxed">
{note.points.map((point,pointIndex)=>(
<li key={pointIndex}>
• {point}
</li>
))}
</ul>
</div>
))
)}
</div>
<div className="relative z-10 flex items-center gap-4 mt-8">
<button
onClick={exportNotes}
className="
flex
items-center
gap-2
px-6
py-3
rounded-2xl
bg-gradient-to-r
from-orange-500
to-yellow-500
text-white
font-semibold
hover:scale-105
transition-all
duration-300
shadow-lg
"
>
<Download className="w-5 h-5"/>
Export Notes
</button>
<button
onClick={copyNotes}
className="
flex
items-center
gap-2
px-6
py-3
rounded-2xl
bg-white/10
border
border-white/10
text-white
hover:bg-white/20
transition-all
duration-300
"
>
<Copy className="w-5 h-5"/>
Copy
</button>
</div>
</motion.div>
)
}
export default RevisionNotes