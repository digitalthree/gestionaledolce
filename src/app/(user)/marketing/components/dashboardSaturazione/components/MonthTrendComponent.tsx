import React from 'react';
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

export interface MontTrendComponentProps{
    
}

const MontTrendComponent: React.FC<MontTrendComponentProps> = ({}) => {
    const options = {
        plugins: {},
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: false,
            },
        },
    };

    const labels = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

    const data  = {
        labels,
        datasets: [
            {
                label: 'Anno corrente',
                data: labels.map(() => Math.random()*100),
                backgroundColor: '#B5C5E7',
            },
            {
                label: 'Anno precedente',
                data: labels.map(() => Math.random()*100),
                backgroundColor: '#DAE2F3',
            }
        ],
    };
    return(
        <Bar options={options as any} data={data as any} />
    )
}

export default MontTrendComponent