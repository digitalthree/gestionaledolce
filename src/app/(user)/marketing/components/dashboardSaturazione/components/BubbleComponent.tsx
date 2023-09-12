import React from 'react';
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {useGetResidenze} from "@/store/rtkqApi";
import {InputResidenza} from "@/model/ResidenzaAnziani";
import {FaEquals} from "react-icons/fa";
import {DatiAggiuntivi} from "@/model/DatiAggiuntivi";

export interface BubbleComponentProps{
    colorePrincipale: string,
    coloreSecondario: string,
    dati: InputResidenza[],
    datiAggiuntivi: DatiAggiuntivi
}

export function calcoloPercentualeAttuale(dati: InputResidenza[]){
    const percentuali: number[] = []
    dati.forEach(ia => {
        percentuali.push((ia.dati[ia.dati.length-1].capienzaAttuale*100))
    })
    return (percentuali.reduce((a,b) => a+b, 0) / calcoloCapienzaComplessiva(dati)).toFixed(2)
}

export function calcoloPercentualePrecedente(dati: InputResidenza[]){
    const percentuali: number[] = [];
    dati.forEach(ia => {
        percentuali.push((ia.dati[ia.dati.length-2].capienzaAttuale*100))
    })
    return (percentuali.reduce((a,b) => a+b, 0) / calcoloCapienzaComplessiva(dati)).toFixed(2)
}

export function calcoloCapienzaComplessiva(dati: InputResidenza[]){
    let result = 0;
    dati.forEach(d => {
        result = result + d.capienza
    })
    return result
}

const BubbleComponent: React.FC<BubbleComponentProps> = ({colorePrincipale, coloreSecondario, dati, datiAggiuntivi}) => {



    return(
        <div className="flex flex-col p-5">
            <div className="flex flex-row items-end justify-between relative z-10">
                <div className={`rounded-full p-2 m-1 w-60 h-60 flex items-center justify-center text-[60px] font-[100] shadow-xl text-white font-bold relative`}
                     style={{backgroundColor: colorePrincipale}}
                >
                    {datiAggiuntivi.percentualeTotale}%
                    {/*<div className={`rounded-full p-2 m-1 w-32 h-32 text-white flex items-center justify-center text-[25px] font-bold absolute top-[-20%] right-[-30%] z-[-1]`}
                         style={{backgroundColor: coloreSecondario}}
                    >{calcoloPercentualePrecedente(dati)}%</div>*/}
                </div>
            </div>
        </div>
    )
}

export default BubbleComponent;