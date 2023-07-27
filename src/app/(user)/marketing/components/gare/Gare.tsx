import React, {useEffect, useState} from 'react';
import PieChart from "@/app/(user)/marketing/components/gare/components/PieChart";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import VerticalBarChart from "@/app/(user)/marketing/components/gare/components/VerticalBarChart";
import {Gara} from "@/model/Gara";
import {useGetGaraByAnno, useGetGare} from "@/store/rtkqApi";
import {MdRectangle} from "react-icons/md";
import {TbFileExport} from "react-icons/tb";

export interface GareProps {

}

const Gare: React.FC<GareProps> = ({}) => {
    const resGare = useGetGare()
    const resGara = useGetGaraByAnno(new Date().getFullYear())
    let gara = {} as Gara
    if(resGara.data){
        gara = (resGara.data as unknown as Gara[])[0]
    }
    let gare: Gara[] = []
    if(resGare.data){
        gare = resGare.data
    }


    const [garaAnnoPrec, setGaraAnnoPrec] = useState<Gara>(gara)
    const [garePartecipate, setGarePartecipate] = useState<number[]>([])
    const [gareVinte, setGareVinte] = useState<number[]>([])

    useEffect(() => {
        if(gare.length > 0){
            setGaraAnnoPrec(gare.filter(g => g.anno === new Date().getFullYear()-1)[0])
            setGarePartecipate(garePartecipate => [...garePartecipate, ...gare.map(g => g.gareNuovePartecipate)])
            setGareVinte(gareVinte => [...gareVinte, ...gare.map(g => g.gareNuoveVinte)])
        }

    }, [gare])

    return (
        <div className="overflow-y-scroll max-h-[900px]">
            {gare.length > 0 && gara.gareNuoveVinte &&
                <>
                    <div className="w-full flex flex-row items-center">
                        <span className="mr-2 text-[#B5C5E7] text-sm">Conferme</span>
                        <hr className="w-full border-[#B5C5E7] border"/>
                    </div>
                    <div className="grid grid-cols-7 gap-20 p-10">
                        <div className="col-span-3 p-20">
                            <PieChart labels={['Gare in corso', 'Gare in scadenza', 'Gare vinte', 'Gare perse']}
                                      values={[gara.gareInCorso, gara.gareInScadenza, gara.gareVinte, gara.garePerse]}
                                      backgroundColor={['#DFE6F3', '#B5C5E7', 'green', 'red',]}
                                      borderColor={['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}
                            />
                        </div>
                        <div className="col-span-4 pt-20">
                            <div className="grid grid-cols-1 gap-14">
                                <div className="grid grid-cols-3 gap-[2px]">
                                    <div
                                        className="col-span-1 flex items-center justify-center p-6 bg-[#0066cc] text-white rounded-l-2xl text-center">Valore
                                        della <br/> produzione
                                    </div>
                                    <div
                                        className="col-span-2 flex items-center justify-center p-6 bg-[#0066cc] text-white rounded-r-2xl text-4xl font-medium">{gara.valoreDellaProduzione.toLocaleString('en-US')}€
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-[2px]">
                                    <div
                                        className="col-span-1 flex items-center justify-center p-6 bg-[#B5C5E7] text-white rounded-l-2xl text-center">Valore
                                        gare <br/> in scadenza
                                    </div>
                                    <div
                                        className="col-span-2 flex items-center justify-center p-6 bg-[#B5C5E7] text-white rounded-r-2xl text-4xl font-medium">{gara.valoreGareInScadenza.toLocaleString('en-US')}€
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-[2px]">
                                    <div
                                        className="col-span-1 flex items-center justify-center p-6 bg-[green] text-white rounded-l-2xl text-center">Fatturato <br/> Confermato
                                    </div>
                                    <div
                                        className="col-span-2 flex items-center justify-center p-6 bg-[green] text-white rounded-r-2xl text-4xl font-medium">{gara.fatturatoConfermato.toLocaleString('en-US')}€
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 mb-10">
                        <div className="grid grid-cols-4 px-5">
                            <div className="flex flex-row items-center">
                                <MdRectangle color="#DFE6F3" size={30}/>
                                <span className="ml-2 text-sm">Gare in corso</span>
                            </div>
                            <div className="flex flex-row items-center">
                                <MdRectangle color="#B5C5E7" size={30}/>
                                <span className="ml-2 text-sm">Gare in scadenza</span>
                            </div>
                            <div className="flex flex-row items-center">
                                <MdRectangle color="green" size={30}/>
                                <span className="ml-2 text-sm">Gare vinte</span>
                            </div>
                            <div className="flex flex-row items-center">
                                <MdRectangle color="red" size={30}/>
                                <span className="ml-2 text-sm">Gare perse</span>
                            </div>
                        </div>
                        <div className="flex flex-row px-20 items-center justify-around">
                            <p className="">
                                Valore del fatturato confermato <br/> paragonato all’anno precedente
                            </p>
                            <div className={`${((gara.valoreGareInScadenza/gara.fatturatoConfermato) > (garaAnnoPrec.valoreGareInScadenza/garaAnnoPrec.fatturatoConfermato)) ? "text-[green]": "text-[red]"} text-6xl font-medium`}>
                                {(gara.valoreGareInScadenza/gara.fatturatoConfermato).toFixed(2)}%
                            </div>
                            { ((gara.valoreGareInScadenza/gara.fatturatoConfermato) > (garaAnnoPrec.valoreGareInScadenza/garaAnnoPrec.fatturatoConfermato)) ?
                                <div className="flex flex-col">
                                    <IoIosArrowUp size="40px" color="green" className="mb-[-25px]"/>
                                    <IoIosArrowUp size="40px" color="green" className="mb-[-25px] opacity-60"/>
                                    <IoIosArrowUp size="40px" color="green" className="opacity-40"/>
                                </div> :
                                <div className="flex flex-col">
                                    <IoIosArrowDown size="40px" color="red" className="mb-[-25px] opacity-40"/>
                                    <IoIosArrowDown size="40px" color="red" className="mb-[-25px] opacity-60"/>
                                    <IoIosArrowDown size="40px" color="red" />
                                </div>
                            }


                        </div>
                    </div>
                    <div>
                        <div className=" flex flex-col justify-center">
                            <div className="w-full flex flex-row justify-between items-center mb-10">
                                <hr className="w-[88%] border-[#B5C5E7] border"/>
                                <span className="mr-2 text-[#B5C5E7]">Partecipazione Gare</span>
                            </div>
                            <VerticalBarChart garePartecipate={garePartecipate} gareVinte={gareVinte}/>
                        </div>

                    </div>
                    <div className="w-full flex flex-row items-center my-10">
                        <span className="mr-2 text-[#B5C5E7]">Nuovo</span>
                        <hr className="w-full border-[#B5C5E7] border"/>
                    </div>
                    <div className="grid grid-cols-8 p-10 gap-10">
                        <div className="col-span-3">
                            <div className="grid grid-cols-1 gap-10 p-10">
                                <div className="grid grid-cols-3 gap-[2px]">
                                    <div
                                        className="col-span-1 flex items-center justify-center py-20 text-[15px] bg-[#0066cc] text-white rounded-l-2xl text-center">Anno Nuovo
                                        <br/> fatturato
                                    </div>
                                    <div
                                        className="col-span-2 flex items-center justify-center p-6 bg-[#0066cc] text-white rounded-r-2xl text-4xl font-medium">{gara.annoNuovoFatturato.toLocaleString('en-US')}€
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-[2px]">
                                    <div
                                        className="col-span-1 flex items-center justify-center py-20 text-[15px] bg-[#0066cc] text-white rounded-l-2xl text-center">Portafoglio
                                        <br/> Acquisito
                                    </div>
                                    <div
                                        className="col-span-2 flex items-center justify-center p-6 bg-[#0066cc] text-white rounded-r-2xl text-4xl font-medium">{gara.portafoglioAcquisto.toLocaleString('en-US')}€
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3 flex flex-row justify-center p-10">
                            <PieChart labels={["Gare nuove partecipate", "Gare nuove vinte"]}
                                      values={[gara.gareNuovePartecipate, gara.gareNuoveVinte]}
                                      backgroundColor={["#0066cc", "#DFE6F3"]}
                                      borderColor={["#0066cc", "#DFE6F3"]}
                            />
                        </div>
                        <div className="flex flex-col justify-center col-span-2">
                            <span className="text-[#0066cc]">percentuale di gare vinte</span>
                            <div className="flex flex-row">
                                <span className="text-7xl text-[#0066cc]">{(gara.gareNuoveVinte*100)/gara.gareNuovePartecipate}%</span>
                                {gara.gareNuoveVinte > garaAnnoPrec.gareNuoveVinte ?
                                    <div className="flex flex-col">
                                        <IoIosArrowUp size="40px" color="#0066cc" className="mb-[-25px]"/>
                                        <IoIosArrowUp size="40px" color="#0066cc" className="mb-[-25px] opacity-60"/>
                                        <IoIosArrowUp size="40px" color="#0066cc" className="opacity-40"/>
                                    </div> :
                                    <div className="flex flex-col">
                                        <IoIosArrowDown size="40px" color="#0066cc" className="mb-[-25px] opacity-40"/>
                                        <IoIosArrowDown size="40px" color="#0066cc" className="mb-[-25px] opacity-60"/>
                                        <IoIosArrowDown size="40px" color="#0066cc" />
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </>
            }
            <div className="flex justify-center">
                <a href="/img/reportTipo.pdf" download className="btn btn-sm w-full px-7 mt-10 mb-5 border-white bg-[#2866CC] hover:bg-[#2866CC] hover:opacity-70">
                    <TbFileExport size={25} color="white"/>
                    <span className="text-white">Scarica Report</span>
                </a>
            </div>
        </div>
    )
}

export default Gare