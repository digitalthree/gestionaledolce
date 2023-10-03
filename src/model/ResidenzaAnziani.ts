export interface ResidenzaAnziani {
    faunaDocumentId?: string
    inputArray: InputResidenza[]
}

export interface InputResidenza {
    faunaDocumentId?: string
    area: string,
    localita: string,
    nota: string,
    provincia: string,
    servizio: string,
    struttura: string,
    capienza: number,
    dati: InputDati[],
    dataInizioGestione: string,
    onOff: boolean
}

export interface InputDati {
    disponibilitaStruttura: number,
    capienzaAttuale: number,
    percentuale: number,
    data: string,
    onOff: boolean
}
