import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useAtom } from 'jotai';
import { foodsAtom } from '../Detail/Atoms';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Food {
  name: string;
  protein: number;
  minerals: number;
  vitamins: number;
}

export default function Graph() {
  const [foods] = useAtom<Food[]>(foodsAtom);

  // 하루 영양소 합산 계산 (타입 명확하게 설정)
  const totalNutrients = foods.reduce<{
    protein: number;
    minerals: number;
    vitamins: number;
  }>(
    (acc, food) => {
      acc.protein += food.protein;
      acc.minerals += food.minerals;
      acc.vitamins += food.vitamins;
      return acc;
    },
    { protein: 0, minerals: 0, vitamins: 0 },
  );

  const isDataEmpty =
    totalNutrients.protein === 0 &&
    totalNutrients.minerals === 0 &&
    totalNutrients.vitamins === 0;

  const chartData = {
    labels: ['단백질', '미네랄', '비타민'],
    datasets: [
      {
        label: '하루 영양소 비율',
        data: isDataEmpty
          ? [1, 1, 1]
          : [
              totalNutrients.protein,
              totalNutrients.minerals,
              totalNutrients.vitamins,
            ],
        backgroundColor: ['#64B17C', '#FFBB28', '#FF8042'],
        borderColor: ['#4D8D64', '#D69F00', '#D66800'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-lg font-semibold mb-4">하루 영양소 비율</h3>
      <div className="relative h-64">
        {isDataEmpty ? (
          <p className="text-center text-gray-500">데이터가 없습니다.</p>
        ) : (
          <Pie data={chartData} options={options} />
        )}
      </div>
    </div>
  );
}
