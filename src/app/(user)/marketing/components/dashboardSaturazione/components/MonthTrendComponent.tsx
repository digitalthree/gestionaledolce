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
import {useGetResidenze} from "@/store/rtkqApi";
import {InputResidenza} from "@/model/ResidenzaAnziani";
import {skipToken} from "@reduxjs/toolkit/query";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export interface MontTrendComponentProps{
    colorePrincipale: string
}

const MontTrendComponent: React.FC<MontTrendComponentProps> = ({colorePrincipale}) => {

    const {data, error, isLoading} = useGetResidenze(skipToken)
    let residenze: InputResidenza[] = []
    if(data){
        residenze = data
    }

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

    const dataChart  = {
        labels,
        datasets: [
            {
                label: 'Anno corrente',
                data: labels.map(() => Math.random()*100),
                backgroundColor: colorePrincipale,
            },
            {
                label: 'Anno precedente',
                data: labels.map(() => Math.random()*100),
                backgroundColor: '#DAE2F3',
            }
        ],
    };
    return(
        <Bar options={options as any} data={dataChart as any} />
    )
}

export default MontTrendComponent