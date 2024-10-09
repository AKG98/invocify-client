import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storesApi = createApi({
    reducerPath:"storesApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://invocify-server.onrender.com/api/stores"}),
    tagTypes: ["Stores"],
    endpoints: (builder) => ({
        getStores: builder.query({
            query: (ownerId) => `/get-stores/${ownerId}`,
            providesTags: ["Stores"],
        }),
        getStoreById: builder.query({
            query: (storeId) => `/get-store/${storeId}`,
            providesTags: ["Stores"],
        }),
        addStore: builder.mutation({
            query: (body) => ({
                url: "/add-store",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Stores"],
        }),
        updateStore: builder.mutation({
            query: ({storeId,...body}) => ({
                url: `/update-store/${storeId}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Stores"],
        }),
        deleteStore: builder.mutation({
            query: (storeId) => ({
                url: `/delete-store/${storeId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Stores"],
        }),
    }),
})

export const { useGetStoresQuery,useGetStoreByIdQuery ,useAddStoreMutation, useUpdateStoreMutation, useDeleteStoreMutation } = storesApi;