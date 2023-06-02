import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

import { Bar } from 'react-chartjs-2';


interface BarChartProps {
    data: number[];
    labels: string[];
}

const BarChart = ({ data, labels }: BarChartProps) => {

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Total Likes',
                data,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };



    return <Bar data={chartData} options={chartOptions} style={{ display: "revert" }} />;
};

export default BarChart;