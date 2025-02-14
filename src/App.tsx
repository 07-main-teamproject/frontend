import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProfilePage from './pages/ProfilePage';
import SignUpForm from './pages/Signup';

function App() {
  return (
    <Router>
      <div className="pt-16">
        <Header />
      </div>
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </Router>
  );
}

export default App;
