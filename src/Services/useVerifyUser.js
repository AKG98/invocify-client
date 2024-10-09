import authApi from "../Apis/authApi";
import { getGoogleUser } from "./extractUser";

export default async function verifyUser(authenticated) {
    if (!authenticated) {
        return; // User is not authenticated, no further action needed
    }

    try {
        // First, try to get the Google user token
        const googleUser = await getGoogleUser();

        // Return the googleUser to let the calling component handle navigation
        return googleUser;
    } catch (err) {
        console.error("Error fetching Google user:", err); // Handle the error
    }

    // If Google login fails or no Google token, get the current user from API
    try {
        const response = await authApi.getCurrentUser();

        // Return the response to let the calling component handle navigation
        return response.data;
    } catch (err) {
        console.error("Error fetching current user from API:", err); // Handle error
    }
}
