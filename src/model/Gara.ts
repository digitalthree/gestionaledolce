export interface Gara {
    valoreDellaProduzione: number,
    valoreGareInScadenza: number,
    fatturatoConfermato: number,
    fatturatoNonConfermato: number,
    aggiudicazioneInCorso: number,
    gareInScadenza: number,
    gareInCorso: number,
    gareVinte: number,
    garePerse: number,
    gareNuovePartecipate: number,
    gareNuoveVinte: number,
    annoNuovoFatturato: number,
    portafoglioAcquisto: number,
    confermatoDiGara: number,
    prorogato: number,
    faunaDocumentId?: string
    anno: number
}