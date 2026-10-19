import React from 'react';
import { DataStatus, BiasDirection } from '../../types';

interface StatusBadgeProps {
  status: DataStatus | BiasDirection | string;
  type?: 'data' | 'bias' | 'health' | 'regime';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type = 'data',
  size = 'sm'
}) => {
  const sizeClasses = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  // Format data status styling
  if (type === 'data') {
    switch (status) {
      case 'LIVE':
        return (
          <span className={`inline-flex items-center gap-1 font-semibold rounded font-mono ${sizeClasses} bg-emerald-50 text-emerald-700 border border-emerald-200`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            LIVE
          </span>
        );
      case 'DELAYED':
        return (
          <span className={`inline-flex items-center font-medium rounded font-mono ${sizeClasses} bg-amber-50 text-amber-700 border border-amber-200`}>
            DELAYED 15M
          </span>
        );
      case 'HISTORICAL':
        return (
          <span className={`inline-flex items-center font-medium rounded font-mono ${sizeClasses} bg-slate-50 text-slate-600 border border-slate-200`}>
            HISTORICAL
          </span>
        );
      case 'SAMPLE':
        return (
          <span className={`inline-flex items-center font-medium rounded font-mono ${sizeClasses} bg-purple-50 text-purple-700 border border-purple-200`}>
            SAMPLE
          </span>
        );
      default:
        return (
          <span className={`inline-flex items-center font-medium rounded font-mono ${sizeClasses} bg-slate-100 text-slate-600 border border-slate-200`}>
            {status}
          </span>
        );
    }
  }

  // Format bias styling
  if (type === 'bias') {
    switch (status) {
      case 'BULLISH':
        return (
          <span className={`inline-flex items-center font-bold tracking-wide rounded ${sizeClasses} bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/25`}>
            ▲ BULLISH
          </span>
        );
      case 'BEARISH':
        return (
          <span className={`inline-flex items-center font-bold tracking-wide rounded ${sizeClasses} bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/25`}>
            ▼ BEARISH
          </span>
        );
      case 'MIXED':
        return (
          <span className={`inline-flex items-center font-bold tracking-wide rounded ${sizeClasses} bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/25`}>
            ◆ MIXED
          </span>
        );
      case 'NO_TRADE':
        return (
          <span className={`inline-flex items-center font-bold tracking-wide rounded ${sizeClasses} bg-slate-100 text-slate-600 border border-slate-300`}>
            ■ NO TRADE
          </span>
        );
    }
  }

  return (
    <span className={`inline-flex items-center font-medium rounded ${sizeClasses} bg-[#FCE7F3] text-[#C83F7D] border border-[#F3D4E3]`}>
      {status}
    </span>
  );
};
