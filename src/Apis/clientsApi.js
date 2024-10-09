import { axiosInstance } from ".";

const getClients = async (ownerId) => {
  try {
    const response = await axiosInstance.get(`/api/clients/get-customers/${ownerId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createClient = async (values) => {
    try {
        const response = await axiosInstance.post("/api/clients/add-customer", values);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const updateClient = async (values,clientId) => {
    try {
        const response = await axiosInstance.put(`/api/clients/update-customer//${clientId}`, values);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const deleteClient = async (clientId) => {
    try {
        const response = await axiosInstance.delete(`/api/clients/delete-customer/${clientId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const clientsApi =  { getClients, createClient, updateClient, deleteClient };
export default clientsApi;