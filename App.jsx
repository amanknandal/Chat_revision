import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./components/pages/Dashboard"
import Chat from "./components/pages/Chat"
import Upload from "./components/pages/Upload"
import PDFViewerPage from "./components/pages/PDFViewerPage"
import Login from "./components/pages/Login"
import Signup from "./components/pages/Signup"
import Flashcards from "./components/pages/Flashcards"
import RevisionNotes from "./components/pages/RevisionNotes"
import Settings from "./components/pages/Settings"

const App = () => {
  return (
    <BrowserRouter basename="/Chat_revision/">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/revision-notes" element={<RevisionNotes />} />
        <Route path="/pdf/:id" element={<PDFViewerPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App