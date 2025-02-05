import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MainPage from './pages/MainPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="pt-16">
        <Header />
        <Routes></Routes>
      </div>
      <MainPage />
    </Router>
  );
};

export default App;
