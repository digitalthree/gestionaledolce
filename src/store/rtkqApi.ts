import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {InputResidenza} from "@/model/ResidenzaAnziani";
import {Gara} from "@/model/Gara";
import {News} from "@/model/News";
import {DatiAggiuntivi} from "@/model/DatiAggiuntivi";



export const rtkqApi = createApi({
    reducerPath: "rtkqApi",
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_URL+'api'}),
    tagTypes: ['Residenze', 'ResidenzeAltreSocieta', 'Gare', 'Gara', 'CentriDiurniAnziani', 'StruttureSanitarie', "News", "NewsId", "DatiAggiuntivi"],
    endpoints: (build) => ({
        getResidenze : build.query<InputResidenza[], void>({
            query: () => 'residenze',
            providesTags: ['Residenze']
        }),
        updateResidenza: build.mutation({
            query: (body) => ({
                url: 'residenze',
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Residenze']
        }),
        getResidenzeAltreSocieta : build.query<InputResidenza[], void>({
            query: () => 'residenzeAltreSocieta',
            providesTags: ['ResidenzeAltreSocieta']
        }),
        updateResidenzaAltraSocieta: build.mutation({
            query: (body) => ({
                url: 'residenzeAltreSocieta',
                method: 'PUT',
                body
            }),
            invalidatesTags: ['ResidenzeAltreSocieta']
        }),
        getCentriDiurniAnziani : build.query<InputResidenza[], void>({
            query: () => 'centriDiurniAnziani',
            providesTags: ['CentriDiurniAnziani']
        }),
        updateCentroDiurnoAnziani: build.mutation({
            query: (body) => ({
                url: 'centriDiurniAnziani',
                method: 'PUT',
                body
            }),
            invalidatesTags: ['CentriDiurniAnziani']
        }),
        getStruttureSanitarie : build.query<InputResidenza[], void>({
            query: () => 'struttureSanitarie',
            providesTags: ['StruttureSanitarie']
        }),
        updateStrutturaSanitaria: build.mutation({
            query: (body) => ({
                url: 'struttureSanitarie',
                method: 'PUT',
                body
            }),
            invalidatesTags: ['StruttureSanitarie']
        }),
        getGare: build.query<Gara[], void>({
            query: () => 'gare',
            providesTags: ['Gare']
        }),
        getGaraByAnno: build.query<Gara, number>({
            query: (anno) => 'gare/'+anno,
            providesTags: ['Gara']
        }),
        updateGara: build.mutation({
            query: (body) => ({
                url: 'gare/'+body.anno,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Gare', 'Gara']
        }),
        getNews: build.query<News[], void>({
            query: () => "news",
            providesTags: ["News"]
        }),
        createNews: build.mutation({
            query: (body) => ({
                url: "news",
                method: 'POST',
                body
            })
        }),
        updateNews: build.mutation({
            query: (body) => ({
                url: 'news/'+body.faunaDocumentId,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['News', 'NewsId']
        }),
        deleteNews: build.mutation({
            query: (id) => ({
                url: 'news/'+id,
                method: 'DELETE'
            })
        }),
        getDatiAggiuntivi : build.query<DatiAggiuntivi[], void>({
            query: () => 'datiAggiuntivi',
            providesTags: ['DatiAggiuntivi']
        }),
        updateDatiAggiuntivi: build.mutation({
            query: (body) => ({
                url: 'datiAggiuntivi',
                method: 'PUT',
                body
            }),
            invalidatesTags: ['DatiAggiuntivi']
        }),
    })
})




export const useGetResidenze = rtkqApi.endpoints.getResidenze.useQuery
export const useGetResidenzeAltraSocieta = rtkqApi.endpoints.getResidenzeAltreSocieta.useQuery
export const useGetCentriDiurniAnziani = rtkqApi.endpoints.getCentriDiurniAnziani.useQuery
export const useGetStruttureSanitarie = rtkqApi.endpoints.getStruttureSanitarie.useQuery
export const useGetGare = rtkqApi.endpoints.getGare.useQuery
export const useGetGaraByAnno = rtkqApi.endpoints.getGaraByAnno.useQuery
export const useUpdateGaraMutation = rtkqApi.endpoints.updateGara.useMutation
export const useUpdateResidenzaMutation = rtkqApi.endpoints.updateResidenza.useMutation
export const useUpdateResidenzaAltraSocietaMutation = rtkqApi.endpoints.updateResidenzaAltraSocieta.useMutation
export const useUpdateCentroDiurnoAnzianiMutation = rtkqApi.endpoints.updateCentroDiurnoAnziani.useMutation
export const useUpdateStrutturaSanitariaMutation = rtkqApi.endpoints.updateStrutturaSanitaria.useMutation
export const useGetNews = rtkqApi.endpoints.getNews.useQuery
export const useCreateNewsMutation = rtkqApi.endpoints.createNews.useMutation
export const useUpdateNewsMutation = rtkqApi.endpoints.updateNews.useMutation
export const useDeleteNewsMutation = rtkqApi.endpoints?.deleteNews.useMutation
export const useGetDatiAggiuntivi = rtkqApi.endpoints?.getDatiAggiuntivi.useQuery
export const useUpdateDatiAggiuntivi = rtkqApi.endpoints?.updateDatiAggiuntivi.useMutation

