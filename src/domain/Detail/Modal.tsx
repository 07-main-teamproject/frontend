import { X } from 'lucide-react';
import { atom, useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { searchFood } from '../../Api/Food';
import { Food } from '../../Api/types/getAllDiets';

const searchQueryAtom = atom('');

export default function Modal({
  addFood,
  closeModal,
}: {
  addFood: (food: Food) => void;
  closeModal: () => void;
}) {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [foodResults, setFoodResults] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchQuery.length < 3) {
      setFoodResults([]);
      return;
    }

    const fetchFoodResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await searchFood(searchQuery);
        setFoodResults(results);
      } catch (err) {
        setError('음식 검색 오류 발생!');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodResults();
  }, [searchQuery]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
        {/* 헤더 - 오른쪽 정렬된 X 버튼 */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">음식 검색</h2>
          <button onClick={closeModal}>
            <X size={20} />
          </button>
        </div>

        <p className="mb-4 text-center">음식 이름을 입력하세요.</p>

        {/* 검색 입력란 */}
        <input
          type="text"
          className="p-2 border w-full rounded"
          placeholder="예: 닭가슴살, 고구마"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {loading && (
          <p className="mt-2 text-gray-500 text-center">검색 중...</p>
        )}
        {error && <p className="mt-2 text-red-500 text-center">{error}</p>}

        {/* 음식 리스트 */}
        <div className="mt-4 grid gap-2">
          {foodResults.length > 0 ? (
            foodResults.map((food, index) => (
              <button
                key={index}
                className="flex items-center p-3 border rounded hover:bg-gray-100"
                onClick={() => {
                  console.log('음식 추가:', food);
                  addFood(food);
                  closeModal();
                }}
              >
                <div className="text-left">
                  <div className="font-bold">{food.name}</div>
                  <div className="text-xs text-gray-500">
                    <span>칼로리: {food.calories} kcal</span>
                    {food.carbs && <span> | 탄수화물: {food.carbs}g</span>}
                    {food.protein && <span> | 단백질: {food.protein}g</span>}
                    {food.fat && <span> | 지방: {food.fat}g</span>}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <p className="text-gray-500 text-center">검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
