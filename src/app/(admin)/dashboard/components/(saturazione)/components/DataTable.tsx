import React from 'react';
import {InputDati, InputResidenza} from "@/model/ResidenzaAnziani";

export interface DataTableProps{
    residenze: InputResidenza[],
    setResidenze: (value: (((prevState: InputResidenza[]) => InputResidenza[]) | InputResidenza[])) => void,
    editabile: boolean,
    newValue: (InputDati & { id: string })[],
    setNewValue:  (value: (((prevState: (InputDati & {id: string})[]) => (InputDati & {id: string})[]) | (InputDati & {id: string})[])) => void,
    newDate: Date,
    datiReversed: (InputDati & { id: string })[],
    setDatiReversed: (value: (((prevState: (InputDati & {id: string})[]) => (InputDati & {id: string})[]) | (InputDati & {id: string})[])) => void
}

const DataTable: React.FC<DataTableProps> = ({
    residenze, setResidenze, editabile,newValue, setNewValue, newDate,
    datiReversed, setDatiReversed
}) => {


    return(
        <>
            <div className="flex flex-row overflow-y-scroll max-h-[78vh]">
                <div className="overflow-x-auto">
                    <table className="table table-md">
                        <thead className="sticky top-0 bg-blue-100">
                        <tr>
                            <th>#</th>
                            <th>On/Off</th>
                            <th>Area</th>
                            <th>Località</th>
                            <th>Provincia</th>
                            <th>Servizio</th>
                            <th>Struttura</th>
                            <th>Nota</th>
                            {/*<th>Capienza</th>*/}
                            {/*<th>Percentuale</th>*/}
                            {residenze.length > 0 && editabile &&
                                <th>
                                    <div className="grid grid-cols-3">
                                        <span></span>
                                        <span>{newDate.toLocaleDateString()}</span>
                                        <span></span>
                                    </div>
                                </th>
                            }
                            {residenze.length !== 0 &&
                                <>
                                    {residenze[0].dati.map((d, index) => <th
                                        key={d.data}>
                                        <div className="grid grid-cols-3">
                                            <span></span>
                                            <span>{residenze[0].dati[residenze[0].dati.length - (1 + index)].data}</span>
                                            <span></span>
                                        </div>

                                    </th>)}

                                </>
                            }
                            {editabile && <th></th>}
                        </tr>
                        </thead>
                        <tbody>
                        {residenze.map((r, index) => {
                            return (
                                <tr key={r.struttura}
                                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} ${r.onOff ? 'opacity-100' : 'opacity-20'} `}>
                                    <th>{index + 1}</th>
                                    <th>
                                        <label className="swap">
                                            <input type="checkbox" checked={r.onOff}
                                                   disabled={!editabile}
                                                   onChange={() => {
                                                       setResidenze(
                                                           residenze.map(item =>
                                                               item.faunaDocumentId === r.faunaDocumentId ? {
                                                                   ...item,
                                                                   onOff: !r.onOff
                                                               } : item
                                                           )
                                                       )
                                                   }}
                                            />
                                            <div className="swap-on">ON</div>
                                            <div className="swap-off">OFF</div>
                                        </label>
                                    </th>
                                    <th>{r.area}</th>
                                    <td>{r.localita}</td>
                                    <td>{r.provincia}</td>
                                    <td>{r.servizio}</td>
                                    <td>{r.struttura}</td>
                                    {editabile ?
                                        <td>
                                            <input type="text"
                                                   className="w-[200px] h-[80px] p-1 border border-blue-200"
                                                   value={r.nota}
                                                   onChange={(e) => {
                                                       setResidenze(
                                                           residenze.map(item =>
                                                               item.faunaDocumentId === r.faunaDocumentId ? {
                                                                   ...item,
                                                                   nota: e.currentTarget.value
                                                               } : item
                                                           )
                                                       )
                                                   }}
                                            />
                                        </td>
                                        :
                                        <td>
                                            <div className="w-[200px] h-[80px] p-1 border border-blue-200">
                                                {r.nota}
                                            </div>
                                        </td>
                                    }
                                    {/*{editabile ?
                                        <td>
                                            <input type="number"
                                                   className="w-[60px] p-1 border border-blue-200"
                                                   value={r.capienza}
                                                   onChange={(e) => {
                                                       setResidenze(
                                                           residenze.map(item =>
                                                               item.faunaDocumentId === r.faunaDocumentId ? {...item, capienza: parseInt(e.currentTarget.value)} : item
                                                           )
                                                       )
                                                   }}
                                            />
                                        </td>
                                        :
                                        <td>{r.capienza}</td>
                                    }*/}
                                    {/*<td>{(r.dati[r.dati.length - 1].capienzaAttuale * 100 / r.capienza).toFixed(2)}%</td>*/}
                                    {editabile &&
                                        <th>
                                            <label className="swap">
                                                <input type="checkbox"
                                                       disabled={!editabile}
                                                       checked={newValue.length > 0 ? newValue.filter(v => v.id === r.faunaDocumentId)[0].onOff : true}
                                                       onChange={() => {
                                                           setNewValue(
                                                               newValue.map(v =>
                                                                   v.id === r.faunaDocumentId
                                                                       ? {
                                                                           ...v,
                                                                           onOff: !v.onOff
                                                                       }
                                                                       : v
                                                               )
                                                           )
                                                       }}
                                                />
                                                <div className="swap-on">ON</div>
                                                <div className="swap-off">OFF</div>
                                            </label>
                                            <div className="flex flex-row gap-2">
                                                <div className="text-center">
                                                    <span className="text-[10px]">DISP. STR.</span>
                                                    <input type="number"
                                                           disabled={newValue.length > 0 && !newValue.filter(v => v.id === r.faunaDocumentId)[0].onOff}
                                                           className="w-[60px] p-1 border border-blue-200"
                                                           value={newValue.length > 0 ? newValue.filter(v => v.id === r.faunaDocumentId)[0].disponibilitaStruttura : 0}
                                                           onChange={(e) => {
                                                               setNewValue(
                                                                   newValue.map(v =>
                                                                       v.id === r.faunaDocumentId
                                                                           ? {
                                                                               ...v,
                                                                               disponibilitaStruttura: parseInt(e.currentTarget.value),
                                                                               percentuale: (v.capienzaAttuale / parseInt(e.currentTarget.value)) * 100
                                                                           }
                                                                           : v
                                                                   )
                                                               )
                                                           }}
                                                    />
                                                </div>

                                                <div className="text-center">
                                                    <span className="text-[10px]">POS. OCC.</span>
                                                    <input type="number"
                                                           disabled={newValue.length > 0 && !newValue.filter(v => v.id === r.faunaDocumentId)[0].onOff}
                                                           className="w-[60px] p-1 border border-blue-200"
                                                           value={newValue.length > 0 ? newValue.filter(v => v.id === r.faunaDocumentId)[0].capienzaAttuale : 0}
                                                           onChange={(e) => {
                                                               setNewValue(
                                                                   newValue.map(v =>
                                                                       v.id === r.faunaDocumentId
                                                                           ? {
                                                                               ...v,
                                                                               capienzaAttuale: parseInt(e.currentTarget.value),
                                                                               percentuale: (parseInt(e.currentTarget.value) / v.disponibilitaStruttura) * 100
                                                                           }
                                                                           : v
                                                                   )
                                                               )
                                                           }}
                                                    />
                                                </div>
                                                <div className="text-center">
                                                    <span className="text-[10px]">%</span>
                                                    <input type="number"
                                                           disabled={newValue.length > 0 && !newValue.filter(v => v.id === r.faunaDocumentId)[0].onOff}
                                                           className="w-[80px] p-1 border border-blue-200"
                                                           value={newValue.length > 0 ? newValue.filter(v => v.id === r.faunaDocumentId)[0].percentuale.toFixed(2) : 0}
                                                    />
                                                </div>
                                            </div>

                                        </th>
                                    }
                                    {datiReversed.map((d, indexd) => {
                                        return (
                                            <>
                                                {residenze.length > 0 && indexd < residenze[0].dati.length * (index + 1) && d.id === r.faunaDocumentId &&
                                                    <th key={indexd}>
                                                        <label className="swap">
                                                            <input type="checkbox" checked={d.onOff}
                                                                   disabled={!editabile}
                                                                   onChange={() => {
                                                                       setDatiReversed(
                                                                           datiReversed.map(dr => {
                                                                               if (dr.id === d.id) {
                                                                                   if (dr.data === d.data) {
                                                                                       return {
                                                                                           ...dr,
                                                                                           onOff: !dr.onOff
                                                                                       }
                                                                                   } else {
                                                                                       return dr
                                                                                   }
                                                                               } else {
                                                                                   return dr
                                                                               }
                                                                           })
                                                                       )
                                                                   }}
                                                            />
                                                            <div className="swap-on">ON</div>
                                                            <div className="swap-off">OFF</div>
                                                        </label>
                                                        <div className="flex flex-row gap-2">
                                                            <div className="text-center">
                                                                <span className="text-[10px]">DISP. STR.</span>
                                                                <input type="number"
                                                                       disabled={!editabile || !d.onOff}
                                                                       value={d.id === r.faunaDocumentId ? d.disponibilitaStruttura : 0}
                                                                       className={`w-[60px] p-1 border-2 border-blue-200 text-center`}
                                                                       onChange={(e) => {
                                                                           setDatiReversed(
                                                                               datiReversed.map(dr => {
                                                                                   if (dr.id === d.id) {
                                                                                       if (dr.data === d.data) {
                                                                                           return {
                                                                                               ...dr,
                                                                                               disponibilitaStruttura: parseInt(e.currentTarget.value),
                                                                                               percentuale: (dr.capienzaAttuale / parseInt(e.currentTarget.value)) * 100
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
                                                            </div>

                                                            <div className="text-center">
                                                                <span className="text-[10px]">POS. OCC.</span>
                                                                <input type="number"
                                                                       disabled={!editabile || !d.onOff}
                                                                       value={d.id === r.faunaDocumentId ? d.capienzaAttuale : 0}
                                                                       className={`w-[60px] p-1 border-2 border-blue-200 text-center
                                                                            ${indexd === residenze[0].dati.length * (index) && r.dati[r.dati.length - 1].capienzaAttuale > r.dati[r.dati.length - 2].capienzaAttuale && 'text-[green] border-green-700'}
                                                                            ${indexd === residenze[0].dati.length * (index) && r.dati[r.dati.length - 1].capienzaAttuale < r.dati[r.dati.length - 2].capienzaAttuale && 'text-[red] border-red-600'}
                                                                            `}
                                                                       onChange={(e) => {
                                                                           setDatiReversed(
                                                                               datiReversed.map(dr => {
                                                                                   if (dr.id === d.id) {
                                                                                       if (dr.data === d.data) {
                                                                                           return {
                                                                                               ...dr,
                                                                                               capienzaAttuale: parseInt(e.currentTarget.value),
                                                                                               percentuale: (parseInt(e.currentTarget.value) / dr.disponibilitaStruttura) * 100
                                                                                           }
                                                                                       } else {
                                                                                           return {
                                                                                               ...dr,
                                                                                               percentuale: (dr.capienzaAttuale / dr.disponibilitaStruttura) * 100
                                                                                           }
                                                                                       }
                                                                                   } else {
                                                                                       return {
                                                                                           ...dr,
                                                                                           percentuale: (dr.capienzaAttuale / dr.disponibilitaStruttura) * 100
                                                                                       }
                                                                                   }
                                                                               })
                                                                           )
                                                                       }
                                                                       }
                                                                />
                                                            </div>
                                                            <div className="text-center">
                                                                <span className="text-[10px]">%</span>
                                                                <input type="number"
                                                                       disabled={!editabile || !d.onOff}
                                                                       value={d.id === r.faunaDocumentId ? (d.capienzaAttuale/d.disponibilitaStruttura*100).toFixed(2) : 0}
                                                                       className={`w-[80px] p-1 border-2 border-blue-200 text-center
                                                                            ${indexd === residenze[0].dati.length * (index) && r.dati[r.dati.length - 1].capienzaAttuale > r.dati[r.dati.length - 2].capienzaAttuale && 'text-[green] border-green-700'}
                                                                            ${indexd === residenze[0].dati.length * (index) && r.dati[r.dati.length - 1].capienzaAttuale < r.dati[r.dati.length - 2].capienzaAttuale && 'text-[red] border-red-600'}
                                                                       `}
                                                                />
                                                            </div>
                                                        </div>

                                                    </th>}
                                            </>
                                        )
                                    })}
                                    {/*{editabile &&
                                        <th>
                                            <BsFillTrash2Fill color="#cb3234" size={20}
                                                              className="opacity-100 hover:opacity-60"/>
                                        </th>
                                    }*/}
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default DataTable