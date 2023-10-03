import {
    createCentroDiurnoAnziani, createResidenzaAltreSocieta,
    getAllServiziAltreSocieta,
    updateResidenzaAltreSocietaInFauna
} from "@/faunadb/Fauna";

export default async function handler(req:any, res:any) {
    if(req.method === "GET"){
        try {
            const residenze = await getAllServiziAltreSocieta();
            return res.status(200).json(residenze);
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Something went wrong.' });
        }
    }else if(req.method === "PUT"){
        try {
            const residenze = await updateResidenzaAltreSocietaInFauna(req.body)
            return res.status(200).json(residenze);
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Something went wrong.' });
        }
    }else if(req.method === "POST"){
        try {
            const residenza = await createResidenzaAltreSocieta(req.body)
            return res.status(201).json(residenza);
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Something went wrong.' });
        }
    }
}