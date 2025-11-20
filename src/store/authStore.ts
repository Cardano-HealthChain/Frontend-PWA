import { create } from 'zustand';

// Define the possible roles for your application
export type UserRole = 'resident' | 'clinic' | 'authority' | null;

interface AuthState {
    isAuthenticated: boolean;
    userRole: UserRole;
    token: string | null;
    // This state tells us if the initial check (from local storage/cookie) is done
    isReady: boolean;

    // Actions
    login: (token: string, role: UserRole) => void;
    logout: () => void;
    setReady: (ready: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    userRole: null,
    token: null,
    isReady: false,

    login: (token, role) => {
        localStorage.setItem('auth_token', token); // Persist token
        localStorage.setItem('user_role', role || ''); // Persist role
        set({
            isAuthenticated: true,
            userRole: role,
            token: token
        });
    },

    logout: () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_role');
        set({
            isAuthenticated: false,
            userRole: null,
            token: null
        });
    },

    setReady: (ready) => set({ isReady: ready }),
}));

// Function to initialize state from storage on first load (must be called in layout)
export const initializeAuth = () => {
    const token = localStorage.getItem('auth_token');
    const role = localStorage.getItem('user_role') as UserRole;

    if (token && role) {
        useAuthStore.setState({
            isAuthenticated: true,
            userRole: role,
            token: token
        });
    }
    useAuthStore.setState({ isReady: true });
};