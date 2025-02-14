import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';

import MainPage from './pages/MainPage';
import CardDetail from './pages/CardDetail';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SignUpForm from './pages/Signup';

import ProfilePage from './pages/ProfilePage';


const App: React.FC = () => {
  return (
    <Router>
      <div className="pt-16">
        <Header />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/CardDetail" element={<CardDetail />} />
        </Routes>
      </div>

      </div>
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>

    </Router>
  );
};

export default App;
