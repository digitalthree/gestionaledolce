import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {useGetResidenze} from "@/store/rtkqApi";
import {InputResidenza} from "@/model/ResidenzaAnziani";
import {
    calcoloCapienzaComplessiva
} from "@/app/(user)/marketing/components/dashboardSaturazione/components/BubbleComponent";
import {set} from "zod";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export interface MontTrendComponentProps {
    colorePrincipale: string,
    coloreSecondario: string,
    dati: InputResidenza[]
}

const MontTrendComponent: React.FC<MontTrendComponentProps> = ({colorePrincipale, coloreSecondario, dati}) => {

    const [data, setData] = useState<number[]>([])



    const [allValue, setAllValue] = useState<{ data: string, capienzaAttuale: number }[]>([])
    const [capienza, setCapienza] = useState<Object>({} as Object)
    const [labels, setLabels] = useState<string[]>([])

    useEffect(() => {
        if (dati.length > 0) {
            setAllValue([])
            setLabels(dati[0].dati.map(d => d.data).reverse())
            dati.forEach(d => {
                d.dati.forEach(d1 => {
                    setAllValue((old) => [...old, d1])
                })
            })
        }
    }, [dati])

    useEffect(() => {
        if (allValue.length > 0) {
            let result = allValue.reduce((acc, curr, currentIndex, array) => {
                    const key = curr.data;
                    if (acc[key as keyof typeof acc]) {
                        (acc[key as keyof typeof acc] as number[]).push(curr.capienzaAttuale);
                    } else {
                        (acc[key as keyof typeof acc] as number[]) = [curr.capienzaAttuale];
                    }
                    
                    return acc
                }
                , {});
            setCapienza(result)
        }
    }, [allValue])

    useEffect(() => {
        if(labels.length > 0){
            let sum:number = 0
            setData(labels.map(l => {
                if(Object.values(capienza).length > 0){
                    sum = 0;
                    (capienza[l as keyof typeof capienza] as unknown as number[]).forEach(c => {
                        sum = sum + c
                    })
                    return sum
                }
                sum = 0
            }) as number[])
        }

    }, [capienza])

    //labels = (labels.length > 0) && labels.reverse()
    /*if (labels.length > 0 && labels.length % 2 !== 0) {
        labels.pop()
    }*/

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
                beginAtZero: true,
            },
            y: {
                stacked: false,
                beginAtZero: false,
                min: Math.min(...data.map(d => d - 1)),
                max: Math.max(...data.map(d => d + 1)),
            },
        },
    };


    const dataChart = {
        labels,
        datasets: [
            {
                label: 'Posti Occupati',
                data: data,
                backgroundColor: colorePrincipale,
            },
        ],
    };
    return (
        <Bar options={options as any} data={dataChart as any}/>
    )
}

export default MontTrendComponent