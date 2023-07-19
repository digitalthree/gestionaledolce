import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

export interface PieChartProps{
    labels: string[],
    values: number[],
    backgroundColor: string[],
    borderColor: string[],
}

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
    elements: {
        bar: {
            borderWidth: 2
        },
    },
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            display: false,
            position: 'bottom' as const,
            labels:{
                padding: 30
            }
        },
        title: {
            display: false,
            text: 'Chart.js Horizontal Bar Chart',
        },
    },
};



const PieChart: React.FC<PieChartProps> = (
    {
        labels, values, backgroundColor, borderColor
    }
) => {

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Numero Gare',
                data: values,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 2,
            },
        ],
    };

    return(
        <>
            <Pie data={data as any} options={options as any}/>
        </>
    )
}

export default PieChart