import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import CardDetail from './pages/CardDetail';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="pt-16">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
      <MainPage />
      <Footer />
    </Router>
  );
};

export default App;
