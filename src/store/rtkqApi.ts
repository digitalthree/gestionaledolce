import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {InputResidenza} from "@/model/ResidenzaAnziani";
import {Gara} from "@/model/Gara";


export const rtkqApi = createApi({
    reducerPath: "rtkqApi",
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_URL+'api'}),
    tagTypes: ['Residenze', 'ResidenzeAltreSocieta', 'Gare', 'Gara', 'CentriDiurniAnziani', 'StruttureSanitarie'],
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
        })
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