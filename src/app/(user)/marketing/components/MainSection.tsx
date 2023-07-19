import React, {useState} from "react";
import DiagrammaTemporale from "@/app/(shared)/diagrammaTemporale/DiagrammaTemporale";
import DashboardSaturazione from "@/app/(user)/marketing/components/dashboardSaturazione/DashboardSaturazione";
import SideBar from "@/app/(shared)/SideBar";
import {useDispatch} from "react-redux";
import Gare from "@/app/(user)/marketing/components/gare/Gare";

export default function MainSection() {

    const [subMenu, setSubMenu] = useState<undefined | 'ra' | 'ca' | 'ss' | 'rd' | 'cd'>('ra');
    const [menu, setMenu] = useState<undefined | 'planning' | 'gare' | 'contratti'>(undefined);

    return (
        <>
            <div className="w-full h-screen bg-gray-200 overflow-hidden">
                <div className="flex flex-no-wrap">
                    {/* Sidebar starts */}
                    <SideBar subMenu={subMenu} setSubMenu={setSubMenu} menu={menu} setMenu={setMenu}/>
                    {/* Sidebar ends */}
                    <div className="w-full bg-white">
                        {/* Remove class [ h-64 ] when adding a card block */}
                        <div className="p-5">
                            {menu === 'planning' && <DiagrammaTemporale editabile={false}/>}
                            {menu === undefined && subMenu === 'ra' && <DashboardSaturazione colorePrincipale="#e4eaad" coloreSecondario="#e6eac3"/>}
                            {menu === undefined && subMenu === 'ca' && <DashboardSaturazione colorePrincipale="#e4eaad" coloreSecondario="#e6eac3"/>}
                            {menu === undefined && subMenu === 'ss' && <DashboardSaturazione colorePrincipale="#c9bfe2" coloreSecondario="#d7cfeb"/>}
                            {menu === undefined && subMenu === 'rd' && <DashboardSaturazione colorePrincipale="#a8cde2" coloreSecondario="#bdd7e6"/>}
                            {menu === undefined && subMenu === 'cd' && <DashboardSaturazione colorePrincipale="#a8cde2" coloreSecondario="#bdd7e6"/>}
                            {menu == 'gare' && <Gare/>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
