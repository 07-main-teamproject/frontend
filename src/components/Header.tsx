import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User } from 'lucide-react';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  // const isLoggedIn: boolean = false; // TODO: 로그인 상태 API 연동 필요

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50 h-14">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* ✅ 로고 (폰트 크기 줄이기) */}
        <Link to="/" className="text-md font-semibold text-green-600">
          Diet Story
        </Link>

        {/* ✅ 검색창 크기 조정 */}
        <div className=" md:flex items-center  bg-gray-100 px-3 py-1 rounded-full w-80 h-8">
          <Search className="text-gray-500 w-4 h-4 " />
          <input type="text" />
        </div>

        {/* ✅ 모바일 프로필 버튼 (크기 줄이기) */}
        <button
          className="md:hidden p-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <User className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* ✅ 모바일 프로필 메뉴 */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col items-center py-2">
            <ul>
              <Link to="/" className="py-1 text-gray-700 text-sm">
                <li>홈</li>
              </Link>
              <Link
                to="/recommendations"
                className="py-1 text-gray-700 text-sm"
              >
                <li>추천식당</li>
              </Link>
              <Link to="/profile" className="py-1 text-gray-700 text-sm">
                <li> 프로필</li>
              </Link>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
