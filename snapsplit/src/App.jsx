import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import UploadPage from './pages/UploadPage'
import ReviewPage from './pages/ReviewPage'
import ParticipantPage from './pages/ParticipantPage'
import ResultPage from './pages/ResultPage'

function AnimatedRoutes() {
  const location = useLocation()
  const [display, setDisplay] = useState(location.pathname)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setVisible(false)
    const t = setTimeout(() => {
      setDisplay(location.pathname)
      setVisible(true)
    }, 150)
    return () => clearTimeout(t)
  }, [location.key])

  return (
    <div className={`transition-all duration-150 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
      <Routes location={{ ...location, pathname: display }}>
        <Route path="/" element={<UploadPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/participants" element={<ParticipantPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/result/:id" element={<ResultPage />} />
        <Route path="/result/:id" element={<ResultPage />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F7F8FA]">
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  )
}

export default App