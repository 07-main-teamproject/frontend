import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SignUpForm from './pages/Signup';
import LoginForm from './pages/Login';
import MainPage from './pages/MainPage';
import Header from './components/Header';
import { ProfilePage } from './pages/ProfilePage';

import MealCard from './components/MealCard';

const App: React.FC = () => {
  return (
    <Router>
      <div className="pt-16">
        <Header />
      </div>
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<MainPage />} />

        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
};

export default App;
