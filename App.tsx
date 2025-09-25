

import React, { useState, useEffect } from 'react';
// FIX: Switched to named imports for react-router-dom to fix module resolution errors.
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import GetInvolved from './pages/GetInvolved';
import BookingModal from './components/BookingModal';

const useScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

const AppContent: React.FC = () => {
  useScrollToTop();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-background text-foreground font-sans">
      <Header onBookNowClick={openModal} />
      <main>
        <Routes>
          <Route path="/" element={<Home onBookNowClick={openModal} />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs onBookNowClick={openModal} />} />
          <Route path="/get-involved" element={<GetInvolved />} />
        </Routes>
      </main>
      <Footer />
      <BookingModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;