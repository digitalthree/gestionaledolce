import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {InputResidenza} from "@/model/ResidenzaAnziani";
import {Gara} from "@/model/Gara";


export const rtkqApi = createApi({
    reducerPath: "rtkqApi",
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_URL+'api'}),
    tagTypes: ['Residenze', 'Gare', 'Gara'],
    endpoints: (build) => ({
        getResidenze : build.query({
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
        getGare: build.query({
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
export const useGetGare = rtkqApi.endpoints.getGare.useQuery
export const useGetGaraByAnno = rtkqApi.endpoints.getGaraByAnno.useQuery
export const useUpdateGaraMutation = rtkqApi.endpoints.updateGara.useMutation
export const useUpdateResidenzaMutation = rtkqApi.endpoints.updateResidenza.useMutation