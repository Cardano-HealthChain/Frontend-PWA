import { create } from 'zustand';

export type UserRole = 'resident' | 'clinic' | 'doctor' | 'authority' | null;

interface AuthState {
    isAuthenticated: boolean;
    userRole: UserRole;
    token: string | null;
    isReady: boolean;

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
        // Store in localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', token);
            localStorage.setItem('user_role', role || '');
        }
        
        // Update store state
        set({
            isAuthenticated: true,
            userRole: role,
            token: token
        });
    },

    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_role');
            localStorage.removeItem('wallet_address');
            localStorage.removeItem('auth_method');
        }
        
        set({
            isAuthenticated: false,
            userRole: null,
            token: null
        });
    },

    setReady: (ready) => set({ isReady: ready }),
}));

// Initialize auth from localStorage (call this in your root layout/provider)
export const initializeAuth = () => {
    if (typeof window === 'undefined') return;
    
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