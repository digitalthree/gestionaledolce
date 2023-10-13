import {createNews, createTask, getAllNews, getAllTasks} from "@/faunadb/Fauna";

export default async function handler(req:any, res:any) {
    if(req.method === "GET"){
        try {
            const tasks = await getAllTasks();
            return res.status(200).json(tasks);
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Something went wrong.' });
        }
    }else if(req.method === "POST"){
        try {
            const task = await createTask(req.body)
            return res.status(201).json(task);
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Something went wrong.' });
        }
    }
}