import { useEffect, useState } from "react"
import { api } from "../../services/api"
import Navbar from "../layout/Navbar"
import Sidebar from "../layout/Sidebar"
import MobileSidebar from "../layout/MobileSidebar"
import WelcomeCard from "../dashboard/WelcomeCard"
import StatsCard from "../dashboard/StatsCard"
import FeatureGrid from "../dashboard/FeatureGrid"
import {
  FileText,
  Brain,
  MessageSquareText,
  Sparkles,
} from "lucide-react"

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [stats, setStats] = useState({
    pdfs: 0,
    chats: 0,
    flashcards: 0,
    insights: 0,
  })

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const { data } = await api.get("/dashboard/stats")
      setStats({
        pdfs: data.pdfs || 0,
        chats: data.chats || 0,
        flashcards: data.flashcards || 0,
        insights: data.insights || 0,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex bg-[#0B1120] min-h-screen">
      <Sidebar />

      <MobileSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex-1 min-w-0">
        <Navbar toggleSidebar={() => setIsSidebarOpen(true)} />

        <div className="p-4 md:p-6 space-y-8">
          <WelcomeCard />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatsCard
              title="PDFs Uploaded"
              value={stats.pdfs}
              icon={FileText}
              color="bg-purple-500"
              increase="12"
            />

            <StatsCard
              title="AI Chats"
              value={stats.chats}
              icon={MessageSquareText}
              color="bg-blue-500"
              increase="18"
            />

            <StatsCard
              title="Flashcards"
              value={stats.flashcards}
              icon={Brain}
              color="bg-pink-500"
              increase="22"
            />

            <StatsCard
              title="AI Insights"
              value={stats.insights}
              icon={Sparkles}
              color="bg-yellow-500"
              increase="9"
            />
          </div>

          <FeatureGrid />
        </div>
      </div>
    </div>
  )
}

export default Dashboard