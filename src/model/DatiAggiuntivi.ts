export interface DatiAggiuntivi {
    tipo: 'raaltre' | 'radolce' | 'cdadolce' | 'ssdolce',
    capienzaComplessiva: number,
    percentualeTotale: number,
    percentualeTotaleSettPrec: number,
    faunaDocumentId?: string,
    nota: string
}