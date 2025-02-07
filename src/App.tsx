import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Signup from './pages/Signup';
import MainPage from './pages/MainPage';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <Router>
      <div className="pt-16">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
