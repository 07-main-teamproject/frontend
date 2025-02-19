import { X } from 'lucide-react';
import { atom, useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { searchFood } from '../../Api/Food';
import { Food } from '../../Api/types/getAllDiets';
// Jotai 상태
const searchQueryAtom = atom('');

export default function Modal({
  addFood,
  closeModal,
}: {
  addFood: (foodName: string) => void;
  closeModal: () => void;
}) {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [foodResults, setFoodResults] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoodResults = async () => {
      if (searchQuery.length < 3) {
        setFoodResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const results = await searchFood(searchQuery);
        setFoodResults(results); // Food[] 배열로 설정
      } catch (err) {
        setError('음식 검색 오류 발생!');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodResults();
  }, [searchQuery]);
  const fallbackFoodOptions = ['고구마', '바나나', '두부', '연어', '오트밀'];
  const filteredFoods =
    foodResults.length > 0
      ? foodResults
      : fallbackFoodOptions.filter((food) => food.includes(searchQuery));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">음식 검색</h2>
          <button
            onClick={() => {
              closeModal();
              setSearchQuery('');
            }}
          >
            <X size={20} />
          </button>
        </div>
        <p>어떤 식단을 추가할까요?</p>

        {/* 검색창*/}
        <input
          type="text"
          className="mt-4 p-2 border w-full rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* 로딩 */}
        {loading && <p className="mt-2">검색 중...</p>}

        {/* 에러 */}
        {error && <p className="mt-2 text-red-500">{error}</p>}

        <div className="mt-4">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food, index) => {
              const foodName = typeof food === 'string' ? food : food.name; // string인지 객체인지 구분

              return (
                <button
                  key={index}
                  className="block w-full text-left p-2 hover:bg-gray-100"
                  onClick={() => {
                    if (foodName) {
                      addFood(foodName); // string만 전달
                      closeModal();
                      setSearchQuery('');
                    }
                  }}
                >
                  {foodName}
                </button>
              );
            })
          ) : (
            <p className="mt-2">검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
