import React, {useState} from 'react';
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
import {ImArrowDown, ImArrowUp} from "react-icons/im";
import {CgMathEqual} from "react-icons/cg";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    indexAxis: 'y' as const,
    elements: {
        bar: {
            borderWidth: 2
        },
    },
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: false,
            text: 'Chart.js Horizontal Bar Chart',
        },
    },
};




export function HorizontalBarChartComponente() {
    const labels = ['Struttura 1  provincia  servizio', 'Struttura 2  provincia  servizio', 'Struttura 3  provincia  servizio', 'Struttura 4  provincia  servizio', 'Struttura 5  provincia  servizio'];
    const [data1, setData1] = useState(labels.map(() => Math.random()*100))
    const [data2, setData2] = useState(labels.map(() => Math.random()*100))

    const data = {
        labels,
        datasets: [
            {
                label: 'Oggi',
                data: data1,
                borderColor: data1.map((d1, index) => {
                    if(d1 === data2[index]){
                        return '#0070B3'
                    }else if(d1 > data2[index]){
                        return '#6EA06D'
                    }else{
                        return '#A02828'
                    }
                }),
                backgroundColor: data1.map((d1, index) => {
                    if(d1 === data2[index]){
                        return '#0070B3'
                    }else if(d1 > data2[index]){
                        return '#6EA06D'
                    }else{
                        return '#A02828'
                    }
                }),
            },
            {
                label: 'Mese precedente',
                data: data2,
                borderColor: '#B5C5E7',
                backgroundColor: '#B5C5E7',
            },
        ],
    };

    return (
        <div className="flex flex-row justify-center h-[400px]">
            <Bar options={options as any} data={data as any} width={550}/>
            <div className="flex flex-col mt-9">
                {data1.map((d, index) => {
                    return(
                        <div key={d} className="mt-10 flex flex-row items-center">
                            <span className={`${d > data2[index] && 'text-[#6EA06D]'} ${d < data2[index] && 'text-[#A02828]'} ${d === data2[index] && 'text-[#B5C5E7]'} font-bold`}>{Math.round(d)}</span>
                            {d > data2[index] && <ImArrowUp  className="ml-2 text-[#6EA06D]"/>}
                            {d < data2[index] && <ImArrowDown  className="ml-2 text-[#A02828]"/>}
                            {d === data2[index] && <CgMathEqual className="ml-2 text-[#B5C5E7]"/>}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
