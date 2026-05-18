import Navbar from "../layout/Navbar"
import Sidebar from "../layout/Sidebar"
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
  return (
    <div className="flex bg-[#0B1120] min-h-screen">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1">
        <Navbar />

        <div className="p-6 space-y-8">
          
          {/* WELCOME */}
          <WelcomeCard />

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatsCard
              title="PDFs Uploaded"
              value="24"
              icon={FileText}
              color="bg-purple-500"
              increase="12"
            />

            <StatsCard
              title="AI Chats"
              value="148"
              icon={MessageSquareText}
              color="bg-blue-500"
              increase="18"
            />

            <StatsCard
              title="Flashcards"
              value="320"
              icon={Brain}
              color="bg-pink-500"
              increase="22"
            />

            <StatsCard
              title="AI Insights"
              value="89"
              icon={Sparkles}
              color="bg-yellow-500"
              increase="9"
            />
          </div>

          {/* FEATURES */}
          <FeatureGrid />
        </div>
      </div>
    </div>
  )
}

export default Dashboard