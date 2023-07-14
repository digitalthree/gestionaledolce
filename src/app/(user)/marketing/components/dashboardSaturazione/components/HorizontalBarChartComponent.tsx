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
import {useGetResidenze} from "@/store/rtkqApi.ts";

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
            labels: {
                filter: function (item, chart){
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
    colorePrincipale: string
}

const HorizontalBarChartComponente:React.FC<HorizontalBarChartComponenteProps> = ({colorePrincipale}) => {
    const [labels, setLabels] = useState([])
    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])
    const res = useGetResidenze()
    let residenze = []
    if(res.data){
        residenze = res.data
    }
    useEffect(() => {
        residenze.forEach(r => {
            setLabels(labels => [...labels, `${r.struttura} - ${r.provincia} - ${r.servizio} - capienza totale: ${r.capienza}`])
        })
        residenze.forEach(r => {
            setData1(data1 => [...data1, r.dati[r.dati.length-1].capienzaAttuale])
        })
        residenze.forEach(r => {
            setData2(data2 => [...data2, r.dati[r.dati.length-2].capienzaAttuale])
        })
        residenze.forEach(r => {
            setData3(data3 => [...data3, r.capienza])
        })
    }, [residenze])

    function setColor(data1, data2){
        let color = []
        data1.forEach((d1, index) => {
            if(d1 > data2[index]){
                color.push("#4ECC8F")
            }else if(d1 < data2[index]){
                color.push("#DF20E3")
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
                borderColor: '#DAE2F3',
                backgroundColor: '#DAE2F3',
            },
            {
                label: "Dato Attuale",
                data: data1,
                borderColor: setColor(data1, data2),
                backgroundColor: setColor(data1, data2),
            },
            {
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
            },

        ],
    };

    return (
        <div className="flex flex-row justify-center h-[750px]">
            <Bar options={options as any} data={dataChart as any}/>
            <div className="flex grid grid-cols-3">
                {data1.map((d, index) => {
                    return(
                        <div key={d} className="mt-10 flex flex-row items-center col-span-3">
                            <span className={`${d > data2[index] && 'text-[#4ECC8F]'} ${d < data2[index] && 'text-[#DF20E3]'} ${d === data2[index] && 'text-black'} font-bold`}>{Math.round(d)}</span>
                            {d > data2[index] && <ImArrowUp  className="ml-2 text-[#4ECC8F]"/>}
                            {d < data2[index] && <ImArrowDown  className="ml-2 text-[#DF20E3]"/>}
                            {d === data2[index] && <CgMathEqual className="ml-2" style={{color: colorePrincipale}}/>}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default HorizontalBarChartComponente
