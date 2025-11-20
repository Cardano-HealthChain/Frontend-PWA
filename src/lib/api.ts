import axios, { AxiosInstance } from 'axios';

// 1. Get the base API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 2. Create an Axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    // You can set timeouts here for slow connections
    timeout: 10000,
});

// Optional: Add an interceptor to inject the JWT token for every request
// This is essential for protecting your dashboard routes!
apiClient.interceptors.request.use(
    (config) => {
        // Check if the request needs authentication (e.g., if it's not a /login or /signup call)
        const token = localStorage.getItem('auth_token'); // Or use a secure cookie/state hook

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// 3. Define specific, typed functions for your application (Examples for Signup)
// This abstracts the URL path away from your components.

/**
 * Saves the user's PIN and completes the security phase.
 * Corresponds to your /signup/secure page logic.
 */
export const savePin = (data: { email: string; pin: string; enableBiometrics: boolean }) => {
    return apiClient.post('/api/v1/auth/save-pin', data);
};

/**
 * Registers a new Resident user.
 * Assumes the backend handles DID generation after this call.
 */
export const registerResident = (data: any) => {
    return apiClient.post('/api/v1/auth/register-resident', data);
};

/**
 * Submits the final Clinic registration details and documents.
 */
export const submitClinicRegistration = (data: any) => {
    return apiClient.post('/api/v1/clinic/submit-registration', data);
};

/**
 * Authenticates the user and retrieves a JWT token and user role.
 */
export const loginUser = (data: { email: string; password: string }) => {
    return apiClient.post('/api/v1/auth/login', data);
};


// You can export the instance if you need a raw call, but prefer the wrapper functions
export default apiClient;