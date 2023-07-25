import React, {useEffect, useState} from 'react';
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
import {InputResidenza} from "@/model/ResidenzaAnziani";
import {values} from "faunadb";
import {visit} from "yaml/dist/parse/cst-visit";
import itemAtPath = visit.itemAtPath;
import {urlObjectKeys} from "next/dist/shared/lib/router/utils/format-url";

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
        scale: {
            y: {}
        },
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
                        item.month === l && date.getMonth() === index ? {month: item.month, values: [...item.values, d1.capienzaAttuale]} : item
                    )
                    setValuesArray(updatedValuesArray.map(item =>
                        item.month === l && date.getMonth() === index ? {month: item.month, values: [...item.values, d1.capienzaAttuale]} : item
                    ))
                })
            })
        })
    }, [dati])

    useEffect(() => {
        valuesArray.forEach(va => {
            if(va.values.length > 0){
                setSumValue((old) => [...old, va.values.reduce((acc, currentValue) => acc+currentValue, 0)])
            }
        })
    }, [valuesArray])

    useEffect(() => {
        console.log(sumValue)
    }, [sumValue])




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
