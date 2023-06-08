import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    scale: {
        y: {
            ticks: {
                min: 0,
                max: 100,
                stepSize: 1,
            }
        }
    },
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'TREND SATURAZIONALE MENSILE IN PERCENTUALE - STRUTTURE',
        },
    },
};

const labels = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Anno corrente',
            data: labels.map(() => Math.random() * 100),
            borderColor: 'rgb(0,0,0)',
            backgroundColor: 'rgba(125,120,121,0.5)',
        },
        {
            label: 'Anno precedente',
            data: labels.map(() => Math.random() * 100),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
    ],
};

export function LineChartComponent() {
    return <Line options={options as any} data={data as any}/>;
}
