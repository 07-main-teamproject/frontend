import { User, Trash2, Plus, Calendar } from 'lucide-react';
import { atom, useAtom } from 'jotai';
import Modal from '../domain/Detail/Modal';
import Graph from '../domain/Detail/Graph';

// Jotai 전역 상태
const mealsAtom = atom({
  아침: [
    { name: '현미밥', protein: 10, minerals: 5, vitamins: 7 },
    { name: '닭가슴살 100g', protein: 25, minerals: 8, vitamins: 5 },
  ],
  점심: [{ name: '삶은 계란 2개', protein: 15, minerals: 7, vitamins: 6 }],
  저녁: [],
});

const isModalOpenAtom = atom(false);
const selectedMealAtom = atom<'아침' | '점심' | '저녁'>('아침');
const selectedDateAtom = atom(new Date().toISOString().split('T')[0]); // 기본값: 오늘 날짜

const CardDetail: React.FC = () => {
  const [meals, setMeals] = useAtom(mealsAtom);
  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
  const [selectedMeal, setSelectedMeal] = useAtom(selectedMealAtom);
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);

  // 음식 추가
  const addFood = (foodName: string) => {
    setMeals((prevMeals) => ({
      ...prevMeals,
      [selectedMeal]: [
        ...prevMeals[selectedMeal],
        { name: foodName, protein: 10, minerals: 5, vitamins: 5 },
      ],
    }));
    setIsModalOpen(false); // 음식 추가 후 모달 닫기
  };

  // 음식 삭제
  const removeFood = (mealType: '아침' | '점심' | '저녁', index: number) => {
    setMeals((prevMeals) => ({
      ...prevMeals,
      [mealType]: prevMeals[mealType].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="flex flex-col items-center p-6 bg-green-50 min-h-screen">
      {/* 프로필 + 날짜 선택 */}
      <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow-md w-full max-w-2xl">
        <div className="flex items-center gap-4">
          <User />
          <div>
            <h2 className="text-lg font-semibold">사용자 이름</h2>
            <p className="text-sm text-gray-500">목표 칼로리: 2000 kcal</p>
          </div>
        </div>

        {/* 날짜 선택 */}
        <div className="flex items-center gap-2 mt-4">
          <Calendar size={20} className="text-gray-600" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 border rounded-lg"
          />
        </div>
      </div>

      {/* 식단 리스트  */}
      <div className="mt-6 flex flex-col flex-wrap items-center gap-6 w-full max-w-2xl">
        {(['아침', '점심', '저녁'] as const).map((mealType) => (
          <div
            key={mealType}
            className="w-full p-6 bg-white rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold">{mealType} 식단</h3>
            {meals[mealType].length > 0 ? (
              meals[mealType].map((food, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>{food.name}</span>
                  <button
                    onClick={() => removeFood(mealType, index)}
                    className="text-red-500"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 mt-2">추가된 음식이 없습니다.</p>
            )}
            <button
              onClick={() => {
                setSelectedMeal(mealType);
                setIsModalOpen(true);
              }}
              className="mt-4 flex items-center gap-2 text-green-600"
            >
              <Plus size={20} /> 음식 추가
            </button>
          </div>
        ))}
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <Modal addFood={addFood} closeModal={() => setIsModalOpen(false)} />
      )}

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
