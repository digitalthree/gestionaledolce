import React, {useState} from 'react';
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";

export interface BubbleComponentProps{

}

const BubbleComponent: React.FC<BubbleComponentProps> = ({}) => {

    const [saturazioneTotale, setSaturazioneTotale] = useState([93, 92,8])

    return(
        <div className="flex flex-col">
            <div className="flex flex-row items-end justify-between">
                <div className="rounded-full p-2 m-1 bg-[#B5C5E7] w-60 h-60 flex items-center justify-center text-[60px] font-[100] relative text-white">
                    {saturazioneTotale[0]}%
                    <div className="rounded-full p-2 m-1 bg-[#B5C5E7] w-20 h-20 flex items-center justify-center text-[15px] font-light absolute top-0 right-[-40px]">{saturazioneTotale[1]}%</div>
                </div>
                {saturazioneTotale[0] > saturazioneTotale[1] ?
                    <div className="flex flex-col">
                        <IoIosArrowUp size="50px" color="#B5C5E7" className="mb-[-30px]"/>
                        <IoIosArrowUp size="50px" color="#DAE2F3" className="mb-[-30px]"/>
                        <IoIosArrowUp size="50px" color="#DAE2F3"/>
                    </div> :
                    <div className="flex flex-col">
                        <IoIosArrowDown size="50px" color="#DAE2F3" className="mb-[-30px]"/>
                        <IoIosArrowDown size="50px" color="#DAE2F3" className="mb-[-30px]"/>
                        <IoIosArrowDown size="50px" color="#B5C5E7"/>
                    </div>
                }
            </div>
        </div>
    )
}

export default BubbleComponent