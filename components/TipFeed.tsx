'use client';

import { TrendingUp } from 'lucide-react';

interface Tip {
  id: string;
  senderFid: string;
  senderUsername: string;
  amount: string;
  timestamp: number;
  transactionHash: string;
}

interface TipFeedProps {
  tips: Tip[];
}

export function TipFeed({ tips }: TipFeedProps) {
  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Recent Tips</h2>
        </div>
        <span className="text-sm text-gray-400">{tips.length} tips</span>
      </div>

      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div 
            key={tip.id}
            className="tip-card flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary bg-opacity-20 text-primary font-bold">
                {index + 1}
              </div>
              <div>
                <p className="font-medium">@{tip.senderUsername}</p>
                <p className="text-xs text-gray-400">{formatTime(tip.timestamp)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-success">${tip.amount}</p>
              <p className="text-xs text-gray-400">USDC</p>
            </div>
          </div>
        ))}
      </div>

      {tips.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>No tips yet. Be the first to support!</p>
        </div>
      )}
    </div>
  );
}
