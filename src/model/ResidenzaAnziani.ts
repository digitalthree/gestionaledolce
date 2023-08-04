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
    dati: InputDati[]
}

export interface InputDati {
    capienzaAttuale: number,
    capienzaComplessiva: number,
    data: string,
}
