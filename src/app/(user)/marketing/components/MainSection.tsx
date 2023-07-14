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
            <div className="w-full h-screen bg-gray-200">
                <div className="flex flex-no-wrap">
                    {/* Sidebar starts */}
                    <SideBar subMenu={subMenu} setSubMenu={setSubMenu} menu={menu} setMenu={setMenu}/>
                    {/* Sidebar ends */}
                    <div className="w-full bg-white">
                        {/* Remove class [ h-64 ] when adding a card block */}
                        <div className="p-5">
                            {menu === 'planning' && <DiagrammaTemporale editabile={false}/>}
                            {menu === undefined && subMenu === 'ra' && <DashboardSaturazione colorePrincipale="#B5C5E7"/>}
                            {menu === undefined && subMenu === 'ca' && <DashboardSaturazione colorePrincipale="#F5B434"/>}
                            {menu === undefined && subMenu === 'ss' && <DashboardSaturazione colorePrincipale="#C295F7"/>}
                            {menu === undefined && subMenu === 'rd' && <DashboardSaturazione colorePrincipale="#F7959C"/>}
                            {menu === undefined && subMenu === 'cd' && <DashboardSaturazione colorePrincipale="#95F7C5"/>}
                            {menu == 'gare' && <Gare/>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
