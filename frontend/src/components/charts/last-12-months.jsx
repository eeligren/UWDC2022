import {useState} from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
};

export default function Last12Months({last_12_months}) {
    if (!last_12_months || last_12_months.length === 0) {
        return <div>Loading...</div>;
    }

    const labels = last_12_months.map((month) => month[0]);
    const data = last_12_months.map((month) => month[1]);

    const _data = {
        labels,
        datasets: [
            {
                label: 'Last 12 months',
                data: data,
                backgroundColor: 'rgba(127, 122, 255, 0.5)',
            },
        ],
    };

    return (
        <div className={'bg-slate-700 p-4 rounded'}>
            <p className={'mb-4'}>12 months overview</p>
            <Bar options={options} data={_data} />
        </div>
    );
}
