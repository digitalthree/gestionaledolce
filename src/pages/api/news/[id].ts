import {deleteNewsFromFauna, getNewsByIdInFauna, updateNewsInFauna} from "@/faunadb/Fauna";

export default async function handler(req: any, res: any) {
    if (req.method === 'GET') {
        try {
            const {id} = req.query
            const news = await getNewsByIdInFauna(parseInt(id));
            res.status(200).json(news);
        } catch (err) {
            console.error(err);
            res.status(500).json({msg: 'Something went wrong.'});
        }
    } else if (req.method === 'PUT') {
        try {
            const news = await updateNewsInFauna(req.body)
            res.status(200).json(news);
        } catch (err) {
            console.error(err);
            res.status(500).json({msg: 'Something went wrong.'});
        }
    } else if (req.method === 'DELETE') {
        try {
            const {id} = req.query
            await deleteNewsFromFauna(id)
            res.status(204)
        } catch (err) {
            console.error(err);
            res.status(500).json({msg: 'Something went wrong.'});
        }
    }
}