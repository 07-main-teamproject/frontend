import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProfilePage from './pages/ProfilePage';
import SignUpForm from './pages/Signup';
import MainPage from './pages/MainPage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="pt-16">
        <Header />
      </div>
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
      <MainPage />
      <Footer />
    </Router>
  );
}

export default App;
