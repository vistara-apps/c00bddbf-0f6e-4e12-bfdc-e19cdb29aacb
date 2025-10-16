'use client';

import { DollarSign, Users } from 'lucide-react';

interface TotalTipsDisplayProps {
  totalAmount: string;
  tipCount: number;
}

export function TotalTipsDisplay({ totalAmount, tipCount }: TotalTipsDisplayProps) {
  return (
    <div className="glass-card p-6">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-400 mb-2">Total Tips Received</p>
        <div className="flex items-center justify-center gap-2">
          <DollarSign className="w-8 h-8 text-primary" />
          <h2 className="text-5xl font-bold text-fg">{totalAmount}</h2>
        </div>
        <p className="text-sm text-gray-400 mt-2">USDC</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface rounded-lg p-4 text-center">
          <Users className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold">{tipCount}</p>
          <p className="text-xs text-gray-400">Total Tips</p>
        </div>
        <div className="bg-surface rounded-lg p-4 text-center">
          <DollarSign className="w-5 h-5 text-success mx-auto mb-2" />
          <p className="text-2xl font-bold">$1.00</p>
          <p className="text-xs text-gray-400">Avg Tip</p>
        </div>
      </div>
    </div>
  );
}
