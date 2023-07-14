import React from 'react';
import Image from "next/image";
import {MdArrowRight} from "react-icons/md";
import {useUser} from "@auth0/nextjs-auth0/client";
import Link from "next/link";

export interface SiseBarProps{
    subMenu: undefined | 'ra' | 'ca' | 'ss' | 'rd' | 'cd',
    setSubMenu: Function,
    menu: undefined | 'planning' | 'gare' | 'contratti',
    setMenu: Function
}

const SiseBar: React.FC<SiseBarProps> = (
    {
        subMenu, menu, setMenu, setSubMenu
    }
) => {

    const {user} = useUser();

    return(
        <>
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
                <div className="flex flex-row justify-center mt-60">
                    <Link href="/api/auth/logout" className="text-white uppercase hover:underline hover:cursor-pointer">Logout</Link>
                </div>
            </div>
        </>
    )
}

export default SiseBar