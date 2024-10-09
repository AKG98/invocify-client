import { axiosInstance } from ".";

const getStores = async (ownerId) => {
  try {
    const response = await axiosInstance.get(`/api/stores/get-stores/${ownerId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createStore = async (values) => {
    try {
        const response = await axiosInstance.post("/api/stores/add-store", values);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const updateStore = async (values,storeId) => {
    try {
        const response = await axiosInstance.put(`/api/stores/update-store/${storeId}`, values);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const deleteStore = async (storeId) => {
    try {
        const response = await axiosInstance.delete(`/api/stores/delete-store/${storeId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const storesApi =  { getStores, createStore, updateStore, deleteStore };
export default storesApi;