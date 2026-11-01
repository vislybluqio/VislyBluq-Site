import React from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import FAQ from './pages/FAQ';
import Apply from './pages/Apply';
import IndustryDetail from './pages/IndustryDetail';
import FocusPage from './pages/FocusPage';
import ChatWidget from './components/chat/ChatWidget';

function App() {
  return (
    <Router>
      <div className="enterprise-bg min-h-screen text-white">
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/industries/:industryId" element={<IndustryDetail />} />
            <Route path="/focus/:slug" element={<FocusPage />} />
            {/* The projects pages were removed; keep old links and search results working. */}
            <Route path="/case-studies" element={<Navigate to="/services" replace />} />
            <Route path="/projects/*" element={<Navigate to="/services" replace />} />
            {/* The blog was removed; keep old links and search results working. */}
            <Route path="/blog" element={<Navigate to="/" replace />} />
            <Route path="/insights/*" element={<Navigate to="/" replace />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/apply" element={<Apply />} />
          </Routes>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </Router>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) setTimeout(() => element.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }), 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default App;


