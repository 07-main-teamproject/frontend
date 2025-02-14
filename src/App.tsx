import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';

import CardDetail from './pages/CardDetail';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import LoginForm from './pages/Login';
import ProfilePage from './pages/ProfilePage';
import MainPage from './pages/MainPage';
import SignUpForm from './pages/Signup';

function App() {
  return (
    <Router>
      <div className="pt-16">
        <Header />
      </div>

      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/CardDetail" element={<CardDetail />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
