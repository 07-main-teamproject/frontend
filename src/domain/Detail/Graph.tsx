import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface NutritionData {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

const Graph: React.FC<{ data?: NutritionData }> = ({ data }) => {
  const defaultData: NutritionData = {
    calories: 0,
    carbs: 1,
    protein: 1,
    fat: 1,
  };
  const safeData = data || defaultData;

  console.log('Graph Data:', safeData);

  const chartData = {
    labels: ['탄수화물', '단백질', '지방'],
    datasets: [
      {
        label: '영양 구성',
        data: [safeData.carbs, safeData.protein, safeData.fat],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderColor: ['#D9534F', '#007BB5', '#E6B800'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-4 mt-6">
      <h3 className="text-lg font-semibold text-center">영양 구성</h3>
      <div className="relative h-64">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Graph;
