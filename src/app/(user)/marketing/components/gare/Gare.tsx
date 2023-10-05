import React, {useEffect, useRef, useState} from 'react';
import PieChart from "@/app/(user)/marketing/components/gare/components/PieChart";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {Gara} from "@/model/Gara";
import {useGetGaraByAnno, useGetGare} from "@/store/rtkqApi";
import Image from "next/image";
import {HiOutlinePhoto} from "react-icons/hi2";
import {deleteFileS3, getFileFromS3, uploadFileS3} from "@/aws/s3APIs";
import {useUser} from "@auth0/nextjs-auth0/client";

export interface GareProps {

}

const Gare: React.FC<GareProps> = ({}) => {
    const resGare = useGetGare()
    const resGara = useGetGaraByAnno(new Date().getFullYear())

    const [gara, setGara] = useState<Gara>({} as Gara)
    const [gare, setGare] = useState<Gara[]>([])

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
        <div className="overflow-y-scroll max-h-[900px] pb-20">
            {resGare.isLoading && resGara.isLoading &&
                <div className="absolute top-1/2 left-1/2">
                    <span className="loading loading-bars loading-lg text-[#B5C5E7]"></span>
                </div>
            }
            {gare.length > 0 && gara &&
                <>
                    <div className="w-full flex flex-row items-center">
                        <span className="mr-2 text-[#B5C5E7] text-sm">Conferme</span>
                        <hr className="w-full border-[#B5C5E7] border"/>
                    </div>
                    <div className="grid grid-cols-7 gap-20 px-10 py-10">
                        <div className="col-span-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="grid grid-cols-12 gap-[2px]">
                                    <div
                                        className="col-span-3 flex items-center justify-center p-6 bg-[#0066cc] text-white rounded-l-2xl text-center">Valore
                                        della <br/> produzione
                                    </div>
                                    <div
                                        className="col-span-9 flex items-center justify-center p-6 bg-[#0066cc] text-white rounded-r-2xl text-4xl font-medium">{gara.valoreDellaProduzione && gara.valoreDellaProduzione.toLocaleString('en-US')}€
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-[2px]">
                                    <div
                                        className="col-span-3 flex items-center justify-center p-6 bg-[#B5C5E7] text-white rounded-l-2xl text-center">Valore
                                        gare <br/> in scadenza
                                    </div>
                                    <div
                                        className="col-span-4 flex items-center justify-center p-6 bg-[#B5C5E7] text-white text-center text-4xl font-semibold">
                                        {gara.valoreGareInScadenza && gara.valoreGareInScadenza.toLocaleString('en-US')}€
                                    </div>
                                    <div className="col-span-5 flex flex-col">
                                        <div
                                            className="flex flex-row bg-[#B5C5E7] items-center justify-center p-6 text-white rounded-r-2xl font-medium mb-1 justify-between">
                                            <span>Fatturato <br/> Confermato</span><span
                                            className="text-2xl">{gara.fatturatoConfermato && gara.fatturatoConfermato.toLocaleString('en-US')}€</span></div>
                                        <div
                                            className="flex flex-row bg-gray-300 items-center justify-center p-6 text-white rounded-r-2xl font-medium mb-1 justify-between">
                                            <span>Fatturato non <br/> Confermato</span><span
                                            className="text-2xl">{gara.fatturatoNonConfermato && gara.fatturatoNonConfermato.toLocaleString('en-US')}€</span></div>
                                        <div
                                            className="flex flex-row bg-[#d2dbf2] items-center justify-center p-6 text-white rounded-r-2xl font-medium justify-between">
                                            <span>Aggiudicazione <br/> in corso</span><span
                                            className="text-2xl">{gara.aggiudicazioneInCorso && gara.aggiudicazioneInCorso.toLocaleString('en-US')}€</span></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-[2px]">
                                    <div
                                        className="col-span-3 flex items-center justify-center p-6 bg-[#B5C5E7] text-white rounded-l-2xl text-center">Fatturato<br/>Confermato
                                    </div>
                                    <div
                                        className="col-span-4 flex items-center justify-center p-6 bg-[#B5C5E7] text-white text-center text-4xl font-semibold">
                                        {gara.fatturatoConfermato && gara.fatturatoConfermato.toLocaleString('en-US')}€
                                    </div>
                                    <div className="col-span-5 flex flex-col">
                                        <div
                                            className="flex flex-row bg-[#B5C5E7] items-center p-6 text-white rounded-r-2xl font-medium mb-1 justify-between">
                                            <span>Confermato <br/> di gara</span><span
                                            className="text-2xl">{gara.confermatoDiGara && gara.confermatoDiGara.toLocaleString('en-US')}€</span></div>
                                        <div
                                            className="flex flex-row bg-gray-300 items-center p-6 text-white rounded-r-2xl font-medium justify-between">
                                            <span>Prorogato</span><span
                                            className="text-2xl">{gara.prorogato && gara.prorogato.toLocaleString('en-US')}€</span></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-span-3 mx-auto my-auto">
                            <PieChart labels={['Gare in corso', 'Gare in scadenza', 'Gare vinte', 'Gare perse']}
                                      values={[gara.gareInCorso, gara.gareInScadenza, gara.gareVinte]}
                                      backgroundColor={['#c0cbec', '#d2dbf2', '#D1D5DB']}
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
                    </div>
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
                </>
            }
            {/*<div className="flex justify-center">
                <a href="/img/reportTipo.pdf" download
                   className="btn btn-sm w-full px-7 mt-10 mb-5 border-white bg-[#2866CC] hover:bg-[#2866CC] hover:opacity-70">
                    <TbFileExport size={25} color="white"/>
                    <span className="text-white">Scarica Report</span>
                </a>
            </div>*/}
        </div>
    )
}

export default Gare