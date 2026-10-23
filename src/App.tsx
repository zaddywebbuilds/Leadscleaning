import { useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Approach from './pages/Approach'
import Results from './pages/Results'
import FAQ from './pages/FAQ'
import Quote from './pages/Quote'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <HashRouter>
      <ScrollManager />
      <Nav />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/approach" element={<Approach />} />
          <Route path="/results" element={<Results />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/quote" element={<Quote />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  )
}
