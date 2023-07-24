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
                beginAtZero: true
            },
        },
    };

    const [allValue, setAllValue] = useState<{ data: string, capienzaAttuale: number }[]>([])
    const [capienza, setCapienza] = useState<Object>({} as Object)

    useEffect(() => {
        if (dati.length > 0) {
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


    let labels: string[] = (dati.length > 0) ? dati[0].dati.map(d => d.data) : []
    //labels = (labels.length > 0) && labels.reverse()
    /*if (labels.length > 0 && labels.length % 2 !== 0) {
        labels.pop()
    }*/

    const dataChart = {
        labels,
        datasets: [
            {
                label: 'Settimana corrente',
                data: labels.length > 0 && labels.map(l => {
                    let sum = 0
                    if(Object.values(capienza).length > 0){
                        (capienza[l as keyof typeof capienza] as unknown as number[]).forEach(c => {
                            sum = sum + c
                        })
                        return sum
                    }
                }),
                backgroundColor: colorePrincipale,
            },
            /*{
                label: 'Settimana precedente',
                data: labels.length > 0 && labels.map((l, index) => {
                    let mean = 0
                    if(Object.values(capienza).length > 0){
                        Object.values(capienza)[index+1].forEach(c => {
                            mean = mean + c
                        })
                        return mean/capienza[l].length
                    }
                    /!*let mean = 0
                    *!/
                }),
                backgroundColor: coloreSecondario,
            }*/
        ],
    };
    return (
        <Bar options={options as any} data={dataChart as any}/>
    )
}

export default MontTrendComponent