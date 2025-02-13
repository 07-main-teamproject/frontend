import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const chartConfig = {
  data: {
    labels: ['January', 'February'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        tension: 0.1,
      },
    ],
  },
};

export default function Graph() {
  return (
    <div>
      {/* 차트 */}
      <div className="mt-6 flex gap-6"></div>
      <Pie {...chartConfig} />
    </div>
  );
}
