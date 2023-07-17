import React from 'react';
import {BsFillCircleFill} from "react-icons/bs";

export interface LegendProps{

}

const Legend: React.FC<LegendProps> = ({}) => {
    return(
        <>
            <div className="flex flex-row justify-start">
                <div className="flex flex-col w-1/4 mb-2">
                    <div className="grid grid-cols-7 text-start">
                        <BsFillCircleFill color={"#0040B8"}  className="ml-3 col-span-1 flex justify-end"/>
                        <span className="text-sm text-gray-300 col-span-6">COMUNICAZIONE ISTITUZIONALE</span>
                    </div>
                    <div className="grid grid-cols-7 text-start">
                        <BsFillCircleFill color={"#39b54a"}  className="ml-3"/>
                        <span className="text-sm text-gray-300 col-span-6">POSIZIONAMENTO TERRITORIALE</span>
                    </div>
                    <div className="grid grid-cols-7 text-start">
                        <BsFillCircleFill color={"#f7931e"}  className="ml-3"/>
                        <span className="text-sm text-gray-300 col-span-6">PROMOZIONE COMMERCIALE</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Legend