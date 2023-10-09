import React, {useEffect, useState} from "react";
import {
    useCreateCentroDiurnoAnzianiMutation,
    useCreateResidenzaAltraSocietaMutation,
    useCreateResidenzaMutation, useCreateStrutturaSanitariaMutation,
    useUpdateCentroDiurnoAnzianiMutation, useUpdateDatiAggiuntivi, useUpdateResidenzaAltraSocietaMutation,
    useUpdateResidenzaMutation,
    useUpdateStrutturaSanitariaMutation
} from "@/store/rtkqApi";
import {InputDati, InputResidenza} from "@/model/ResidenzaAnziani";
import {BiPlus, BiSave} from "react-icons/bi";
import {BsFillTrash2Fill} from "react-icons/bs";
import {
    calcoloCapienzaComplessiva
} from "@/app/(user)/marketing/components/dashboardSaturazione/components/BubbleComponent";
import {DatiAggiuntivi} from "@/model/DatiAggiuntivi";
import GestioneDatiAggiuntivi from "@/app/(admin)/dashboard/components/(saturazione)/components/GestioneDatiAggiuntivi";
import DataTable from "@/app/(admin)/dashboard/components/(saturazione)/components/DataTable";
import ModaleNuovaStruttura from "@/app/(admin)/dashboard/components/(saturazione)/components/ModaleNuovaStruttura";
import Buttons from "@/app/(admin)/dashboard/components/(saturazione)/components/Buttons";
import Nota from "@/app/(admin)/dashboard/components/(saturazione)/components/Nota";
import {TbFileExport} from "react-icons/tb";
import {CSVLink} from "react-csv";

export interface ResidenzaAnzianiAdminProps {
    dati: InputResidenza[],
    editabile: boolean,
    selectedMenuItem: undefined | 'ra' | 'ca' | 'ss' | 'rd' | 'cd',
    altreSocieta?: boolean,
    datiAggiuntivi: DatiAggiuntivi
}

const Saturazione: React.FC<ResidenzaAnzianiAdminProps> = ({
                                                               dati,
                                                               editabile,
                                                               selectedMenuItem,
                                                               altreSocieta,
                                                               datiAggiuntivi
                                                           }) => {

    const [updateResidenza, resUpdateResidenza] = useUpdateResidenzaMutation()
    const [updateStrutturaSanitaria, resUpdateStrutturaSanitaria] = useUpdateStrutturaSanitariaMutation()
    const [createResidenza, resCreateResidenza] = useCreateResidenzaMutation()
    const [createResidenzaAltreSocieta, resCreateResidenzaAltreSocieta] = useCreateResidenzaAltraSocietaMutation()
    const [createCentroDiurnoAnziani, resCreateCentroDiurnoAnziani] = useCreateCentroDiurnoAnzianiMutation()
    const [createStrutturaSanitaria, resCreateStrutturaSanitaria] = useCreateStrutturaSanitariaMutation()
    const [updateCentroDiurnoAnziani, resUpdateCentroDiurnoAnziani] = useUpdateCentroDiurnoAnzianiMutation()
    const [updateResidenzaAltraSocieta, resUpdateResidenzaAltraSocieta] = useUpdateResidenzaAltraSocietaMutation()
    const [newValue, setNewValue] = useState<(InputDati & { id: string })[]>([])
    const [datiReversed, setDatiReversed] = useState<(InputDati & { id: string })[]>([])
    const [residenze, setResidenze] = useState<InputResidenza[]>([])
    const [newResidenze, setNewResidenze] = useState<InputResidenza[]>([])
    const [newDate, setNewDate] = useState<Date>(new Date())
    const [capienzaTotale, setCapienzaTotale] = useState<number>(0)
    const [percentualeTotale, setPercentualeTotale] = useState<number>(0)
    const [percentualeTotaleSettPrec, setPercentualeTotaleSettPrec] = useState<number>(0)
    const [updateDatiAggiuntivi, resUpdateDatiAggiuntivi] = useUpdateDatiAggiuntivi()
    const [nota, setNota] = useState<string>("")
    const [csvData, setCsvData] = useState<string[][]>([])
    let csvHeader = ["Area", "Località", "Provincia", "Servizio", "Struttura", "Nota"]
    const [fileName, setFileName] = useState<string>("")
    useEffect(() => {
        if (datiAggiuntivi) {
            setCapienzaTotale(datiAggiuntivi.capienzaComplessiva)
            setPercentualeTotale(datiAggiuntivi.percentualeTotale)
            setPercentualeTotaleSettPrec(datiAggiuntivi.percentualeTotaleSettPrec)
            setNota(datiAggiuntivi.nota)
        }
    }, [datiAggiuntivi]);


    useEffect(() => {
        if (dati.length > 0) {
            if (selectedMenuItem === 'ra' && !altreSocieta) {
                setFileName("residenza_anziani_report")
            }
            if (selectedMenuItem === 'ra' && altreSocieta) {
                setFileName("residenza_anziani_altre_societa_report")
            }
            if (selectedMenuItem === 'ca') {
                setFileName("centri_diurni_anziani_report")
            }
            if (selectedMenuItem === 'ss') {
                setFileName("strutture_sanitarie_report")
            }
            dati[0].dati.forEach(d => {
                csvHeader = [...csvHeader, d.data]
            })
            setCsvData([csvHeader, ...dati.map(({area, localita, provincia, servizio, struttura, nota, dati}) => [
                area, localita, provincia, servizio, struttura, nota, ...dati.map(da => da.capienzaAttuale.toString())
            ])])
            setResidenze(dati)
            setNewResidenze(dati)
            let d = dati[0].dati[dati[0].dati.length - 1].data.split("/");
            let dat = new Date(new Date(d[2] + '/' + d[1] + '/' + (parseInt(d[0])).toLocaleString()).getTime() + (86400000 * 7));
            setNewDate(dat)
            setNewValue([])
            setDatiReversed([])
            dati.forEach(ic => {
                setNewValue((old) => [...old, {
                    id: ic.faunaDocumentId as string,
                    disponibilitaStruttura: 0,
                    capienzaAttuale: 0,
                    percentuale: 0,
                    data: newDate.toLocaleDateString(),
                    onOff: ic.onOff
                }])
                let datiCopy = [...ic.dati]
                datiCopy.reverse().forEach((d) => {
                    setDatiReversed((old) => [...old, {
                        id: ic.faunaDocumentId as string,
                        disponibilitaStruttura: d.disponibilitaStruttura,
                        capienzaAttuale: d.capienzaAttuale,
                        percentuale: d.percentuale,
                        data: d.data,
                        onOff: d.onOff
                    }])
                })
            })
        }

    }, [dati])

    useEffect(() => {
        if (newResidenze.length > 0) {
            newResidenze.forEach((nr, index) => {
                if (nr.dati.length > dati[index].dati.length) {
                    if (selectedMenuItem === 'ra' && !altreSocieta) {
                        updateResidenza(nr)
                    }
                    if (selectedMenuItem === 'ra' && altreSocieta) {
                        updateResidenzaAltraSocieta(nr)
                    }
                    if (selectedMenuItem === 'ca') {
                        updateCentroDiurnoAnziani(nr)
                    }
                    if (selectedMenuItem === 'ss') {
                        updateStrutturaSanitaria(nr)
                    }

                }
            })
        }

    }, [newResidenze])



    return (
        <>
            {(resUpdateResidenza.isLoading || resCreateResidenza.isLoading || resCreateStrutturaSanitaria.isLoading || resUpdateStrutturaSanitaria.isLoading
                    || resCreateCentroDiurnoAnziani.isLoading || resUpdateCentroDiurnoAnziani.isLoading || resCreateResidenzaAltreSocieta.isLoading
                    || resUpdateResidenzaAltraSocieta.isLoading || resUpdateDatiAggiuntivi.isLoading) &&
                <div className="absolute top-1/2 left-1/2">
                    <span className="loading loading-bars loading-lg text-[#B5C5E7]"></span>
                </div>
            }
            <div className={
                `${!editabile && 'flex flex-col justify-center'} 
                 ${(resUpdateResidenza.isLoading || resCreateResidenza.isLoading || resCreateStrutturaSanitaria.isLoading || resUpdateStrutturaSanitaria.isLoading
                    || resCreateCentroDiurnoAnziani.isLoading || resUpdateCentroDiurnoAnziani.isLoading || resCreateResidenzaAltreSocieta.isLoading
                    || resUpdateResidenzaAltraSocieta.isLoading || resUpdateDatiAggiuntivi.isLoading) && 'opacity-10'}
                 `
            }
            >
                {editabile && !altreSocieta &&
                    <div className="mb-5">
                        <h2 className="mb-5 font-semibold text-[#485EA6] text-2xl">SERVIZI IN CAPO A SOCIETA DOLCE</h2>
                        <GestioneDatiAggiuntivi datiAggiuntivi={datiAggiuntivi} capienzaTotale={capienzaTotale}
                                                setCapienzaTotale={setCapienzaTotale}
                                                percentualeTotale={percentualeTotale}
                                                setPercentualeTotale={setPercentualeTotale}
                                                percentualeTotaleSettPrec={percentualeTotaleSettPrec}
                                                setPercentualeTotaleSettPrec={setPercentualeTotaleSettPrec}
                        />
                    </div>
                }
                {editabile && altreSocieta &&
                    <div className="mb-5">
                        <h2 className="mt-5 mb-5 font-semibold text-[#485EA6] text-2xl">SERVIZI IN CAPO AD ALTRE
                            SOCIETA</h2>
                        <GestioneDatiAggiuntivi datiAggiuntivi={datiAggiuntivi} capienzaTotale={capienzaTotale}
                                                setCapienzaTotale={setCapienzaTotale}
                                                percentualeTotale={percentualeTotale}
                                                setPercentualeTotale={setPercentualeTotale}
                                                percentualeTotaleSettPrec={percentualeTotaleSettPrec}
                                                setPercentualeTotaleSettPrec={setPercentualeTotaleSettPrec}
                        />
                    </div>

                }
                <DataTable residenze={residenze} setResidenze={setResidenze} editabile={editabile} newValue={newValue}
                           setNewValue={setNewValue} newDate={newDate} datiReversed={datiReversed}
                           setDatiReversed={setDatiReversed}
                />

                {editabile &&
                    <div className="flex flex-col">
                        <Buttons newResidenze={newResidenze} setNewResidenze={setNewResidenze} newValue={newValue}
                                 newDate={newDate} datiReversed={datiReversed} residenze={residenze}
                                 selectedMenuItem={selectedMenuItem} altreSocieta={altreSocieta}
                                 updateResidenza={updateResidenza}
                                 updateResidenzaAltraSocieta={updateResidenzaAltraSocieta}
                                 updateCentroDiurnoAnziani={updateCentroDiurnoAnziani}
                                 updateStrutturaSanitaria={updateStrutturaSanitaria}
                        />
                        <ModaleNuovaStruttura residenze={residenze} createResidenza={createResidenza}
                                              createResidenzaAltreSocieta={createResidenzaAltreSocieta}
                                              createCentroDiurnoAnziani={createCentroDiurnoAnziani}
                                              createStrutturaSanitaria={createStrutturaSanitaria}
                                              selectedMenuItem={selectedMenuItem} altreSocieta={altreSocieta}
                        />
                        <div className="flex justify-center">
                            <CSVLink data={csvData} filename={fileName}
                               className="btn btn-sm w-full px-7 mt-2 mb-5 border-white bg-[#2866CC] hover:bg-[#2866CC] hover:opacity-70">
                                <TbFileExport size={25} color="white"/>
                                <span className="text-white">Scarica Report</span>
                            </CSVLink>
                        </div>
                    </div>
                }
                <Nota editabile={editabile} updateDatiAggiuntivi={updateDatiAggiuntivi}
                      nota={nota} setNota={setNota} datiAggiuntivi={datiAggiuntivi}
                />
            </div>
        </>
    );
}

export default Saturazione