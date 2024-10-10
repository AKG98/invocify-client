import { axiosInstance } from ".";

const loginUser = async (values) => {
  try {
    const response = await axiosInstance.post("https://invocify-server.onrender.com/api/users/login", values);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

const registerUser = async (values) => {
    try {
        const response = await axiosInstance.post("https://invocify-server.onrender.com/api/users/signup", values);
        return response;
    } catch (error) {
        return error.response.data;
    }
};

const getCurrentUser = async () => {
    try {
        const response = await axiosInstance.get("https://invocify-server.onrender.com/api/users/get-current-user");
        return response;
    } catch (error) {
        return error.response.data;
    }
};

const logoutUser = async () => {
    try {
        const response = await axiosInstance.post("https://invocify-server.onrender.com/api/users/logout");
        return response;
    } catch (error) {
        return error.response.data;
    }
};

const googleLoginUser = async (values) => {
    try {
        const response = await axiosInstance.post("https://invocify-server.onrender.com/api/users/google-auth", values);
        return response;
    } catch (error) {
        return error.response.data;
    }
};

const updateUser = async (id,values) => {
    try {
        const response = await axiosInstance.put(`https://invocify-server.onrender.com/api/users/update-user/${id}`, values);
        return response;
    } catch (error) {
        return error.response.data;
    }
};

const forgotPassword = async (values) => {
    try {
        const response = await axiosInstance.post("https://invocify-server.onrender.com/api/users/forgot-password", values);
        console.log(response);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const resetPassword = async (token,values) => {
    try {
        const response = await axiosInstance.put(`https://invocify-server.onrender.com/api/users/reset-password/${token}`, values);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const authApi =  { 
    loginUser, 
    registerUser, 
    getCurrentUser, 
    logoutUser, 
    googleLoginUser, 
    updateUser,
    forgotPassword,
    resetPassword
};
export default authApi;
