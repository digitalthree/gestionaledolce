import {
    createCentroDiurnoAnziani,
    createResidenza,
    getAllCentriDiurniAnziani,
    getAllServiziSocietaDolce,
    updateCentroDiurnoAnzianiInFauna,
    updateResidenzaInFauna
} from "@/faunadb/Fauna";

export default async function handler(req:any, res:any) {
    if(req.method === "GET"){
        try {
            const centri = await getAllCentriDiurniAnziani();
            return res.status(200).json(centri);
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Something went wrong.' });
        }
    }else if(req.method === "PUT"){
        try {
            const centri = await updateCentroDiurnoAnzianiInFauna(req.body)
            return res.status(200).json(centri);
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Something went wrong.' });
        }
    }else if(req.method === "POST"){
        try {
            const centro = await createCentroDiurnoAnziani(req.body)
            return res.status(201).json(centro);
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Something went wrong.' });
        }
    }
}