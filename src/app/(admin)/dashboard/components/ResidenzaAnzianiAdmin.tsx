import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useGetResidenze, useUpdateResidenzaMutation} from "@/store/rtkqApi";
import {skipToken} from "@reduxjs/toolkit/query";
import {InputResidenza} from "@/model/ResidenzaAnziani";



export default function ResidenzaAnzianiAdmin() {

    const res = useGetResidenze(skipToken)
    const [updateResidenza] = useUpdateResidenzaMutation()

    let residenze: InputResidenza[] = []
    if(res.data){
        residenze = res.data
    }
    const dispatch = useDispatch()

    const [inputController, setInputController] = useState<{ id:number, capienzaAttuale: number }[]>([])


    useEffect(() => {
        residenze.forEach((ia, index) => {
            const capienzaAttuale = ia.dati[ia.dati.length-1].capienzaAttuale
            setInputController(inputController => [...inputController, {id:index, capienzaAttuale: capienzaAttuale}])
        })
    }, [residenze])


    return (
        <>
            <div className="grid grid-cols-12 gap-10 mb-5">
                <h4 className="col-span-3 font-bold">Struttura</h4>
                <h4 className="col-span-8 font-bold">Occupazione Attuale</h4>
            </div>
            {residenze.map((ia, index) => {
                return (
                    <div className="grid grid-cols-12 gap-10 mt-2" key={ia.faunaDocumentId}>
                        <span className="col-span-3">{ia.struttura}</span>
                        <input type="number" placeholder="Input 1"
                               className="input input-bordered input-info w-full col-span-3"
                               value={inputController[index]?.capienzaAttuale}
                               onChange={(e) => {
                                   setInputController(
                                       inputController.map((ic) => {
                                           if(ic.id === index) {
                                               return {...ic, capienzaAttuale: parseInt(e.currentTarget.value)}
                                           }else{
                                               return  {...ic}
                                           }

                                       })
                                   )
                               }}
                        />
                    </div>
                )
            })}

            <button className="btn btn-outline btn-info mt-10 w-1/2"
                    onClick={() => {
                        residenze.forEach((ia, index) => {
                            updateResidenza(
                                {
                                    ...ia,
                                    dati: [...ia.dati, {capienzaAttuale: inputController[index].capienzaAttuale, data: new Date().toLocaleDateString()}]
                                }
                            ).then(() => {
                                if(index === residenze.length-1){
                                    alert("Le residenze sono state aggiornate correttamente")
                                }
                            })
                        })
                    }}
            >Salva</button>
        </>
    );
}
