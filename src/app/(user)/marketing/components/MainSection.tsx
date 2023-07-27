import React, {useState} from "react";
import DiagrammaTemporale from "@/app/(shared)/diagrammaTemporale/DiagrammaTemporale";
import DashboardSaturazione from "@/app/(user)/marketing/components/dashboardSaturazione/DashboardSaturazione";
import SideBar from "@/app/(shared)/sideBar/SideBar";
import Gare from "@/app/(user)/marketing/components/gare/Gare";
import {
    useGetCentriDiurniAnziani,
    useGetResidenze,
    useGetResidenzeAltraSocieta,
    useGetStruttureSanitarie
} from "@/store/rtkqApi";
import {InputResidenza} from "@/model/ResidenzaAnziani";

export default function MainSection() {

    const [subMenu, setSubMenu] = useState<undefined | 'ra' | 'ca' | 'ss' | 'rd' | 'cd'>('ra');
    const [menu, setMenu] = useState<undefined | 'planning' | 'gare' | 'contratti'>(undefined);

    const res = useGetResidenze()

    let residenze:InputResidenza[] = []
    if(res.data){
        residenze = res.data
    }

    const res2 = useGetCentriDiurniAnziani()

    let centri:InputResidenza[] = []
    if(res2.data){
        centri = res2.data
    }

    const res3 = useGetStruttureSanitarie()

    let strutture:InputResidenza[] = []
    if(res3.data){
        strutture = res3.data
    }

    const res4 = useGetResidenzeAltraSocieta()
    let residenzeAltreSocieta: InputResidenza[] = []
    if(res4.data){
        residenzeAltreSocieta = res4.data
    }
    return (
        <>
            <div className="w-full h-screen bg-gray-200 overflow-hidden">
                <div className="flex flex-no-wrap">
                    {/* Sidebar starts */}
                    <SideBar subMenu={subMenu} setSubMenu={setSubMenu} menu={menu} setMenu={setMenu}/>
                    {/* Sidebar ends */}
                    <div className="w-full bg-white overflow-hidden p-10">
                            {menu === 'planning' && <DiagrammaTemporale editabile={false}/>}
                            {menu === undefined && subMenu === 'ra' && <DashboardSaturazione colorePrincipale="#0066cc" coloreSecondario="#B5C5E7" dati={residenze} datiAltreSocieta={residenzeAltreSocieta} selectedMenuItem={subMenu}/>}
                            {menu === undefined && subMenu === 'ca' && <DashboardSaturazione colorePrincipale="#0066cc" coloreSecondario="#B5C5E7" dati={centri} datiAltreSocieta={residenzeAltreSocieta} selectedMenuItem={subMenu}/>}
                            {menu === undefined && subMenu === 'ss' && <DashboardSaturazione colorePrincipale="#0066cc" coloreSecondario="#B5C5E7" dati={strutture} datiAltreSocieta={residenzeAltreSocieta} selectedMenuItem={subMenu}/>}
                            {menu === undefined && subMenu === 'rd' && <DashboardSaturazione colorePrincipale="#0066cc" coloreSecondario="#B5C5E7" dati={residenze} datiAltreSocieta={residenzeAltreSocieta} selectedMenuItem={subMenu}/>}
                            {menu === undefined && subMenu === 'cd' && <DashboardSaturazione colorePrincipale="#0066cc" coloreSecondario="#B5C5E7" dati={residenze} datiAltreSocieta={residenzeAltreSocieta} selectedMenuItem={subMenu}/>}
                            {menu == 'gare' && <Gare/>}
                            {menu == 'contratti' && <div className="absolute top-1/2 left-1/2">Sezione in aggiornamento</div>}
                    </div>
                </div>
            </div>
        </>
    );
}
