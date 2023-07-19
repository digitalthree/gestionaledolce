'use client';
import Profile from "@/app/(user)/marketing/components/UserProfile";
import React, {useEffect, useState} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";
import {Gantt, Task} from "gantt-task-react";
import ResidenzaAnzianiAdmin from "@/app/(admin)/dashboard/components/ResidenzaAnzianiAdmin";
import SideBar from "@/app/(shared)/SideBar";
import GareAdmin from "@/app/(admin)/dashboard/components/GareAdmin";
import DiagrammaTemporale from "@/app/(shared)/diagrammaTemporale/DiagrammaTemporale";
import DashboardSaturazione from "@/app/(user)/marketing/components/dashboardSaturazione/DashboardSaturazione";
import Gare from "@/app/(user)/marketing/components/gare/Gare";

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

    return (
        <>
            <div className="w-full h-screen bg-gray-200">
                <div className="flex flex-no-wrap">
                    {/* Sidebar starts */}
                    <SideBar subMenu={subMenu} setSubMenu={setSubMenu} menu={menu} setMenu={setMenu} setVisualizzazioneUser={setVisualizzazioneUser} visualizzazioneUser={visualizzazioneUser}/>
                    {/* Sidebar ends */}
                    <div className="w-full bg-white p-10">
                        {subMenu === 'ra' && !visualizzazioneUser && <ResidenzaAnzianiAdmin/>}
                        {subMenu === 'ca' && !visualizzazioneUser && <ResidenzaAnzianiAdmin/>}
                        {subMenu === 'ss' && !visualizzazioneUser && <ResidenzaAnzianiAdmin/>}
                        {subMenu === 'rd' && !visualizzazioneUser && <ResidenzaAnzianiAdmin/>}
                        {subMenu === 'cd' && !visualizzazioneUser && <ResidenzaAnzianiAdmin/>}
                        {menu === 'gare' && !visualizzazioneUser && <GareAdmin/>}
                        {menu === 'planning' && !visualizzazioneUser && <DiagrammaTemporale editabile={true}/>}
                        {subMenu === 'ra' && visualizzazioneUser && <DashboardSaturazione colorePrincipale="#e4eaad" coloreSecondario="#e6eac3"/>}
                        {subMenu === 'ca' && visualizzazioneUser && <DashboardSaturazione colorePrincipale="#e4eaad" coloreSecondario="#e6eac3"/>}
                        {subMenu === 'ss' && visualizzazioneUser && <DashboardSaturazione colorePrincipale="#c9bfe2" coloreSecondario="#d7cfeb"/>}
                        {subMenu === 'rd' && visualizzazioneUser && <DashboardSaturazione colorePrincipale="#a8cde2" coloreSecondario="#bdd7e6"/>}
                        {subMenu === 'cd' && visualizzazioneUser && <DashboardSaturazione colorePrincipale="#a8cde2" coloreSecondario="#bdd7e6"/>}
                        {menu === 'gare' && visualizzazioneUser && <Gare/>}
                        {menu === 'planning' && visualizzazioneUser && <DiagrammaTemporale editabile={false}/>}
                    </div>
                </div>
            </div>
        </>

    )

}