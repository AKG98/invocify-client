import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../Apis/authApi";
import { getGoogleUser } from "../../Services/extractUser";

// Initial state, checking if there is user data in localStorage
const initialState = {
    authenticated: false,
    user: null,
    loading: false,
    error: false,
    message: "",
};

// Retrieve initial user data from localStorage, if present
const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : initialState;

// Helper function to handle API response
const handleApiResponse = (response, rejectWithValue) => {
    if (response?.data?.success !== undefined) {
        return response.data;
    } else {
        return rejectWithValue({ message: response.message || "An error occurred" });
    }
};

// 1. Async thunk for registration
export const register = createAsyncThunk(
    "user/register",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await authApi.registerUser(userData);
            return handleApiResponse(response, rejectWithValue);
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Network error" });
        }
    }
);

// 2. Async thunk for login
export const login = createAsyncThunk(
    "user/login",
    async (userData, { dispatch, rejectWithValue }) => {
        try {
            const response = await authApi.loginUser(userData);
            const result = handleApiResponse(response, rejectWithValue);

            if (result.success) {
                // After login success, call getCurrentUser to verify the token
                await dispatch(getCurrentUser());
            }
            return result;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Network error" });
        }
    }
);

// 3. Async thunk to get current user > authenticate > store in localStorage
export const getCurrentUser = createAsyncThunk(
    "user/getCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await authApi.getCurrentUser();
            return handleApiResponse(response, rejectWithValue);
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Network error" });
        }
    }
);

// 4. Async thunk to handle google sign in
export const googleLogin = createAsyncThunk(
    "user/googleLogin",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getGoogleUser();
            return handleApiResponse(response, rejectWithValue);
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Network error" });
        }
    }
);

// 5. Async thunk to update user details
export const updateUser = createAsyncThunk(
    "user/updateUser",
    async ({id,userData}, { rejectWithValue }) => {
        try {
            const response = await authApi.updateUser(id,userData);
            return handleApiResponse(response, rejectWithValue);
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Network error" });
        }
    }
);


const userSlice = createSlice({
    name: "user",
    initialState: storedUser, // Initial state from localStorage or default
    reducers: {
        logout: (state) => {
            // Clear localStorage and reset state
            localStorage.removeItem("user");
            state.authenticated = false;
            state.user = null;
        },
        showLoading: (state) => {
            state.loading = true;
            state.message = "";
            state.error = false;
        },
        hideLoading: (state) => {
            state.message = "";
            state.error = false;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        // Common builder logic for pending state
        const handlePending = (state) => {
            state.loading = true;
            state.message = "";
        };

        // Common builder logic for fulfilled state
        const handleFulfilled = (state, action) => {
            state.loading = false;
            const { success, message, user } = action.payload || {};
            state.message = message || "Unknown response";
            state.error = !success;
            if (user) {
                state.authenticated = true;
                state.user = user;

                // Save to localStorage
                localStorage.setItem("user", JSON.stringify({ authenticated: true, user }));
            }
        };

        // Common builder logic for rejected state
        const handleRejected = (state, action) => {
            state.loading = false;
            state.message = action.payload?.message || "An error occurred";
            state.error = true;
        };

        // Handle registration states
        builder
            .addCase(register.pending, handlePending)
            .addCase(register.fulfilled, handleFulfilled)
            .addCase(register.rejected, handleRejected);

        // Handle login states
        builder
            .addCase(login.pending, handlePending)
            .addCase(login.fulfilled, handleFulfilled)
            .addCase(login.rejected, handleRejected);

        // Handle getCurrentUser states
        builder
            .addCase(getCurrentUser.pending, handlePending)
            .addCase(getCurrentUser.fulfilled, handleFulfilled)
            .addCase(getCurrentUser.rejected, handleRejected);

        // Handle googleLogin states
        builder
            .addCase(googleLogin.pending, handlePending)
            .addCase(googleLogin.fulfilled, handleFulfilled)
            .addCase(googleLogin.rejected, handleRejected);

        // Handle updateUser states
        builder
            .addCase(updateUser.pending, handlePending)
            .addCase(updateUser.fulfilled, handleFulfilled)
            .addCase(updateUser.rejected, handleRejected);
            
    },
});

export const { logout, showLoading, hideLoading } = userSlice.actions;
export default userSlice.reducer;
