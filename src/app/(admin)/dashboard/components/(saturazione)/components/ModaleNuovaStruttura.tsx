import React, {useState} from 'react';
import {BiPlus} from "react-icons/bi";
import {InputDati, InputResidenza} from "@/model/ResidenzaAnziani";

export interface ModaleNuovaStrutturaProps{
    residenze: InputResidenza[],
    createResidenza: Function,
    createResidenzaAltreSocieta: Function,
    createCentroDiurnoAnziani: Function,
    createStrutturaSanitaria: Function
    selectedMenuItem: "ra" | "ca" | "ss" | "rd" | "cd" | undefined,
    altreSocieta: boolean | undefined,
}

const ModaleNuovaStruttura: React.FC<ModaleNuovaStrutturaProps> = ({
    residenze, createResidenza, createResidenzaAltreSocieta, createStrutturaSanitaria, createCentroDiurnoAnziani,
    selectedMenuItem, altreSocieta
}) => {
    const [residenzaDaAggiungere, setResidenzaDaAggiungere] = useState<InputResidenza>({
        area: "",
        localita: "",
        dati: [],
        struttura: "",
        nota: "",
        capienza: 0,
        provincia: "",
        servizio: "",
        dataInizioGestione: "",
        onOff: true
    })
    return(
        <>
            <label htmlFor="my_modal_7"
                   className="btn btn-sm bg-[#B5C5E7] text-white hover:opacity-80 hover:bg-[#B5C5E7]">
                <BiPlus size={20}/>
                Aggiungi Struttura
            </label>
            <input type="checkbox" id="my_modal_7" className="modal-toggle"/>
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Aggiungi una nuova struttura</h3>
                    <div className="flex flex-col py-3">
                        <div className="flex flex-row items-center justify-between">
                            <span>Area:</span>
                            <input type="text" placeholder="Area"
                                   className="input input-sm input-bordered w-full max-w-xs"
                                   value={residenzaDaAggiungere.area}
                                   onChange={(e) => {
                                       setResidenzaDaAggiungere((prev) => ({...prev, area: e.target.value}))
                                   }}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-between mt-2">
                            <span>Località:</span>
                            <input type="text" placeholder="Località"
                                   className="input input-sm input-bordered w-full max-w-xs"
                                   value={residenzaDaAggiungere.localita}
                                   onChange={(e) => {
                                       setResidenzaDaAggiungere((prev) => ({
                                           ...prev,
                                           localita: e.target.value
                                       }))
                                   }}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-between mt-2">
                            <span>Provincia:</span>
                            <input type="text" placeholder="Provincia"
                                   className="input input-sm input-bordered w-full max-w-xs"
                                   value={residenzaDaAggiungere.provincia}
                                   onChange={(e) => {
                                       setResidenzaDaAggiungere((prev) => ({
                                           ...prev,
                                           provincia: e.target.value
                                       }))
                                   }}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-between mt-2">
                            <span>Servizio:</span>
                            <input type="text" placeholder="Servizio"
                                   className="input input-sm input-bordered w-full max-w-xs"
                                   value={residenzaDaAggiungere.servizio}
                                   onChange={(e) => {
                                       setResidenzaDaAggiungere((prev) => ({
                                           ...prev,
                                           servizio: e.target.value
                                       }))
                                   }}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-between mt-2">
                            <span>Struttura:</span>
                            <input type="text" placeholder="Struttura"
                                   className="input input-sm input-bordered w-full max-w-xs"
                                   value={residenzaDaAggiungere.struttura}
                                   onChange={(e) => {
                                       setResidenzaDaAggiungere((prev) => ({
                                           ...prev,
                                           struttura: e.target.value
                                       }))
                                   }}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-between mt-2">
                            <span>Capienza:</span>
                            <input type="number" placeholder="Capienza"
                                   className="input input-sm input-bordered w-full max-w-xs"
                                   value={residenzaDaAggiungere.capienza}
                                   onChange={(e) => {
                                       setResidenzaDaAggiungere((prev) => ({
                                           ...prev,
                                           capienza: parseInt(e.target.value)
                                       }))
                                   }}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-between mt-2">
                            <span>Data Inizio Gestione:</span>
                            <input type="date" placeholder="Data Inizio Gestione"
                                   className="input input-sm input-bordered w-full max-w-xs"
                                   value={residenzaDaAggiungere.dataInizioGestione}
                                   onChange={(e) => {
                                       let chosenDate = new Date(e.target.value)
                                       let dati: InputDati[] = []
                                       residenze[0].dati.forEach(d => {
                                           let data = d.data.split("/");
                                           let dat = new Date(data[2] + '-' + data[1] + '-' + (data[0]));
                                           dati.push({
                                               data: d.data,
                                               onOff: dat.getTime() > chosenDate.getTime(),
                                               capienzaAttuale: 0,
                                               disponibilitaStruttura: 0,
                                               percentuale: 0
                                           })
                                       })
                                       setResidenzaDaAggiungere((prev) => ({
                                           ...prev,
                                           dataInizioGestione: e.target.value,
                                           dati: dati
                                       }))
                                   }}
                            />
                        </div>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my_modal_7" className="btn">Annulla</label>
                        <label htmlFor="my_modal_7" className="btn" onClick={() => {
                            if (selectedMenuItem === 'ra' && !altreSocieta) {
                                createResidenza(residenzaDaAggiungere)
                            }
                            if (selectedMenuItem === 'ra' && altreSocieta) {
                                createResidenzaAltreSocieta(residenzaDaAggiungere)
                            }
                            if (selectedMenuItem === 'ca') {
                                createCentroDiurnoAnziani(residenzaDaAggiungere)
                            }
                            if (selectedMenuItem === 'ss') {
                                createStrutturaSanitaria(residenzaDaAggiungere)
                            }

                        }}>Aggiungi Struttura</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModaleNuovaStruttura