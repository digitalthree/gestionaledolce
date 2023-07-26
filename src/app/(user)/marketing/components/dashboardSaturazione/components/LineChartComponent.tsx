import React, {useEffect, useState} from 'react';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {InputResidenza} from "@/model/ResidenzaAnziani";
import {visit} from "yaml/dist/parse/cst-visit";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export interface LineChartComponentsProps {
    colorePrincipale: string,
    coloreSecondario: string,
    dati: InputResidenza[]
}

const LineChartComponent: React.FC<LineChartComponentsProps> = ({colorePrincipale, coloreSecondario, dati}) => {

    const options = {
        responsive: true,
        scales: {
            y: {
                ticks: {
                    stepSize: 1,
                    callback: function(value:number, index:number, values:number[]) {
                        return value + " %";
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false,
                position: 'bottom' as const,
            },
            title: {
                display: false,
                text: 'TREND SATURAZIONALE MENSILE IN PERCENTUALE - STRUTTURE',
            }
        },
    };

    const labels = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
    const [valuesArray, setValuesArray] = useState<{ month: string, values: number[] }[]>(labels.map(l => {
        return {month: l, values: []}
    }))
    const [sumValue, setSumValue] = useState<number[]>([])

    useEffect(() => {
        let updatedValuesArray: { month: string, values: number[] }[] = labels.map(l => {
            return {month: l, values: []}
        })
        dati.forEach(d => {
            d.dati.forEach(d1 => {
                let dat = d1.data.split("/");
                let date = new Date(dat[2] + '/' + dat[1] + '/' + (parseInt(dat[0])).toLocaleString());
                labels.forEach((l, index) => {
                    updatedValuesArray = updatedValuesArray.map(item =>
                        item.month === l && date.getMonth() === index ? {month: item.month, values: [...item.values, (d1.capienzaAttuale*100)/d.capienza]} : item
                    )
                    setValuesArray(updatedValuesArray.map(item =>
                        item.month === l && date.getMonth() === index ? {month: item.month, values: [...item.values, (d1.capienzaAttuale*100)/d.capienza]} : item
                    ))
                })
            })
        })
    }, [dati])

    useEffect(() => {
        valuesArray.forEach(va => {
            if(va.values.length > 0){
                setSumValue((old) => [...old, va.values.reduce((acc, currentValue) => acc+currentValue, 0)/va.values.length])
            }
        })
    }, [valuesArray])


    const dataChart = {
        labels,
        datasets: [
            {
                label: 'Anno corrente',
                data: sumValue,
                borderColor: colorePrincipale,
                backgroundColor: colorePrincipale,
            }
        ],
    };

    return <Line options={options as any} data={dataChart as any}/>;
}

export default LineChartComponent
