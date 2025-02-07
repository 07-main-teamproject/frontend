import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#9ED7AF] text-gray-700 py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* ✅ 로고 및 사이트 이름 */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-lg font-bold">Diet Story</h2>
          <p className="text-sm text-gray-600">건강한 식단과 라이프스타일</p>
        </div>

        {/* ✅ 네비게이션 링크 */}
        <nav className="flex space-x-4 text-sm">
          <Link to="/" className="hover:text-green-400">
            홈
          </Link>
          <Link to="/about" className="hover:text-green-400">
            소개
          </Link>
          <Link to="/contact" className="hover:text-green-400">
            문의
          </Link>
          <Link to="/terms" className="hover:text-green-400">
            이용약관
          </Link>
        </nav>

        {/* ✅ 저작권 정보 */}
        <p className="text-xs text-gray-400 mt-4 md:mt-0 text-center md:text-right">
          © 2025 Diet Story. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
