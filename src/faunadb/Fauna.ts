import {ResidenzaAnziani} from "@/model/ResidenzaAnziani";
import {Gara} from "@/model/Gara";
import {News} from "@/model/News";

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

export const getAllCentriDiurniAnziani = async () => {
    const data =  await faunaClient.query(
        q.Select("data",
            q.Map(
                q.Paginate(q.Match(q.Index("allCentriDiurniAnziani"))),
                q.Lambda("centro", {
                    faunaDocumentId: q.Select(
                        ["ref", "id"],
                        q.Get(
                            q.Var("centro")
                        )
                    ),
                    centro: q.Select(
                        ["data"],
                        q.Get(
                            q.Var("centro")
                        )
                    )
                })
            )
        )
    );
    return data.map((d: any) => {
        d.centro.faunaDocumentId = d.faunaDocumentId
        delete d.faunaDocumentId
        return d.centro
    })
}

export const updateCentroDiurnoAnzianiInFauna = async (objectToUpdate: ResidenzaAnziani) => {
    const data = await faunaClient.query(
        q.Update(q.Ref(q.Collection('CentriDiurniAnziani'), objectToUpdate.faunaDocumentId as string), {
            data: {
                ...objectToUpdate
            } as ResidenzaAnziani
        })
    )
    return data
}

export const getAllStruttureSanitarie = async () => {
    const data =  await faunaClient.query(
        q.Select("data",
            q.Map(
                q.Paginate(q.Match(q.Index("allStruttureSanitarie"))),
                q.Lambda("struttura", {
                    faunaDocumentId: q.Select(
                        ["ref", "id"],
                        q.Get(
                            q.Var("struttura")
                        )
                    ),
                    struttura: q.Select(
                        ["data"],
                        q.Get(
                            q.Var("struttura")
                        )
                    )
                })
            )
        )
    );
    return data.map((d: any) => {
        d.struttura.faunaDocumentId = d.faunaDocumentId
        delete d.faunaDocumentId
        return d.struttura
    })
}

export const updateStrutturaSanitariaInFauna = async (objectToUpdate: ResidenzaAnziani) => {
    const data = await faunaClient.query(
        q.Update(q.Ref(q.Collection('StruttureSanitarie'), objectToUpdate.faunaDocumentId as string), {
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

export const createNews = async (news: News) => {
    return await faunaClient.query(
        q.Create(q.Collection("News"), {data: news})
    )
}

export const getAllNews = async () => {
    const data =  await faunaClient.query(
        q.Select("data",
            q.Map(
                q.Paginate(q.Match(q.Index("allNews"))),
                q.Lambda("news", {
                    faunaDocumentId: q.Select(
                        ["ref", "id"],
                        q.Get(
                            q.Var("news")
                        )
                    ),
                    news: q.Select(
                        ["data"],
                        q.Get(
                            q.Var("news")
                        )
                    )
                })
            )
        )
    );
    return data.map((d: any) => {
        d.news.faunaDocumentId = d.faunaDocumentId
        delete d.faunaDocumentId
        return d.news
    })
}

export const updateNewsInFauna = async (objectToUpdate: News) => {
    const data = await faunaClient.query(
        q.Update(q.Ref(q.Collection('News'), objectToUpdate.faunaDocumentId as string), {
            data: {
                ...objectToUpdate
            } as News
        })
    )
    return data
}

export const getNewsByIdInFauna = async (id: number) => {
    const data =  await faunaClient.query(
        q.Select("data",
            q.Map(
                q.Paginate(q.Match(q.Index("getNewsById"), id)),
                q.Lambda("news", {
                    faunaDocumentId: q.Select(
                        ["ref", "id"],
                        q.Get(
                            q.Var("news")
                        )
                    ),
                    news: q.Select(
                        ["data"],
                        q.Get(
                            q.Var("news")
                        )
                    )
                })
            )
        )
    );
    return data.map((d: any) => {
        d.news.faunaDocumentId = d.faunaDocumentId
        delete d.faunaDocumentId
        return d.news
    })
}

export const deleteNewsFromFauna = async (newsId: string) => {
    await faunaClient.query(q.Delete(q.Ref(q.Collection('News'), newsId)))
}