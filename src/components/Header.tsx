import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import { useAtom } from 'jotai';
import { authAtom } from '../store/authAtom';
import { LoginApi } from '../Api/Login';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [auth, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();

  // 메뉴가 열려 있을 때 외부 클릭 시 닫힘
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-menu')) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      await LoginApi.logout();
      setAuth({ isAuthenticated: false, user: null });
      alert('로그아웃 성공'); // ✅ 메시지 수정
      navigate('/login');
    } catch (error) {
      console.log('로그아웃 오류', error);
    }
  };

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50 h-14">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* ✅ 로고 */}
        <Link to="/" className="text-md font-semibold text-green-600">
          Diet Story
        </Link>

        {/* ✅ 검색창 개선 */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-1 rounded-full w-80 h-8">
          <Search className="text-gray-500 w-4 h-4 mr-2" />
          <input
            type="text"
            className="bg-transparent outline-none text-sm w-full"
            placeholder="검색어 입력..."
          />
        </div>

        {/* ✅ 모바일 프로필 버튼 */}
        <button
          className="p-1 profile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <User className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* ✅ 모바일 프로필 메뉴 */}
      {menuOpen && (
        <div className="bg-white shadow-md absolute right-5 mt-2 w-40 rounded-lg profile-menu">
          <nav className="flex flex-col items-center py-2">
            <ul>
              <li>
                <Link
                  to="/"
                  className="py-2 px-4 block text-gray-700 text-sm hover:bg-gray-100"
                >
                  홈
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="py-2 px-4 block text-gray-700 text-sm hover:bg-gray-100"
                >
                  프로필
                </Link>
              </li>
              <div className="border-t my-1"></div>
              {auth.isAuthenticated ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-red-500 py-2 px-4 text-sm hover:bg-gray-100"
                  >
                    로그아웃
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="block text-center text-sm text-green-600 py-2 px-4 hover:bg-gray-100"
                  >
                    로그인
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
