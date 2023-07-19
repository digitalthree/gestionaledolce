import React from 'react';
import BubbleComponent from "@/app/(user)/marketing/components/dashboardSaturazione/components/BubbleComponent";
import MonthTrendComponent
    from "@/app/(user)/marketing/components/dashboardSaturazione/components/MonthTrendComponent";
import LineChartComponent from "@/app/(user)/marketing/components/dashboardSaturazione/components/LineChartComponent";
import HorizontalBarChartComponente
    from "@/app/(user)/marketing/components/dashboardSaturazione/components/HorizontalBarChartComponent";
import {MdRectangle} from "react-icons/md";

export interface DashboardSaturazioneProps {
    colorePrincipale: string,
    coloreSecondario: string
}

const DashboardSaturazione: React.FC<DashboardSaturazioneProps> = ({colorePrincipale, coloreSecondario}) => {

    return (
        <div className="overflow-auto max-h-[95vh]">
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
                            <span style={{color: '#808080'}} className="uppercase font-semibold">Trend mensile generale</span>
                        </div>
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="flex flex-col">
                        <div className="flex flex-row mb-5 items-baseline justify-between">
                            <hr className={`w-[50%] border`}
                                style={{borderColor: '#808080'}}
                            />
                            <span style={{color: '#808080'}} className="uppercase font-semibold">Andamento generale</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="2xl:grid 2xl:grid-cols-12 2xl:px-10 2xl:gap-10 flex flex-col items-center">
                <div className="2xl:col-span-3 mb-5">
                    <BubbleComponent colorePrincipale={colorePrincipale} coloreSecondario={coloreSecondario}/>
                </div>
                <div className="2xl:col-span-5 mb-5">
                    <MonthTrendComponent colorePrincipale={colorePrincipale}/>
                </div>
                <div className="2xl:col-span-4">
                    <LineChartComponent colorePrincipale={colorePrincipale}/>
                </div>
            </div>
            <div className="2xl:grid 2xl:grid-cols-12 2xl:px-10 2xl:gap-10 flex flex-col items-center">
                <div className="2xl:col-span-3 mb-5 flex justify-center">
                    {/*TODO: renderlo dinamico*/}
                    <span>Andamento in diminuzione</span>
                </div>
                <div className="2xl:col-span-5 mb-5">
                    <div className="grid grid-cols-2 px-5">
                        <div className="flex flex-row justify-center items-center">
                            <MdRectangle color="#DAE2F3" size={30}/>
                            <span className="ml-2 text-sm">Anno Precedente</span>
                        </div>
                        <div className="flex flex-row justify-center items-center">
                            <MdRectangle color="#E4EAAD" size={30}/>
                            <span className="ml-2 text-sm">Anno Corrente</span>
                        </div>
                    </div>
                </div>
                <div className="2xl:col-span-4">
                    <div className="2xl:col-span-5 mb-5">
                        <div className="grid grid-cols-2 px-5">
                            <div className="flex flex-row justify-center items-center">
                                <MdRectangle color="#DAE2F3" size={30}/>
                                <span className="ml-2 text-sm">Anno Precedente</span>
                            </div>
                            <div className="flex flex-row justify-center items-center">
                                <MdRectangle color="#E4EAAD" size={30}/>
                                <span className="ml-2 text-sm">Anno Corrente</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-5 flex flex-col">
                <div className="flex flex-row mb-5 mt-10 items-baseline justify-between">
                    <hr className={`w-[63%] border`}
                        style={{borderColor: '#808080'}}
                    />
                    <span style={{color: '#808080'}} className="uppercase font-semibold">Trend di ogni singola struttura in capo a Società Dolce</span>
                </div>
                <HorizontalBarChartComponente colorePrincipale={colorePrincipale}/>
            </div>
            <div className="px-5 flex flex-col">
                <div className="flex flex-row mb-5 mt-10 items-baseline justify-between">
                    <hr className={`w-[63%] border`}
                        style={{borderColor: '#808080'}}
                    />
                    <span style={{color: '#808080'}} className="uppercase font-semibold">Trend di ogni singola struttura in capo ad altre società</span>
                </div>
                <HorizontalBarChartComponente colorePrincipale={colorePrincipale}/>
            </div>
        </div>
    )
}

export default DashboardSaturazione