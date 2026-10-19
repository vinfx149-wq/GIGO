import React, { useState, useEffect } from 'react';
import {
  CME_PRODUCTS,
  COT_POSITIONING_DATA,
  SEASONALITY_DATA,
  CANONICAL_INSTRUMENTS,
  MARKET_BIASES
} from '../../data/canonicalData';
import { StatusBadge } from '../common/StatusBadge';
import {
  BarChart3,
  PieChart,
  Flame,
  CalendarClock,
  Sparkles,
  BookOpen,
  Globe2,
  Clock,
  Info,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* MODULE 15: CME & FUTURES INTELLIGENCE                                      */
/* -------------------------------------------------------------------------- */
export const CMEFuturesView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F3D4E3]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
              <BarChart3 size={16} />
              <span>CME Group Exchange Intelligence</span>
            </div>
            <h1 className="text-xl font-extrabold text-[#172033] mt-1">
              Exchange-Traded Futures: CME, CBOT, NYMEX & COMEX
            </h1>
          </div>
          <StatusBadge status="DELAYED" type="data" />
        </div>
        <p className="text-xs text-[#667085] mt-3">
          Exchange-traded volume and Open Interest (OI) reflect real centralized institutional liquidity and physical commercial hedging—distinct from OTC broker CFD turnover.
        </p>
      </div>

      <div className="bg-white border border-[#F3D4E3] rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#F3D4E3] flex items-center justify-between">
          <span className="text-xs font-bold text-[#172033] uppercase">Active CME Product Contracts</span>
          <span className="text-[11px] text-[#667085]">Volume vs Open Interest Breakdown</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFF7FA] text-[#667085] font-semibold border-b border-[#F3D4E3]">
              <tr>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Exchange</th>
                <th className="py-3 px-4">Symbol / Expiry</th>
                <th className="py-3 px-4 text-right">Settlement</th>
                <th className="py-3 px-4 text-right">Change</th>
                <th className="py-3 px-4 text-right">Volume</th>
                <th className="py-3 px-4 text-right">Open Interest</th>
                <th className="py-3 px-4 text-right">Implied Vol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3D4E3]">
              {CME_PRODUCTS.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#FFF7FA] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#172033]">{prod.name}</td>
                  <td className="py-3.5 px-4 font-mono text-[#C83F7D] font-bold">{prod.exchange}</td>
                  <td className="py-3.5 px-4 font-mono text-[#667085]">{prod.activeContractMonth}</td>
                  <td className="py-3.5 px-4 font-mono font-extrabold text-[#172033] text-right">
                    {prod.settlementPrice.toLocaleString()}
                  </td>
                  <td className={`py-3.5 px-4 font-mono font-bold text-right ${
                    prod.priceChange >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'
                  }`}>
                    {prod.priceChange >= 0 ? `+${prod.priceChange}` : prod.priceChange}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#667085] text-right">
                    {prod.volume.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#172033] text-right">
                    {prod.openInterest.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#667085] text-right">
                    {prod.impliedVolatility ? `${prod.impliedVolatility}%` : 'N/A'}
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
/* MODULE 16: COT & POSITIONING ANALYSIS                                      */
/* -------------------------------------------------------------------------- */
export const COTPositioningView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F3D4E3]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
              <PieChart size={16} />
              <span>CFTC Commitments of Traders (COT)</span>
            </div>
            <h1 className="text-xl font-extrabold text-[#172033] mt-1">
              Institutional Speculator vs Asset Manager Positioning
            </h1>
          </div>
          <StatusBadge status="HISTORICAL" type="data" />
        </div>
        <p className="text-xs text-[#667085] mt-3">
          Published weekly by the US CFTC. Tracks net positioning across Asset Managers (pension/mutual funds) and Leveraged Funds (hedge funds/CTA trend-followers).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COT_POSITIONING_DATA.map((cot, idx) => (
          <div key={idx} className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F3D4E3]">
              <div>
                <h3 className="text-base font-extrabold text-[#172033]">{cot.instrument}</h3>
                <span className="text-xs text-[#667085]">{cot.category}</span>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded ${
                cot.signal === 'EXTREME_BULLISH' || cot.signal === 'BULLISH'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : cot.signal === 'NEUTRAL'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {cot.signal} ({cot.threeYearPercentile}%)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#FFF7FA] rounded-xl border border-[#F3D4E3]">
                <span className="text-[10px] font-bold text-[#667085] uppercase">Asset Managers Net</span>
                <div className="font-mono font-extrabold text-[#16A34A] text-base mt-1">
                  +{cot.assetManagerNet.toLocaleString()}
                </div>
                <div className="text-[10px] text-[#667085] mt-0.5">Long: {cot.assetManagerLong.toLocaleString()}</div>
              </div>

              <div className="p-3 bg-[#FFF7FA] rounded-xl border border-[#F3D4E3]">
                <span className="text-[10px] font-bold text-[#667085] uppercase">Leveraged Funds Net</span>
                <div className={`font-mono font-extrabold text-base mt-1 ${
                  cot.leveragedFundsNet >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'
                }`}>
                  {cot.leveragedFundsNet >= 0 ? `+${cot.leveragedFundsNet.toLocaleString()}` : cot.leveragedFundsNet.toLocaleString()}
                </div>
                <div className="text-[10px] text-[#667085] mt-0.5">Short: {cot.leveragedFundsShort.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#667085] pt-2 border-t border-[#F3D4E3]">
              <span>Report Date: <strong>{cot.reportDate}</strong></span>
              <span>Open Interest: <strong className="font-mono">{cot.openInterest.toLocaleString()}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MODULE 17: COMMODITIES & METALS                                            */
/* -------------------------------------------------------------------------- */
export const CommoditiesView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
          <Flame size={16} />
          <span>Commodities & Precious Metals</span>
        </div>
        <h1 className="text-xl font-extrabold text-[#172033] mt-1">
          Gold, Silver, Energy & Industrial Metals Intelligence
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#F3D4E3]">
            <span className="text-sm font-extrabold text-[#172033]">Gold (XAUUSD) Fundamentals</span>
            <span className="text-xs font-bold text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Bullish Supercycle</span>
          </div>
          <p className="text-xs text-[#667085] leading-relaxed">
            Gold is behaving as sovereign reserve insurance. Primary structural drivers include record central bank buying (PBoC, RBI, CBR), massive G7 sovereign debt expansion, and systemic de-dollarization hedging.
          </p>
          <div className="bg-[#FFF7FA] p-3 rounded-xl border border-[#F3D4E3] text-xs space-y-1">
            <div className="flex justify-between font-mono"><span>COT Percentile:</span> <strong className="text-[#16A34A]">94.2%</strong></div>
            <div className="flex justify-between font-mono"><span>Real Yield Sensitivity:</span> <strong>Decoupled (Resilient)</strong></div>
          </div>
        </div>

        <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#F3D4E3]">
            <span className="text-sm font-extrabold text-[#172033]">WTI Crude Oil (USOIL)</span>
            <span className="text-xs font-bold text-[#D97706] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Rangebound Mixed</span>
          </div>
          <p className="text-xs text-[#667085] leading-relaxed">
            Crude oil balances geopolitical risk premiums against tepid global demand from China and non-OPEC+ supply expansion (US, Guyana, Brazil). 
          </p>
          <div className="bg-[#FFF7FA] p-3 rounded-xl border border-[#F3D4E3] text-xs space-y-1">
            <div className="flex justify-between font-mono"><span>OPEC+ Idle Capacity:</span> <strong>~5.5M bpd</strong></div>
            <div className="flex justify-between font-mono"><span>US Production:</span> <strong>Record 13.4M bpd</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MODULE 18: SEASONALITY DESK                                                */
/* -------------------------------------------------------------------------- */
export const SeasonalityView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
          <CalendarClock size={16} />
          <span>Historical Seasonality Desk</span>
        </div>
        <h1 className="text-xl font-extrabold text-[#172033] mt-1">
          25-Year Monthly Historical Average Returns (%)
        </h1>
        <p className="text-xs text-[#667085] mt-2">
          Historical patterns provide probabilistic context rather than standalone trade triggers. Always combine with macroeconomic bias and market structure.
        </p>
      </div>

      <div className="bg-white border border-[#F3D4E3] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFF7FA] text-[#667085] font-semibold border-b border-[#F3D4E3]">
              <tr>
                <th className="py-3 px-4">Month</th>
                <th className="py-3 px-4 text-right">Nasdaq 100 Avg</th>
                <th className="py-3 px-4 text-right">S&P 500 Avg</th>
                <th className="py-3 px-4 text-right">Gold (XAU) Avg</th>
                <th className="py-3 px-4 text-right">EURUSD Avg</th>
                <th className="py-3 px-4 text-center">Sample Period</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3D4E3]">
              {SEASONALITY_DATA.map((row) => (
                <tr key={row.month} className="hover:bg-[#FFF7FA] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#172033] font-mono">{row.month}</td>
                  <td className={`py-3 px-4 font-mono font-bold text-right ${
                    row.nasdaqAvg >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'
                  }`}>
                    {row.nasdaqAvg >= 0 ? `+${row.nasdaqAvg}%` : `${row.nasdaqAvg}%`}
                  </td>
                  <td className={`py-3 px-4 font-mono font-bold text-right ${
                    row.spxAvg >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'
                  }`}>
                    {row.spxAvg >= 0 ? `+${row.spxAvg}%` : `${row.spxAvg}%`}
                  </td>
                  <td className={`py-3 px-4 font-mono font-bold text-right ${
                    row.goldAvg >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'
                  }`}>
                    {row.goldAvg >= 0 ? `+${row.goldAvg}%` : `${row.goldAvg}%`}
                  </td>
                  <td className={`py-3 px-4 font-mono font-bold text-right ${
                    row.eurusdAvg >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'
                  }`}>
                    {row.eurusdAvg >= 0 ? `+${row.eurusdAvg}%` : `${row.eurusdAvg}%`}
                  </td>
                  <td className="py-3 px-4 text-center text-[#667085] font-mono">{row.sampleYears} Years</td>
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
/* MODULE 19: EVENT DESK                                                      */
/* -------------------------------------------------------------------------- */
export const EventDeskView: React.FC = () => {
  const events = [
    { name: 'FOMC Rate Decision & Press Conference', impact: 'MAXIMUM', asset: 'USD / Equities / Gold', tip: 'Widespread spread widening. Initial 15-min reaction often reverses during Fed Chair Q&A.' },
    { name: 'US Consumer Price Index (CPI)', impact: 'HIGH', asset: 'Yields / DXY / Indices', tip: 'Compare Core MoM against 0.2% baseline. Avoid entering 10 mins prior.' },
    { name: 'US Nonfarm Payrolls (NFP)', impact: 'HIGH', asset: 'USD / Gold / US30', tip: 'Inspect Average Hourly Earnings and Unemployment Rate revisions alongside headline print.' },
    { name: 'ECB Monetary Policy Meeting', impact: 'HIGH', asset: 'EURUSD / GER40', tip: 'Watch Lagarde press conference remarks on forward guidance and transmission protection.' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
          <Sparkles size={16} />
          <span>Macro Event Desk & Liquidity Playbook</span>
        </div>
        <h1 className="text-xl font-extrabold text-[#172033] mt-1">
          High-Impact Economic Release Playbooks
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((ev, i) => (
          <div key={i} className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#172033]">{ev.name}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                {ev.impact}
              </span>
            </div>
            <div className="text-xs text-[#C83F7D] font-mono font-semibold">Primary Focus: {ev.asset}</div>
            <div className="text-xs text-[#667085] bg-[#FFF7FA] p-3 rounded-xl border border-[#F3D4E3] leading-relaxed">
              <strong>Execution Tip:</strong> {ev.tip}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MODULE 20: INDEX PLAYBOOKS                                                 */
/* -------------------------------------------------------------------------- */
export const IndexPlaybooksView: React.FC = () => {
  const indices = [
    { symbol: 'NAS100', name: 'Nasdaq 100', weight: 'Top 7 Tech: 48% weight', driver: '10Y real yields, AI capex, cloud earnings' },
    { symbol: 'SPX500', name: 'S&P 500', weight: 'Broad market 500 constituents', driver: 'Corporate earnings growth, US GDP, credit spreads' },
    { symbol: 'GER40', name: 'DAX 40', weight: 'Industrial exporters & auto manufacturers', driver: 'EUR exchange rate, China demand, energy input costs' },
    { symbol: 'JP225', name: 'Nikkei 225', weight: 'Tech & export conglomerates', driver: 'USDJPY exchange rate, BOJ yield curve control' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
          <BookOpen size={16} />
          <span>Global Indices Playbooks</span>
        </div>
        <h1 className="text-xl font-extrabold text-[#172033] mt-1">
          Constituent Weights, Macro Sensitivities & Playbooks
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {indices.map((idx) => (
          <div key={idx.symbol} className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-[#F3D4E3]">
              <span className="font-extrabold text-base text-[#172033] font-mono">{idx.symbol}</span>
              <span className="text-xs text-[#667085]">{idx.name}</span>
            </div>
            <div className="text-xs text-[#667085]"><strong>Structure:</strong> {idx.weight}</div>
            <div className="text-xs text-[#667085]"><strong>Primary Drivers:</strong> {idx.driver}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MODULE 21: FOREX INTELLIGENCE                                              */
/* -------------------------------------------------------------------------- */
export const ForexIntelligenceView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
          <Globe2 size={16} />
          <span>Forex Intelligence Desk</span>
        </div>
        <h1 className="text-xl font-extrabold text-[#172033] mt-1">
          G8 Currency Pair Divergence & Terms-of-Trade Analysis
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#F3D4E3] rounded-2xl p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-[#F3D4E3]">
            <span className="font-extrabold text-sm text-[#172033] font-mono">EURUSD</span>
            <StatusBadge status="BEARISH" type="bias" />
          </div>
          <p className="text-xs text-[#667085]">US growth advantage + ECB rate cutting cycle keeps long-term bias tilted downward.</p>
        </div>

        <div className="bg-white border border-[#F3D4E3] rounded-2xl p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-[#F3D4E3]">
            <span className="font-extrabold text-sm text-[#172033] font-mono">USDJPY</span>
            <StatusBadge status="BULLISH" type="bias" />
          </div>
          <p className="text-xs text-[#667085]">Yield spread favor USD (+320 bps), but watchful of MoF intervention above 152.00.</p>
        </div>

        <div className="bg-white border border-[#F3D4E3] rounded-2xl p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-[#F3D4E3]">
            <span className="font-extrabold text-sm text-[#172033] font-mono">AUDUSD</span>
            <StatusBadge status="MIXED" type="bias" />
          </div>
          <p className="text-xs text-[#667085]">Hawkish RBA rate support balanced against commodity volatility and China growth pace.</p>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MODULE 22: MARKET SESSIONS                                                 */
/* -------------------------------------------------------------------------- */
export const MarketSessionsView: React.FC = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const sessions = [
    { city: 'Sydney', hours: '21:00 - 06:00 UTC', timezone: 'AEST (UTC+10)', status: 'CLOSED' },
    { city: 'Tokyo', hours: '00:00 - 09:00 UTC', timezone: 'JST (UTC+9)', status: 'CLOSED' },
    { city: 'London', hours: '07:00 - 16:00 UTC', timezone: 'BST (UTC+1)', status: 'CLOSING' },
    { city: 'New York', hours: '12:00 - 21:00 UTC', timezone: 'EDT (UTC-4)', status: 'ACTIVE' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
          <Clock size={16} />
          <span>Global Trading Sessions</span>
        </div>
        <h1 className="text-xl font-extrabold text-[#172033] mt-1">
          Daylight-Saving Aware Global Session Clocks & Overlaps
        </h1>
        <div className="mt-3 font-mono text-xs text-[#667085]">
          Current Universal Time: <strong className="text-[#172033]">{now.toUTCString()}</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sessions.map((sess) => (
          <div key={sess.city} className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#F3D4E3]">
              <span className="font-extrabold text-base text-[#172033]">{sess.city}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                sess.status === 'ACTIVE'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-50 text-slate-600 border border-slate-200'
              }`}>
                {sess.status}
              </span>
            </div>
            <div className="text-xs text-[#667085] font-mono">Hours: {sess.hours}</div>
            <div className="text-xs text-[#667085]">Zone: {sess.timezone}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
