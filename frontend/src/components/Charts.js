import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export const PieChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        data: data.map(item => item.totalAmount),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#8AC24A',
          '#F06292'
        ],
      }
    ]
  };

  return <Pie data={chartData} />;
};

export const BarChart = ({ data }) => {
  // Group by month for a more realistic bar chart
  // This is a simplified version - in a real app you would process the data properly
  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        label: 'Expenses by Category',
        data: data.map(item => item.totalAmount),
        backgroundColor: '#36A2EB',
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};