import authApi from "../Apis/authApi";
import { auth } from "../firebase";

export const getGoogleUser = async () => {
    try {
        const user = await new Promise((resolve, reject) => {
            // Firebase auth state change to get the logged-in user
            auth.onAuthStateChanged((user) => {
                if (user) {
                    resolve(user); // Resolve with the user object if authenticated
                } else {
                    reject(new Error("User not found")); // Reject if not authenticated
                }
            });
        });

        // If the user is authenticated, get the token
        const token = await user.getIdToken();

        // Make the API call to your backend with the token
        const response = await authApi.googleLoginUser({ access_token: token });

        return response; // Return the response here
    } catch (error) {
        console.error("Error getting Google user or making API call:", error);
        throw error; // Rethrow the error to allow the caller to handle it
    }
};
