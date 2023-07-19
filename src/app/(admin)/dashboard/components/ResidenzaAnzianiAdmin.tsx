import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useGetResidenze, useUpdateResidenzaMutation} from "@/store/rtkqApi";
import {InputDati, InputResidenza} from "@/model/ResidenzaAnziani";
import {BiPlus, BiSave} from "react-icons/bi";
import {Task} from "gantt-task-react";
import {BsFillTrash2Fill} from "react-icons/bs";



export default function ResidenzaAnzianiAdmin() {

    const res = useGetResidenze()
    const [updateResidenza] = useUpdateResidenzaMutation()

    let residenze: InputResidenza[] = []
    if(res.data){
        residenze = res.data
    }
    const dispatch = useDispatch()

    const [inputController, setInputController] = useState<{ struttura: string, dati: InputDati[] }[]>([])


    useEffect(() => {
        residenze.forEach((ia, index) => {
            setInputController(inputController => [...inputController, {struttura: ia.struttura, dati: ia.dati}])
        })
    }, [residenze])


    return (
        <div>
            <h2 className="mb-5 font-semibold text-[#b5c5e7]">SERVIZI IN CAPO A SOCIETA DOLCE</h2>
            <div className="flex flex-row">
                {/*<div className="grid grid-cols-12 gap-10 mb-5">
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
            >Salva</button>*/}
                <div className="overflow-x-auto">
                    <table className="table table-md">
                        <thead>
                        <tr>
                            <th>Area</th>
                            <th>Località</th>
                            <th>Provincia</th>
                            <th>Servizio</th>
                            <th>Struttura</th>
                            <th>Capienza</th>
                            <th>Percentuale</th>
                        </tr>
                        </thead>
                        <tbody>
                        {residenze.map(r => {
                            return(
                                <tr key={r.struttura}>
                                    <th className="p-[17px]">{r.area}</th>
                                    <td>{r.localita}</td>
                                    <td>{r.provincia}</td>
                                    <td>{r.servizio}</td>
                                    <td>{r.struttura}</td>
                                    <td>{r.capienza}</td>
                                    <td>{(r.dati[r.dati.length-1].capienzaAttuale*100/r.capienza).toFixed(2)}%</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                {residenze.length !== 0 &&
                    <div className="overflow-x-auto">
                        <table className="table table-md">
                            <thead>
                            <tr>
                                <th>{new Date().toLocaleDateString()}</th>
                                <th>{residenze[0].dati[residenze[0].dati.length-1].data}</th>
                                <th>{residenze[0].dati[residenze[0].dati.length-2].data}</th>
                                <th>{residenze[0].dati[residenze[0].dati.length-3].data}</th>
                                <th>{residenze[0].dati[residenze[0].dati.length-4].data}</th>
                                <th>{residenze[0].dati[residenze[0].dati.length-5].data}</th>
                            </tr>
                            </thead>
                            <tbody>

                            {residenze.map(r => {
                                let datiCopy = [...r.dati]
                                let datiReversed = datiCopy.reverse()
                                return(
                                    <>
                                        <tr key={r.struttura}>
                                            <th><input type="number" className="w-[50px] p-[10px] border border-blue-200 text-[12px]"

                                            /></th>
                                            {datiReversed.map((d, index) => {
                                                return(
                                                    <>
                                                        {index < 5 && <th className="p-[7px]" key={d.data}><input type="number" value={d.capienzaAttuale} className="w-[50px] p-1 border border-blue-200"/></th>}
                                                    </>
                                                )
                                            })}
                                            <th>
                                                <BsFillTrash2Fill color="#df20e3" size={20} className="opacity-60 hover:opacity-100"/>
                                            </th>
                                        </tr>
                                    </>

                                )

                            })}
                            </tbody>
                        </table>
                    </div>
                }

            </div>
            <div className="flex flex-col">
                <button className="btn btn-sm bg-[#B5C5E7] text-white hover:opacity-80 hover:bg-[#4ecc8f] mb-2">
                    <BiSave size={20}/>
                    Salva Dati
                </button>
                <label htmlFor="my_modal_7" className="btn btn-sm bg-[#B5C5E7] text-white hover:opacity-80 hover:bg-[#B5C5E7]">
                    <BiPlus size={20}/>
                    Aggiungi Struttura
                </label>
                <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Aggiungi un nuovo task</h3>
                        <div className="flex flex-col py-3">
                            <div className="flex flex-row items-center justify-between">
                                <span>Area:</span>
                                <input type="text" placeholder="Nome" className="input input-sm input-bordered w-full max-w-xs"

                                />
                            </div>
                            <div className="flex flex-row items-center justify-between mt-2">
                                <span>Località:</span>
                                <input type="text" placeholder="Categoria" className="input input-sm input-bordered w-full max-w-xs"

                                />
                            </div>
                            <div className="flex flex-row items-center justify-between mt-2">
                                <span>Provincia:</span>
                                <input type="text" placeholder="Provincia" className="input input-sm input-bordered w-full max-w-xs"
                                />
                            </div>
                            <div className="flex flex-row items-center justify-between mt-2">
                                <span>Servizio:</span>
                                <input type="text" placeholder="Colore" className="input input-sm input-bordered w-full max-w-xs"
                                />
                            </div>
                            <div className="flex flex-row items-center justify-between mt-2">
                                <span>Struttura:</span>
                                <input type="text" placeholder="Colore" className="input input-sm input-bordered w-full max-w-xs"
                                />
                            </div>
                            <div className="flex flex-row items-center justify-between mt-2">
                                <span>Capienza:</span>
                                <input type="number" placeholder="Colore" className="input input-sm input-bordered w-full max-w-xs"
                                />
                            </div>

                        </div>
                        <div className="modal-action">
                            <label htmlFor="my_modal_7" className="btn">Annulla</label>
                            <label htmlFor="my_modal_7" className="btn" onClick={() => {

                            }}>Aggiungi Struttura</label>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}
