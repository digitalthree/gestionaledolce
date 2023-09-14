import React from 'react';

export interface BottomLegendProps{

}

const BottomLegend: React.FC<BottomLegendProps> = ({}) => {
    return(
        <>
            <div className="flex flex-row justify-center mt-20 pb-10">
                <div className="grid grid-cols-3 gap-20">
                    <div className="flex flex-col">
                        <h3 className="text-[#0040b8] font-semibold">COMUNICAZIONE ISTITUZIONALE</h3>
                        <span className="font-semibold">Eventi e attività:</span>
                        <ul className="list-disc">
                            <li className="italic">Realizzazione materiale e diffusione con vari strumenti</li>
                            <li className="italic">News su www.grupposocietadolce.it</li>
                            <li className="italic">Coinvolgimento partners strategici</li>
                            <li className="italic">Post ripetuti su social network</li>
                            <li className="italic">Comunicato stampa ed eventuale conferenza stampa</li>
                            <li className="italic">Coinvolgimento organi di stampa</li>
                            <li className="italic">Pubblicazione su portale Zucchetti e mailing list Presidenza</li>
                        </ul>
                    </div>
                    <div>
                        <div className="flex flex-col">
                            <h3 className="text-[#39b54a] font-semibold">POSIZIONAMENTO TERRITORIALE</h3>
                            <span className="font-semibold">Iniziativa territoriale di settore:</span>
                            <ul className="list-disc">
                                <li className="italic">Realizzazione materiale e diffusione con vari strumenti</li>
                                <li className="italic">News su www.societadolce.it</li>
                                <li className="italic">Coinvolgimento partners/enti</li>
                                <li className="italic">Post su social network</li>
                                <li className="italic">Comunicato stampa</li>
                                <li className="italic">Coinvolgimento organi di stampa locali</li>
                                <li className="italic">Pubblicazione su portale Zucchetti</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col">
                            <h3 className="text-[#f7931e] font-semibold">PROMOZIONE COMMERCIALE</h3>
                            <span className="font-semibold">Piccola iniziativa locale:</span>
                            <ul className="list-disc">
                                <li className="italic">Post su social network</li>
                                <li className="italic">Eventuale news su www.societadolce.it</li>
                            </ul>
                            <span className="font-semibold">Campagna Pubblicitaria:</span>
                            <ul className="list-disc">
                                <li className="italic">Pianificazione concept, strumenti, tempistica, budget</li>
                                <li className="italic">Realizzazione materiale e diffusione con vari strumenti</li>
                                <li className="italic">Post su social network</li>
                                <li className="italic">Eventuale advertising su social network</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BottomLegend