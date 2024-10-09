import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientApi = createApi({
    reducerPath: "clientApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://invocify-server.onrender.com/api/clients" }),
    tagTypes: ["Clients"], // Changed "Stores" to "Clients" for consistency
    endpoints: (builder) => ({
        getClients: builder.query({
            query: (ownerId) => `/get-customers/${ownerId}`,
            providesTags: ["Clients"],
        }),
        getClientById: builder.query({
            query: (clientId) => `/get-customer/${clientId}`,
            providesTags: ["Clients"],
        }),
        addClient: builder.mutation({
            query: (body) => ({
                url: "/add-customer",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Clients"], // Invalidate all clients when adding a client
        }),
        updateClient: builder.mutation({
            query: ({ clientId, ...body }) => ({
                url: `/update-customer/${clientId}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Clients"],
        }),
        deleteClient: builder.mutation({
            query: (clientId) => ({
                url: `/delete-customer/${clientId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Clients"],
        }),
    }),
});

export const { useGetClientsQuery, useAddClientMutation, useUpdateClientMutation, useDeleteClientMutation, useGetClientByIdQuery } = clientApi;
