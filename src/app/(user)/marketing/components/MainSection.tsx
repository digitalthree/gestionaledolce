import React, {useEffect, useState} from "react";
import DiagrammaTemporale from "@/app/(shared)/diagrammaTemporale/DiagrammaTemporale";
import DashboardSaturazione from "@/app/(user)/marketing/components/dashboardSaturazione/DashboardSaturazione";
import SideBar from "@/app/(shared)/sideBar/SideBar";
import Gare from "@/app/(user)/marketing/components/gare/Gare";
import {
    useGetCentriDiurniAnziani, useGetDatiAggiuntivi,
    useGetResidenze,
    useGetResidenzeAltraSocieta,
    useGetStruttureSanitarie
} from "@/store/rtkqApi";
import {InputResidenza} from "@/model/ResidenzaAnziani";
import {DatiAggiuntivi} from "@/model/DatiAggiuntivi";

export default function MainSection() {

    const [subMenu, setSubMenu] = useState<undefined | 'ra' | 'ca' | 'ss' | 'rd' | 'cd'>('ra');
    const [menu, setMenu] = useState<undefined | 'planning' | 'gare' | 'contratti'>(undefined);

    const res = useGetResidenze()
    const res2 = useGetCentriDiurniAnziani()
    const res3 = useGetStruttureSanitarie()
    const res4 = useGetResidenzeAltraSocieta()
    const res5 = useGetDatiAggiuntivi()

    const [residenze, setResidenze] = useState<InputResidenza[]>([])
    const [centri, setCentri] = useState<InputResidenza[]>([])
    const [strutture, setStrutture] = useState<InputResidenza[]>([])
    const [residenzeAltreSocieta, setResidenzeAltreSocieta] = useState<InputResidenza[]>([])

    useEffect(() => {
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
    }, [res.data, res2.data, res3.data, res4.data]);
    return (
        <>
            <div className="w-full h-screen bg-gray-200 overflow-hidden">
                <div className="flex flex-no-wrap">
                    {/* Sidebar starts */}
                    <SideBar subMenu={subMenu} setSubMenu={setSubMenu} menu={menu} setMenu={setMenu}/>
                    {/* Sidebar ends */}
                    {(res.isLoading || res2.isLoading || res3.isLoading || res4.isLoading || res5.isLoading ) ?
                        <div className="absolute top-1/2 left-1/2">
                            <span className="loading loading-bars loading-lg text-[#B5C5E7]"></span>
                        </div> :
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
                    }
                </div>
            </div>
        </>
    );
}
