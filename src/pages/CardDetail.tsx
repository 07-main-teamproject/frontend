import { User } from 'lucide-react';
import { Link } from 'react-router-dom';

const user = {
  name: '김철수',
  age: 30,
  weight: 70,
  height: 175,
  allergy: '',
  preference: '',
};

export default function CardDetail() {
  return (
    <div>
      {/* <Link to="/" className="text-md font-semibold text-green-600">
        Diet Story
      </Link> */}
      <p>나의 식단관리</p>

      {/* {프로필 정보 기반으로 식단추천} */}

      <User className="w-16 h-16 rounded-full shadow-md" />
      <div>
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-600">
          {user.age}세 / {user.height}cm / {user.weight}kg
        </p>
      </div>
    </div>
  );
}
