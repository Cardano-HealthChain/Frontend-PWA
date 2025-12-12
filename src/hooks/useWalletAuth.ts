// hooks/useWalletAuth.ts
import { useState, useEffect } from 'react';
import { Blockfrost, Lucid } from 'lucid-cardano';

interface WalletAuthState {
    isConnecting: boolean;
    isConnected: boolean;
    walletAddress: string | null;
    stakeAddress: string | null;
    error: string | null;
}

// FIX: Update this interface to accept null
interface WalletAuthResult {
    success: boolean;
    walletAddress?: string;
    stakeAddress?: string | null; // Changed from string | undefined
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
            // Initialize Lucid with Preprod network
            const lucid = await Lucid.new(
                new Blockfrost(
                    'https://cardano-preprod.blockfrost.io/api/v0',
                    process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY || ''
                ),
                'Preprod'
            );

            // Enable Lace wallet
            const walletApi = await window.cardano.lace.enable();
            lucid.selectWallet(walletApi);

            // Get wallet address
            const address = await lucid.wallet.address();

            // Get stake address (unique identifier for the wallet)
            // FIX: This can return null, so handle it properly
            const rewardAddress = await lucid.wallet.rewardAddress();

            // Get public key for additional verification
            const utxos = await lucid.wallet.getUtxos();
            const publicKeyHash = lucid.utils.paymentCredentialOf(address).hash;

            setState({
                isConnecting: false,
                isConnected: true,
                walletAddress: address,
                stakeAddress: rewardAddress,
                error: null,
            });

            return {
                success: true,
                walletAddress: address,
                stakeAddress: rewardAddress, // This can be null, but interface now accepts it
                publicKey: publicKeyHash,
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

    // Sign a message with the wallet (for authentication proof)
    const signMessage = async (message: string): Promise<WalletAuthResult> => {
        if (!state.isConnected || !state.walletAddress) {
            return {
                success: false,
                error: 'Wallet not connected',
            };
        }

        try {
            const lucid = await Lucid.new(
                new Blockfrost(
                    'https://cardano-preprod.blockfrost.io/api/v0',
                    process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY || ''
                ),
                'Preprod'
            );

            const walletApi = await window.cardano.lace.enable();
            lucid.selectWallet(walletApi);

            // Sign the message
            const address = await lucid.wallet.address();
            const payload = Buffer.from(message).toString('hex');

            // Get signature from wallet
            const signedMessage = await walletApi.signData(address, payload);

            return {
                success: true,
                signature: signedMessage.signature,
                publicKey: signedMessage.key,
                walletAddress: address,
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.message || 'Failed to sign message',
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