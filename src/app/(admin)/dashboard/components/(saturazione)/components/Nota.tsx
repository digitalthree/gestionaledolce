import React, {useState} from 'react';
import {DatiAggiuntivi} from "@/model/DatiAggiuntivi";

export interface NotaProps{
    editabile: boolean,
    updateDatiAggiuntivi: Function,
    nota: string,
    setNota: (v:string) => void,
    datiAggiuntivi: DatiAggiuntivi
}

const Nota: React.FC<NotaProps> = ({
    editabile, updateDatiAggiuntivi, setNota, nota, datiAggiuntivi
}) => {

    const [abilitaNota, setAbilitaNota] = useState<boolean>(false)
    return(
        <>
            <div className="flex flex-row mt-5 mb-10 items-center gap-10">
                <span className="mb-5 font-semibold text-[#b5c5e7]">NOTE:</span>
                <textarea className="border border-blue-200 p-1 w-2/3 h-[70px]"
                          disabled={!editabile}
                          value={nota}
                          onChange={(e) => {
                              setNota(e.currentTarget.value)
                              setAbilitaNota(true)
                          }}
                />
                {editabile &&
                    <button className="btn btn-sm bg-[#B5C5E7] text-white hover:opacity-80 hover:bg-[#4ecc8f] w-1/5"
                            disabled={!abilitaNota}
                            onClick={() => {
                                updateDatiAggiuntivi({...datiAggiuntivi, nota: nota} as DatiAggiuntivi)
                                setAbilitaNota(false)
                            }}
                    >
                        Salva
                    </button>
                }
            </div>
        </>
    )
}

export default Nota