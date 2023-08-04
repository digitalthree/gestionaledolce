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
    const [valuesArray, setValuesArray] = useState<{ month: string, values: number[], struttura: string, capienzaComplessiva: number }[][]>([])
    const [sumValue, setSumValue] = useState<{ month: string, value: number, struttura: string, capienzaComplessiva: number }[]>([])
    const [percentuali, setPercentuali] = useState<{ month: string, value: number , capienzaComplessiva: number}[]>([])

    useEffect(() => {
        let updatedValuesArray: { month: string, values: number[], struttura: string, capienzaComplessiva: number }[][] = dati.map(d => {
            return labels.map(l => {
                return {month: l, values: [], struttura: d.struttura, capienzaComplessiva: 0}
            })
        })
        /*let updatedValuesArray: { month: string, values: number[] }[] = labels.map(l => {
            return {month: l, values: []}
        })*/
        updatedValuesArray.forEach(uv => console.log(uv.length))
        dati.forEach(d => {
            d.dati.forEach(d1 => {
                let dat = d1.data.split("/");
                let date = new Date(dat[2] + '/' + dat[1] + '/' + (parseInt(dat[0])).toLocaleString());
                labels.forEach((l, index) => {
                    updatedValuesArray = updatedValuesArray.map(item =>
                        item.map(it =>
                            it.month === l && date.getMonth() === index && it.struttura === d.struttura ? {month: it.month, values: [...it.values, d1.capienzaAttuale], struttura: d.struttura, capienzaComplessiva: d1.capienzaComplessiva} : it
                        )
                    )
                    setValuesArray(updatedValuesArray.map(item =>
                        item.map(it =>
                            it.month === l && date.getMonth() === index && it.struttura === d.struttura ? {month: it.month, values: [...it.values, d1.capienzaAttuale], struttura: d.struttura, capienzaComplessiva: d1.capienzaComplessiva} : it
                        )

                    ))
                })
            })
        })
    }, [dati])

    useEffect(() => {
        valuesArray.forEach(va => {
            va.forEach(v => {
                if(v.values.length > 0){
                    setSumValue((old) => [...old, {month: v.month, value: v.values.reduce((acc, currentValue) => acc+currentValue, 0)/v.values.length, struttura: v.struttura, capienzaComplessiva: v.capienzaComplessiva}])
                }
            })

        })
    }, [valuesArray])

    useEffect(() => {
        labels.forEach(l => {
            let capienzaComplessiva = sumValue.filter(sv => sv.month === l).map(v => v.capienzaComplessiva)[0]
            let valuesToSum: number[] = sumValue.filter(sv => sv.month === l).map(v => v.value)
            let sum = valuesToSum.reduce((a, b) => a+b,0)
            if(sum !== 0){
                setPercentuali((old) => [...old, {month: l, value: sum, capienzaComplessiva: capienzaComplessiva ? capienzaComplessiva : 0}])
            }

        })
    }, [sumValue])

    useEffect(() => {
        console.log(percentuali)
    }, [percentuali])


    const dataChart = {
        labels,
        datasets: [
            {
                label: 'Anno corrente',
                data: percentuali.map(p => {
                    return (p.value*100)/p.capienzaComplessiva
                }),
                borderColor: colorePrincipale,
                backgroundColor: colorePrincipale,
            }
        ],
    };

    return <Line options={options as any} data={dataChart as any}/>;
}

export default LineChartComponent
