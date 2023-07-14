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
import {useGetResidenze} from "@/store/rtkqApi";
import {skipToken} from "@reduxjs/toolkit/query";
import {InputResidenza} from "@/model/ResidenzaAnziani";

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


export interface LineChartComponentsProps{
    colorePrincipale: string
}

const LineChartComponent: React.FC<LineChartComponentsProps> = ({colorePrincipale}) => {
    const dataChart = {
        labels,
        datasets: [
            {
                label: 'Anno corrente',
                data: labels.map(() => Math.random() * 100),
                borderColor: colorePrincipale,
                backgroundColor: colorePrincipale,
            },
            {
                label: 'Anno precedente',
                data: labels.map(() => Math.random() * 100),
                borderColor: '#DAE2F3',
                backgroundColor: '#DAE2F3',
            }
        ],
    };
    const {data, error, isLoading} = useGetResidenze(skipToken)
    let residenze: InputResidenza[] = []
    if(data){
        residenze = data
    }
    return <Line options={options as any} data={dataChart as any}/>;
}

export default LineChartComponent
