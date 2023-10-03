import React from 'react';
import {BiSave} from "react-icons/bi";
import {InputDati, InputResidenza} from "@/model/ResidenzaAnziani";

export interface ButtonsProps{
    newResidenze: InputResidenza[],
    setNewResidenze: (value: (((prevState: InputResidenza[]) => InputResidenza[]) | InputResidenza[])) => void,
    newValue: (InputDati & { id: string })[],
    newDate: Date,
    datiReversed: (InputDati & { id: string })[],
    residenze: InputResidenza[],
    selectedMenuItem: "ra" | "ca" | "ss" | "rd" | "cd" | undefined,
    altreSocieta: boolean | undefined,
    updateResidenza: Function,
    updateResidenzaAltraSocieta: Function,
    updateCentroDiurnoAnziani: Function,
    updateStrutturaSanitaria: Function
}

const Buttons: React.FC<ButtonsProps> = ({
    newResidenze, setNewResidenze, newValue, newDate   , datiReversed,
    residenze, selectedMenuItem, altreSocieta, updateResidenza,
    updateResidenzaAltraSocieta, updateCentroDiurnoAnziani, updateStrutturaSanitaria
}) => {
    return(
        <>
            <div className="flex flex-row">
                <button
                    className="btn btn-sm bg-[#B5C5E7] text-white hover:opacity-80 hover:bg-[#4ecc8f] mb-2 w-1/3"
                    onClick={() => {
                        setNewResidenze(
                            newResidenze.map((r, index) =>
                                r.faunaDocumentId === newValue[index].id
                                    ? {
                                        ...r,
                                        dati: [...r.dati, {
                                            data: newValue[index].data,
                                            capienzaAttuale: newValue[index].capienzaAttuale,
                                            disponibilitaStruttura: newValue[index].disponibilitaStruttura,
                                            percentuale: newValue[index].percentuale,
                                            onOff: newValue[index].onOff
                                        }]
                                    }
                                    : r
                            )
                        )

                    }}
                >
                    <BiSave size={20}/>
                    Salva Dati del {newDate.toLocaleDateString()}
                </button>
                <button
                    className="btn btn-sm bg-[#B5C5E7] text-white hover:opacity-80 hover:bg-[#4ecc8f] mb-2 w-2/3"
                    onClick={() => {
                        let datiCopi: (InputDati & { id: string })[] = [...datiReversed]
                        let res: InputResidenza[] = residenze.map(or => {
                            return {...or, dati: []}
                        })
                        datiCopi.reverse().forEach(d => {
                            res.forEach(r => {
                                if (r.faunaDocumentId === d.id) {
                                    r.dati.push({
                                        data: d.data,
                                        capienzaAttuale: d.capienzaAttuale,
                                        disponibilitaStruttura: d.disponibilitaStruttura,
                                        percentuale: d.percentuale,
                                        onOff: d.onOff
                                    })
                                    //r.dati.push({data: d.data, capienzaAttuale: d.capienzaAttuale, capienzaComplessiva: dat.getMonth() > 3 ? 211 : 192})
                                }
                            })
                        })
                        res.forEach((r, index) => {
                            if (r.dati.length === residenze[index].dati.length) {
                                if (selectedMenuItem === 'ra' && !altreSocieta) {
                                    updateResidenza(r)
                                }
                                if (selectedMenuItem === 'ra' && altreSocieta) {
                                    updateResidenzaAltraSocieta(r)
                                }
                                if (selectedMenuItem === 'ca') {
                                    updateCentroDiurnoAnziani(r)
                                }
                                if (selectedMenuItem === 'ss') {
                                    updateStrutturaSanitaria(r)
                                }
                            }
                        })
                    }}
                >
                    <BiSave size={20}/>
                    Aggiorna Dati Precedenti
                </button>
            </div>
        </>
    )
}

export default Buttons