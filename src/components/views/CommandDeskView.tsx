import React, { useState } from 'react';
import {
  MARKET_BIASES,
  CANONICAL_INSTRUMENTS,
  CENTRAL_BANK_POLICIES,
  SOVEREIGN_YIELDS,
  COT_POSITIONING_DATA,
  CURRENCY_SCORES,
  ECONOMIC_CALENDAR_EVENTS
} from '../../data/canonicalData';
import { StatusBadge } from '../common/StatusBadge';
import { Currency, MarketBias } from '../../types';
import {
  Compass,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Layers,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  XCircle,
  SlidersHorizontal,
  Info
} from 'lucide-react';

interface CommandDeskViewProps {
  onNavigate: (moduleId: string) => void;
}

export const CommandDeskView: React.FC<CommandDeskViewProps> = ({ onNavigate }) => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>('NAS100');
  const [activeTab, setActiveTab] = useState<'overview' | 'macro' | 'rates' | 'positioning' | 'conflicts'>('overview');

  const currentBias = MARKET_BIASES.find(b => b.symbol === selectedSymbol) || MARKET_BIASES[0];
  const instrument = CANONICAL_INSTRUMENTS.find(i => i.symbol === selectedSymbol);
  const cot = COT_POSITIONING_DATA.find(c => c.instrument.toLowerCase().includes(currentBias.symbol.toLowerCase().slice(0, 3))) || COT_POSITIONING_DATA[0];

  return (
    <div className="space-y-6">
      {/* Header with Title and Quick Instrument Tabs */}
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#F3D4E3]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase tracking-wider">
              <Compass size={16} />
              <span>Global Command Desk</span>
              <span className="text-[#F3D4E3]">·</span>
              <span className="text-[#667085]">Central Intelligence Synthesis</span>
            </div>
            <h1 className="text-xl font-extrabold text-[#172033] mt-1">
              Multi-Asset Macroeconomic Decision Desk
            </h1>
          </div>

          {/* Asset Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-[#FFF7FA] rounded-xl border border-[#F3D4E3]">
            {MARKET_BIASES.map((bias) => (
              <button
                key={bias.symbol}
                onClick={() => setSelectedSymbol(bias.symbol)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedSymbol === bias.symbol
                    ? 'bg-white text-[#C83F7D] shadow-xs border border-[#F3D4E3]'
                    : 'text-[#667085] hover:text-[#172033]'
                }`}
              >
                {bias.symbol}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Instrument Core Status Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4 text-xs">
          <div className="bg-[#FFF7FA] p-3 rounded-xl border border-[#F3D4E3]">
            <span className="text-[10px] font-bold text-[#667085] uppercase">Synthesized Bias</span>
            <div className="mt-1">
              <StatusBadge status={currentBias.bias} type="bias" />
            </div>
          </div>

          <div className="bg-[#FFF7FA] p-3 rounded-xl border border-[#F3D4E3]">
            <span className="text-[10px] font-bold text-[#667085] uppercase">Bias Score</span>
            <div className="mt-1 font-mono font-extrabold text-sm text-[#172033]">
              {currentBias.score > 0 ? `+${currentBias.score}` : currentBias.score} / 10.0
            </div>
          </div>

          <div className="bg-[#FFF7FA] p-3 rounded-xl border border-[#F3D4E3]">
            <span className="text-[10px] font-bold text-[#667085] uppercase">Confidence</span>
            <div className="mt-1 font-mono font-extrabold text-sm text-[#16A34A]">
              {currentBias.confidencePercent}% High
            </div>
          </div>

          <div className="bg-[#FFF7FA] p-3 rounded-xl border border-[#F3D4E3]">
            <span className="text-[10px] font-bold text-[#667085] uppercase">Technical Status</span>
            <div className="mt-1 font-bold text-xs text-[#16A34A]">
              {currentBias.technicalConfirmation}
            </div>
          </div>

          <div className="bg-[#FFF7FA] p-3 rounded-xl border border-[#F3D4E3]">
            <span className="text-[10px] font-bold text-[#667085] uppercase">Key Target</span>
            <div className="mt-1 font-mono font-extrabold text-sm text-[#172033]">
              {currentBias.keyTargetLevel}
            </div>
          </div>

          <div className="bg-[#FFF7FA] p-3 rounded-xl border border-[#F3D4E3]">
            <span className="text-[10px] font-bold text-[#667085] uppercase">Invalidation Level</span>
            <div className="mt-1 font-mono font-extrabold text-sm text-[#DC2626]">
              {currentBias.invalidationLevel}
            </div>
          </div>
        </div>
      </div>

      {/* Analytical Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-[#F3D4E3] pb-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'overview'
              ? 'bg-[#FCE7F3] text-[#C83F7D]'
              : 'text-[#667085] hover:text-[#172033]'
          }`}
        >
          Comprehensive Synthesis
        </button>
        <button
          onClick={() => setActiveTab('macro')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'macro'
              ? 'bg-[#FCE7F3] text-[#C83F7D]'
              : 'text-[#667085] hover:text-[#172033]'
          }`}
        >
          Pillar Breakdown (6 Models)
        </button>
        <button
          onClick={() => setActiveTab('conflicts')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'conflicts'
              ? 'bg-[#FCE7F3] text-[#C83F7D]'
              : 'text-[#667085] hover:text-[#172033]'
          }`}
        >
          Supporting vs Conflicting Evidence
        </button>
      </div>

      {/* Tab 1: Comprehensive Synthesis */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main 2 Cols: Evidence Matrices */}
          <div className="lg:col-span-2 space-y-6">
            {/* Supporting Factors */}
            <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold text-[#16A34A] uppercase tracking-wider">
                <CheckCircle2 size={16} />
                <span>Supporting Factors & Macro Drivers</span>
              </div>
              <ul className="space-y-2.5">
                {currentBias.supportingFactors.map((factor, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#172033] bg-[#FFF7FA] p-3 rounded-xl border border-[#F3D4E3]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] mt-1.5 shrink-0"></span>
                    <span className="leading-relaxed">{factor}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Conflicting Risks */}
            <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold text-[#D97706] uppercase tracking-wider">
                <AlertCircle size={16} />
                <span>Conflicting Factors & Tail Risks</span>
              </div>
              <ul className="space-y-2.5">
                {currentBias.conflictingFactors.map((factor, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#172033] bg-[#FFF7FA] p-3 rounded-xl border border-[#F3D4E3]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] mt-1.5 shrink-0"></span>
                    <span className="leading-relaxed">{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right 1 Col: Quick Action & Trade Setup Guardrails */}
          <div className="space-y-6">
            <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase tracking-wider">
                <ShieldCheck size={16} />
                <span>Execution Guardrails</span>
              </div>
              
              <div className="text-xs text-[#667085] leading-relaxed">
                A verified macroeconomic bias establishes directional tendency. Do not enter without proper M15/H1 technical market structure confirmation (e.g. liquidity sweep or break of structure).
              </div>

              <div className="space-y-2 pt-2 border-t border-[#F3D4E3]">
                <button
                  onClick={() => onNavigate('risk-management')}
                  className="w-full bg-[#E85D9E] hover:bg-[#C83F7D] text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  Calculate Position Size for {currentBias.symbol}
                </button>
                <button
                  onClick={() => onNavigate('tradingview')}
                  className="w-full bg-[#FFF7FA] hover:bg-[#FCE7F3] text-[#C83F7D] border border-[#F3D4E3] py-2 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  Open TradingView Chart
                </button>
                <button
                  onClick={() => onNavigate('cot-positioning')}
                  className="w-full bg-[#FFF7FA] hover:bg-[#FCE7F3] text-[#172033] border border-[#F3D4E3] py-2 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  View CFTC Institutional Positioning
                </button>
              </div>
            </div>

            {/* COT Snapshot for this asset */}
            <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#F3D4E3]">
                <span className="font-bold text-[#172033]">COT Sentiment</span>
                <span className="font-mono text-[11px] text-[#16A34A] font-bold">
                  {cot.threeYearPercentile}% Percentile
                </span>
              </div>
              <div className="text-xs text-[#667085] flex items-center justify-between font-mono">
                <span>Asset Managers Net:</span>
                <span className="text-[#172033] font-bold">
                  +{cot.assetManagerNet.toLocaleString()}
                </span>
              </div>
              <div className="text-xs text-[#667085] flex items-center justify-between font-mono">
                <span>Leveraged Funds Net:</span>
                <span className="text-[#DC2626] font-bold">
                  {cot.leveragedFundsNet.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Pillar Breakdown */}
      {activeTab === 'macro' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white border border-[#F3D4E3] rounded-2xl p-4 shadow-xs space-y-2">
            <span className="text-[10px] font-bold text-[#667085] uppercase">1. Macroeconomic Growth</span>
            <div className="text-xl font-extrabold text-[#172033] font-mono">
              {currentBias.macroGrowthScore > 0 ? `+${currentBias.macroGrowthScore}` : currentBias.macroGrowthScore}/10
            </div>
            <p className="text-xs text-[#667085]">Evaluates GDP run-rate, PMIs, retail sales and industrial production trends.</p>
          </div>

          <div className="bg-white border border-[#F3D4E3] rounded-2xl p-4 shadow-xs space-y-2">
            <span className="text-[10px] font-bold text-[#667085] uppercase">2. Monetary Policy</span>
            <div className="text-xl font-extrabold text-[#172033] font-mono">
              {currentBias.monetaryPolicyScore > 0 ? `+${currentBias.monetaryPolicyScore}` : currentBias.monetaryPolicyScore}/10
            </div>
            <p className="text-xs text-[#667085]">Central bank policy rates, dot plots, statements and forward guidance stance.</p>
          </div>

          <div className="bg-white border border-[#F3D4E3] rounded-2xl p-4 shadow-xs space-y-2">
            <span className="text-[10px] font-bold text-[#667085] uppercase">3. Sovereign Yield Spreads</span>
            <div className="text-xl font-extrabold text-[#172033] font-mono">
              {currentBias.yieldSpreadScore > 0 ? `+${currentBias.yieldSpreadScore}` : currentBias.yieldSpreadScore}/10
            </div>
            <p className="text-xs text-[#667085]">2Y & 10Y sovereign bond spreads, real yields (TIPS) and curve shape dynamics.</p>
          </div>

          <div className="bg-white border border-[#F3D4E3] rounded-2xl p-4 shadow-xs space-y-2">
            <span className="text-[10px] font-bold text-[#667085] uppercase">4. Currency Strength</span>
            <div className="text-xl font-extrabold text-[#172033] font-mono">
              {currentBias.currencyStrengthScore > 0 ? `+${currentBias.currencyStrengthScore}` : currentBias.currencyStrengthScore}/10
            </div>
            <p className="text-xs text-[#667085]">Multi-timeframe relative purchasing power and trade-weighted strength.</p>
          </div>

          <div className="bg-white border border-[#F3D4E3] rounded-2xl p-4 shadow-xs space-y-2">
            <span className="text-[10px] font-bold text-[#667085] uppercase">5. Intermarket Confirmation</span>
            <div className="text-xl font-extrabold text-[#172033] font-mono">
              {currentBias.intermarketScore > 0 ? `+${currentBias.intermarketScore}` : currentBias.intermarketScore}/10
            </div>
            <p className="text-xs text-[#667085]">Cross-asset alignment across DXY, Gold, Crude Oil, Copper and VIX.</p>
          </div>

          <div className="bg-white border border-[#F3D4E3] rounded-2xl p-4 shadow-xs space-y-2">
            <span className="text-[10px] font-bold text-[#667085] uppercase">6. COT & Positioning</span>
            <div className="text-xl font-extrabold text-[#172033] font-mono">
              {currentBias.cotPositioningScore > 0 ? `+${currentBias.cotPositioningScore}` : currentBias.cotPositioningScore}/10
            </div>
            <p className="text-xs text-[#667085]">CFTC weekly institutional commitments of traders net positioning percentiles.</p>
          </div>
        </div>
      )}

      {/* Tab 3: Detailed Conflict Review */}
      {activeTab === 'conflicts' && (
        <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#172033]">
            <Info size={16} className="text-[#C83F7D]" />
            <span>Methodology: Transparent Weighting & Non-Fabricated Data Boundary</span>
          </div>
          <div className="text-xs text-[#667085] leading-relaxed space-y-2">
            <p>
              In accordance with GIS principles, directional bias scores are calculated through deterministic rule sets. No model output is presented as a guaranteed prediction or profit probability.
            </p>
            <p>
              When conflicting evidence arises (e.g. strong US earnings vs elevated real yields), the composite score adjusts downward, reflecting higher uncertainty. Traders must wait for market structure confirmation before deployment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
