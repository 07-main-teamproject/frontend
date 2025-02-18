import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User, Trash2, Plus, Calendar } from 'lucide-react';
import { getDietById, createDiet, deleteDiet } from '../Api/Diet';
import Modal from '../domain/Detail/Modal';
import Graph from '../domain/Detail/Graph';

const CardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [diet, setDiet] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setSelectedMeal] = useState<'아침' | '점심' | '저녁'>('아침');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  // 식단 데이터 불러오기
  useEffect(() => {
    if (!id) return;
    const fetchDiet = async () => {
      try {
        const data = await getDietById(id);
        setDiet(data);
      } catch (error) {
        console.error('식단 조회 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiet();
  }, [id]);

  // 음식 추가
  const addFood = async (foodName: string) => {
    if (!diet) return;

    const updatedDiet = {
      ...diet,
      diet_foods: [
        ...diet.diet_foods,
        { food: { name: foodName }, portion_size: 1 },
      ],
    };

    try {
      await createDiet(updatedDiet);
      setDiet(updatedDiet); // 상태 업데이트
    } catch (error) {
      console.error('음식 추가 오류:', error);
    }

    setIsModalOpen(false); // 모달 닫기
  };

  // 음식 삭제
  const removeFood = async (index: number) => {
    if (!diet) return;

    const updatedDiet = {
      ...diet,
      diet_foods: diet.diet_foods.filter((_: any, i: number) => i !== index),
    };

    try {
      await createDiet(updatedDiet); // API에 업데이트
      setDiet(updatedDiet);
    } catch (error) {
      console.error('음식 삭제 오류:', error);
    }
  };

  if (isLoading) return <p>불러오는 중...</p>;

  return (
    <div className="flex flex-col items-center p-6 bg-green-50 min-h-screen">
      {/* 프로필 + 날짜 선택 */}
      <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow-md w-full max-w-2xl">
        <div className="flex items-center gap-4">
          <User />
          <div>
            <h2 className="text-lg font-semibold">
              {diet?.user?.name || '사용자'}
            </h2>
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

      {/* 식단 리스트 */}
      <div className="mt-6 flex flex-col flex-wrap items-center gap-6 w-full max-w-2xl">
        {(['아침', '점심', '저녁'] as const).map((mealType) => (
          <div
            key={mealType}
            className="w-full p-6 bg-white rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold">{mealType} 식단</h3>
            {diet?.diet_foods.length > 0 ? (
              diet.diet_foods.map((food: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>{food.food.name}</span>
                  <button
                    onClick={() => removeFood(index)}
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

      {/* 삭제 버튼 */}
      <button
        onClick={async () => {
          if (!id) return;
          try {
            await deleteDiet(id);
            alert('식단이 삭제되었습니다.');
          } catch (error) {
            console.error('식단 삭제 오류:', error);
          }
        }}
        className="mt-6 bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-700"
      >
        삭제
      </button>
    </div>
  );
};

export default CardDetail;
