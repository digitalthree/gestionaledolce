import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useGetResidenze, useUpdateResidenzaMutation} from "@/store/rtkqApi";
import {InputDati, InputResidenza} from "@/model/ResidenzaAnziani";
import {BiPlus, BiSave} from "react-icons/bi";
import {BsFillTrash2Fill} from "react-icons/bs";

export interface ResidenzaAnzianiAdminProps {
    dati: InputResidenza[],
    editabile: boolean
}

const ResidenzaAnzianiAdmin: React.FC<ResidenzaAnzianiAdminProps> = ({dati, editabile}) => {

    const [updateResidenza] = useUpdateResidenzaMutation()
    const [newValue, setNewValue] = useState<{ id: string, data: string, capienzaAttuale: number }[]>([])
    const [datiReversed, setDatiReversed] = useState<{ id: string, data: string, capienzaAttuale: number }[]>([])
    const [residenze, setResidenze] = useState<InputResidenza[]>([])
    const [newResidenze, setNewResidenze] = useState<InputResidenza[]>([])
    const [newDate, setNewDate] = useState<Date>(new Date())

    useEffect(() => {
        if (dati.length > 0) {
            setResidenze(dati)
            setNewResidenze(dati)
            let d = dati[0].dati[dati[0].dati.length - 1].data.split("/");
            let dat = new Date(d[2] + '/' + d[1] + '/' + (parseInt(d[0]) + 7).toLocaleString());
            setNewDate(dat)
        }
    }, [dati])


    useEffect(() => {
        residenze.forEach(ic => {
            setNewValue((old) => [...old, {
                id: ic.faunaDocumentId as string,
                data: newDate.toLocaleDateString(),
                capienzaAttuale: 0
            }])
            let datiCopy = [...ic.dati]
            datiCopy.reverse().forEach((d, index) => {
                setDatiReversed((old) => [...old, {
                    id: ic.faunaDocumentId as string,
                    data: d.data,
                    capienzaAttuale: d.capienzaAttuale
                }])
            })
        })
    }, [residenze])

    useEffect(() => {
        if (newResidenze.length > 0) {
            newResidenze.forEach((nr, index) => {
                if (nr.dati.length > dati[index].dati.length) {
                    updateResidenza(nr)
                }
            })
        }

    }, [newResidenze])


    return (
        <div className={`${!editabile && 'flex justify-center'}`}>
            {editabile &&
                <h2 className="mb-5 font-semibold text-[#b5c5e7]">SERVIZI IN CAPO A SOCIETA DOLCE</h2>
            }
            <div className="flex flex-row overflow-y-scroll max-h-[82vh]">
                <div className="overflow-x-auto">
                    <table className="table table-md">
                        <thead className="sticky top-0 bg-blue-100">
                        <tr>
                            <th>#</th>
                            <th>Area</th>
                            <th>Località</th>
                            <th>Provincia</th>
                            <th>Servizio</th>
                            <th>Struttura</th>
                            <th>Capienza</th>
                            <th>Percentuale</th>
                            {residenze.length > 0 && editabile &&
                                <th>{newDate.toLocaleDateString()}</th>
                            }
                            {residenze.length !== 0 &&
                                <>
                                    {residenze[0].dati.map((d, index) => <th
                                        key={d.data}>{residenze[0].dati[residenze[0].dati.length - (1 + index)].data}</th>)}

                                </>
                            }
                            {editabile && <th></th>}
                        </tr>
                        </thead>
                        <tbody>
                        {residenze.map((r, index) => {
                            return (
                                <tr key={r.struttura} className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} `}>
                                    <th>{index + 1}</th>
                                    <th>{r.area}</th>
                                    <td>{r.localita}</td>
                                    <td>{r.provincia}</td>
                                    <td>{r.servizio}</td>
                                    <td>{r.struttura}</td>
                                    <td>{r.capienza}</td>
                                    <td>{(r.dati[r.dati.length - 1].capienzaAttuale * 100 / r.capienza).toFixed(2)}%</td>
                                    {editabile &&
                                        <th>
                                            <input type="number"
                                                   className="w-[60px] p-1 border border-blue-200"
                                                   value={newValue.length > 0 ? newValue.filter(v => v.id === r.faunaDocumentId)[0].capienzaAttuale : 0}
                                                   onChange={(e) => {
                                                       setNewValue(
                                                           newValue.map(v =>
                                                               v.id === r.faunaDocumentId
                                                                   ? {
                                                                       ...v,
                                                                       capienzaAttuale: parseInt(e.currentTarget.value)
                                                                   }
                                                                   : v
                                                           )
                                                       )
                                                   }}
                                            />
                                        </th>
                                    }
                                    {datiReversed.map((d, indexd) => {
                                        return (
                                            <>
                                                {residenze.length > 0 && indexd < residenze[0].dati.length * (index + 1) && d.id === r.faunaDocumentId &&
                                                    <th key={indexd}>
                                                        <input type="number"
                                                               disabled={!editabile}
                                                               value={d.id === r.faunaDocumentId ? d.capienzaAttuale : 0}
                                                               className={`w-[60px] p-1 border-2 border-blue-200 text-center
                                                                            ${indexd === residenze[0].dati.length * (index) && r.dati[r.dati.length - 1].capienzaAttuale > r.dati[r.dati.length - 2].capienzaAttuale && 'text-[green] border-green-700'}
                                                                            ${indexd === residenze[0].dati.length * (index) && r.dati[r.dati.length - 1].capienzaAttuale < r.dati[r.dati.length - 2].capienzaAttuale && 'text-[red] border-red-600'}
                                                                            `}
                                                               onChange={(e) => {
                                                                   setDatiReversed(
                                                                       datiReversed.map(dr => {
                                                                           if (dr.id === r.faunaDocumentId) {
                                                                               if (dr.data === d.data) {
                                                                                   return {
                                                                                       ...dr,
                                                                                       capienzaAttuale: parseInt(e.currentTarget.value)
                                                                                   }
                                                                               } else {
                                                                                   return dr
                                                                               }
                                                                           } else {
                                                                               return dr
                                                                           }
                                                                       })
                                                                   )
                                                               }
                                                               }
                                                        />
                                                    </th>}
                                            </>
                                        )
                                    })}
                                    {editabile &&
                                        <th>
                                            <BsFillTrash2Fill color="#df20e3" size={20}
                                                              className="opacity-100 hover:opacity-60"/>
                                        </th>
                                    }
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            {editabile &&
                <div className="flex flex-col">
                    <button className="btn btn-sm bg-[#B5C5E7] text-white hover:opacity-80 hover:bg-[#4ecc8f] mb-2"
                            onClick={() => {
                                setNewResidenze(
                                    newResidenze.map((r, index) =>
                                        r.faunaDocumentId === newValue[index].id
                                            ? {
                                                ...r,
                                                dati: [...r.dati, {
                                                    capienzaAttuale: newValue[index].capienzaAttuale,
                                                    data: newValue[index].data
                                                }]
                                            }
                                            : r
                                    )
                                )

                            }}
                    >
                        <BiSave size={20}/>
                        Salva Dati
                    </button>
                    <label htmlFor="my_modal_7"
                           className="btn btn-sm bg-[#B5C5E7] text-white hover:opacity-80 hover:bg-[#B5C5E7]">
                        <BiPlus size={20}/>
                        Aggiungi Struttura
                    </label>
                    <input type="checkbox" id="my_modal_7" className="modal-toggle"/>
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Aggiungi un nuovo task</h3>
                            <div className="flex flex-col py-3">
                                <div className="flex flex-row items-center justify-between">
                                    <span>Area:</span>
                                    <input type="text" placeholder="Nome"
                                           className="input input-sm input-bordered w-full max-w-xs"

                                    />
                                </div>
                                <div className="flex flex-row items-center justify-between mt-2">
                                    <span>Località:</span>
                                    <input type="text" placeholder="Categoria"
                                           className="input input-sm input-bordered w-full max-w-xs"

                                    />
                                </div>
                                <div className="flex flex-row items-center justify-between mt-2">
                                    <span>Provincia:</span>
                                    <input type="text" placeholder="Provincia"
                                           className="input input-sm input-bordered w-full max-w-xs"
                                    />
                                </div>
                                <div className="flex flex-row items-center justify-between mt-2">
                                    <span>Servizio:</span>
                                    <input type="text" placeholder="Colore"
                                           className="input input-sm input-bordered w-full max-w-xs"
                                    />
                                </div>
                                <div className="flex flex-row items-center justify-between mt-2">
                                    <span>Struttura:</span>
                                    <input type="text" placeholder="Colore"
                                           className="input input-sm input-bordered w-full max-w-xs"
                                    />
                                </div>
                                <div className="flex flex-row items-center justify-between mt-2">
                                    <span>Capienza:</span>
                                    <input type="number" placeholder="Colore"
                                           className="input input-sm input-bordered w-full max-w-xs"
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
            }

        </div>

    );
}

export default ResidenzaAnzianiAdmin