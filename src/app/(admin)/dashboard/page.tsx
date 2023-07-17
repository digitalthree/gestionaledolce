'use client';
import Profile from "@/app/(user)/marketing/components/UserProfile";
import React, {useEffect, useState} from "react";
import {useUser} from "@auth0/nextjs-auth0/client";
import {Gantt, Task} from "gantt-task-react";
import ResidenzaAnzianiAdmin from "@/app/(admin)/dashboard/components/ResidenzaAnzianiAdmin";
import SideBar from "@/app/(shared)/SideBar";
import GareAdmin from "@/app/(admin)/dashboard/components/GareAdmin";
import DiagrammaTemporale from "@/app/(shared)/diagrammaTemporale/DiagrammaTemporale";

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

    return (
        <>
            <div className="w-full h-screen bg-gray-200">
                <div className="flex flex-no-wrap">
                    {/* Sidebar starts */}
                    <SideBar subMenu={subMenu} setSubMenu={setSubMenu} menu={menu} setMenu={setMenu}/>
                    {/* Sidebar ends */}
                    <div className="w-full bg-white p-10">
                        {subMenu === 'ra' && <ResidenzaAnzianiAdmin/>}
                        {subMenu === 'ca' && <ResidenzaAnzianiAdmin/>}
                        {subMenu === 'ss' && <ResidenzaAnzianiAdmin/>}
                        {subMenu === 'rd' && <ResidenzaAnzianiAdmin/>}
                        {subMenu === 'cd' && <ResidenzaAnzianiAdmin/>}
                        {menu === 'gare' && <GareAdmin/>}
                        {menu === 'planning' && <DiagrammaTemporale editabile={true}/>}
                    </div>
                </div>
            </div>
        </>

    )

}