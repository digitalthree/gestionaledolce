import React, {useState} from 'react';
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import BubbleComponent from "@/app/(admin)/dashboard/components/dashboardSaturazione/components/BubbleComponent";
import MonthTrendComponent
    from "@/app/(admin)/dashboard/components/dashboardSaturazione/components/MonthTrendComponent";
import {
    LineChartComponent
} from "@/app/(admin)/dashboard/components/dashboardSaturazione/components/LineChartComponent";
import {
    HorizontalBarChartComponente
} from "@/app/(admin)/dashboard/components/dashboardSaturazione/components/HorizontalBarChartComponent";

export interface DashboardSaturazioneProps {

}

const DashboardSaturazione: React.FC<DashboardSaturazioneProps> = ({}) => {

    return (
        <div className="overflow-auto max-h-[860px]">
            <div className="grid grid-cols-12 px-5 py-2 gap-10">
                <div className="col-span-3 flex flex-col justify-between">
                        <div className="flex flex-row mb-5 items-baseline justify-between">
                            <hr className="w-48 border border-[#B5C5E7]"/>
                            <span className="text-[#B5C5E7]">Situazione generale</span>
                        </div>
                </div>
                <div className="col-span-5">
                    <div className="flex flex-col">
                        <div className="flex flex-row mb-5 items-baseline justify-between">
                            <hr className="w-[430px] border border-[#B5C5E7]"/>
                            <span className="text-[#B5C5E7]">Trend mensile generale</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 px-10 gap-10 items-center">
                <div className="col-span-3">
                    <BubbleComponent/>
                </div>
                <div className="col-span-5">
                    <MonthTrendComponent/>
                </div>
                <div className="col-span-4">
                    <LineChartComponent/>
                </div>
            </div>
            <div className="px-5 flex flex-col w-[80&]">
                <div className="flex flex-row mb-5 mt-10 items-baseline justify-between">
                    <hr className="w-[1180px] border border-[#B5C5E7]"/>
                    <span className="text-[#B5C5E7]">Trend di ogni singola struttura in capo a Società Dolce</span>
                </div>
                <HorizontalBarChartComponente/>
            </div>
            <div className="px-5 flex flex-col w-[80&]">
                <div className="flex flex-row mb-5 mt-10 items-baseline justify-between">
                    <hr className="w-[1180px] border border-[#B5C5E7]"/>
                    <span className="text-[#B5C5E7]">Trend di ogni singola struttura in capo ad altre società</span>
                </div>
                <HorizontalBarChartComponente/>
            </div>
        </div>
    )
}

export default DashboardSaturazione