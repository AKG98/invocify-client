import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Use "/react" to get hooks

export const invoiceApi = createApi({
  reducerPath: "invoiceApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://invocify-server.onrender.com/api" }), // API base without "/invoices"
  tagTypes: ["Invoice"],

  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: (ownerId) => `/invoices/get-invoices/${ownerId}`, // Update path
      providesTags: ["Invoice"],
    }),

    addInvoice: builder.mutation({
      query: (invoice) => ({
        url: "/invoices/save-invoice", // Update path
        method: "POST",
        body: invoice,
      }),
      invalidatesTags: ["Invoice"],
    }),

    updateInvoice: builder.mutation({
      query: ({ invoiceId, invoice }) => ({
        url: `/invoices/update-invoice/${invoiceId}`, // Update path
        method: "PUT",
        body: invoice,
      }),
      invalidatesTags: ["Invoice"],
    }),

    deleteInvoice: builder.mutation({
      query: (invoiceId) => ({
        url: `/invoices/delete-invoice/${invoiceId}`, // Update path
        method: "DELETE",
      }),
      invalidatesTags: ["Invoice"],
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useAddInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceApi;
