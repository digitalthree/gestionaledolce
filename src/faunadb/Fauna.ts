import {ResidenzaAnziani} from "@/model/ResidenzaAnziani";
import {Gara} from "@/model/Gara";

const faunadb = require('faunadb');
const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET });
const q = faunadb.query;

export const getAllServiziSocietaDolce = async () => {
    const data =  await faunaClient.query(
        q.Select("data",
            q.Map(
                q.Paginate(q.Match(q.Index("allServiziSocietaDolce"))),
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
    return data.map((d: any) => {
        d.residenza.faunaDocumentId = d.faunaDocumentId
        delete d.faunaDocumentId
        return d.residenza
    })
}

export const updateResidenzaInFauna = async (objectToUpdate: ResidenzaAnziani) => {
    const data = await faunaClient.query(
        q.Update(q.Ref(q.Collection('ServiziSocietaDolce'), objectToUpdate.faunaDocumentId as string), {
            data: {
                ...objectToUpdate
            } as ResidenzaAnziani
        })
    )
    return data
}

export const getAllServiziAltreSocieta = async () => {
    const data =  await faunaClient.query(
        q.Select("data",
            q.Map(
                q.Paginate(q.Match(q.Index("allServiziAltreSocieta"))),
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
    return data.map((d: any) => {
        d.residenza.faunaDocumentId = d.faunaDocumentId
        delete d.faunaDocumentId
        return d.residenza
    })
}

export const updateResidenzaAltreSocietaInFauna = async (objectToUpdate: ResidenzaAnziani) => {
    const data = await faunaClient.query(
        q.Update(q.Ref(q.Collection('ServiziAltreSocieta'), objectToUpdate.faunaDocumentId as string), {
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
    return data.map((d: any) => {
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
    return data.map((d: any) => {
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