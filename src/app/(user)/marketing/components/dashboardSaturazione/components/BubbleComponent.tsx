import React from 'react';
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {useGetResidenze} from "@/store/rtkqApi";
import {InputResidenza} from "@/model/ResidenzaAnziani";

export interface BubbleComponentProps{
    colorePrincipale: string
}

const BubbleComponent: React.FC<BubbleComponentProps> = ({colorePrincipale}) => {


    const {data, error, isLoading} = useGetResidenze()

    let residenze:InputResidenza[] = []
    if(data){
        residenze = data
    }


    function calcoloPercentualeAttuale(){
        const percentuali: number[] = []
        residenze.forEach(ia => {
            percentuali.push((ia.dati[ia.dati.length-1].capienzaAttuale*100)/ia.capienza)
        })
        return (percentuali.reduce((a,b) => a+b, 0) / percentuali.length).toFixed(2)
    }

    function calcoloPercentualePrecedente(){
        const percentuali: number[] = [];
        residenze.forEach(ia => {
            percentuali.push((ia.dati[ia.dati.length-2].capienzaAttuale*100)/ia.capienza)
        })
        return (percentuali.reduce((a,b) => a+b, 0) / percentuali.length).toFixed(2)
    }

    return(
        <div className="flex flex-col">
            <div className="flex flex-row items-end justify-between">
                <div className={`rounded-full p-2 m-1 w-60 h-60 flex items-center justify-center text-[60px] font-[100] relative text-white`}
                     style={{backgroundColor: colorePrincipale}}
                >
                    {calcoloPercentualeAttuale()}%
                    <div className={`rounded-full opacity-80 p-2 m-1 w-20 h-20 flex items-center justify-center text-[15px] font-light absolute top-0 right-[-40px]`}
                         style={{backgroundColor: colorePrincipale}}
                    >{calcoloPercentualePrecedente()}%</div>
                </div>
                {calcoloPercentualeAttuale() > calcoloPercentualePrecedente() ?
                    <div className="flex flex-col">
                        <IoIosArrowUp size="50px" color={'#61cf9c'} className="mb-[-30px]"/>
                        <IoIosArrowUp size="50px" color={'#61cf9c'} className="mb-[-30px] opacity-60"/>
                        <IoIosArrowUp size="50px" color={'#61cf9c'} className="opacity-40"/>
                    </div> :
                    <div className="flex flex-col">
                        <IoIosArrowDown size="50px" color={'#df20e3'} className="mb-[-30px] opacity-40"/>
                        <IoIosArrowDown size="50px" color={'#df20e3'} className="mb-[-30px] opacity-60"/>
                        <IoIosArrowDown size="50px" color={'#df20e3'}/>
                    </div>
                }
            </div>
        </div>
    )
}

export default BubbleComponent;