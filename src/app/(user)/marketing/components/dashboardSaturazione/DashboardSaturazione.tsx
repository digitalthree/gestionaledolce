import React, {useEffect, useState} from 'react';
import BubbleComponent, {
    calcoloCapienzaComplessiva,
    calcoloPercentualeAttuale, calcoloPercentualePrecedente
} from "@/app/(user)/marketing/components/dashboardSaturazione/components/BubbleComponent";
import MonthTrendComponent
    from "@/app/(user)/marketing/components/dashboardSaturazione/components/MonthTrendComponent";
import LineChartComponent from "@/app/(user)/marketing/components/dashboardSaturazione/components/LineChartComponent";
import {MdRectangle} from "react-icons/md";
import {InputResidenza} from "@/model/ResidenzaAnziani";
import ResidenzaAnzianiAdmin from "@/app/(admin)/dashboard/components/ResidenzaAnzianiAdmin";
import HorizontalBarChartComponente
    from "@/app/(user)/marketing/components/dashboardSaturazione/components/HorizontalBarChartComponent";
import {VscGraph, VscTable} from "react-icons/vsc";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {FaEquals} from "react-icons/fa";
import {TbFileExport} from "react-icons/tb";

export interface DashboardSaturazioneProps {
    colorePrincipale: string,
    coloreSecondario: string,
    dati: InputResidenza[],
    datiAltreSocieta: InputResidenza[]
}

const DashboardSaturazione: React.FC<DashboardSaturazioneProps> = ({
                                                                       colorePrincipale,
                                                                       coloreSecondario,
                                                                       dati,
                                                                       datiAltreSocieta
                                                                   }) => {

    const [visualizzazione, setVisualizzazione] = useState<boolean>(false)
    const [visualizzazione2, setVisualizzazione2] = useState<boolean>(false)
    const [numeroSettimane, setNumeroSettimane] = useState<4 | 8 | 12>(4)
    const [datiIstogramma, setDatiIstogramma] = useState<InputResidenza[]>(dati.length > 0 ? dati.map(item =>{
        let datiReversed = [...item.dati].reverse()
        return {...item, dati: datiReversed.filter((d, index) => index < numeroSettimane)}
    }): [])

    useEffect(() => {
        if(dati.length > 0){
            setDatiIstogramma(
                dati.map(item =>{
                    let datiReversed = [...item.dati].reverse()
                    return {...item, dati: datiReversed.filter((d, index) => index < numeroSettimane)}
                })
            )
        }
    }, [numeroSettimane, dati])

    return (
        <div className="overflow-y-auto max-h-[95vh]">
            <div className="grid grid-cols-12 px-5 py-2 gap-10 sm:hidden 2xl:grid">
                <div className="col-span-3 flex flex-col justify-between">
                    <div className="flex flex-row mb-5 items-baseline justify-between">
                        <hr className={`w-[30%] border`}
                            style={{borderColor: '#808080'}}
                        />
                        <span style={{color: '#808080'}} className="uppercase font-semibold">Saturazione generale</span>
                    </div>
                </div>
                <div className="col-span-5">
                    <div className="flex flex-col">
                        <div className="flex flex-row mb-5 items-baseline justify-between">
                            <hr className={`w-[55%] border`}
                                style={{borderColor: '#808080'}}
                            />
                            <span style={{color: '#808080'}} className="uppercase font-semibold">Trend Settimanale generale</span>
                        </div>
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="flex flex-col">
                        <div className="flex flex-row mb-5 items-baseline justify-between">
                            <hr className={`w-[50%] border`}
                                style={{borderColor: '#808080'}}
                            />
                            <span style={{color: '#808080'}}
                                  className="uppercase font-semibold">Andamento generale</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="2xl:grid 2xl:grid-cols-12 2xl:px-10 2xl:gap-10 flex flex-col items-center">
                <div className="2xl:col-span-3 mb-5">
                    <BubbleComponent colorePrincipale={colorePrincipale} coloreSecondario={coloreSecondario}
                                     dati={dati}/>
                </div>
                <div className="2xl:col-span-5 mb-5">
                    <MonthTrendComponent colorePrincipale={colorePrincipale} coloreSecondario={coloreSecondario}
                                         dati={datiIstogramma}/>
                </div>
                <div className="2xl:col-span-4">
                    <LineChartComponent colorePrincipale={colorePrincipale} coloreSecondario={coloreSecondario} dati={dati}/>
                </div>
            </div>
            <div className="2xl:grid 2xl:grid-cols-12 2xl:px-10 2xl:gap-10 flex flex-col items-center">
                <div className="2xl:col-span-3 mb-5 flex justify-center">
                    <div className="mt-3 flex justify-start items-center">
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
                        <div className="flex flex-col ml-5">
                            <span className="mb-3">Capienza Complessiva: <span className="p-2 rounded bg-[#2866CC] text-white font-semibold">{calcoloCapienzaComplessiva(dati)}</span></span>
                            {calcoloPercentualeAttuale(dati) < calcoloPercentualePrecedente(dati) &&
                                <span className="text-[red] uppercase">Andamento in diminuzione</span>
                            }
                            {calcoloPercentualeAttuale(dati) > calcoloPercentualePrecedente(dati) &&
                                <span className="text-[green] uppercase">Andamento in crescita</span>
                            }
                            {calcoloPercentualeAttuale(dati) === calcoloPercentualePrecedente(dati) &&
                                <span className="uppercase">Andamento costante</span>
                            }
                        </div>
                    </div>


                </div>
                <div className="2xl:col-span-5 mb-5">
                    <div className="grid grid-cols-1 px-5">
                        {/*<div className="flex flex-row justify-center items-center">
                            <MdRectangle color={coloreSecondario} size={30}/>
                            <span className="ml-2 text-sm">Settimana Precedente</span>
                        </div>*/}
                        <div className="flex flex-row justify-center items-center">
                            <span className={`${numeroSettimane === 4 ? 'bg-[#2866CC]' : 'bg-[#B5C5E6]'} ml-2 text-sm w-10 h-10 flex justify-center items-center hover:bg-[#2866CC] hover:cursor-pointer rounded-full text-white`}
                                onClick={() => setNumeroSettimane(4)}
                            >4</span>
                            <span className={`${numeroSettimane === 8 ? 'bg-[#2866CC]' : 'bg-[#B5C5E6]'} ml-2 text-sm w-10 h-10 flex justify-center items-center hover:bg-[#2866CC] hover:cursor-pointer rounded-full text-white`}
                                  onClick={() => setNumeroSettimane(8)}
                            >8</span>
                            <span className={`${numeroSettimane === 12 ? 'bg-[#2866CC]' : 'bg-[#B5C5E6]'} ml-2 text-sm w-10 h-10 flex justify-center items-center hover:bg-[#2866CC] hover:cursor-pointer rounded-full text-white`}
                                  onClick={() => setNumeroSettimane(12)}
                            >12</span>
                        </div>
                    </div>
                </div>
                <div className="2xl:col-span-4">
                    <div className="2xl:col-span-5 mb-5">
                        <div className="grid grid-cols-1 px-5">
                            <div className="flex flex-row justify-center items-center">
                                <MdRectangle color={colorePrincipale} size={30}/>
                                <span className="ml-2 text-sm">Anno Corrente</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-5 flex flex-col">
                <div className="flex flex-row mb-5 mt-10 items-center justify-between ">
                    <div className="p-1 border rounded border-[#808080] mr-2">
                        {!visualizzazione ?
                            <div className="tooltip tooltip-right flex" data-tip="Visualizza Grafico">
                                <VscGraph size={25} className="hover:cursor-pointer hover:opacity-70"
                                          onClick={() => setVisualizzazione(!visualizzazione)}
                                />
                            </div>
                            :
                            <div className="tooltip tooltip-right flex" data-tip="Visualizza Tabella">
                                <VscTable size={25} className="hover:cursor-pointer hover:opacity-70"
                                          onClick={() => setVisualizzazione(!visualizzazione)}
                                />
                            </div>
                        }
                    </div>

                    <hr className={`w-[63%] border`}
                        style={{borderColor: '#808080'}}
                    />
                    <span style={{color: '#808080'}} className="uppercase font-semibold">Trend Settimanale strutture in capo a Società Dolce</span>
                </div>
                {!visualizzazione ? <ResidenzaAnzianiAdmin dati={dati} editabile={false}/>
                    : <HorizontalBarChartComponente colorePrincipale={colorePrincipale}
                                                    coloreSecondario={coloreSecondario} dati={dati}/>
                }


            </div>
            <div className="px-5 flex flex-col">
                <div className="flex flex-row mb-5 mt-10 items-center justify-between">
                    <div className="border rounded border-[#808080] mr-2 p-1">
                        {!visualizzazione2 ?
                            <div className="tooltip tooltip-right flex" data-tip="Visualizza Grafico">
                                <VscGraph size={25} className="hover:cursor-pointer hover:opacity-70"
                                          onClick={() => setVisualizzazione2(!visualizzazione2)}
                                />
                            </div>
                            :
                            <div className="tooltip tooltip-right flex" data-tip="Visualizza Tabella">
                                <VscTable size={25} className="hover:cursor-pointer hover:opacity-70"
                                          onClick={() => setVisualizzazione2(!visualizzazione2)}
                                />
                            </div>
                        }
                    </div>
                    <hr className={`w-[62%] border`}
                        style={{borderColor: '#808080'}}
                    />
                    <span style={{color: '#808080'}} className="uppercase font-semibold">Trend Settimanale strutture in capo ad altre società</span>
                </div>
                {!visualizzazione2 ? <ResidenzaAnzianiAdmin dati={datiAltreSocieta} editabile={false}/>
                    : <HorizontalBarChartComponente colorePrincipale={colorePrincipale}
                                                    coloreSecondario={coloreSecondario} dati={datiAltreSocieta}/>
                }


            </div>
            <div className="flex justify-center">
                <button className="btn btn-sm w-full px-7 mt-10 mb-5 border-white bg-[#2866CC] hover:bg-[#2866CC] hover:opacity-70">
                    <TbFileExport size={25} color="white"/>
                    <span className="text-white">Scarica Report</span>
                </button>
            </div>
        </div>
    )
}

export default DashboardSaturazione