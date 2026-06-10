// import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Dashboard from "./components/pages/Dashboard"
// import Chat from "./components/pages/Chat"
// import Upload from "./components/pages/Upload"
// import PDFViewerPage from "./components/pages/PDFViewerPage"
// import Login from "./components/pages/Login"
// import Signup from "./components/pages/Signup"

// const App = () => {
//   return (
//     <BrowserRouter basename="/Chat_revision/">
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/chat" element={<Chat />} />
//         <Route path="/upload" element={<Upload />} />
//         <Route path="/pdf/:id" element={<PDFViewerPage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="*" element={<Dashboard />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "./components/pages/Dashboard"
import Chat from "./components/pages/Chat"
import Upload from "./components/pages/Upload"
import PDFViewerPage from "./components/pages/PDFViewerPage"
import Login from "./components/pages/Login"
import Signup from "./components/pages/Signup"

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token")
  return token ? children : <Navigate to="/login" replace />
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pdf-viewer"
          element={
            <ProtectedRoute>
              <PDFViewerPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App