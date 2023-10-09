import React, {useState} from 'react';
import {MdOutlinePostAdd} from "react-icons/md";
import {Gara} from "@/model/Gara";
import {useCreateGaraMutation} from "@/store/rtkqApi";

export interface ModalNewGaraProps{

}

const ModalNewGara: React.FC<ModalNewGaraProps> = ({}) => {

    const [newGara, setNewGara] = useState({anno: new Date().getFullYear()+1} as Gara)
    const [createGaraMutation] = useCreateGaraMutation()

    return(
        <>
            <label htmlFor="my_modal_6" className="btn btn-sm bg-[#B5C5E7] text-white hover:opacity-80 hover:bg-[#4ecc8f] mb-2 w-full">
                <MdOutlinePostAdd size={20}/>
                Crea Report Gara per il {new Date().getFullYear() + 1}
            </label>

            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-2xl">
                    <h3 className="font-bold text-lg mb-10">Crea un nuovo report gara</h3>
                    <div className="grid grid-cols-2 items-center gap-10 mb-2">
                        <label>Valore Della Produzione</label>
                        <input type="number" placeholder={"Valore Della Produzione"}
                               className="input input-bordered border-[#B5C5E7] w-full"
                               value={newGara.valoreDellaProduzione}
                               onChange={(e) => {
                                   setNewGara((prev) => ({...prev, valoreDellaProduzione: parseInt(e.target.value)}))
                               }}
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-10 mb-2">
                        <label>Valore Gare in scadenza</label>
                        <input type="number" placeholder={"Valore Gare in scadenza"}
                               className="input input-bordered border-[#B5C5E7] w-full"
                               value={newGara.valoreGareInScadenza}
                               onChange={(e) => {
                                   setNewGara((prev) => ({...prev, valoreGareInScadenza: parseInt(e.target.value)}))
                               }}
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-10 mb-2">
                        <label>Fatturato Confermato</label>
                        <input type="number" placeholder={"Fatturato Confermato"}
                               className="input input-bordered border-[#B5C5E7] w-full"
                               value={newGara.fatturatoConfermato}
                               onChange={(e) => {
                                   setNewGara((prev) => ({...prev, fatturatoConfermato: parseInt(e.target.value)}))
                               }}
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-10 mb-2">
                        <label>Fatturato Non Confermato</label>
                        <input type="number" placeholder={"Fatturato Non Confermato"}
                               className="input input-bordered border-[#B5C5E7] w-full"
                               value={newGara.fatturatoNonConfermato}
                               onChange={(e) => {
                                   setNewGara((prev) => ({...prev, fatturatoNonConfermato: parseInt(e.target.value)}))
                               }}
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-10 mb-2">
                        <label>Aggiudicazione in corso</label>
                        <input type="number" placeholder={"Aggiudicazione in corso"}
                               className="input input-bordered border-[#B5C5E7] w-full"
                               value={newGara.aggiudicazioneInCorso}
                               onChange={(e) => {
                                   setNewGara((prev) => ({...prev, aggiudicazioneInCorso: parseInt(e.target.value)}))
                               }}
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-10 mb-2">
                        <label>Confermato di gara</label>
                        <input type="number" placeholder={"Confermato di gara"}
                               className="input input-bordered border-[#B5C5E7] w-full"
                               value={newGara.confermatoDiGara}
                               onChange={(e) => {
                                   setNewGara((prev) => ({...prev, confermatoDiGara: parseInt(e.target.value)}))
                               }}
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-10 mb-2">
                        <label>Prorogato</label>
                        <input type="number" placeholder={"Prorogato"}
                               className="input input-bordered border-[#B5C5E7] w-full"
                               value={newGara.prorogato}
                               onChange={(e) => {
                                   setNewGara((prev) => ({...prev, prorogato: parseInt(e.target.value)}))
                               }}
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-10 mb-2">
                        <label>Anno</label>
                        <input type="number"
                               className="input input-bordered border-[#B5C5E7] w-full"
                               value={newGara.anno}
                               readOnly
                        />
                    </div>
                    <div className="modal-action flex flex-row justify-between">
                        <label htmlFor="my_modal_6" className="btn">Annulla</label>
                        <label htmlFor="my_modal_6" className="btn"
                            onClick={() => {
                                createGaraMutation(newGara).then(() => alert("Nuovo report creato correttamente!!!"))
                            }}
                        >Crea Report</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalNewGara