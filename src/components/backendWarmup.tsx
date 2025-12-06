// components/BackendWarmup.tsx
'use client';

import { useEffect } from 'react';
import axios from 'axios';

export function BackendWarmup() {
  useEffect(() => {
    const wakeUp = async () => {
      try {
        await axios.get(
          'https://backend-apis-production-5e22.up.railway.app',
          { timeout: 5000 }
        );
        console.log('✅ Backend ready');
      } catch (error) {
        console.log('⏳ Waking up backend...');
      }
    };
    wakeUp();
  }, []);
  return null;
}