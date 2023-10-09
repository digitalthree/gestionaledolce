import React, {useEffect, useRef, useState} from 'react';
import PieChart from "@/app/(shared)/gare/components/PieChart";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {Gara} from "@/model/Gara";
import {useGetGaraByAnno, useGetGare, useUpdateGaraMutation} from "@/store/rtkqApi";
import Image from "next/image";
import {HiOutlinePhoto} from "react-icons/hi2";
import {deleteFileS3, getFileFromS3, uploadFileS3} from "@/aws/s3APIs";
import {useUser} from "@auth0/nextjs-auth0/client";
import {BiSave} from "react-icons/bi";
import {MdOutlinePostAdd} from "react-icons/md";
import ModalNewGara from "@/app/(shared)/gare/components/ModalNewGara";

export interface GareProps {
    editabile: boolean
}

const Gare: React.FC<GareProps> = ({editabile}) => {
    const resGare = useGetGare()
    const resGara = useGetGaraByAnno(new Date().getFullYear())

    const [gara, setGara] = useState<Gara>({} as Gara)
    const [gare, setGare] = useState<Gara[]>([])
    const [updateGara, resUpdateGara] = useUpdateGaraMutation()

    useEffect(() => {
        if(resGara.data){
            setGara((resGara.data as unknown as Gara[])[0])
        }
        if(resGare.data){
            setGare(resGare.data)
        }
    }, [resGara.data, resGare.data]);

    const [garaAnnoPrec, setGaraAnnoPrec] = useState<Gara>(gara)

    const [hovered, setHovered] = useState<boolean>(false)
    const fileRef =  useRef<HTMLInputElement>(null);

    const [imageKey, setImageKey] = useState<string | undefined>(undefined)

    const {user} = useUser()

    useEffect(() => {
        if (gare.length > 0) {
            setGaraAnnoPrec(gare.filter(g => g.anno === new Date().getFullYear() - 1)[0])
        }
        getFileFromS3().then(res => setImageKey(res))
    }, [gare])

    return (
        <div className={`overflow-y-scroll max-h-[900px] pb-20 `}>
            {resGare.isLoading || resGara.isLoading || resUpdateGara.isLoading &&
                <div className="absolute top-1/2 left-1/2">
                    <span className="loading loading-bars loading-lg text-[#B5C5E7]"></span>
                </div>
            }
            {gare.length > 0 && gara &&
                <div className={`${resGare.isLoading || resGara.isLoading || resUpdateGara.isLoading && 'opacity-10'}`}>
                    <div className="w-full flex flex-row items-center">
                        <span className="mr-2 text-[#B5C5E7] text-sm">Conferme</span>
                        <hr className="w-full border-[#B5C5E7] border"/>
                    </div>
                    <div className="grid grid-cols-7 gap-20 px-10 py-10">
                        <div className={`${editabile ? 'col-span-7' : 'col-span-4'}`}>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="grid grid-cols-12 gap-[2px]">
                                    <div
                                        className="col-span-3 flex items-center justify-center p-6 bg-[#0066cc] text-white rounded-l-2xl text-center">Valore
                                        della <br/> produzione
                                    </div>
                                    {editabile ?
                                        <input type="number"
                                               className="col-span-9 flex items-center justify-center p-6  bg-white text-[#0066cc] border-2 border-[#0066cc] rounded-r-2xl text-4xl font-medium"
                                               value={gara.valoreDellaProduzione && gara.valoreDellaProduzione}
                                               onChange={(e) => {
                                                   setGara((prev) => ({...prev, valoreDellaProduzione: parseInt(e.target.value)}) )
                                               }}
                                        /> :
                                        <div className="col-span-9 flex items-center justify-center p-6 bg-[#0066cc] text-white rounded-r-2xl text-4xl font-medium">
                                            {gara.valoreDellaProduzione && gara.valoreDellaProduzione.toLocaleString('en-US')}€
                                        </div>
                                    }
                                </div>
                                <div className="grid grid-cols-12 gap-[2px]">
                                    <div
                                        className="col-span-3 flex items-center justify-center p-6 bg-[#B5C5E7] text-white rounded-l-2xl text-center">Valore
                                        gare <br/> in scadenza
                                    </div>
                                    {editabile ?
                                        <input type="number"
                                               className="col-span-4 flex items-center justify-center p-6 text-[#B5C5E7] border-2 border-[#B5C5E7] text-center text-4xl font-semibold"
                                               value={gara.valoreGareInScadenza && gara.valoreGareInScadenza}
                                               onChange={(e) => {
                                                   setGara((prev) => ({...prev, valoreGareInScadenza: parseInt(e.target.value)}) )
                                               }}
                                        />
                                        :
                                        <div
                                            className="col-span-4 flex items-center justify-center p-6 bg-[#B5C5E7] text-white text-center text-4xl font-semibold">
                                            {gara.valoreGareInScadenza && gara.valoreGareInScadenza.toLocaleString('en-US')}€
                                        </div>
                                    }

                                    <div className="col-span-5 flex flex-col">
                                        {editabile ?
                                            <div
                                                className="grid grid-cols-2 gap-4 border-2 border-[#B5C5E7] text-[#B5C5E7] items-center p-6 rounded-r-2xl font-medium mb-1 justify-between">
                                                <span>Fatturato <br/> Confermato</span>
                                                <input type="number"
                                                       className=" text-center text-xl items-center border-2 border-[#B5C5E7] py-3 px-2 text-[#B5C5E7] rounded-r-2xl font-medium"
                                                       value={gara.fatturatoConfermato && gara.fatturatoConfermato}
                                                       onChange={(e) => {
                                                           setGara((prev) => ({...prev, fatturatoConfermato: parseInt(e.target.value)}) )
                                                       }}
                                                />
                                            </div>
                                            :
                                            <div
                                                className="flex flex-row bg-[#B5C5E7] items-center justify-center p-6 text-white rounded-r-2xl font-medium mb-1 justify-between">
                                                <span>Fatturato <br/> Confermato</span><span
                                                className="text-2xl">{gara.fatturatoConfermato && gara.fatturatoConfermato.toLocaleString('en-US')}€</span>
                                            </div>
                                        }
                                        {editabile ?
                                            <div
                                                className="grid grid-cols-2 gap-4 border-2 botext-gray-500 text-gray-500 items-center p-6 rounded-r-2xl font-medium mb-1 justify-between">
                                                <span>Fatturato non<br/> Confermato</span>
                                                <input type="number"
                                                       className="text-center text-xl items-center border-2 botext-gray-500 py-3 px-2 text-gray-500 rounded-r-2xl font-medium"
                                                       value={gara.fatturatoNonConfermato && gara.fatturatoNonConfermato}
                                                       onChange={(e) => {
                                                           setGara((prev) => ({...prev, fatturatoNonConfermato: parseInt(e.target.value)}) )
                                                       }}
                                                />
                                            </div>
                                            :
                                            <div
                                                className="flex flex-row bg-gray-300 items-center p-6 text-white rounded-r-2xl font-medium mb-1 justify-between">
                                                <span>Fatturato non<br/> Confermato</span><span
                                                className="text-2xl">{gara.fatturatoNonConfermato && gara.fatturatoNonConfermato.toLocaleString('en-US')}€</span>
                                            </div>
                                        }
                                        {editabile ?
                                            <div
                                                className="grid grid-cols-2 gap-4 border-2 border-[#B5C5E7] text-[#B5C5E7] items-center p-6 rounded-r-2xl font-medium  justify-between">
                                                <span>Aggiudicazione <br/> in corso</span>
                                                <input type="number"
                                                       className="text-center text-xl items-center border-2 border-[#B5C5E7] py-3 px-2 text-[#B5C5E7] rounded-r-2xl font-medium"
                                                       value={gara.aggiudicazioneInCorso && gara.aggiudicazioneInCorso}
                                                       onChange={(e) => {
                                                           setGara((prev) => ({...prev, aggiudicazioneInCorso: parseInt(e.target.value)}) )
                                                       }}
                                                />
                                            </div>
                                            :
                                            <div
                                                className="flex flex-row bg-[#B5C5E7] items-center p-6 text-white rounded-r-2xl font-medium mb-1 justify-between">
                                                <span>Aggiudicazione <br/> in corso</span><span
                                                className="text-2xl">{gara.aggiudicazioneInCorso && gara.aggiudicazioneInCorso.toLocaleString('en-US')}€</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-[2px]">
                                    <div
                                        className="col-span-3 flex items-center justify-center p-6 bg-[#B5C5E7] text-white rounded-l-2xl text-center">Fatturato<br/>Confermato
                                    </div>
                                    {editabile ?
                                        <input type="number"
                                               className="col-span-4 flex items-center justify-center p-6 text-[#B5C5E7] border-2 border-[#B5C5E7] text-center text-4xl font-semibold"
                                               value={gara.fatturatoConfermato && gara.fatturatoConfermato}
                                               onChange={(e) => {
                                                   setGara((prev) => ({...prev, fatturatoConfermato: parseInt(e.target.value)}) )
                                               }}
                                        />:
                                        <div
                                            className="col-span-4 flex items-center justify-center p-6 bg-[#B5C5E7] text-white text-center text-4xl font-semibold">
                                            {gara.fatturatoConfermato && gara.fatturatoConfermato.toLocaleString('en-US')}€
                                        </div>
                                    }

                                    <div className="col-span-5 flex flex-col">
                                        {editabile ?
                                            <div
                                                className="grid grid-cols-2 gap-4 border-2 border-[#B5C5E7] text-[#B5C5E7] items-center p-6 rounded-r-2xl font-medium mb-1 justify-between">
                                                <span>Confermato <br/> di gara</span>
                                                <input type="number"
                                                       className="text-center text-xl items-center border-2 border-[#B5C5E7] py-3 px-2 text-[#B5C5E7] rounded-r-2xl font-medium"
                                                       value={gara.confermatoDiGara && gara.confermatoDiGara}
                                                       onChange={(e) => {
                                                           setGara((prev) => ({...prev, confermatoDiGara: parseInt(e.target.value)}) )
                                                       }}
                                                />
                                            </div>
                                            :
                                            <div
                                                className="flex flex-row bg-[#B5C5E7] items-center p-6 text-white rounded-r-2xl font-medium mb-1 justify-between">
                                                <span>Confermato <br/> di gara</span><span
                                                className="text-2xl">{gara.confermatoDiGara && gara.confermatoDiGara.toLocaleString('en-US')}€</span>
                                            </div>
                                        }
                                        {editabile ?
                                            <div
                                                className="grid grid-cols-2 gap-4 border-2 botext-gray-500 text-gray-500 items-center p-6 rounded-r-2xl font-medium justify-between">
                                                <span>Prorogato</span>
                                                <input type="number"
                                                       className="text-center text-xl items-center border-2 botext-gray-500 py-3 px-2 text-gray-500 rounded-r-2xl font-medium"
                                                       value={gara.prorogato && gara.prorogato}
                                                       onChange={(e) => {
                                                           setGara((prev) => ({...prev, prorogato: parseInt(e.target.value)}) )
                                                       }}
                                                />
                                            </div>
                                            :
                                            <div
                                                className="flex flex-row bg-gray-300 items-center p-6 text-white rounded-r-2xl font-medium justify-between">
                                                <span>Prorogato</span><span
                                                className="text-2xl">{gara.prorogato && gara.prorogato.toLocaleString('en-US')}€</span>
                                            </div>
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                        {!editabile &&
                            <div className="col-span-3 mx-auto my-auto">
                                <PieChart labels={['Fatturato Confermato', 'fatturato non confermato', 'Aggiudicazione in corso']}
                                          values={[gara.fatturatoConfermato, gara.fatturatoNonConfermato, gara.aggiudicazioneInCorso]}
                                          backgroundColor={['#c0cbec', '#D1D5DB', '#d2dbf2']}
                                          borderColor={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
                                />
                                <div className="flex flex-col px-20 mt-10 items-center justify-around">
                                    <p className="text-base">
                                        Valore del fatturato confermato
                                    </p>
                                    <div
                                        className={`${((gara.fatturatoConfermato / gara.valoreGareInScadenza) > (garaAnnoPrec.fatturatoConfermato / garaAnnoPrec.valoreGareInScadenza)) ? "text-[green]" : "text-[red]"} text-6xl font-medium`}>
                                        {((gara.fatturatoConfermato / gara.valoreGareInScadenza) * 100).toFixed(2)}%
                                    </div>
                                    {((gara.fatturatoConfermato / gara.valoreGareInScadenza) > (garaAnnoPrec.fatturatoConfermato / garaAnnoPrec.valoreGareInScadenza)) ?
                                        <div className="flex flex-col">
                                            <IoIosArrowUp size="40px" color="green" className="mb-[-25px]"/>
                                            <IoIosArrowUp size="40px" color="green" className="mb-[-25px] opacity-60"/>
                                            <IoIosArrowUp size="40px" color="green" className="opacity-40"/>
                                        </div> :
                                        <div className="flex flex-col">
                                            <IoIosArrowDown size="40px" color="red" className="mb-[-25px] opacity-40"/>
                                            <IoIosArrowDown size="40px" color="red" className="mb-[-25px] opacity-60"/>
                                            <IoIosArrowDown size="40px" color="red"/>
                                        </div>
                                    }
                                </div>
                            </div>
                        }

                    </div>
                    {editabile &&
                        <>
                            <button
                                className="btn btn-sm bg-[#B5C5E7] text-white hover:opacity-80 hover:bg-[#4ecc8f] mb-2 w-full"
                                onClick={() => {
                                    updateGara(gara)
                                }}
                            >
                                <BiSave size={20}/>
                                Aggiorna Dati
                            </button>
                            <ModalNewGara/>
                        </>
                    }
                    <div className="flex justify-center relative mt-10">
                        {imageKey &&
                            <>
                                <Image src={`https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.amazonaws.com/${imageKey}`} alt={"immagine gara"} width={1200} height={500}
                                       onMouseOver={() => user?.nickname !== 'user' && setHovered(true)} onMouseLeave={() => user?.nickname !== 'user' && setHovered(false)}
                                       className={`${hovered ? 'opacity-70' : 'opacity-100'}`}
                                />
                                <button
                                    className={`btn bg-[#2866CC] hover:bg-blue-500 text-white absolute top-1/2 ${hovered ? 'flex' : 'hidden'}`}
                                    onMouseOver={() => user?.nickname !== 'user' && setHovered(true)} onMouseLeave={() => user?.nickname !== 'user' && setHovered(false)}
                                    onClick={() => {
                                        if(fileRef.current) {
                                            fileRef.current.click()
                                        }
                                    }}
                                >
                                    <HiOutlinePhoto size={25}/>
                                    Cambia Immagine
                                </button>
                                <input type="file"
                                       className="hidden"
                                       ref={fileRef}
                                       onChange={(e) => {
                                           if(e.target.files) {
                                               const file = e.target.files[0]
                                               deleteFileS3().then(() => {
                                                   if(e.target.files){
                                                       uploadFileS3(e.target.files[0]).then((r) => {
                                                           if(r){
                                                               setImageKey(r.key)
                                                           }
                                                       })
                                                   }
                                               })

                                           }

                                       }}
                                />
                            </>
                        }
                    </div>
                </div>
            }

        </div>
    )
}

export default Gare