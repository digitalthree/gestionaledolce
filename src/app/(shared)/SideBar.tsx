import React from 'react';
import Image from "next/image";
import {MdArrowRight} from "react-icons/md";
import {useUser} from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import {BiGroup, BiUser} from 'react-icons/bi'
import {TbFileExport} from "react-icons/tb";

export interface SiseBarProps{
    subMenu: undefined | 'ra' | 'ca' | 'ss' | 'rd' | 'cd',
    setSubMenu: Function,
    menu: undefined | 'planning' | 'gare' | 'contratti',
    setMenu: Function,
    visualizzazioneUser?: boolean
    setVisualizzazioneUser?: Function
}

const SiseBar: React.FC<SiseBarProps> = (
    {
        subMenu, menu, setMenu, setSubMenu, setVisualizzazioneUser, visualizzazioneUser
    }
) => {

    const {user} = useUser();

    return(
        <>
            <div className="bg-[#B5C5E7] absolute lg:relative w-[17%] h-screen shadow hidden lg:block">
                <ul className="py-6">
                    <div className="flex flex-col justify-between items-center">
                        <div className="flex items-center">
                            <Image src="/img/sdreportlogowhite.png" alt="logo" width={150} height={100}/>
                        </div>
                        <div className="text-white text-base mt-3">
                            utente:
                            #{user?.nickname?.toUpperCase()}
                        </div>
                    </div>
                    <li className="pl-6 cursor-pointer text-xl text-white mt-5">
                        <details className="collapse collapse-arrow" open>
                            <summary className={`collapse-title text-2xl ${subMenu ? "font-semibold" : ""}`}>
                                SATURAZIONE
                            </summary>
                            <div className="collapse-content ml-4">
                                <p className={`mb-2 hover:cursor-pointer hover:underline ${subMenu === 'ra' && 'underline'} `}
                                   onClick={() => {
                                       setMenu(undefined)
                                       setSubMenu('ra')
                                   }}
                                >residenza anziani</p>
                                <p className={`mb-2 hover:cursor-pointer hover:underline ${subMenu === 'ca' && 'underline'} `}
                                   onClick={() => {
                                       setMenu(undefined)
                                       setSubMenu('ca')
                                   }}
                                >centri diurni
                                    anziani</p>
                                <p className={`mb-2 hover:cursor-pointer hover:underline ${subMenu === 'ss' && 'underline'} `}
                                   onClick={() => {
                                       setMenu(undefined)
                                       setSubMenu('ss')
                                   }}
                                >servizi sanitari</p>
                                <p className={`mb-2 hover:cursor-pointer hover:underline ${subMenu === 'rd' && 'underline'} `}
                                   onClick={() => {
                                       setMenu(undefined)
                                       setSubMenu('rd')
                                   }}
                                >residenza disabili</p>
                                <p className={`mb-2 hover:cursor-pointer hover:underline ${subMenu === 'cd' && 'underline'} `}
                                   onClick={() => {
                                       setMenu(undefined)
                                       setSubMenu('cd')
                                   }}
                                >centri diurni
                                    disabili</p>
                            </div>
                        </details>
                    </li>
                    <li className="pl-6 cursor-pointer text-2xl text-white ml-4" onClick={() => {
                        setMenu('planning')
                        setSubMenu(undefined)
                    }}>
                        {menu === 'planning' ?
                            <div className="flex flex-row items-center font-semibold">
                                <MdArrowRight/>
                                PLANNING
                            </div> :
                            <span className="">PLANNING</span>
                        }
                    </li>
                    <li className="pl-6 cursor-pointer text-2xl text-white ml-4" onClick={() => {
                        setMenu('gare')
                        setSubMenu(undefined)
                    }}>
                        {menu === 'gare' ?
                            <div className="flex flex-row items-center font-semibold">
                                <MdArrowRight/>
                                GARE
                            </div> :
                            <span className="">GARE</span>
                        }
                    </li>
                    <li className="pl-6 cursor-pointer text-2xl text-white ml-4" onClick={() => {
                        setMenu('contratti')
                        setSubMenu(undefined)
                    }}>
                        {menu === 'contratti' ?
                            <div className="flex flex-row items-center font-semibold">
                                <MdArrowRight/>
                                CONTRATTI
                            </div> :
                            <span className="">CONTRATTI</span>
                        }
                    </li>
                </ul>
                {user?.nickname === "admin" &&
                    <div className="flex flex-col p-8" onClick={() =>setVisualizzazioneUser && setVisualizzazioneUser(!visualizzazioneUser)}>
                        <hr className="w-full border border-white"/>
                        <div className=" text-white my-2 text-sm flex justify-center">{visualizzazioneUser && visualizzazioneUser ?
                            <div className="flex items-center">
                                <span className=" text-white my-2 text-sm mr-4">user</span>
                                <BiGroup size={30}/>
                            </div>

                            :
                            <div className="flex items-center">
                                <span className=" text-white my-2 text-sm mr-4">admin</span>
                                <BiUser size={30}/>
                            </div>

                        }</div>
                        <hr className="w-full border border-white"/>
                    </div>
                }
                <div className="flex justify-center">
                    <button className="btn btn-sm px-7 border-white bg-transparent hover:bg-[#2866CC]">
                        <TbFileExport size={25} color="white"/>
                        <span className="text-white">Scarica Report</span>
                    </button>
                </div>
                {/*<div className="flex justify-center px-7 mt-5">
                    <div className="flex flex-col items-end">
                        <textarea className="textarea bg-[#bdccea] text-white h-[200px]" placeholder="Messaggio..."></textarea>
                        <div className="tooltip" data-tip="Invia Messaggio">
                            <Image src={"/logoSend.png"} alt={"logo send"} width={30} height={30} className="mt-5 opacity-40 hover:opacity-100"/>
                        </div>

                    </div>

                </div>*/}
                <div className="flex flex-row justify-center absolute right-1/2 left-1/2 bottom-3">
                    <Link href="/api/auth/logout" className="text-[#B6C7E8] p-1 px-20 rounded bg-[#E4E9F5] hover:bg-[#df20e3] hover:text-white hover:cursor-pointer">Logout</Link>
                </div>
            </div>
        </>
    )
}

export default SiseBar