import { HashRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Approach from './pages/Approach'
import Results from './pages/Results'
import FAQ from './pages/FAQ'
import Quote from './pages/Quote'

export default function App() {
  return (
    <HashRouter>
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
