import {createGaraInFauna, getAllGareInFauna, updateGaraInFauna} from "@/faunadb/Fauna";

export default async function handler(req:any, res:any) {
    if (req.method === 'GET') {
        try {
            const gare = await getAllGareInFauna();
            return res.status(200).json(gare);
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Something went wrong.' });
        }
    } else if (req.method === 'POST') {
        try {
            const gara = await createGaraInFauna(req.body);
            return res.status(201).json(gara);
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Something went wrong.' });
        }
    }
}