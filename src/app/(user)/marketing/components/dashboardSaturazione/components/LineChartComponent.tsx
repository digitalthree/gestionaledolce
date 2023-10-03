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
import {it} from "node:test";

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
    const [valuesArray, setValuesArray] = useState<{ month: string, values: number[], struttura: string }[][]>([])
    const [sumValue, setSumValue] = useState<{ month: string, value: number, struttura: string}[]>([])
    const [percentuali, setPercentuali] = useState<{ month: string, value: number}[]>([])

    useEffect(() => {
        let updatedValuesArray: { month: string, values: number[], struttura: string}[][] = dati.map(d => {
            return labels.map(l => {
                return {month: l, values: [], struttura: d.struttura}
            })
        })
        dati.forEach(d => {
            d.dati.forEach(d1 => {
                let dat = d1.data.split("/");
                let date = new Date(dat[2] + '/' + dat[1] + '/' + (parseInt(dat[0])).toLocaleString());
                //setto tutti i valori percentuali per ogni struttura andando a raggrupparli per mese
                labels.forEach((l, index) => {
                    updatedValuesArray = updatedValuesArray.map(item =>
                        item.map(it =>
                            it.month === l && date.getMonth() === index && it.struttura === d.struttura && d1.onOff ? {month: it.month, values: [...it.values, d1.percentuale], struttura: d.struttura} : it
                        )
                    )
                    setValuesArray(updatedValuesArray.map(item =>
                        item.map(it =>
                            it.month === l && date.getMonth() === index && it.struttura === d.struttura && d1.onOff ? {month: it.month, values: [...it.values, d1.percentuale], struttura: d.struttura} : it
                        )

                    ))
                })
            })
        })
    }, [dati])

    useEffect(() => {
        //faccio la somma dei valori percentuali per ogni mese
        valuesArray.forEach(va => {
            va.forEach(v => {
                if(v.values.length > 0){
                    setSumValue((old) => [...old, {month: v.month, value: v.values.reduce((acc, currentValue) => acc+currentValue, 0)/v.values.length, struttura: v.struttura}])
                }
            })

        })
    }, [valuesArray])

    useEffect(() => {
        labels.forEach(l => {
            //let percentuale = sumValue.filter(sv => sv.month === l).map(v => v.value)[0]
            //console.log(l, percentuale)
            //ricavo la percentuale complessiva del singolo mese per ogni struttura
            let valuesToSum: number[] = sumValue.filter(sv => sv.month === l).map(v => v.value)
            let sum = valuesToSum.reduce((a, b) => a+b,0)

            if(sum !== 0) {
                setPercentuali((old) => [...old, {month: l, value: sum}])
            }
        })
    }, [sumValue])


    const dataChart = {
        labels,
        datasets: [
            {
                label: 'Anno corrente',
                data: percentuali.map(p => {
                    //ricavo la media dei valori percentuali dividendo per il numero di strutture
                    return (p.value)/dati.length
                }),
                borderColor: colorePrincipale,
                backgroundColor: colorePrincipale,
            }
        ],
    };

    return <Line options={options as any} data={dataChart as any}/>;
}

export default LineChartComponent
