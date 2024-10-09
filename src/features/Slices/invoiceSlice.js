import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    step: 0,
    dataFlag: false,
    customerData:null,
    storeData:null,
    invoiceData:null,
    templateKey:null,
    loading: false,
    trialData:null,
};

const invoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers:{
        showLoading(state){
            state.loading = true;
        },
        hideLoading(state){
            state.loading = false;
        },
        setCustomerData(state, action){
            state.customerData = action.payload;
        },
        setStoreData(state, action){
            state.storeData = action.payload;
        },
        pushInvoiceData(state, action){
            state.invoiceData = action.payload;
        },
        incrementStep(state){
            state.step += 1;
            state.dataFlag = false;
        },
        decrementStep(state){
            state.step -= 1;
        },
        setDataFlag(state,action){
            state.dataFlag = action.payload;
        },
        setTrialData(state,action){
            state.trialData = action.payload;
        },
        setTemplateKey(state,action){
            state.templateKey = action.payload;
        },
        setResetInvoiceSlice(state){
            state.step = 0;
            state.dataFlag = false;
            state.customerData = null;
            state.storeData = null;
            state.invoiceData = null;
            state.templateKey = null;
            state.trialData = null;
        }
    }
});

export const {
    showLoading,
    hideLoading,
    setCustomerData,
    pushInvoiceData,
    setStoreData,
    incrementStep,
    decrementStep,
    setDataFlag,
    setTrialData,
    setTemplateKey,
    setResetInvoiceSlice,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;