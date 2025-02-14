import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD

import Header from './components/Header';

import MainPage from './pages/MainPage';
import CardDetail from './pages/CardDetail';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SignUpForm from './pages/Signup';

import ProfilePage from './pages/ProfilePage';
=======
import Header from './components/Header';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from './components/Footer';
import LoginForm from './pages/Login';
import ProfilePage from './pages/ProfilePage';
import MainPage from './pages/MainPage';
import SignUpForm from './pages/Signup';
>>>>>>> feature/login

function App() {
  return (
    <Router>
      <div className="pt-16">
        <Header />
<<<<<<< HEAD

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/CardDetail" element={<CardDetail />} />
        </Routes>
      </div>

      </div>
=======
      </div>
>>>>>>> feature/login
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUpForm />} />
<<<<<<< HEAD
      </Routes>

    </Router>
  );
};
=======
        <Route path="/login" element={<LoginForm />} />
      </Routes>
      <MainPage />
      <Footer />
    </Router>
  );
}
>>>>>>> feature/login

export default App;
