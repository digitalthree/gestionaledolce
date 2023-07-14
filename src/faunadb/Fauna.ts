import {ResidenzaAnziani} from "@/model/ResidenzaAnziani";
import {Gara} from "@/model/Gara";

const faunadb = require('faunadb');
const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET });
const q = faunadb.query;

export const getAllResidenzeInFauna = async () => {
    const data =  await faunaClient.query(
        q.Select("data",
            q.Map(
                q.Paginate(q.Match(q.Index("allResidenze"))),
                q.Lambda("residenza", {
                    faunaDocumentId: q.Select(
                        ["ref", "id"],
                        q.Get(
                            q.Var("residenza")
                        )
                    ),
                    residenza: q.Select(
                        ["data"],
                        q.Get(
                            q.Var("residenza")
                        )
                    )
                })
            )
        )
    );
    return data.map(d => {
        d.residenza.faunaDocumentId = d.faunaDocumentId
        delete d.faunaDocumentId
        return d.residenza
    })
}

export const updateResidenzaInFauna = async (objectToUpdate: ResidenzaAnziani) => {
    console.log(objectToUpdate)
    const data = await faunaClient.query(
        q.Update(q.Ref(q.Collection('ResidenzaAnziani'), objectToUpdate.faunaDocumentId as string), {
            data: {
                ...objectToUpdate
            } as ResidenzaAnziani
        })
    )
    return data
}

export const getAllGareInFauna = async () => {
    const data =  await faunaClient.query(
        q.Select("data",
            q.Map(
                q.Paginate(q.Match(q.Index("allGare"))),
                q.Lambda("gara", {
                    faunaDocumentId: q.Select(
                        ["ref", "id"],
                        q.Get(
                            q.Var("gara")
                        )
                    ),
                    gara: q.Select(
                        ["data"],
                        q.Get(
                            q.Var("gara")
                        )
                    )
                })
            )
        )
    );
    return data.map(d => {
        d.gara.faunaDocumentId = d.faunaDocumentId
        delete d.faunaDocumentId
        return d.gara
    })
}

export const getGaraByAnnoInFauna = async (anno: number) => {
    const data =  await faunaClient.query(
        q.Select("data",
            q.Map(
                q.Paginate(q.Match(q.Index("getGaraByAnno"), anno)),
                q.Lambda("gara", {
                    faunaDocumentId: q.Select(
                        ["ref", "id"],
                        q.Get(
                            q.Var("gara")
                        )
                    ),
                    gara: q.Select(
                        ["data"],
                        q.Get(
                            q.Var("gara")
                        )
                    )
                })
            )
        )
    );
    return data.map(d => {
        d.gara.faunaDocumentId = d.faunaDocumentId
        delete d.faunaDocumentId
        return d.gara
    })
}

export const updateGaraInFauna = async (objectToUpdate: Gara) => {
    return await faunaClient.query(
        q.Update(q.Ref(q.Collection('Gare'), objectToUpdate.faunaDocumentId as string), {
            data: {
                ...objectToUpdate
            } as Gara
        })
    )
}