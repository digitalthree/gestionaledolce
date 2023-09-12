'use client';
import Profile from "@/app/(user)/marketing/components/UserProfile";
import React, {useEffect, useState} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";
import {Gantt, Task} from "gantt-task-react";
import ResidenzaAnzianiAdmin from "@/app/(admin)/dashboard/components/ResidenzaAnzianiAdmin";
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

    let residenze: InputResidenza[] = []
    if (res.data) {
        residenze = res.data
    }

    const res2 = useGetCentriDiurniAnziani()

    let centri: InputResidenza[] = []
    if (res2.data) {
        centri = res2.data
    }

    const res3 = useGetStruttureSanitarie()

    let strutture: InputResidenza[] = []
    if (res3.data) {
        strutture = res3.data
    }

    const res4 = useGetResidenzeAltraSocieta()
    let residenzeAltreSocieta: InputResidenza[] = []
    if (res4.data) {
        residenzeAltreSocieta = res4.data
    }

    const res5 = useGetDatiAggiuntivi()
    let datiAggiuntivi: DatiAggiuntivi[] = []
    if(res5.data){
        datiAggiuntivi = res5.data
    }

    return (
        <>
            <div className="w-full h-screen bg-gray-200">
                <div className="flex flex-no-wrap">
                    {/* Sidebar starts */}
                    <SideBar subMenu={subMenu} setSubMenu={setSubMenu} menu={menu} setMenu={setMenu}
                             setVisualizzazioneUser={setVisualizzazioneUser} visualizzazioneUser={visualizzazioneUser}/>
                    {/* Sidebar ends */}
                    <div className="w-full bg-white p-10 overflow-x-hidden overflow-y-auto max-h-[100vh]">
                        {subMenu === 'ra' && !visualizzazioneUser && <>
                            <ResidenzaAnzianiAdmin dati={residenze} editabile={true} selectedMenuItem={subMenu} datiAggiuntivi={datiAggiuntivi.filter(d => d.tipo === "radolce")[0]}/>
                            <ResidenzaAnzianiAdmin dati={residenzeAltreSocieta} editabile={true} selectedMenuItem={subMenu} altreSocieta={true} datiAggiuntivi={datiAggiuntivi.filter(d => d.tipo === "raaltre")[0]}/>
                        </>}
                        {subMenu === 'ca' && !visualizzazioneUser &&
                            <ResidenzaAnzianiAdmin dati={centri} editabile={true} selectedMenuItem={subMenu} datiAggiuntivi={datiAggiuntivi.filter(d => d.tipo === "cdadolce")[0]}/>}
                        {subMenu === 'ss' && !visualizzazioneUser &&
                            <ResidenzaAnzianiAdmin dati={strutture} editabile={true} selectedMenuItem={subMenu} datiAggiuntivi={datiAggiuntivi.filter(d => d.tipo === "ssdolce")[0]}/>}
                        {subMenu === 'rd' && !visualizzazioneUser &&
                            <ResidenzaAnzianiAdmin dati={residenze} editabile={true} selectedMenuItem={subMenu} datiAggiuntivi={datiAggiuntivi.filter(d => d.tipo === "radolce")[0]}/>}
                        {subMenu === 'cd' && !visualizzazioneUser &&
                            <ResidenzaAnzianiAdmin dati={residenze} editabile={true} selectedMenuItem={subMenu} datiAggiuntivi={datiAggiuntivi.filter(d => d.tipo === "radolce")[0]}/>}
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
                </div>
            </div>
        </>

    )

}