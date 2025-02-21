import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Trash2, Plus, Calendar } from 'lucide-react';
import { getDietById, getDietByDate, deleteDiet } from '../Api/Diet';
import {
  addFoodToDiet,
  removeFoodFromDiet,
  updateFoodPortion,
} from '../Api/DietFood';
import Modal from '../domain/Detail/Modal';
import Graph from '../domain/Detail/Graph';

const CardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [diet, setDiet] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setSelectedMeal] = useState<'아침' | '점심' | '저녁'>('아침');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  // 식단 데이터 불러오기
  useEffect(() => {
    const fetchDiet = async () => {
      setIsLoading(true);
      try {
        let data;
        if (id) {
          data = await getDietById(id);
        } else {
          data = await getDietByDate(selectedDate);
        }
        setDiet(data);
      } catch (error) {
        console.error('식단 조회 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiet();
  }, [id, selectedDate]);

  // 영양소 데이터 계산
  const calculateNutrition = (foods: any[]) => {
    return foods.reduce(
      (acc, food) => ({
        calories: acc.calories + (food.food.calories || 0),
        carbs: acc.carbs + (food.food.carbs || 0),
        protein: acc.protein + (food.food.protein || 0),
        fat: acc.fat + (food.food.fat || 0),
      }),
      { calories: 0, carbs: 0, protein: 0, fat: 0 },
    );
  };

  // 음식 추가
  const addFood = async (foodId: string) => {
    if (!diet || !id) return;

    try {
      const response = await addFoodToDiet(id, {
        external_ids: [foodId],
        portion_size: 1,
        merge_quantity: true,
      });

      console.log('✅ API 응답 데이터:', response);

      if (!response || !response.added_foods) {
        return;
      }

      setDiet((prevDiet: any) => {
        if (!prevDiet || !prevDiet.diet_foods) {
          return { ...prevDiet, diet_foods: [response.added_foods] };
        }

        const updatedDiet = {
          ...prevDiet,
          diet_foods: [
            ...prevDiet.diet_foods,
            { food: response.added_foods, portion_size: 1 },
          ],
        };

        console.log('✅ 업데이트된 diet 상태:', updatedDiet);
        return updatedDiet;
      });
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data?.detail || '음식을 추가할 수 없습니다.');
      } else {
        alert('네트워크 오류 또는 서버 응답 없음');
      }
    }
  };

  // 음식 삭제
  const removeFood = async (foodId: string) => {
    if (!diet || !id) return;

    try {
      await removeFoodFromDiet(id, foodId);
      setDiet((prevDiet: any) => ({
        ...prevDiet,
        diet_foods: prevDiet.diet_foods.filter(
          (food: any) => food.food.id !== foodId,
        ),
      }));
    } catch (error) {
      console.error('음식 삭제 오류:', error);
    }
  };

  // 음식 양 수정
  const updateFoodAmount = async (foodId: string, newAmount: number) => {
    if (!diet || !id) return;

    try {
      await updateFoodPortion(id, foodId, newAmount);
      setDiet((prevDiet: any) => ({
        ...prevDiet,
        diet_foods: prevDiet.diet_foods.map((food: any) =>
          food.food.id === foodId ? { ...food, portion_size: newAmount } : food,
        ),
      }));
    } catch (error) {
      console.error('음식 양 수정 오류:', error);
    }
  };

  if (isLoading) return <p>불러오는 중...</p>;

  const nutritionData = diet ? calculateNutrition(diet.diet_foods) : null;

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
              diet.diet_foods.map((food: any) => (
                <div
                  key={food.food.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>{food.food.name}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={food.portion_size}
                      onChange={(e) =>
                        updateFoodAmount(food.food.id, Number(e.target.value))
                      }
                      className="w-16 p-1 border rounded-lg text-center"
                    />
                    <button
                      onClick={() => removeFood(food.food.id)}
                      className="text-red-500"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
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
      {nutritionData && <Graph data={nutritionData} />}

      {/* 삭제 버튼 */}
      <button
        onClick={async () => {
          if (!id) return;
          try {
            await deleteDiet(id);
            alert('식단이 삭제되었습니다.');
            navigate('/'); // ✅ 삭제 후 홈으로 이동
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
