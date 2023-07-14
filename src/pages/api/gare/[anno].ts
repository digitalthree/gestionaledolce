import {getGaraByAnnoInFauna, updateGaraInFauna} from "@/faunadb/Fauna";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const {anno} = req.query
            const gare = await getGaraByAnnoInFauna(parseInt(anno));
            res.status(200).json(gare);
        } catch (err) {
            console.error(err);
            res.status(500).json({msg: 'Something went wrong.'});
        }
    }else if (req.method === 'PUT') {
        try {
            const gara = await updateGaraInFauna(req.body)
            res.status(200).json(gara);
        } catch (err) {
            console.error(err);
            res.status(500).json({msg: 'Something went wrong.'});
        }
    }


}