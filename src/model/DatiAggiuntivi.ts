export interface DatiAggiuntivi {
    tipo: 'raaltre' | 'radolce' | 'cdadolce' | 'ssdolce',
    capienzaComplessiva: number,
    percentualeTotale: number,
    faunaDocumentId?: string,
    nota: string
}