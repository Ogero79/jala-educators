

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import GetInvolved from './pages/GetInvolved';
import Admin from './pages/Admin';
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
  const location = useLocation();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (location.pathname === '/admin') {
    return (
      <Routes>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    );
  }

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
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;