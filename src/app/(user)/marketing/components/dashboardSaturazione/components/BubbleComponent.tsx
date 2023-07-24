import React from 'react';
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {useGetResidenze} from "@/store/rtkqApi";
import {InputResidenza} from "@/model/ResidenzaAnziani";
import {FaEquals} from "react-icons/fa";

export interface BubbleComponentProps{
    colorePrincipale: string,
    coloreSecondario: string,
    dati: InputResidenza[]
}

export function calcoloPercentualeAttuale(dati: InputResidenza[]){
    const percentuali: number[] = []
    dati.forEach(ia => {
        percentuali.push((ia.dati[ia.dati.length-1].capienzaAttuale*100)/ia.capienza)
    })
    return (percentuali.reduce((a,b) => a+b, 0) / percentuali.length).toFixed(2)
}

export function calcoloPercentualePrecedente(dati: InputResidenza[]){
    const percentuali: number[] = [];
    dati.forEach(ia => {
        percentuali.push((ia.dati[ia.dati.length-2].capienzaAttuale*100)/ia.capienza)
    })
    return (percentuali.reduce((a,b) => a+b, 0) / percentuali.length).toFixed(2)
}

export function calcoloCapienzaComplessiva(dati: InputResidenza[]){
    let result = 0;
    dati.forEach(d => {
        result = result + d.capienza
    })
    return result
}

const BubbleComponent: React.FC<BubbleComponentProps> = ({colorePrincipale, coloreSecondario, dati}) => {



    return(
        <div className="flex flex-col p-5">
            <div className="flex flex-row items-end justify-between relative z-10">
                <div className={`rounded-full p-2 m-1 w-60 h-60 flex items-center justify-center text-[60px] font-[100] shadow-xl text-white font-bold relative`}
                     style={{backgroundColor: colorePrincipale}}
                >
                    {calcoloPercentualeAttuale(dati)}%
                    <div className={`rounded-full p-2 m-1 w-32 h-32 text-white flex items-center justify-center text-[25px] font-bold absolute top-[-20%] right-[-30%] z-[-1]`}
                         style={{backgroundColor: coloreSecondario}}
                    >{calcoloPercentualePrecedente(dati)}%</div>
                </div>
                {calcoloPercentualeAttuale(dati) > calcoloPercentualePrecedente(dati) &&
                    <div className="flex flex-col">
                        <IoIosArrowUp size="50px" color={'green'} className="mb-[-30px]"/>
                        <IoIosArrowUp size="50px" color={'green'} className="mb-[-30px] opacity-60"/>
                        <IoIosArrowUp size="50px" color={'green'} className="opacity-40"/>
                    </div>
                }
                {calcoloPercentualeAttuale(dati) < calcoloPercentualePrecedente(dati) &&
                    <div className="flex flex-col">
                        <IoIosArrowDown size="50px" color={'red'} className="mb-[-30px] opacity-40"/>
                        <IoIosArrowDown size="50px" color={'red'} className="mb-[-30px] opacity-60"/>
                        <IoIosArrowDown size="50px" color={'red'}/>
                    </div>
                }
                {calcoloPercentualeAttuale(dati) === calcoloPercentualePrecedente(dati) &&
                    <div className="flex flex-col">
                        <FaEquals size="50px" color={'#B5C5E7'}/>
                    </div>
                }
            </div>
            <div className="mt-3 flex justify-start">
                <span>Capienza Complessiva: <span className="p-2 rounded bg-[#2866CC] text-white font-semibold">{calcoloCapienzaComplessiva(dati)}</span></span>
            </div>
        </div>
    )
}

export default BubbleComponent;