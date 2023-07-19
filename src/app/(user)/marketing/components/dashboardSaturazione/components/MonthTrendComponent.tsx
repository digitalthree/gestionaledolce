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

    const {data, error, isLoading} = useGetResidenze()
    let residenze: InputResidenza[] = []
    if(data){
        residenze = data
    }

    const options = {
        plugins: {
            legend: {
                display: false,
                position: 'bottom' as const,
            },
            title: {
                display: false,
                text: 'TREND SATURAZIONALE MENSILE IN PERCENTUALE - STRUTTURE',
            },
        },
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