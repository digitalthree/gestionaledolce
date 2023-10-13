import {deleteTaskFromFauna, getTaskByIdInFauna, updateTaskInFauna} from "@/faunadb/Fauna";

export default async function handler(req: any, res: any) {
    if (req.method === 'GET') {
        try {
            const {id} = req.query
            const task = await getTaskByIdInFauna(parseInt(id));
            res.status(200).json(task);
        } catch (err) {
            console.error(err);
            res.status(500).json({msg: 'Something went wrong.'});
        }
    } else if (req.method === 'PUT') {
        try {
            const task = await updateTaskInFauna(req.body)
            res.status(200).json(task);
        } catch (err) {
            console.error(err);
            res.status(500).json({msg: 'Something went wrong.'});
        }
    } else if (req.method === 'DELETE') {
        try {
            const {id} = req.query
            await deleteTaskFromFauna(id)
            res.status(204).json('No Content')
        } catch (err) {
            console.error(err);
            res.status(500).json({msg: 'Something went wrong.'});
        }
    }
}