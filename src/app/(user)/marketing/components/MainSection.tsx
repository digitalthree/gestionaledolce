import React, {useState} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";
import {MdArrowRight} from "react-icons/md";
import DiagrammaTemporale from "@/app/(user)/marketing/components/DiagrammaTemporale";
import DashboardSaturazione from "@/app/(user)/marketing/components/dashboardSaturazione/DashboardSaturazione";
import Image from "next/image";

export default function MainSection() {

    const {user} = useUser();

    const [subMenu, setSubMenu] = useState<undefined | 'ra' | 'ca' | 'ss' | 'rd' | 'cd'>('ra');
    const [menu, setMenu] = useState<undefined | 'planning' | 'gare' | 'contratti'>(undefined);

    return (
        <>
            <div className="w-full h-screen bg-gray-200">
                <div className="flex flex-no-wrap">
                    {/* Sidebar starts */}
                    <div className="bg-[#B5C5E7] absolute lg:relative w-64 h-screen shadow hidden lg:block">
                        <ul className=" py-6">
                            <div className="flex flex-row justify-between items-center px-5">
                                <div className="h-24 w-24 flex items-center">
                                    <Image src="/img/logo_home.png" alt="logo" width={100} height={100}/>
                                </div>
                                <div className="text-white">
                                    utente: <br/>
                                    #{user?.nickname?.toUpperCase()}
                                </div>
                            </div>
                            <li className="pl-6 cursor-pointer text-xl text-white mt-10">
                                <details className="collapse collapse-arrow" open>
                                    <summary className="collapse-title text-xl">
                                        SATURAZIONE
                                    </summary>
                                    <div className="collapse-content ml-4 text-sm">
                                        <p className={`mb-2 hover:cursor-pointer hover:underline ${subMenu === 'ra' && 'underline'}`}
                                           onClick={() => {
                                               setMenu(undefined)
                                               setSubMenu('ra')
                                           }}
                                        >residenza anziani</p>
                                        <p className={`mb-2 hover:cursor-pointer hover:underline ${subMenu === 'ca' && 'underline'}`}
                                           onClick={() => {
                                               setMenu(undefined)
                                               setSubMenu('ca')
                                           }}
                                        >centri diurni
                                            anziani</p>
                                        <p className={`mb-2 hover:cursor-pointer hover:underline ${subMenu === 'ss' && 'underline'}`}
                                           onClick={() => {
                                               setMenu(undefined)
                                               setSubMenu('ss')
                                           }}
                                        >servizi sanitari</p>
                                        <p className={`mb-2 hover:cursor-pointer hover:underline ${subMenu === 'rd' && 'underline'}`}
                                           onClick={() => {
                                               setMenu(undefined)
                                               setSubMenu('rd')
                                           }}
                                        >residenza disabili</p>
                                        <p className={`mb-2 hover:cursor-pointer hover:underline ${subMenu === 'cd' && 'underline'}`}
                                           onClick={() => {
                                               setMenu(undefined)
                                               setSubMenu('cd')
                                           }}
                                        >centri diurni
                                            disabili</p>
                                    </div>
                                </details>
                            </li>
                            <li className="pl-6 cursor-pointer text-xl text-white ml-4" onClick={() => {
                                setMenu('planning')
                                setSubMenu(undefined)
                            }}>
                                {menu === 'planning' ?
                                    <div className="flex flex-row items-center">
                                        <MdArrowRight/>
                                        PLANNING
                                    </div> :
                                    <span>PLANNING</span>
                                }
                            </li>
                            <li className="pl-6 cursor-pointer text-xl text-white ml-4" onClick={() => {
                                setMenu('gare')
                                setSubMenu(undefined)
                            }}>
                                {menu === 'gare' ?
                                    <div className="flex flex-row items-center">
                                        <MdArrowRight/>
                                        GARE
                                    </div> :
                                    <span>GARE</span>
                                }
                            </li>
                            <li className="pl-6 cursor-pointer text-xl text-white ml-4" onClick={() => {
                                setMenu('contratti')
                                setSubMenu(undefined)
                            }}>
                                {menu === 'contratti' ?
                                    <div className="flex flex-row items-center">
                                        <MdArrowRight/>
                                        CONTRATTI
                                    </div> :
                                    <span>CONTRATTI</span>
                                }
                            </li>
                        </ul>
                    </div>
                    {/* Sidebar ends */}
                    <div className="w-full bg-white">
                        {/* Remove class [ h-64 ] when adding a card block */}
                        <div className="p-5">
                            {menu === 'planning' && <DiagrammaTemporale/>}
                            {menu === undefined && subMenu === 'ra' && <DashboardSaturazione/>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
