import React from 'react';


export interface VerticalBarChartProps{
    garePartecipate: number[],
    gareVinte: number[]
}

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
    maintainAspectRatio: true,
    plugins: {
        legend: {
            display: false,
            //position: 'bottom' as const,
        },
        title: {
            display: false,
            text: 'Chart.js Bar Chart',
        },
    },
};


const VerticalBarChart: React.FC<VerticalBarChartProps> = ({garePartecipate, gareVinte}) => {
    const labels = garePartecipate.map((g, index) => {
        return new Date().getFullYear()-index
    });
    const data = {
        labels,
        datasets: [
            {
                label: 'Gare Partecipate',
                data: garePartecipate,
                backgroundColor: '#B5C5E7',
            },
            {
                label: 'Gare Vinte',
                data: gareVinte,
                backgroundColor: '#0066cc',
            },
        ],
    };

    return(
        <>
            <Bar options={options} data={data as any} width={450}/>
        </>
    )
}

export default VerticalBarChart