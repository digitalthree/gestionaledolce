import {
    createResidenzaAltreSocieta, createStrutturaSanitaria,
    getAllServiziSocietaDolce,
    getAllStruttureSanitarie,
    updateResidenzaInFauna,
    updateStrutturaSanitariaInFauna
} from "@/faunadb/Fauna";

export default async function handler(req:any, res:any) {
    if(req.method === "GET"){
        try {
            const strutture = await getAllStruttureSanitarie();
            return res.status(200).json(strutture);
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Something went wrong.' });
        }
    }else if(req.method === "PUT"){
        try {
            const strutture = await updateStrutturaSanitariaInFauna(req.body)
            return res.status(200).json(strutture);
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Something went wrong.' });
        }
    }else if(req.method === "POST"){
        try {
            const struttura = await createStrutturaSanitaria(req.body)
            return res.status(201).json(struttura);
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Something went wrong.' });
        }
    }
}