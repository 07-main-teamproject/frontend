import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SignUpForm from './pages/Signup';
import LoginForm from './pages/Login';
import MainPage from './pages/MainPage';
import Header from './components/Header';
import { ProfilePage } from './pages/ProfilePage';
import CardDetail from './pages/CardDetail';
import { useAtom } from 'jotai';
import { authAtom } from './store/authAtom';
import { useEffect } from 'react';
import { localStorageKeys } from './Api/Login';

const App: React.FC = () => {
  const [auth, setAuth] = useAtom(authAtom);

  useEffect(() => {
    const accessToken = localStorage.getItem(localStorageKeys.access_token);
    if (accessToken) {
      setAuth({ isAuthenticated: true, user: auth.user });
    }
  }, []);

  return (
    <Router>
      <div className="pt-16">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/CardDetail/:id" element={<CardDetail />} />
        {auth.isAuthenticated ? (
          <Route path="/profile" element={<ProfilePage />} />
        ) : (
          <>
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
