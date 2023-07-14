export interface ResidenzaAnziani {
    faunaDocumentId?: string
    inputArray: InputResidenza[]
}

export interface InputResidenza {
    faunaDocumentId?: string
    area: string,
    localita: string,
    provincia: string,
    servizio: string,
    struttura: string,
    capienza: number,
    dati: InputDati[]
}

export interface InputDati {
    capienzaAttuale: number,
    data: string,
}

export const inputArrayDefault: InputResidenza[] = [
    {
        area: "Nord Ovest",
        localita: "Trescore Balneario",
        provincia: "BG",
        servizio: "RSA",
        struttura: "Papa Giovanni XXIII",
        capienza: 61,
        dati: [
            {
                capienzaAttuale: 61,
                data: "15/07/2023"
            },
            {
                capienzaAttuale: 61,
                data: "01/07/2023"
            },
            {
                capienzaAttuale: 60,
                data: "15/06/2023"
            },
            {
                capienzaAttuale: 61,
                data: "15/05/2023"
            }
        ]

    },
    {
        area: "Nord Ovest",
        localita: "Azzano San Paolo",
        provincia: "BG",
        servizio: "RSA",
        struttura: "San Paolo --- Accredidati a contratto",
        capienza: 13,
        dati: [
            {
                capienzaAttuale: 10,
                data: "15/07/2023"
            },
            {
                capienzaAttuale: 13,
                data: "01/07/2023"
            },
            {
                capienzaAttuale: 13,
                data: "15/06/2023"
            },
            {
                capienzaAttuale: 8,
                data: "15/05/2023"
            }
        ]

    },
    {
        area: "Nord Ovest",
        localita: "Azzano San Paolo",
        provincia: "BG",
        servizio: "RSA",
        struttura: "San Paolo --- Privati",
        capienza: 45,
        dati: [
            {
                capienzaAttuale: 45,
                data: "15/07/2023"
            },
            {
                capienzaAttuale: 45,
                data: "01/07/2023"
            },
            {
                capienzaAttuale: 45,
                data: "15/06/2023"
            },
            {
                capienzaAttuale: 45,
                data: "15/05/2023"
            }
        ]

    },
]