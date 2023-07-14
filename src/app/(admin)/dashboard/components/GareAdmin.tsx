import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {Gara} from "@/model/Gara";
import {useGetGaraByAnno, useUpdateGaraMutation} from "@/store/rtkqApi.ts";


export interface GareAdminProps {

}

const GareAdmin: React.FC<GareAdminProps> = ({}) => {

    const dispatch = useDispatch()
    const resGara = useGetGaraByAnno(new Date().getFullYear())
    let gara = {} as Gara
    if(resGara.data){
        gara = resGara.data[0]
    }
    const [inputsGara, setInputsGara] = useState<{ label: string, value: number }[]>(
        Object.entries(gara).map(entry => ({label: entry[0], value: entry[1]}))
    )

    const [updateGara, {isLoading}] = useUpdateGaraMutation()

    useEffect(() => {
        setInputsGara(
            Object.entries(gara).map(entry => ({label: entry[0], value: entry[1]}))
        )
    }, [gara])



    return (
        <>
            {gara && Object.entries(inputsGara).map((entry, index) => {
                return (
                    <>
                        {inputsGara[index].label !== 'faunaDocumentId' &&
                            <div className="grid grid-cols-12 gap-10 mt-2" key={inputsGara[index].label}>
                                <span className="col-span-3">{inputsGara[index].label}</span>
                                <input type="number" placeholder="Input 1"
                                       className="input input-bordered input-info w-full col-span-3"
                                       value={inputsGara[index].value}
                                       disabled={inputsGara[index].label === 'anno'}
                                       onChange={(e) => {
                                           setInputsGara(
                                               inputsGara.map((ig) => {
                                                   if (ig.label === entry[1].label) {
                                                       return {...ig, value: parseInt(e.currentTarget.value)}
                                                   } else {
                                                       return {...ig}
                                                   }

                                               })
                                           )
                                       }}
                                />
                            </div>
                        }
                    </>
                )
            })}
            <button className="btn btn-outline btn-info mt-10 w-1/2"
                    onClick={() => {
                        let garaToUpdate = {
                            valoreDellaProduzione: inputsGara[0].value,
                            valoreGareInScadenza: inputsGara[1].value,
                            fatturatoConfermato: inputsGara[2].value,
                            gareInScadenza: inputsGara[3].value,
                            gareInCorso: inputsGara[4].value,
                            gareVinte: inputsGara[5].value,
                            garePerse: inputsGara[6].value,
                            gareNuovePartecipate: inputsGara[7].value,
                            gareNuoveVinte: inputsGara[8].value,
                            annoNuovoFatturato: inputsGara[9].value,
                            portafoglioAcquisto: inputsGara[10].value,
                            faunaDocumentId: gara.faunaDocumentId,
                            anno: gara.anno
                        } as Gara
                        updateGara(garaToUpdate).then(res => {
                            alert("Le informazioni sono state aggiornate correttamente!")
                        })


                    }}
            >Aggiorna Informazioni
            </button>

        </>
    )
}

export default GareAdmin