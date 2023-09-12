import React, {useState} from 'react';
import {DatiAggiuntivi} from "@/model/DatiAggiuntivi";
import {useUpdateDatiAggiuntivi} from "@/store/rtkqApi";

export interface GestioneDatiAggiuntiviProps{
    datiAggiuntivi: DatiAggiuntivi,
    capienzaTotale: number,
    setCapienzaTotale: (v:number) => void,
    percentualeTotale: number,
    setPercentualeTotale: (v:number) => void
}

const GestioneDatiAggiuntivi: React.FC<GestioneDatiAggiuntiviProps> = (
    {
        datiAggiuntivi, capienzaTotale, setCapienzaTotale, percentualeTotale, setPercentualeTotale
    }
) => {

    const [abilitaBtnDatiAggiuntivi, setAbilitaBtnDatiAggiuntivi] = useState(false)
    const [updateDatiAggiuntivi] = useUpdateDatiAggiuntivi()

    return(
        <>
            <div className="flex flex-row items-center w-full gap-4">
                <span>Capienza Complessiva: </span>
                <input type="number"
                       className="border border-blue-200 p-1"
                       value={capienzaTotale}
                       onChange={(e) => {
                           setCapienzaTotale(parseFloat(e.currentTarget.value))
                           setAbilitaBtnDatiAggiuntivi(true)
                       }}
                />
                <span>Percentuale Totale: </span>
                <input type="number"
                       className="p-1 border border-blue-200"
                       value={percentualeTotale}
                       onChange={(e) => {
                           setPercentualeTotale(parseFloat(e.currentTarget.value))
                           setAbilitaBtnDatiAggiuntivi(true)
                       }}
                />
                <button className="btn btn-sm bg-[#B5C5E7] text-white hover:opacity-80 hover:bg-[#4ecc8f] w-1/5"
                        disabled={!abilitaBtnDatiAggiuntivi}
                        onClick={() => {
                            updateDatiAggiuntivi({...datiAggiuntivi, capienzaComplessiva: capienzaTotale, percentualeTotale: percentualeTotale} as DatiAggiuntivi)
                            setAbilitaBtnDatiAggiuntivi(false)
                        }}
                >
                    Salva
                </button>
            </div>
        </>
    )
}

export default GestioneDatiAggiuntivi