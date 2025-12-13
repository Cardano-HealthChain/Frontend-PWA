// hooks/useWalletAuth.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_WALLET_API_URL;
interface WalletAuthState {
    isConnecting: boolean;
    isConnected: boolean;
    walletAddress: string | null;
    stakeAddress: string | null;
    error: string | null;
}

interface WalletAuthResult {
    success: boolean;
    walletAddress?: string;
    stakeAddress?: string | null;
    publicKey?: string;
    signature?: string;
    error?: string;
}

export const useWalletAuth = () => {
    const [state, setState] = useState<WalletAuthState>({
        isConnecting: false,
        isConnected: false,
        walletAddress: null,
        stakeAddress: null,
        error: null,
    });

    // Check if Lace wallet is installed
    const isLaceInstalled = (): boolean => {
        return typeof window !== 'undefined' &&
            typeof window.cardano !== 'undefined' &&
            typeof window.cardano.lace !== 'undefined';
    };

    // Connect to Lace wallet and get wallet details
    const connectWallet = async (): Promise<WalletAuthResult> => {
        if (!isLaceInstalled()) {
            return {
                success: false,
                error: 'Lace wallet is not installed. Please install it from https://www.lace.io',
            };
        }

        setState(prev => ({ ...prev, isConnecting: true, error: null }));

        try {
            // Enable the wallet
            const walletApi = await window.cardano.lace.enable();

            // Get used addresses
            const usedAddresses = await walletApi.getUsedAddresses();
            if (!usedAddresses || usedAddresses.length === 0) {
                throw new Error('No addresses found in wallet');
            }

            const walletAddress = usedAddresses[0];

            // Get reward/stake addresses
            const rewardAddresses = await walletApi.getRewardAddresses();
            const stakeAddress = rewardAddresses && rewardAddresses.length > 0
                ? rewardAddresses[0]
                : null;

            // Get public key (we'll need this for signing)
            // Note: We'll get the actual public key during signing

            setState({
                isConnecting: false,
                isConnected: true,
                walletAddress: walletAddress,
                stakeAddress: stakeAddress,
                error: null,
            });

            return {
                success: true,
                walletAddress: walletAddress,
                stakeAddress: stakeAddress,
            };
        } catch (error: any) {
            const errorMessage = error.message || 'Failed to connect wallet';

            setState({
                isConnecting: false,
                isConnected: false,
                walletAddress: null,
                stakeAddress: null,
                error: errorMessage,
            });

            return {
                success: false,
                error: errorMessage,
            };
        }
    };

    // Get challenge from backend
    const getChallenge = async (walletAddress: string): Promise<string> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/challenge`, {
                params: { walletAddress }
            });
            return response.data; // Plain text challenge
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Failed to get challenge');
        }
    };

    // Sign a message with the wallet (for authentication proof)
    const signMessage = async (message: string): Promise<WalletAuthResult> => {
        if (!state.isConnected || !state.walletAddress) {
            return {
                success: false,
                error: 'Wallet not connected',
            };
        }

        try {
            const walletApi = await window.cardano.lace.enable();

            // Convert message to hex for signing
            // IMPORTANT: Sign the exact challenge as-is, no modifications
            const messageHex = Buffer.from(message, 'utf8').toString('hex');

            // Sign the message with the wallet address
            const signedData = await walletApi.signData(
                state.walletAddress,
                messageHex
            );

            // signedData contains { signature, key }
            // Both are already in the correct format from the wallet
            return {
                success: true,
                signature: signedData.signature, // Base64 encoded
                publicKey: signedData.key,       // Base64 encoded
                walletAddress: state.walletAddress,
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.message || 'Failed to sign message',
            };
        }
    };

    // Complete wallet authentication flow (get challenge + sign)
    const authenticateWallet = async (): Promise<WalletAuthResult> => {
        if (!state.walletAddress) {
            return {
                success: false,
                error: 'Wallet not connected',
            };
        }

        try {
            // Step 1: Get challenge from backend
            const challenge = await getChallenge(state.walletAddress);

            // Step 2: Sign the challenge
            const signResult = await signMessage(challenge);

            if (!signResult.success) {
                return signResult;
            }

            // Return everything needed for login/signup
            return {
                success: true,
                walletAddress: state.walletAddress,
                stakeAddress: state.stakeAddress,
                signature: signResult.signature,
                publicKey: signResult.publicKey,
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.message || 'Authentication failed',
            };
        }
    };

    // Disconnect wallet
    const disconnectWallet = () => {
        setState({
            isConnecting: false,
            isConnected: false,
            walletAddress: null,
            stakeAddress: null,
            error: null,
        });

        // Clear any stored wallet data
        if (typeof window !== 'undefined') {
            localStorage.removeItem('wallet_connected');
            localStorage.removeItem('wallet_address');
        }
    };

    // Auto-reconnect on page load if previously connected
    useEffect(() => {
        const reconnect = async () => {
            const wasConnected = localStorage.getItem('wallet_connected');
            if (wasConnected === 'true' && isLaceInstalled()) {
                await connectWallet();
            }
        };

        reconnect();
    }, []);

    // Save connection state
    useEffect(() => {
        if (state.isConnected && typeof window !== 'undefined') {
            localStorage.setItem('wallet_connected', 'true');
        }
    }, [state.isConnected]);

    return {
        ...state,
        isLaceInstalled,
        connectWallet,
        signMessage,
        authenticateWallet,
        getChallenge,
        disconnectWallet,
    };
};

// Type declarations
declare global {
    interface Window {
        cardano?: {
            lace?: any;
            eternl?: any;
            nami?: any;
        };
    }
}