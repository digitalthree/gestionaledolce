import React from 'react';
import {BsFillCircleFill} from "react-icons/bs";

export interface LegendProps{

}

const Legend: React.FC<LegendProps> = ({}) => {
    return(
        <>
            <div className="flex flex-row justify-center">
                <div className="flex flex-col p-2 border border-gray-300 w-1/5 m-5">
                    <div className="flex flex-row justify-between items-center">
                        <span className="text-sm">COMUNICAZIONE ISTITUZIONALE</span>
                        <BsFillCircleFill color={"#0070B3"}  className="ml-3"/>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <span className="text-sm">POSIZIONAMENTO TERRITORIALE</span>
                        <BsFillCircleFill color={"#19f91d"}  className="ml-3"/>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <span className="text-sm">PROMOZIONE COMMERCIALE</span>
                        <BsFillCircleFill color={"#f99419"}  className="ml-3"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Legend