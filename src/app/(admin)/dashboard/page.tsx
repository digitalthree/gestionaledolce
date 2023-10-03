'use client';
import Profile from "@/app/(user)/marketing/components/UserProfile";
import React, {useEffect, useState} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";
import {Gantt, Task} from "gantt-task-react";
import Saturazione from "@/app/(admin)/dashboard/components/(saturazione)/Saturazione";
import SideBar from "@/app/(shared)/sideBar/SideBar";
import GareAdmin from "@/app/(admin)/dashboard/components/GareAdmin";
import DiagrammaTemporale from "@/app/(shared)/diagrammaTemporale/DiagrammaTemporale";
import DashboardSaturazione from "@/app/(user)/marketing/components/dashboardSaturazione/DashboardSaturazione";
import Gare from "@/app/(user)/marketing/components/gare/Gare";
import {
    useGetCentriDiurniAnziani, useGetDatiAggiuntivi,
    useGetResidenze,
    useGetResidenzeAltraSocieta,
    useGetStruttureSanitarie
} from "@/store/rtkqApi";
import {InputResidenza} from "@/model/ResidenzaAnziani";
import {DatiAggiuntivi} from "@/model/DatiAggiuntivi";

export default function Page() {
    const {user} = useUser()

    if (user) {
        if (user.nickname !== "admin") {
            window.alert("Non hai i permessi necessari per accedere a questa sezione")
            window.history.back()
        }
    }

    const [subMenu, setSubMenu] = useState<undefined | 'ra' | 'ca' | 'ss' | 'rd' | 'cd'>('ra');
    const [menu, setMenu] = useState<undefined | 'planning' | 'gare' | 'contratti'>(undefined);

    const [visualizzazioneUser, setVisualizzazioneUser] = useState<boolean>(false)

    const res = useGetResidenze()
    const res2 = useGetCentriDiurniAnziani()
    const res3 = useGetStruttureSanitarie()
    const res4 = useGetResidenzeAltraSocieta()
    const res5 = useGetDatiAggiuntivi()

    const [residenze, setResidenze] = useState<InputResidenza[]>([])
    const [centri, setCentri] = useState<InputResidenza[]>([])
    const [strutture, setStrutture] = useState<InputResidenza[]>([])
    const [residenzeAltreSocieta, setResidenzeAltreSocieta] = useState<InputResidenza[]>([])
    const [datiAggiuntivi, setDatiAggiuntivi] = useState<DatiAggiuntivi[]>([])

    useEffect(() => {
        console.log('qui')
        if (res.data) {
            setResidenze([
                ...res.data.filter(d => d.area === "Nord Ovest"),
                ...res.data.filter(d => d.area === "Centro"),
                ...res.data.filter(d => d.area === "Sede"),

            ])
        }
        if (res2.data) {
            setCentri([
                ...res2.data.filter(d => d.area === "Nord Ovest"),
                ...res2.data.filter(d => d.area === "Centro"),
                ...res2.data.filter(d => d.area === "Sede"),

            ])
        }
        if (res3.data) {
            setStrutture([
                ...res3.data.filter(d => d.area === "Nord Ovest"),
                ...res3.data.filter(d => d.area === "Centro"),
                ...res3.data.filter(d => d.area === "Sede"),

            ])
        }
        if (res4.data) {
            setResidenzeAltreSocieta([
                ...res4.data.filter(d => d.area === "Nord Ovest"),
                ...res4.data.filter(d => d.area === "Centro"),
                ...res4.data.filter(d => d.area === "Sede"),

            ])
        }
        if(res5.data){
            setDatiAggiuntivi(res5.data)
        }
    }, [res.data, res2.data, res3.data, res4.data, res5.data]);


    return (
        <>
            <div className="w-full h-screen bg-gray-200">
                <div className="flex flex-no-wrap">
                    {/* Sidebar starts */}
                    <SideBar subMenu={subMenu} setSubMenu={setSubMenu} menu={menu} setMenu={setMenu}
                             setVisualizzazioneUser={setVisualizzazioneUser} visualizzazioneUser={visualizzazioneUser}/>
                    {/* Sidebar ends */}
                    {(res.isLoading || res2.isLoading || res3.isLoading || res4.isLoading || res5.isLoading ) ?
                        <div className="absolute top-1/2 left-1/2">
                            <span className="loading loading-bars loading-lg text-[#B5C5E7]"></span>
                        </div>
                        :
                        <div className="w-full bg-white p-10 overflow-x-hidden overflow-y-auto max-h-[100vh]">
                            {subMenu === 'ra' && !visualizzazioneUser && <>
                                <Saturazione dati={residenze} editabile={true} selectedMenuItem={subMenu} datiAggiuntivi={datiAggiuntivi.filter(d => d.tipo === "radolce")[0]}/>
                                <Saturazione dati={residenzeAltreSocieta} editabile={true} selectedMenuItem={subMenu} altreSocieta={true} datiAggiuntivi={datiAggiuntivi.filter(d => d.tipo === "raaltre")[0]}/>
                            </>}
                            {subMenu === 'ca' && !visualizzazioneUser &&
                                <Saturazione dati={centri} editabile={true} selectedMenuItem={subMenu} datiAggiuntivi={datiAggiuntivi.filter(d => d.tipo === "cdadolce")[0]}/>}
                            {subMenu === 'ss' && !visualizzazioneUser &&
                                <Saturazione dati={strutture} editabile={true} selectedMenuItem={subMenu} datiAggiuntivi={datiAggiuntivi.filter(d => d.tipo === "ssdolce")[0]}/>}
                            {subMenu === 'rd' && !visualizzazioneUser &&
                                <Saturazione dati={residenze} editabile={true} selectedMenuItem={subMenu} datiAggiuntivi={datiAggiuntivi.filter(d => d.tipo === "radolce")[0]}/>}
                            {subMenu === 'cd' && !visualizzazioneUser &&
                                <Saturazione dati={residenze} editabile={true} selectedMenuItem={subMenu} datiAggiuntivi={datiAggiuntivi.filter(d => d.tipo === "radolce")[0]}/>}
                            {menu === 'gare' && !visualizzazioneUser && <GareAdmin/>}
                            {menu === 'planning' && !visualizzazioneUser && <DiagrammaTemporale editabile={true}/>}
                            {subMenu === 'ra' && visualizzazioneUser &&
                                <DashboardSaturazione colorePrincipale="#0066cc" coloreSecondario="#B5C5E7" dati={residenze}
                                                      datiAltreSocieta={residenzeAltreSocieta} selectedMenuItem={subMenu}/>}
                            {subMenu === 'ca' && visualizzazioneUser &&
                                <DashboardSaturazione colorePrincipale="#0066cc" coloreSecondario="#B5C5E7" dati={centri}
                                                      datiAltreSocieta={residenzeAltreSocieta} selectedMenuItem={subMenu}/>}
                            {subMenu === 'ss' && visualizzazioneUser &&
                                <DashboardSaturazione colorePrincipale="#0066cc" coloreSecondario="#B5C5E7" dati={strutture}
                                                      datiAltreSocieta={residenzeAltreSocieta} selectedMenuItem={subMenu}/>}
                            {subMenu === 'rd' && visualizzazioneUser &&
                                <DashboardSaturazione colorePrincipale="#0066cc" coloreSecondario="#B5C5E7" dati={residenze}
                                                      datiAltreSocieta={residenzeAltreSocieta} selectedMenuItem={subMenu}/>}
                            {subMenu === 'cd' && visualizzazioneUser &&
                                <DashboardSaturazione colorePrincipale="#0066cc" coloreSecondario="#B5C5E7" dati={residenze}
                                                      datiAltreSocieta={residenzeAltreSocieta} selectedMenuItem={subMenu}/>}
                            {menu === 'gare' && visualizzazioneUser && <Gare/>}
                            {menu === 'planning' && visualizzazioneUser && <DiagrammaTemporale editabile={false}/>}
                            {menu == 'contratti' &&
                                <div className="absolute top-1/2 left-1/2">Sezione in aggiornamento</div>}
                        </div>
                    }

                </div>
            </div>
        </>

    )

}