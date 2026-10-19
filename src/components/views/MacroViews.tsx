import React, { useState } from 'react';
import {
  CENTRAL_BANK_POLICIES,
  SOVEREIGN_YIELDS,
  ECONOMIC_CALENDAR_EVENTS,
  CURRENCY_SCORES
} from '../../data/canonicalData';
import { StatusBadge } from '../common/StatusBadge';
import { Currency } from '../../types';
import {
  Percent,
  TrendingUp,
  Calendar,
  Database,
  Building2,
  GitCompare,
  Gauge,
  Activity,
  Layers,
  Search,
  ExternalLink,
  ChevronRight,
  Filter,
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* MODULE 6: GLOBAL INTEREST RATES                                            */
/* -------------------------------------------------------------------------- */
export const InterestRatesView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F3D4E3]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
              <Percent size={16} />
              <span>Global Policy Rates Dashboard</span>
            </div>
            <h1 className="text-xl font-extrabold text-[#172033] mt-1">
              G8 Central Bank Interest Rates & Divergence Matrix
            </h1>
          </div>
          <StatusBadge status="LIVE" type="data" />
        </div>

        <p className="text-xs text-[#667085] mt-3">
          Policy interest rate differentials are the primary long-term driver of foreign exchange flows, carry trade economics, and cross-asset relative valuations.
        </p>
      </div>

      {/* Policy Rates Table */}
      <div className="bg-white border border-[#F3D4E3] rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#F3D4E3] flex items-center justify-between">
          <span className="text-xs font-bold text-[#172033] uppercase">Current Policy Rate Leaderboard</span>
          <span className="text-[11px] text-[#667085]">Sorted by Highest Rate</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFF7FA] text-[#667085] font-semibold border-b border-[#F3D4E3]">
              <tr>
                <th className="py-3 px-4">Central Bank</th>
                <th className="py-3 px-4">Currency</th>
                <th className="py-3 px-4 text-right">Current Rate</th>
                <th className="py-3 px-4 text-right">Previous Rate</th>
                <th className="py-3 px-4">Policy Bias</th>
                <th className="py-3 px-4">Last Decision</th>
                <th className="py-3 px-4">Next Meeting</th>
                <th className="py-3 px-4 text-center">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3D4E3]">
              {[...CENTRAL_BANK_POLICIES]
                .sort((a, b) => b.currentRate - a.currentRate)
                .map((cb) => (
                  <tr key={cb.bankCode} className="hover:bg-[#FFF7FA] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#172033]">{cb.bankName}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#C83F7D]">{cb.currency}</td>
                    <td className="py-3.5 px-4 font-mono font-extrabold text-[#172033] text-right text-sm">
                      {cb.currentRate.toFixed(2)}%
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#667085] text-right">
                      {cb.previousRate.toFixed(2)}%
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        cb.bias === 'HAWKISH'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : cb.bias === 'DOVISH'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {cb.bias}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#667085]">{cb.lastDecisionDate}</td>
                    <td className="py-3.5 px-4 font-medium text-[#172033]">{cb.nextMeetingDate}</td>
                    <td className="py-3.5 px-4 text-center">
                      <a
                        href={cb.officialSourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#C83F7D] hover:text-[#E85D9E] inline-flex items-center gap-1"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MODULE 7: BOND & REAL-YIELD DESK                                           */
/* -------------------------------------------------------------------------- */
export const BondRealYieldView: React.FC = () => {
  const usCurve = [
    { tenor: '2Y', yieldVal: 4.02 },
    { tenor: '5Y', yieldVal: 3.98 },
    { tenor: '10Y', yieldVal: 4.18 },
    { tenor: '30Y', yieldVal: 4.46 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F3D4E3]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
              <TrendingUp size={16} />
              <span>Sovereign Debt & Real-Yield Analytics</span>
            </div>
            <h1 className="text-xl font-extrabold text-[#172033] mt-1">
              US Treasury Yield Curve & Global Sovereign Yield Spreads
            </h1>
          </div>
          <StatusBadge status="LIVE" type="data" />
        </div>
        <p className="text-xs text-[#667085] mt-3">
          Nominal yields represent the discount rate for all capital assets. Real yields (10Y TIPS) measure capital cost adjusted for expected inflation.
        </p>
      </div>

      {/* Yield Curve & Key Spreads Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* US Treasury Curve Card */}
        <div className="lg:col-span-2 bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F3D4E3]">
            <span className="text-xs font-bold text-[#172033] uppercase">US Treasury Yield Curve</span>
            <span className="text-[11px] text-[#16A34A] font-bold">10Y-2Y Spread: +16 bps (Steepening)</span>
          </div>

          {/* SVG Visual Yield Curve */}
          <div className="h-48 w-full flex items-end justify-between px-6 pt-6 pb-2 bg-[#FFF7FA] rounded-xl border border-[#F3D4E3] relative">
            <div className="absolute top-3 left-4 text-[10px] text-[#98A2B3] font-mono">
              YIELD (%)
            </div>
            {usCurve.map((point) => {
              const heightPercent = ((point.yieldVal - 3.5) / 1.5) * 100;
              return (
                <div key={point.tenor} className="flex flex-col items-center gap-2 z-10">
                  <span className="font-mono font-bold text-xs text-[#172033] bg-white px-2 py-0.5 rounded border border-[#F3D4E3] shadow-xs">
                    {point.yieldVal.toFixed(2)}%
                  </span>
                  <div
                    className="w-12 bg-gradient-to-t from-[#C83F7D] to-[#E85D9E] rounded-t-lg transition-all"
                    style={{ height: `${Math.max(20, heightPercent)}px` }}
                  ></div>
                  <span className="font-bold text-xs text-[#667085]">{point.tenor}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-[#FFF7FA] border border-[#F3D4E3]">
              <span className="text-[10px] text-[#667085]">10Y Nominal Yield</span>
              <div className="font-mono font-bold text-[#172033] text-sm mt-0.5">4.18%</div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#FFF7FA] border border-[#F3D4E3]">
              <span className="text-[10px] text-[#667085]">10Y TIPS Real Yield</span>
              <div className="font-mono font-bold text-[#C83F7D] text-sm mt-0.5">1.88%</div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#FFF7FA] border border-[#F3D4E3]">
              <span className="text-[10px] text-[#667085]">10Y Breakeven Inflation</span>
              <div className="font-mono font-bold text-[#172033] text-sm mt-0.5">2.30%</div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#FFF7FA] border border-[#F3D4E3]">
              <span className="text-[10px] text-[#667085]">Curve Regime</span>
              <div className="font-bold text-[#16A34A] text-sm mt-0.5">Normal Steep</div>
            </div>
          </div>
        </div>

        {/* Global 10Y Yield Spreads vs US */}
        <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F3D4E3]">
            <span className="text-xs font-bold text-[#172033] uppercase">Global 10Y Spreads vs US</span>
            <span className="text-[10px] text-[#667085]">US Base: 4.18%</span>
          </div>

          <div className="space-y-3">
            {SOVEREIGN_YIELDS.filter(y => y.currency !== 'USD').map((y) => {
              const spread = ((4.18 - y.yield10Y) * 100).toFixed(0);
              return (
                <div key={y.country} className="p-3 bg-[#FFF7FA] rounded-xl border border-[#F3D4E3] text-xs">
                  <div className="flex items-center justify-between font-bold text-[#172033]">
                    <span>{y.country}</span>
                    <span className="font-mono">{y.yield10Y.toFixed(2)}%</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#667085] mt-1">
                    <span>US Advantage Spread:</span>
                    <span className="font-mono font-bold text-[#16A34A]">+{spread} bps</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MODULE 8: ECONOMIC CALENDAR                                                */
/* -------------------------------------------------------------------------- */
export const EconomicCalendarView: React.FC = () => {
  const [filterCurrency, setFilterCurrency] = useState<string>('ALL');

  const filtered = filterCurrency === 'ALL'
    ? ECONOMIC_CALENDAR_EVENTS
    : ECONOMIC_CALENDAR_EVENTS.filter(e => e.currency === filterCurrency);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F3D4E3]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
              <Calendar size={16} />
              <span>Economic Release Intelligence</span>
            </div>
            <h1 className="text-xl font-extrabold text-[#172033] mt-1">
              Global Economic Calendar & Reaction Analysis
            </h1>
          </div>

          {/* Currency Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-[#FFF7FA] rounded-xl border border-[#F3D4E3]">
            {['ALL', 'USD', 'EUR', 'GBP', 'JPY'].map((cur) => (
              <button
                key={cur}
                onClick={() => setFilterCurrency(cur)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  filterCurrency === cur
                    ? 'bg-white text-[#C83F7D] shadow-xs border border-[#F3D4E3]'
                    : 'text-[#667085] hover:text-[#172033]'
                }`}
              >
                {cur}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Releases Table */}
      <div className="bg-white border border-[#F3D4E3] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFF7FA] text-[#667085] font-semibold border-b border-[#F3D4E3]">
              <tr>
                <th className="py-3 px-4">Scheduled Time</th>
                <th className="py-3 px-4">Currency</th>
                <th className="py-3 px-4">Event</th>
                <th className="py-3 px-4 text-center">Impact</th>
                <th className="py-3 px-4 text-right">Actual</th>
                <th className="py-3 px-4 text-right">Forecast</th>
                <th className="py-3 px-4 text-right">Previous</th>
                <th className="py-3 px-4">Official Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3D4E3]">
              {filtered.map((ev) => (
                <React.Fragment key={ev.id}>
                  <tr className="hover:bg-[#FFF7FA] transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[#667085]">{ev.scheduledTime}</td>
                    <td className="py-3.5 px-4 font-bold font-mono text-[#C83F7D]">{ev.currency}</td>
                    <td className="py-3.5 px-4 font-bold text-[#172033]">{ev.eventName}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        ev.importance === 'HIGH'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {ev.importance}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-extrabold text-[#172033] text-right">
                      {ev.actual !== null && ev.actual !== undefined ? ev.actual : '—'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#667085] text-right">{ev.forecast || '—'}</td>
                    <td className="py-3.5 px-4 font-mono text-[#667085] text-right">{ev.previous || '—'}</td>
                    <td className="py-3.5 px-4 text-[#667085] truncate max-w-[180px]">
                      {ev.officialSource}
                    </td>
                  </tr>
                  {ev.interpretation && (
                    <tr className="bg-[#FFF7FA]/50 text-xs">
                      <td colSpan={8} className="py-2.5 px-4 text-[#667085] border-b border-[#F3D4E3]">
                        <span className="font-semibold text-[#C83F7D] mr-2">GIS Analysis:</span>
                        {ev.interpretation}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MODULE 9: ECONOMIC DATA CENTER                                             */
/* -------------------------------------------------------------------------- */
export const EconomicDataCenterView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
          <Database size={16} />
          <span>Macro Data Center</span>
        </div>
        <h1 className="text-xl font-extrabold text-[#172033] mt-1">
          Core Macroeconomic Indicators & Growth Dynamics
        </h1>
        <p className="text-xs text-[#667085] mt-2">
          Tracking the foundational metrics of modern macroeconomics: Inflation, Employment, Real GDP Growth, and Purchasing Managers Indices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#F3D4E3] rounded-xl p-4 shadow-xs space-y-2">
          <span className="text-[10px] font-bold text-[#667085] uppercase">US Headline CPI YoY</span>
          <div className="text-2xl font-extrabold text-[#172033] font-mono">2.4%</div>
          <p className="text-xs text-[#667085]">Disinflation trend sustained. 12-month low.</p>
        </div>

        <div className="bg-white border border-[#F3D4E3] rounded-xl p-4 shadow-xs space-y-2">
          <span className="text-[10px] font-bold text-[#667085] uppercase">US Core PCE Deflator YoY</span>
          <div className="text-2xl font-extrabold text-[#172033] font-mono">2.7%</div>
          <p className="text-xs text-[#667085]">Fed preferred inflation gauge. Progressing to target.</p>
        </div>

        <div className="bg-white border border-[#F3D4E3] rounded-xl p-4 shadow-xs space-y-2">
          <span className="text-[10px] font-bold text-[#667085] uppercase">US Unemployment Rate</span>
          <div className="text-2xl font-extrabold text-[#16A34A] font-mono">4.1%</div>
          <p className="text-xs text-[#667085]">Healthy labor market balance without sharp firing spike.</p>
        </div>

        <div className="bg-white border border-[#F3D4E3] rounded-xl p-4 shadow-xs space-y-2">
          <span className="text-[10px] font-bold text-[#667085] uppercase">US Real GDP Annualized</span>
          <div className="text-2xl font-extrabold text-[#16A34A] font-mono">2.8%</div>
          <p className="text-xs text-[#667085]">Strong productivity and consumer spending cushion.</p>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MODULE 10: CENTRAL BANK LIBRARY                                            */
/* -------------------------------------------------------------------------- */
export const CentralBankLibraryView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
          <Building2 size={16} />
          <span>Central Bank Research Desk</span>
        </div>
        <h1 className="text-xl font-extrabold text-[#172033] mt-1">
          Official Statements, Minutes & Policy Stance Archive
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CENTRAL_BANK_POLICIES.map((cb) => (
          <div key={cb.bankCode} className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#F3D4E3]">
              <div>
                <h3 className="text-base font-extrabold text-[#172033]">{cb.bankName}</h3>
                <span className="text-xs text-[#667085]">{cb.currency} Policy Rate: {cb.currentRate.toFixed(2)}%</span>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded ${
                cb.bias === 'HAWKISH'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : cb.bias === 'DOVISH'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {cb.bias}
              </span>
            </div>

            <p className="text-xs text-[#667085] leading-relaxed">
              {cb.summary}
            </p>

            <div className="bg-[#FFF7FA] p-3 rounded-xl border border-[#F3D4E3] text-xs text-[#172033] italic">
              "{cb.lastStatementExcerpt}"
            </div>

            <div className="flex items-center justify-between pt-2 text-xs text-[#667085]">
              <span>Next Meeting: <strong>{cb.nextMeetingDate}</strong></span>
              <a
                href={cb.officialSourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#C83F7D] font-bold hover:underline inline-flex items-center gap-1"
              >
                Official Publications <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MODULE 11: INTERMARKET INTELLIGENCE                                        */
/* -------------------------------------------------------------------------- */
export const IntermarketView: React.FC = () => {
  const correlations = [
    { pair: 'DXY vs US 10Y Yield', correlation: '+0.82', relationship: 'Strong Positive', note: 'Higher nominal yields drive USD carry capital inflow.' },
    { pair: 'DXY vs Gold (XAUUSD)', correlation: '-0.38', relationship: 'Mild Negative / Decoupled', note: 'Gold resilient despite strong dollar due to sovereign central bank purchases.' },
    { pair: 'SPX500 vs VIX Index', correlation: '-0.88', relationship: 'Strong Inverse', note: 'Volatility compression fuels institutional equity buying.' },
    { pair: 'USOIL (Crude) vs USDCAD', correlation: '-0.74', relationship: 'Inverse', note: 'Higher oil prices structurally strengthen Canadian petro-currency.' },
    { pair: 'Copper vs Global Equities', correlation: '+0.68', relationship: 'Positive Leading', note: 'Dr. Copper demand signals manufacturing resilience.' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
          <GitCompare size={16} />
          <span>Intermarket Relationships</span>
        </div>
        <h1 className="text-xl font-extrabold text-[#172033] mt-1">
          Cross-Asset Correlations & Divergence Tracking
        </h1>
        <p className="text-xs text-[#667085] mt-2">
          Tracking structural relationships across Currencies, Equities, Bonds, Commodities, and Volatility (90-day rolling window).
        </p>
      </div>

      <div className="bg-white border border-[#F3D4E3] rounded-2xl shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#FFF7FA] text-[#667085] font-semibold border-b border-[#F3D4E3]">
            <tr>
              <th className="py-3 px-4">Intermarket Asset Pair</th>
              <th className="py-3 px-4 text-center">90D Correlation</th>
              <th className="py-3 px-4">Relationship State</th>
              <th className="py-3 px-4">GIS Analytical Context</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3D4E3]">
            {correlations.map((row, i) => (
              <tr key={i} className="hover:bg-[#FFF7FA] transition-colors">
                <td className="py-3.5 px-4 font-bold text-[#172033]">{row.pair}</td>
                <td className="py-3.5 px-4 font-mono font-bold text-center text-[#C83F7D]">{row.correlation}</td>
                <td className="py-3.5 px-4 font-medium text-[#172033]">{row.relationship}</td>
                <td className="py-3.5 px-4 text-[#667085]">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MODULE 12 & 13: CURRENCY SCORING & STRENGTH                                */
/* -------------------------------------------------------------------------- */
export const CurrencyScoringView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
          <Gauge size={16} />
          <span>Transparent Mathematical Currency Model</span>
        </div>
        <h1 className="text-xl font-extrabold text-[#172033] mt-1">
          G8 Currency Fundamental Scoring Engine
        </h1>
        <p className="text-xs text-[#667085] mt-2">
          Composite score (-100 to +100) calculated from: Rate Differential (30%) + Economic Momentum (25%) + Central Bank Bias (25%) + Speculative Positioning (20%).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CURRENCY_SCORES.map((cur) => (
          <div key={cur.currency} className="bg-white border border-[#F3D4E3] rounded-2xl p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#F3D4E3]">
              <div>
                <span className="text-lg font-extrabold text-[#172033] font-mono">{cur.currency}</span>
                <div className="text-[11px] text-[#667085]">{cur.name}</div>
              </div>
              <span className={`text-base font-extrabold font-mono ${
                cur.score >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'
              }`}>
                {cur.score > 0 ? `+${cur.score}` : cur.score}
              </span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between text-[#667085]">
                <span>Rate Differential (30%):</span>
                <span className="font-mono font-bold text-[#172033]">{cur.rateDifferentialScore}</span>
              </div>
              <div className="flex justify-between text-[#667085]">
                <span>Economic Momentum (25%):</span>
                <span className="font-mono font-bold text-[#172033]">{cur.economicMomentumScore}</span>
              </div>
              <div className="flex justify-between text-[#667085]">
                <span>Central Bank Stance (25%):</span>
                <span className="font-mono font-bold text-[#172033]">{cur.centralBankBiasScore}</span>
              </div>
              <div className="flex justify-between text-[#667085]">
                <span>COT Positioning (20%):</span>
                <span className="font-mono font-bold text-[#172033]">{cur.positioningScore}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CurrencyStrengthView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
          <Activity size={16} />
          <span>Relative Strength Matrix</span>
        </div>
        <h1 className="text-xl font-extrabold text-[#172033] mt-1">
          Multi-Timeframe G8 Currency Strength Comparison
        </h1>
      </div>

      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs space-y-4">
        {CURRENCY_SCORES.map((cur) => (
          <div key={cur.currency} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-[#172033] font-mono w-16">{cur.currency}</span>
              <span className="text-[11px] text-[#667085] flex-1">
                Short-term: {cur.shortTermStrength} · Medium: {cur.mediumTermStrength} · Long: {cur.longTermStrength}
              </span>
              <span className={`font-mono font-bold ${cur.score >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                Rank #{cur.rank} ({cur.score > 0 ? `+${cur.score}` : cur.score})
              </span>
            </div>
            <div className="h-2.5 bg-[#FFF7FA] rounded-full overflow-hidden border border-[#F3D4E3]">
              <div
                className={`h-full rounded-full ${cur.score >= 0 ? 'bg-[#16A34A]' : 'bg-[#DC2626]'}`}
                style={{ width: `${Math.min(100, Math.max(12, Math.abs(cur.score)))}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MODULE 14: RISK REGIME & SENTIMENT                                         */
/* -------------------------------------------------------------------------- */
export const RiskRegimeView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
          <Layers size={16} />
          <span>Market Regime Engine</span>
        </div>
        <h1 className="text-xl font-extrabold text-[#172033] mt-1">
          Global Risk Appetite & Sentiment Synthesizer
        </h1>
        <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
              Active Synthesized Regime
            </div>
            <div className="text-xl font-extrabold text-emerald-900">
              MODERATE RISK-ON (Confidence: 78%)
            </div>
          </div>
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#F3D4E3] rounded-xl p-4 shadow-xs">
          <span className="text-[10px] font-bold text-[#667085] uppercase">Cboe VIX Volatility</span>
          <div className="text-2xl font-extrabold text-[#172033] font-mono mt-1">16.80</div>
          <span className="text-[11px] font-bold text-[#16A34A]">Low Volatility (&lt;20)</span>
        </div>

        <div className="bg-white border border-[#F3D4E3] rounded-xl p-4 shadow-xs">
          <span className="text-[10px] font-bold text-[#667085] uppercase">High Yield Credit Spread</span>
          <div className="text-2xl font-extrabold text-[#172033] font-mono mt-1">312 bps</div>
          <span className="text-[11px] font-bold text-[#16A34A]">Benign Default Risk</span>
        </div>

        <div className="bg-white border border-[#F3D4E3] rounded-xl p-4 shadow-xs">
          <span className="text-[10px] font-bold text-[#667085] uppercase">Equity Market Breadth</span>
          <div className="text-2xl font-extrabold text-[#172033] font-mono mt-1">68.4%</div>
          <span className="text-[11px] font-bold text-[#16A34A]">&gt;50D Moving Average</span>
        </div>

        <div className="bg-white border border-[#F3D4E3] rounded-xl p-4 shadow-xs">
          <span className="text-[10px] font-bold text-[#667085] uppercase">Safe-Haven Flow Index</span>
          <div className="text-2xl font-extrabold text-[#172033] font-mono mt-1">Neutral</div>
          <span className="text-[11px] font-bold text-[#D97706]">Moderate CHF/JPY Flows</span>
        </div>
      </div>
    </div>
  );
};
