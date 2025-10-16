'use client';

import { useEffect, useState } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { TipButton } from '@/components/TipButton';
import { TipFeed } from '@/components/TipFeed';
import { TotalTipsDisplay } from '@/components/TotalTipsDisplay';
import { ArrowLeft, Coins } from 'lucide-react';

interface Tip {
  id: string;
  senderFid: string;
  senderUsername: string;
  amount: string;
  timestamp: number;
  transactionHash: string;
}

export default function Home() {
  const { context, setFrameReady } = useMiniKit();
  const [tips, setTips] = useState<Tip[]>([
    {
      id: '1',
      senderFid: '120',
      senderUsername: 'alice.eth',
      amount: '1.00',
      timestamp: Date.now() - 3600000,
      transactionHash: '0x123...',
    },
    {
      id: '2',
      senderFid: '2012',
      senderUsername: 'bob.base',
      amount: '1.00',
      timestamp: Date.now() - 7200000,
      transactionHash: '0x456...',
    },
    {
      id: '3',
      senderFid: '4100',
      senderUsername: 'charlie',
      amount: '1.00',
      timestamp: Date.now() - 10800000,
      transactionHash: '0x789...',
    },
  ]);
  const [totalTips, setTotalTips] = useState('402.00');
  const [showReceipt, setShowReceipt] = useState(false);

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const handleTipSuccess = (newTip: Tip) => {
    setTips([newTip, ...tips]);
    setTotalTips((parseFloat(totalTips) + parseFloat(newTip.amount)).toFixed(2));
    setShowReceipt(true);
  };

  const displayName = context?.user?.displayName ?? 'Creator';

  return (
    <main className="min-h-screen bg-bg p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg bg-surface hover:bg-opacity-80 transition-all duration-200">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-fg">Tip Jar</h1>
              <p className="text-sm text-gray-400">@{displayName}</p>
            </div>
          </div>
          <Wallet>
            <ConnectWallet>
              <Avatar className="h-10 w-10" />
              <Name />
            </ConnectWallet>
          </Wallet>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Tip Action */}
          <div className="space-y-6">
            <TotalTipsDisplay 
              totalAmount={totalTips}
              tipCount={tips.length}
            />
            
            <div className="glass-card p-8 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary bg-opacity-20 mb-4">
                  <Coins className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Support {displayName}</h2>
                <p className="text-gray-400">Send a tip to show your appreciation</p>
              </div>
              
              <TipButton 
                recipientFid={context?.user?.fid ?? ''}
                recipientUsername={displayName}
                onSuccess={handleTipSuccess}
              />
            </div>

            {showReceipt && (
              <div className="glass-card p-6 border-2 border-success">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-success bg-opacity-20 mb-3">
                    <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-success mb-2">Thank You!</h3>
                  <p className="text-gray-400">Your tip has been sent successfully</p>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount</span>
                    <span className="font-medium">1.00 USDC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">To</span>
                    <span className="font-medium">@{displayName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gas Fee</span>
                    <span className="font-medium text-success">Sponsored ✨</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setShowReceipt(false)}
                  className="w-full mt-4 btn-secondary"
                >
                  Close
                </button>
              </div>
            )}
          </div>

          {/* Right Column - Recent Tips Feed */}
          <div className="space-y-6">
            <TipFeed tips={tips} />
          </div>
        </div>
      </div>
    </main>
  );
}
