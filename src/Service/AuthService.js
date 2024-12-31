import api from "../Service/GGService"; // Import the configured API instance

// Function to handle Google login token
export const handleGoogleLogin = async (credential) => {
    const response = await api.post('/Auth/google-login', { credential });
    return response.data;
};
