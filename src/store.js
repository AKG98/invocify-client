import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/Slices/userSlice";
import invoiceReducer from "./features/Slices/invoiceSlice";
import { storesApi } from "./features/Slices/storesApi";
import { clientApi } from "./features/Slices/clientApi";
import { invoiceApi } from "./features/Slices/invoiceApi";

export const store = configureStore({
    reducer: {
        user: userReducer,
        invoice: invoiceReducer,
        [storesApi.reducerPath]: storesApi.reducer,
        [clientApi.reducerPath]: clientApi.reducer,
        [invoiceApi.reducerPath]: invoiceApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(storesApi.middleware)
            .concat(clientApi.middleware)
            .concat(invoiceApi.middleware),
});
