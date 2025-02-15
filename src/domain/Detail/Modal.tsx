import { atom, useAtom } from 'jotai';
import { X } from 'lucide-react';

// 전역 상태
const isModalOpenAtom = atom(false);
const searchQueryAtom = atom('');
const foodOptions = ['고구마', '바나나', '두부', '연어', '오트밀'];

export default function Modal({
  addFood,
}: {
  addFood: (foodName: string) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);

  const filteredFoods = foodOptions.filter((food) =>
    food.includes(searchQuery),
  );

  //if (!isModalOpen) return null; // 모달이 닫혀 있으면 렌더링하지 않음

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">음식 검색</h2>
          <button onClick={() => setIsModalOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <p>어떤 식단을 추가할까요?</p>
        <input
          type="text"
          className="mt-4 p-2 border w-full rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="mt-4">
          {filteredFoods.map((food, index) => (
            <button
              key={index}
              className="block w-full text-left p-2 hover:bg-gray-100"
              onClick={() => addFood(food)}
            >
              {food}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
