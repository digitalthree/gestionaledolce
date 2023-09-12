import {
    getAllCentriDiurniAnziani, getAllDatiAggiuntivi,
    getAllServiziSocietaDolce,
    updateCentroDiurnoAnzianiInFauna, updateDatiAggiuntiviFauna,
    updateResidenzaInFauna
} from "@/faunadb/Fauna";

export default async function handler(req:any, res:any) {
    if(req.method === "GET"){
        try {
            const dati = await getAllDatiAggiuntivi();
            return res.status(200).json(dati);
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Something went wrong.' });
        }
    }else if(req.method === "PUT"){
        try {
            const dati = await updateDatiAggiuntiviFauna(req.body)
            return res.status(200).json(dati);
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Something went wrong.' });
        }
    }
}