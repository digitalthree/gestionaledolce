import {getAllServiziSocietaDolce, updateResidenzaInFauna} from "@/faunadb/Fauna";

export default async function handler(req:any, res:any) {
    if(req.method === "GET"){
        try {
            const residenze = await getAllServiziSocietaDolce();
            return res.status(200).json(residenze);
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Something went wrong.' });
        }
    }else if(req.method === "PUT"){
        try {
            const residenze = await updateResidenzaInFauna(req.body)
            return res.status(200).json(residenze);
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Something went wrong.' });
        }
    }
}