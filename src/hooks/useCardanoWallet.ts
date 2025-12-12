// hooks/useCardanoWallet.ts
import { useState, useEffect } from 'react'; 
import { Blockfrost, Lucid, WalletApi } from 'lucid-cardano';

interface CardanoWallet {
    lucid: Lucid | null;
    address: string | null;
    connected: boolean;
    connecting: boolean;
    error: string | null;
    connect: (walletName: 'eternl' | 'nami' | 'lace') => Promise<void>;
    disconnect: () => void;
}

export const useCardanoWallet = (): CardanoWallet => {
    const [lucid, setLucid] = useState<Lucid | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [connected, setConnected] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Initialize Lucid instance
    useEffect(() => {
        const initLucid = async () => {
            try {
                const lucidInstance = await Lucid.new(
                    new Blockfrost(
                        'https://cardano-preprod.blockfrost.io/api/v0',
                        process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY || ''
                    ),
                    'Preprod'
                );
                setLucid(lucidInstance);
            } catch (err) {
                setError('Failed to initialize Lucid');
                console.error(err);
            }
        };

        initLucid();
    }, []);

    const connect = async (walletName: 'eternl' | 'nami' | 'lace') => {
        if (!lucid) {
            setError('Lucid not initialized');
            return;
        }

        setConnecting(true);
        setError(null);

        try {
            // Check if wallet extension is available
            if (!window.cardano || !window.cardano[walletName]) {
                throw new Error(`${walletName} wallet not found. Please install the extension.`);
            }

            // Enable wallet
            const api: WalletApi = await window.cardano[walletName].enable();
            lucid.selectWallet(api);

            // Get wallet address
            const addr = await lucid.wallet.address();
            setAddress(addr);
            setConnected(true);

            // Store connection in localStorage
            localStorage.setItem('connectedWallet', walletName);
        } catch (err: any) {
            setError(err.message || 'Failed to connect wallet');
            console.error(err);
        } finally {
            setConnecting(false);
        }
    };

    const disconnect = () => {
        setAddress(null);
        setConnected(false);
        localStorage.removeItem('connectedWallet');
    };

    // Auto-reconnect on page load
    useEffect(() => {
        const reconnect = async () => {
            const lastWallet = localStorage.getItem('connectedWallet') as 'eternl' | 'nami' | 'lace';
            if (lastWallet && lucid) {
                await connect(lastWallet);
            }
        };

        reconnect();
    }, [lucid]);

    return {
        lucid,
        address,
        connected,
        connecting,
        error,
        connect,
        disconnect,
    };
};

// Type declarations for window.cardano
declare global {
    interface Window {
        cardano?: {
            eternl?: any;
            nami?: any;
            lace?: any;
        };
    }
}