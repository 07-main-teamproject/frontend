
import { User, Trash2, Plus, X } from 'lucide-react';
import { atom, useAtom } from 'jotai';
import Modal from '../domain/Detail/Modal';
import Graph from '../domain/Detail/Graph';

// Jotai 전역 상태
const mealTypeAtom = atom('아침');
const foodsAtom = atom([
  { name: '현미밥', protein: 10, minerals: 5, vitamins: 7 },
  { name: '닭가슴살 100g', protein: 25, minerals: 8, vitamins: 5 },
  { name: '삶은 계란 2개', protein: 15, minerals: 7, vitamins: 6 },
]);
const isModalOpenAtom = atom(false);
const searchQueryAtom = atom('');
const foodOptions = ['고구마', '바나나', '두부', '연어', '오트밀'];

const CardDetail: React.FC = () => {
  const [mealType, setMealType] = useAtom(mealTypeAtom);
  const [foods, setFoods] = useAtom(foodsAtom);
  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);

  const filteredFoods = foodOptions.filter((food) =>
    food.includes(searchQuery),
  );

  // 음식 추가
  const addFood = (foodName: string) => {
    setFoods([
      ...foods,
      { name: foodName, protein: 10, minerals: 5, vitamins: 5 },
    ]);
    setIsModalOpen(false);
    setSearchQuery('');
  };

  // 음식 삭제
  const removeFood = (index: number) => {
    setFoods(foods.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center p-6 bg-green-50 min-h-screen">
      {/* 프로필 */}
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md w-full max-w-2xl">
        <User />
        <div>
          <h2 className="text-lg font-semibold">사용자 이름</h2>
          <p className="text-sm text-gray-500">목표 칼로리: 2000 kcal</p>
        </div>
      </div>
      {/* 식단 선택 */}
      <div className="mt-6 p-6 bg-white rounded-lg shadow-md w-full max-w-2xl">
        <h3 className="text-lg font-semibold">식단 선택</h3>
        <select
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          className="mt-2 w-full p-2 border rounded"
        >
          <option value="아침">아침</option>
          <option value="점심">점심</option>
          <option value="저녁">저녁</option>
        </select>
      </div>
      {/* 음식 목록 */}
      <div className="mt-6 p-6 bg-white rounded-lg shadow-md w-full max-w-2xl">
        <h3 className="text-lg font-semibold">{mealType} 음식</h3>
        {foods.map((food, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b py-2"
          >
            <span>{food.name}</span>
            <button onClick={() => removeFood(index)} className="text-red-500">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 flex items-center gap-2 text-green-600"
        >
          <Plus size={20} /> 음식 추가
        </button>
      </div>
      {/* 모달 */}
      {isModalOpen && <Modal addFood={addFood} />}

      {/* 그래프 */}
      <Graph />

      {/* 저장 버튼 */}
      <button className="mt-6 bg-[#64B17C] text-white px-6 py-2 rounded-full hover:bg-green-700">
        저장
      </button>
    </div>
  );
};

export default CardDetail;
