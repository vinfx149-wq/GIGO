import React from 'react';
import {
  CANONICAL_INSTRUMENTS,
  MARKET_BIASES,
  CENTRAL_BANK_POLICIES,
  SOVEREIGN_YIELDS,
  ECONOMIC_CALENDAR_EVENTS,
  CURRENCY_SCORES
} from '../../data/canonicalData';
import { StatusBadge } from '../common/StatusBadge';
import { TradingAccount, SystemAlert } from '../../types';
import {
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  ArrowRight,
  Clock,
  Compass,
  Activity,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

interface OverviewViewProps {
  onNavigate: (moduleId: string) => void;
  activeAccount: TradingAccount;
  alerts: SystemAlert[];
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onNavigate,
  activeAccount,
  alerts
}) => {
  const topBiases = MARKET_BIASES.slice(0, 4);
  const nextEvent = ECONOMIC_CALENDAR_EVENTS.find(e => e.releaseStatus === 'UPCOMING') || ECONOMIC_CALENDAR_EVENTS[0];
  const usYield = SOVEREIGN_YIELDS.find(y => y.currency === 'USD');

  return (
    <div className="space-y-6">
      {/* Executive Welcome & Market Regime Banner */}
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C83F7D]">
              <Sparkles size={16} />
              <span>GIGO EXECUTIVE MARKET INTELLIGENCE BRIEF</span>
              <span className="text-[#F3D4E3]">·</span>
              <span className="text-[#667085]">Daily Macro Synthesis</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#172033] tracking-tight">
              Macro Convergence: Yield Support Intact, Tech Earnings Momentum Anchoring Risk
            </h1>
            <p className="text-sm text-[#667085] leading-relaxed">
              Global capital continues to favor US high nominal yields (US 10Y at 4.18%) amid broadening disinflation. 
              The Federal Reserve is in neutral recalibration mode, while ECB accelerated easing to 3.25%. Dollar resilience persists across EUR and JPY crosses, while Gold (XAUUSD) tests new historical territory driven by central bank reserve diversification and sovereign debt hedging.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            {/* Market Regime Badge */}
            <div className="bg-[#FFF7FA] border border-[#F3D4E3] rounded-xl p-3 flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                  GLOBAL REGIME
                </div>
                <div className="text-sm font-extrabold text-[#16A34A] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                  MODERATE RISK-ON
                </div>
              </div>
              <button
                onClick={() => onNavigate('risk-regime')}
                className="text-xs text-[#C83F7D] font-bold hover:underline inline-flex items-center gap-1"
              >
                Inspect <ArrowRight size={12} />
              </button>
            </div>

            {/* Quick Command Desk CTA */}
            <button
              onClick={() => onNavigate('command-desk')}
              className="bg-[#E85D9E] hover:bg-[#C83F7D] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <Compass size={16} />
              <span>Open Global Command Desk</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4-KPI Executive Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: S&P 500 Index */}
        <div className="bg-white border border-[#F3D4E3] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#667085] mb-1">
            <span className="font-semibold text-[#172033]">S&P 500 (SPX500)</span>
            <StatusBadge status="DELAYED" type="data" />
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-extrabold text-[#172033] font-mono tabular-nums">
              5,860.25
            </span>
            <span className="text-xs font-bold text-[#16A34A] flex items-center gap-0.5">
              <TrendingUp size={14} /> +0.49%
            </span>
          </div>
          <div className="mt-2 text-[11px] text-[#667085] flex items-center justify-between border-t border-[#FFF7FA] pt-2">
            <span>24h Range: 5824 - 5878</span>
            <span className="font-semibold text-[#C83F7D]">Bias: Bullish</span>
          </div>
        </div>

        {/* Metric 2: US 10Y Yield */}
        <div className="bg-white border border-[#F3D4E3] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#667085] mb-1">
            <span className="font-semibold text-[#172033]">US 10Y Benchmark Yield</span>
            <StatusBadge status="LIVE" type="data" />
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-extrabold text-[#172033] font-mono tabular-nums">
              4.18%
            </span>
            <span className="text-xs font-bold text-[#D97706] flex items-center gap-0.5">
              +3.2 bps
            </span>
          </div>
          <div className="mt-2 text-[11px] text-[#667085] flex items-center justify-between border-t border-[#FFF7FA] pt-2">
            <span>10Y-2Y Spread: +16 bps</span>
            <span className="font-semibold text-[#16A34A]">Steepening</span>
          </div>
        </div>

        {/* Metric 3: Spot Gold */}
        <div className="bg-white border border-[#F3D4E3] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#667085] mb-1">
            <span className="font-semibold text-[#172033]">Spot Gold (XAUUSD)</span>
            <StatusBadge status="DELAYED" type="data" />
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-extrabold text-[#172033] font-mono tabular-nums">
              $2,718.40
            </span>
            <span className="text-xs font-bold text-[#16A34A] flex items-center gap-0.5">
              <TrendingUp size={14} /> +0.55%
            </span>
          </div>
          <div className="mt-2 text-[11px] text-[#667085] flex items-center justify-between border-t border-[#FFF7FA] pt-2">
            <span>COT Percentile: 94.2%</span>
            <span className="font-semibold text-[#16A34A]">Strong Bias</span>
          </div>
        </div>

        {/* Metric 4: Active Account Risk Status */}
        <div className="bg-white border border-[#F3D4E3] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#667085] mb-1">
            <span className="font-semibold text-[#172033] truncate max-w-[140px]">
              {activeAccount.accountName}
            </span>
            <span className="text-[10px] font-bold text-[#C83F7D] bg-[#FCE7F3] px-1.5 py-0.5 rounded">
              {activeAccount.isPropFirm ? 'PROP FIRM' : 'RETAIL'}
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-extrabold text-[#172033] font-mono tabular-nums">
              ${activeAccount.equity.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-xs font-bold text-[#16A34A]">
              Equity Ok
            </span>
          </div>
          <div className="mt-2 text-[11px] text-[#667085] flex items-center justify-between border-t border-[#FFF7FA] pt-2">
            <span>Daily Loss: ${activeAccount.currentDailyLoss.toFixed(2)}</span>
            <span className="font-semibold text-[#16A34A]">
              Max Loss: {activeAccount.maxDailyLossPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Primary 2-Column Split: Active Directional Biases vs Macro Drivers & Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: High-Probability Macro Biases */}
        <div className="lg:col-span-2 bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F3D4E3]">
            <div>
              <h2 className="text-base font-bold text-[#172033]">
                Synthesized Market Directional Biases
              </h2>
              <p className="text-xs text-[#667085]">
                Weighted multi-pillar score combining Macro Growth, Rates, Positioning & Technical Confirmation
              </p>
            </div>
            <button
              onClick={() => onNavigate('command-desk')}
              className="text-xs text-[#C83F7D] font-bold hover:underline inline-flex items-center gap-1"
            >
              All 32 Assets <ArrowRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {topBiases.map((bias) => (
              <div
                key={bias.symbol}
                className="p-3.5 rounded-xl border border-[#F3D4E3] bg-[#FFF7FA] hover:bg-[#FCE7F3]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-[#172033] font-mono">
                      {bias.symbol}
                    </span>
                    <span className="text-xs text-[#667085]">· {bias.name}</span>
                    <StatusBadge status={bias.bias} type="bias" size="sm" />
                    <span className="text-[11px] text-[#667085] font-mono">
                      Score: {bias.score > 0 ? `+${bias.score}` : bias.score}/10
                    </span>
                  </div>
                  <div className="text-xs text-[#667085] flex flex-wrap gap-x-3 gap-y-1">
                    <span>
                      Confidence: <strong className="text-[#172033]">{bias.confidencePercent}%</strong>
                    </span>
                    <span>·</span>
                    <span>
                      Target: <strong className="text-[#172033] font-mono">{bias.keyTargetLevel}</strong>
                    </span>
                    <span>·</span>
                    <span>
                      Invalidation: <strong className="text-[#DC2626] font-mono">{bias.invalidationLevel}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                    bias.technicalConfirmation === 'CONFIRMED'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    Tech: {bias.technicalConfirmation}
                  </span>
                  <button
                    onClick={() => onNavigate('market-analysis')}
                    className="text-xs font-semibold text-[#C83F7D] hover:bg-white px-2.5 py-1 rounded-lg border border-[#F3D4E3] transition-colors"
                  >
                    Analysis
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Upcoming Economic Catalysts & Currency Strength Leaderboard */}
        <div className="space-y-6">
          {/* Upcoming Economic Event Box */}
          <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#F3D4E3]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172033]">
                <Calendar size={16} className="text-[#C83F7D]" />
                <span>Next High-Impact Event</span>
              </div>
              <button
                onClick={() => onNavigate('calendar')}
                className="text-xs text-[#C83F7D] font-bold hover:underline"
              >
                Calendar
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-[#172033]">{nextEvent.eventName}</span>
                <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                  {nextEvent.importance}
                </span>
              </div>
              <div className="text-xs text-[#667085] flex items-center justify-between font-mono">
                <span>Country: {nextEvent.country} ({nextEvent.currency})</span>
                <span>Forecast: {nextEvent.forecast || 'N/A'}</span>
              </div>
              <div className="text-[11px] text-[#667085] bg-[#FFF7FA] p-2.5 rounded-lg border border-[#F3D4E3] leading-relaxed">
                {nextEvent.interpretation}
              </div>
            </div>
          </div>

          {/* G8 Currency Strength Snapshot */}
          <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#F3D4E3]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172033]">
                <Activity size={16} className="text-[#C83F7D]" />
                <span>G8 Relative Currency Strength</span>
              </div>
              <button
                onClick={() => onNavigate('currency-strength')}
                className="text-xs text-[#C83F7D] font-bold hover:underline"
              >
                Full Matrix
              </button>
            </div>

            <div className="space-y-2">
              {CURRENCY_SCORES.slice(0, 5).map((score) => {
                const isPositive = score.score >= 0;
                return (
                  <div key={score.currency} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 w-24">
                      <span className="font-extrabold text-[#172033] font-mono">{score.currency}</span>
                      <span className="text-[11px] text-[#667085]">{score.name.split(' ')[0]}</span>
                    </div>
                    {/* Visual bar */}
                    <div className="flex-1 mx-3 h-2 bg-[#FFF7FA] rounded-full overflow-hidden border border-[#F3D4E3]">
                      <div
                        className={`h-full rounded-full ${isPositive ? 'bg-[#16A34A]' : 'bg-[#DC2626]'}`}
                        style={{
                          width: `${Math.min(100, Math.max(15, Math.abs(score.score)))}%`
                        }}
                      ></div>
                    </div>
                    <span className={`font-mono font-bold text-[11px] w-12 text-right ${
                      isPositive ? 'text-[#16A34A]' : 'text-[#DC2626]'
                    }`}>
                      {score.score > 0 ? `+${score.score}` : score.score}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
