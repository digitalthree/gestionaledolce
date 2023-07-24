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
import { Bar } from 'react-chartjs-2';
import {ImArrowDown, ImArrowUp} from "react-icons/im";
import {CgMathEqual} from "react-icons/cg";
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
            display: false,
            position: 'top' as const,
            labels: {
                filter: function (item:any, chart:any){
                    return !item.text.includes("Dato Attuale")
                }
            }
        },
        title: {
            display: false,
            text: 'Chart.js Horizontal Bar Chart',
        },
    },
};


export interface HorizontalBarChartComponenteProps{
    colorePrincipale: string,
    coloreSecondario: string,
    dati: InputResidenza[]
}

const HorizontalBarChartComponente:React.FC<HorizontalBarChartComponenteProps> = ({colorePrincipale, coloreSecondario, dati}) => {
    const [labels, setLabels] = useState<string[]>([])
    const [data1, setData1] = useState<number[]>([])
    const [data2, setData2] = useState<number[]>([])
    const [data3, setData3] = useState<number[]>([])

    useEffect(() => {
        console.log(dati)
        if(dati && dati.length > 0){
            dati.forEach(r => {
                setLabels(labels => [...labels, `${r.struttura} - ${r.provincia} - capienza totale: ${r.capienza}`])
                //setLabels(labels => [...labels, `${r.provincia}`])
            })
            dati.forEach(r => {
                setData1(data1 => [...data1, r.dati[r.dati.length-1].capienzaAttuale])
            })
            dati.forEach(r => {
                setData2(data2 => [...data2, r.dati[r.dati.length-2].capienzaAttuale])
            })
            dati.forEach(r => {
                setData3(data3 => [...data3, r.capienza])
            })
        }

    }, [dati])

    function setColor(data1:number[], data2:number[]){
        let color: string[] = []
        data1.forEach((d1, index) => {
            if(d1 > data2[index]){
                color.push("green")
            }else if(d1 < data2[index]){
                color.push('red')
            }else{
                color.push(colorePrincipale)
            }
        })
        return color
    }


    const dataChart = {
        labels,
        datasets: [
            {
                label: 'Mese precedente',
                data: data2,
                borderColor: coloreSecondario,
                backgroundColor: coloreSecondario,
            },
            {
                label: "Dato Attuale",
                data: data1,
                borderColor: setColor(data1, data2),
                backgroundColor: setColor(data1, data2),
            },
            /*{
                label: "Dato Stabile",
                borderColor: colorePrincipale,
                backgroundColor: colorePrincipale,
            },
            {
                label: "Dato In Aumento",
                borderColor: "#4ECC8F",
                backgroundColor: "#4ECC8F",
            },
            {
                label: "Dato In Diminuzione",
                borderColor: "#DF20E3",
                backgroundColor: "#DF20E3",
            },*/

        ],
    };

    return (
        <div className="flex flex-row justify-center">
            <Bar options={options as any} data={dataChart as any}/>
            <div className="flex grid grid-cols-3">
                {data1.map((d, index) => {
                    return(
                        <div key={d} className="flex flex-row items-center col-span-3">
                            <span className={`${d > data2[index] && 'text-[green]'} ${d < data2[index] && 'text-[red]'} ${d === data2[index] && 'text-black'} font-bold text-sm`}>{Math.round(d)}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default HorizontalBarChartComponente
