import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import MealCard from '../components/MealCard';
import { dietListAtom, fetchDietsAtom, addDietAtom } from '../store/creatAtoms';

const MealList: React.FC = () => {
  const [diets] = useAtom(dietListAtom); // 전역 상태에서 식단 목록 가져오기
  const [, fetchDiets] = useAtom(fetchDietsAtom); // API 호출하여 목록 불러오기
  const [, addDiet] = useAtom(addDietAtom); // 새로운 식단 추가

  const [newDietName, setNewDietName] = useState('');

  useEffect(() => {
    fetchDiets(); // 컴포넌트가 마운트될 때 식단 목록 불러오기
  }, [fetchDiets]);

  const handleAddDiet = () => {
    if (!newDietName.trim()) return;

    addDiet({
      name: newDietName,
      date: new Date().toISOString().split('T')[0],
    });
    setNewDietName('');
  };

  return (
    <>
      <p className="flex items-center flex-col font-bold mt-10">
        오늘의 나의 식단
      </p>

      <div className="flex flex-col items-center mt-6">
        <input
          type="text"
          placeholder="새로운 식단 이름 입력"
          value={newDietName}
          onChange={(e) => setNewDietName(e.target.value)}
          className="p-2 border rounded-lg"
        />
        <button
          onClick={handleAddDiet}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          식단 추가
        </button>
      </div>

      <div className="flex justify-center gap-6 mt-10 flex-wrap">
        {diets.length > 0 ? (
          diets.map((diet) => (
            <MealCard
              key={diet.id}
              id={diet.id}
              title={diet.name}
              description={diet.date}
              buttonText="자세히 보기"
            />
          ))
        ) : (
          <p>식단을 불러오는 중...</p>
        )}
      </div>
    </>
  );
};

export default MealList;
