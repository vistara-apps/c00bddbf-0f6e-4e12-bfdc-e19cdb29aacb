'use client';

import { useState } from 'react';
import { Coins } from 'lucide-react';

interface TipButtonProps {
  recipientFid: string;
  recipientUsername: string;
  onSuccess: (tip: any) => void;
}

export function TipButton({ recipientFid, recipientUsername, onSuccess }: TipButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTip = async () => {
    setIsProcessing(true);
    
    // Simulate transaction processing
    setTimeout(() => {
      const newTip = {
        id: Date.now().toString(),
        senderFid: '1000',
        senderUsername: 'you',
        amount: '1.00',
        timestamp: Date.now(),
        transactionHash: `0x${Math.random().toString(16).slice(2)}`,
      };
      
      onSuccess(newTip);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleTip}
      disabled={isProcessing}
      className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {isProcessing ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          Processing...
        </>
      ) : (
        <>
          <Coins className="w-5 h-5" />
          Tip 1 USDC
        </>
      )}
    </button>
  );
}
