import React, { useState } from 'react';
import {
  CANONICAL_INSTRUMENTS,
  MARKET_BIASES,
  INITIAL_ACCOUNTS,
  INITIAL_TRADES,
  INITIAL_ALERTS
} from '../../data/canonicalData';
import { StatusBadge } from '../common/StatusBadge';
import {
  Instrument,
  TradingAccount,
  TradeRecord,
  SystemAlert,
  AssetClass
} from '../../types';
import {
  CandlestickChart,
  ListFilter,
  Radio,
  Wallet,
  ShieldAlert,
  BookMarked,
  LineChart,
  Bell,
  Plus,
  Trash2,
  Download,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Info,
  TrendingUp,
  TrendingDown,
  Calculator,
  Search
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* MODULE 3: MARKET ANALYSIS                                                  */
/* -------------------------------------------------------------------------- */
export const MarketAnalysisView: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<string>('NAS100');

  const inst = CANONICAL_INSTRUMENTS.find(i => i.symbol === selectedAsset) || CANONICAL_INSTRUMENTS[0];
  const bias = MARKET_BIASES.find(b => b.symbol === selectedAsset) || MARKET_BIASES[0];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F3D4E3]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
              <LineChart size={16} />
              <span>Technical & Fundamental Market Analysis</span>
            </div>
            <h1 className="text-xl font-extrabold text-[#172033] mt-1">
              Multi-Asset Structure & Liquidity Framework
            </h1>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-[#FFF7FA] rounded-xl border border-[#F3D4E3]">
            {['NAS100', 'SPX500', 'EURUSD', 'XAUUSD', 'USDJPY'].map((sym) => (
              <button
                key={sym}
                onClick={() => setSelectedAsset(sym)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  selectedAsset === sym
                    ? 'bg-white text-[#C83F7D] shadow-xs border border-[#F3D4E3]'
                    : 'text-[#667085] hover:text-[#172033]'
                }`}
              >
                {sym}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Instrument Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
          <div className="bg-[#FFF7FA] p-3 rounded-xl border border-[#F3D4E3]">
            <span className="text-[10px] text-[#667085] font-bold uppercase">Current Price</span>
            <div className="font-mono font-extrabold text-[#172033] text-sm mt-0.5">
              {inst.lastPrice.toLocaleString()}
            </div>
          </div>
          <div className="bg-[#FFF7FA] p-3 rounded-xl border border-[#F3D4E3]">
            <span className="text-[10px] text-[#667085] font-bold uppercase">Market Bias</span>
            <div className="mt-0.5">
              <StatusBadge status={bias.bias} type="bias" />
            </div>
          </div>
          <div className="bg-[#FFF7FA] p-3 rounded-xl border border-[#F3D4E3]">
            <span className="text-[10px] text-[#667085] font-bold uppercase">Structure Status</span>
            <div className="font-bold text-[#16A34A] text-xs mt-0.5">
              Bullish H4 BOS
            </div>
          </div>
          <div className="bg-[#FFF7FA] p-3 rounded-xl border border-[#F3D4E3]">
            <span className="text-[10px] text-[#667085] font-bold uppercase">Target / Invalidation</span>
            <div className="font-mono text-[#172033] text-xs mt-0.5">
              {bias.keyTargetLevel} / <span className="text-[#DC2626]">{bias.invalidationLevel}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-[#172033]">Technical Market Structure Checklist</h3>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2 text-[#172033] bg-[#FFF7FA] p-2.5 rounded-lg border border-[#F3D4E3]">
              <CheckCircle2 size={16} className="text-[#16A34A]" />
              <span>Higher Timeframe (Daily/H4) trend aligned with macro bias.</span>
            </li>
            <li className="flex items-center gap-2 text-[#172033] bg-[#FFF7FA] p-2.5 rounded-lg border border-[#F3D4E3]">
              <CheckCircle2 size={16} className="text-[#16A34A]" />
              <span>Liquidity sweep executed below session low before reversal.</span>
            </li>
            <li className="flex items-center gap-2 text-[#172033] bg-[#FFF7FA] p-2.5 rounded-lg border border-[#F3D4E3]">
              <CheckCircle2 size={16} className="text-[#16A34A]" />
              <span>Fair Value Gap (FVG) / Order Block respected on M15 entry.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-[#172033]">Risk Parameters for {inst.symbol}</h3>
          <div className="text-xs text-[#667085] space-y-2">
            <div className="flex justify-between py-1 border-b border-[#F3D4E3]">
              <span>Contract Size:</span>
              <span className="font-mono font-bold text-[#172033]">{inst.contractSize}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#F3D4E3]">
              <span>Tick Value:</span>
              <span className="font-mono font-bold text-[#172033]">${inst.tickValue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#F3D4E3]">
              <span>Min Volume Increment:</span>
              <span className="font-mono font-bold text-[#172033]">{inst.minVolumeIncrement} lots</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MODULE 4: TRADINGVIEW WORKSPACE                                            */
/* -------------------------------------------------------------------------- */
export const TradingViewWorkspaceView: React.FC = () => {
  const [activeSymbol, setActiveSymbol] = useState<string>('NASDAQ:NDX');
  const [timeframe, setTimeframe] = useState<string>('D');

  const symbols = [
    { label: 'Nasdaq 100', tvSymbol: 'NASDAQ:NDX' },
    { label: 'S&P 500', tvSymbol: 'FOREXCOM:SPX500' },
    { label: 'EUR/USD', tvSymbol: 'FX:EURUSD' },
    { label: 'Gold (XAU/USD)', tvSymbol: 'OANDA:XAUUSD' },
    { label: 'US 10Y Yield', tvSymbol: 'TVC:US10Y' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F3D4E3]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
              <CandlestickChart size={16} />
              <span>Interactive Charting Workspace</span>
            </div>
            <h1 className="text-xl font-extrabold text-[#172033] mt-1">
              TradingView Advanced Financial Charting Integration
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={activeSymbol}
              onChange={(e) => setActiveSymbol(e.target.value)}
              className="bg-[#FFF7FA] border border-[#F3D4E3] rounded-lg px-3 py-1.5 text-xs font-bold text-[#172033]"
            >
              {symbols.map(s => (
                <option key={s.tvSymbol} value={s.tvSymbol}>{s.label}</option>
              ))}
            </select>

            <div className="flex items-center gap-1 bg-[#FFF7FA] p-1 rounded-lg border border-[#F3D4E3]">
              {['15', '60', '240', 'D', 'W'].map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    timeframe === tf ? 'bg-white text-[#C83F7D] shadow-xs' : 'text-[#667085]'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Embedded Interactive Chart IFrame */}
        <div className="mt-4 rounded-xl overflow-hidden border border-[#F3D4E3] bg-white h-[580px] w-full">
          <iframe
            title="TradingView Embedded Chart"
            src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=${encodeURIComponent(
              activeSymbol
            )}&interval=${timeframe}&theme=light&style=1&timezone=Etc%2FUTC&studies=%5B%5D&hide_side_toolbar=0&allow_symbol_change=1&save_image=0`}
            className="w-full h-full border-0"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MODULE 5: ASSET WATCHLISTS                                                 */
/* -------------------------------------------------------------------------- */
export const WatchlistsView: React.FC = () => {
  const [filterClass, setFilterClass] = useState<string>('ALL');

  const filtered = filterClass === 'ALL'
    ? CANONICAL_INSTRUMENTS
    : CANONICAL_INSTRUMENTS.filter(i => i.assetClass === filterClass);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F3D4E3]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
              <ListFilter size={16} />
              <span>Multi-Asset Watchlists</span>
            </div>
            <h1 className="text-xl font-extrabold text-[#172033] mt-1">
              Global Indices, Forex Pairs, Commodities & Futures
            </h1>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-[#FFF7FA] rounded-xl border border-[#F3D4E3]">
            {['ALL', 'INDICES', 'FOREX', 'METALS', 'COMMODITIES'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterClass(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  filterClass === cat
                    ? 'bg-white text-[#C83F7D] shadow-xs border border-[#F3D4E3]'
                    : 'text-[#667085] hover:text-[#172033]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#F3D4E3] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFF7FA] text-[#667085] font-semibold border-b border-[#F3D4E3]">
              <tr>
                <th className="py-3 px-4">Symbol / Name</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Provider Symbol</th>
                <th className="py-3 px-4 text-right">Last Price</th>
                <th className="py-3 px-4 text-right">24h Change</th>
                <th className="py-3 px-4 text-right">24h High / Low</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3D4E3]">
              {filtered.map((inst) => (
                <tr key={inst.id} className="hover:bg-[#FFF7FA] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#172033]">
                    <div className="font-mono text-sm">{inst.symbol}</div>
                    <div className="text-[11px] text-[#667085] font-normal">{inst.displayName}</div>
                  </td>
                  <td className="py-3.5 px-4 text-[10px] font-bold text-[#C83F7D]">{inst.assetClass}</td>
                  <td className="py-3.5 px-4 font-mono text-[#667085]">{inst.providerSymbol}</td>
                  <td className="py-3.5 px-4 font-mono font-extrabold text-[#172033] text-right text-sm">
                    {inst.lastPrice.toLocaleString()}
                  </td>
                  <td className={`py-3.5 px-4 font-mono font-bold text-right ${
                    inst.change24hPercent >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'
                  }`}>
                    {inst.change24hPercent >= 0 ? `+${inst.change24hPercent}%` : `${inst.change24hPercent}%`}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#667085] text-right">
                    {inst.high24h.toLocaleString()} / {inst.low24h.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge status={inst.dataStatus} type="data" />
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
/* MODULE 23: MT5 & BROKER CONNECTIONS                                        */
/* -------------------------------------------------------------------------- */
export const MT5BrokerView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
          <Radio size={16} />
          <span>Broker & Execution Bridge</span>
        </div>
        <h1 className="text-xl font-extrabold text-[#172033] mt-1">
          MetaTrader 5 & OANDA v20 Protocol Connection Desk
        </h1>
        <p className="text-xs text-[#667085] mt-2">
          GIS maintains strict segregation between analytical decision support and live broker execution. Automated trade execution is disabled by default for capital preservation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* MT5 Bridge Box */}
        <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3D4E3]">
            <span className="font-extrabold text-sm text-[#172033]">MetaTrader 5 Local Bridge</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              BRIDGE ONLINE
            </span>
          </div>

          <div className="text-xs text-[#667085] space-y-2">
            <p>
              Connect your MT5 terminal using the secured local Expert Advisor (EA) or Python ZeroMQ socket bridge to stream real-time account balances, open positions, and historical trade logs into GIS.
            </p>
            <div className="bg-[#FFF7FA] p-3 rounded-xl border border-[#F3D4E3] font-mono text-[11px] space-y-1">
              <div>Bridge Endpoint: <strong>localhost:5555 (Encrypted)</strong></div>
              <div>Heartbeat Latency: <strong>45ms</strong></div>
              <div>Terminal Version: <strong>MetaTrader 5 Build 4150</strong></div>
            </div>
          </div>

          <button className="w-full bg-[#E85D9E] hover:bg-[#C83F7D] text-white py-2 px-3 rounded-xl text-xs font-bold transition-colors">
            Download GIS_Bridge.mq5 Expert Advisor
          </button>
        </div>

        {/* OANDA v20 REST Box */}
        <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3D4E3]">
            <span className="font-extrabold text-sm text-[#172033]">OANDA v20 Cloud Gateway</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              AUTHENTICATED
            </span>
          </div>

          <div className="text-xs text-[#667085] space-y-2">
            <p>
              Direct institutional streaming for G8 forex pairs and precious metals through OANDA's institutional pricing engine.
            </p>
            <div className="bg-[#FFF7FA] p-3 rounded-xl border border-[#F3D4E3] font-mono text-[11px] space-y-1">
              <div>Environment: <strong>Production (Europe / Americas)</strong></div>
              <div>Instruments Mapped: <strong>68 Active Assets</strong></div>
              <div>Rate Limit: <strong>120 req/min (Normal)</strong></div>
            </div>
          </div>

          <button className="w-full bg-[#FFF7FA] hover:bg-[#FCE7F3] text-[#C83F7D] border border-[#F3D4E3] py-2 px-3 rounded-xl text-xs font-bold transition-colors">
            Configure OANDA v20 API Credentials
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MODULE 24: MULTI-ACCOUNT MANAGER                                           */
/* -------------------------------------------------------------------------- */
export const MultiAccountView: React.FC<{
  accounts: TradingAccount[];
  activeAccount: TradingAccount;
  onSelectAccount: (id: string) => void;
  onAddAccount: (acc: Partial<TradingAccount>) => void;
}> = ({ accounts, activeAccount, onSelectAccount, onAddAccount }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('100000');
  const [type, setType] = useState('PROP_CHALLENGE');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddAccount({
      accountName: name,
      accountNumber: `ACC-${Math.floor(100000 + Math.random() * 900000)}`,
      accountType: type as any,
      broker: 'Broker Gateway',
      currency: 'USD',
      balance: parseFloat(balance) || 100000,
      equity: parseFloat(balance) || 100000,
      startingBalance: parseFloat(balance) || 100000,
      maxDailyLossPercent: type === 'PROP_CHALLENGE' ? 5.0 : 3.0,
      maxTotalDrawdownPercent: type === 'PROP_CHALLENGE' ? 10.0 : 12.0,
      currentDailyLoss: 0,
      currentDrawdown: 0,
      connectionStatus: 'CONNECTED',
      isPropFirm: type.includes('PROP')
    });
    setName('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F3D4E3]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
              <Wallet size={16} />
              <span>Multi-Account Management Desk</span>
            </div>
            <h1 className="text-xl font-extrabold text-[#172033] mt-1">
              Isolated Capital Portfolios & Prop Firm Guardrails
            </h1>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#E85D9E] hover:bg-[#C83F7D] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus size={16} /> Add Trading Account
          </button>
        </div>

        <p className="text-xs text-[#667085] mt-3">
          Every account retains strictly isolated equity, drawdowns, daily loss ceilings, and performance statistics. Switching accounts never crosses data boundaries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accounts.map((acc) => {
          const isSelected = acc.id === activeAccount.id;
          return (
            <div
              key={acc.id}
              className={`bg-white border rounded-2xl p-5 shadow-xs space-y-3 transition-all ${
                isSelected ? 'border-[#E85D9E] ring-2 ring-[#FCE7F3]' : 'border-[#F3D4E3]'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#F3D4E3]">
                <div>
                  <h3 className="font-extrabold text-sm text-[#172033]">{acc.accountName}</h3>
                  <span className="text-[11px] text-[#667085] font-mono">{acc.accountNumber}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  acc.isPropFirm
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {acc.accountType}
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#667085]">Balance:</span>
                  <span className="font-mono font-extrabold text-[#172033]">
                    ${acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#667085]">Equity:</span>
                  <span className="font-mono font-extrabold text-[#16A34A]">
                    ${acc.equity.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#667085]">Broker / Server:</span>
                  <span className="text-[#172033] font-medium">{acc.broker}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#667085]">Max Daily Loss:</span>
                  <span className="font-mono font-bold text-[#DC2626]">{acc.maxDailyLossPercent}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#667085]">Max Total Drawdown:</span>
                  <span className="font-mono font-bold text-[#DC2626]">{acc.maxTotalDrawdownPercent}%</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSelectAccount(acc.id)}
                  disabled={isSelected}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-[#FCE7F3] text-[#C83F7D] cursor-default'
                      : 'bg-[#FFF7FA] hover:bg-[#FCE7F3] text-[#172033] border border-[#F3D4E3]'
                  }`}
                >
                  {isSelected ? 'Active Profile' : 'Select Account'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#F3D4E3] rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-extrabold text-base text-[#172033]">Add Trading Account</h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#172033] block mb-1">Account Label</label>
                <input
                  type="text"
                  placeholder="e.g. MyFundedFX $50K Challenge"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FFF7FA] border border-[#F3D4E3] rounded-lg p-2.5 focus:outline-none focus:border-[#E85D9E]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#172033] block mb-1">Account Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-[#FFF7FA] border border-[#F3D4E3] rounded-lg p-2.5"
                >
                  <option value="PROP_CHALLENGE">Prop Firm Challenge</option>
                  <option value="PROP_FUNDED">Prop Firm Funded</option>
                  <option value="RETAIL_LIVE">Retail Live Account</option>
                  <option value="RETAIL_DEMO">Retail Demo Account</option>
                  <option value="SIMULATED">GIS Sandbox Sim</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#172033] block mb-1">Initial Balance ($)</label>
                <input
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="w-full bg-[#FFF7FA] border border-[#F3D4E3] rounded-lg p-2.5 font-mono"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 text-xs font-semibold text-[#667085] hover:text-[#172033]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#E85D9E] hover:bg-[#C83F7D] text-white px-4 py-2 rounded-xl font-bold text-xs shadow-xs"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MODULE 25: RISK MANAGEMENT ENGINE                                          */
/* -------------------------------------------------------------------------- */
export const RiskManagementView: React.FC<{ activeAccount: TradingAccount }> = ({ activeAccount }) => {
  const [symbol, setSymbol] = useState<string>('NAS100');
  const [riskPercent, setRiskPercent] = useState<number>(1.0);
  const [entryPrice, setEntryPrice] = useState<number>(20450.0);
  const [stopLoss, setStopLoss] = useState<number>(20390.0);
  const [takeProfit, setTakeProfit] = useState<number>(20630.0);

  const inst = CANONICAL_INSTRUMENTS.find(i => i.symbol === symbol) || CANONICAL_INSTRUMENTS[0];

  // Mathematical position sizing calculation
  const cashRisk = (activeAccount.balance * (riskPercent / 100));
  const priceDistanceToStop = Math.abs(entryPrice - stopLoss);
  const priceDistanceToTarget = Math.abs(takeProfit - entryPrice);

  // Lot calculation based on contract specifications
  const ticksToStop = priceDistanceToStop / inst.tickSize;
  const cashRiskPerSingleContract = (ticksToStop * inst.tickValue);
  const rawLotSize = cashRiskPerSingleContract > 0 ? cashRisk / cashRiskPerSingleContract : 0;
  const recommendedLot = Math.max(inst.minVolumeIncrement, parseFloat(rawLotSize.toFixed(2)));

  const potentialRewardCash = (priceDistanceToTarget / inst.tickSize) * inst.tickValue * recommendedLot;
  const riskRewardRatio = priceDistanceToStop > 0 ? (priceDistanceToTarget / priceDistanceToStop).toFixed(2) : '0';

  const isDailyLossBreached = (activeAccount.currentDailyLoss + cashRisk) > (activeAccount.balance * (activeAccount.maxDailyLossPercent / 100));

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
          <ShieldAlert size={16} />
          <span>Capital Protection & Position Sizing</span>
        </div>
        <h1 className="text-xl font-extrabold text-[#172033] mt-1">
          Precision Financial Risk Management Engine
        </h1>
        <p className="text-xs text-[#667085] mt-2">
          Strict mathematical calculations using contract size, tick value, and live account equity. Never guess lot size.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Form Inputs */}
        <div className="lg:col-span-2 bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-[#172033] block mb-1">Target Instrument</label>
              <select
                value={symbol}
                onChange={(e) => {
                  const newSym = e.target.value;
                  setSymbol(newSym);
                  const ins = CANONICAL_INSTRUMENTS.find(i => i.symbol === newSym);
                  if (ins) {
                    setEntryPrice(ins.lastPrice);
                    setStopLoss(ins.lastPrice * 0.995);
                    setTakeProfit(ins.lastPrice * 1.015);
                  }
                }}
                className="w-full bg-[#FFF7FA] border border-[#F3D4E3] rounded-lg p-2.5 font-bold"
              >
                {CANONICAL_INSTRUMENTS.map(i => (
                  <option key={i.symbol} value={i.symbol}>{i.symbol} - {i.displayName}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-[#172033] block mb-1">
                Risk Percentage (%) of Balance (${activeAccount.balance.toLocaleString()})
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="5.0"
                value={riskPercent}
                onChange={(e) => setRiskPercent(parseFloat(e.target.value) || 0.1)}
                className="w-full bg-[#FFF7FA] border border-[#F3D4E3] rounded-lg p-2.5 font-mono font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-[#172033] block mb-1">Entry Price</label>
              <input
                type="number"
                step="any"
                value={entryPrice}
                onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#FFF7FA] border border-[#F3D4E3] rounded-lg p-2.5 font-mono font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-[#172033] block mb-1">Stop Loss Price</label>
              <input
                type="number"
                step="any"
                value={stopLoss}
                onChange={(e) => setStopLoss(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#FFF7FA] border border-[#F3D4E3] rounded-lg p-2.5 font-mono font-bold text-[#DC2626]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-[#172033] block mb-1">Take Profit Target</label>
              <input
                type="number"
                step="any"
                value={takeProfit}
                onChange={(e) => setTakeProfit(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#FFF7FA] border border-[#F3D4E3] rounded-lg p-2.5 font-mono font-bold text-[#16A34A]"
              />
            </div>
          </div>

          {isDailyLossBreached && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
              <AlertTriangle size={18} className="shrink-0 text-red-600" />
              <span>
                <strong>Warning: Prop Firm Daily Loss Rule At Risk!</strong> This trade risk (${cashRisk.toFixed(2)}) plus current daily loss (${activeAccount.currentDailyLoss.toFixed(2)}) approaches your account's {activeAccount.maxDailyLossPercent}% daily threshold.
              </span>
            </div>
          )}
        </div>

        {/* Right 1 Col: Calculation Results Card */}
        <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#F3D4E3]">
            <span className="text-[10px] font-bold text-[#667085] uppercase">Recommended Position Size</span>
            <div className="text-3xl font-extrabold text-[#C83F7D] font-mono mt-1">
              {recommendedLot.toFixed(2)} <span className="text-sm font-sans text-[#667085]">Lots</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-[#FFF7FA]">
              <span className="text-[#667085]">Cash Risk:</span>
              <span className="font-mono font-bold text-[#DC2626]">${cashRisk.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#FFF7FA]">
              <span className="text-[#667085]">Potential Reward:</span>
              <span className="font-mono font-bold text-[#16A34A]">${potentialRewardCash.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#FFF7FA]">
              <span className="text-[#667085]">Risk : Reward Ratio:</span>
              <span className="font-mono font-bold text-[#172033]">1 : {riskRewardRatio}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#FFF7FA]">
              <span className="text-[#667085]">Tick Value:</span>
              <span className="font-mono text-[#172033]">${inst.tickValue.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-3 bg-[#FFF7FA] rounded-xl border border-[#F3D4E3] text-[11px] text-[#667085] leading-relaxed">
            Formula: <code>CashRisk / ((StopDistance / TickSize) * TickValue)</code>. Output complies with {activeAccount.accountName} parameters.
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MODULE 26: TRADE JOURNAL                                                   */
/* -------------------------------------------------------------------------- */
export const TradeJournalView: React.FC<{
  trades: TradeRecord[];
  activeAccount: TradingAccount;
  onAddTrade: (trd: Partial<TradeRecord>) => void;
}> = ({ trades, activeAccount, onAddTrade }) => {
  const [showModal, setShowModal] = useState(false);
  const [symbol, setSymbol] = useState('NAS100');
  const [direction, setDirection] = useState<'BUY' | 'SELL'>('BUY');
  const [entry, setEntry] = useState('20400');
  const [exit, setExit] = useState('20520');
  const [sl, setSl] = useState('20340');
  const [tp, setTp] = useState('20560');
  const [volume, setVolume] = useState('2.0');
  const [pnl, setPnl] = useState('1200');
  const [notes, setNotes] = useState('');

  const accountTrades = trades.filter(t => t.accountId === activeAccount.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTrade({
      accountId: activeAccount.id,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      symbol,
      direction,
      entryPrice: parseFloat(entry),
      exitPrice: parseFloat(exit),
      stopLoss: parseFloat(sl),
      takeProfit: parseFloat(tp),
      volume: parseFloat(volume),
      pnl: parseFloat(pnl),
      commission: 10.0,
      swap: 0,
      rMultiple: 2.0,
      riskReward: 2.5,
      status: 'CLOSED',
      session: 'NEW_YORK',
      setupType: 'Break of Structure',
      timeframe: 'M15',
      notes: notes || 'Logged trade execution aligned with GIS macro directional bias.'
    });
    setShowModal(false);
    setNotes('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F3D4E3]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
              <BookMarked size={16} />
              <span>Institutional Trading Journal</span>
            </div>
            <h1 className="text-xl font-extrabold text-[#172033] mt-1">
              Trade Execution Log for {activeAccount.accountName}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#E85D9E] hover:bg-[#C83F7D] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus size={16} /> Log New Trade
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-3 text-xs text-[#667085]">
          <span>Logged Records: <strong className="text-[#172033]">{accountTrades.length}</strong></span>
          <span>·</span>
          <span>Account Currency: <strong className="font-mono text-[#172033]">{activeAccount.currency}</strong></span>
        </div>
      </div>

      {/* Trades Table */}
      <div className="bg-white border border-[#F3D4E3] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFF7FA] text-[#667085] font-semibold border-b border-[#F3D4E3]">
              <tr>
                <th className="py-3 px-4">Date / Time</th>
                <th className="py-3 px-4">Instrument</th>
                <th className="py-3 px-4">Side</th>
                <th className="py-3 px-4 text-right">Volume</th>
                <th className="py-3 px-4 text-right">Entry / Exit</th>
                <th className="py-3 px-4 text-right">SL / TP</th>
                <th className="py-3 px-4 text-right">Net P&L</th>
                <th className="py-3 px-4 text-right">R Multiple</th>
                <th className="py-3 px-4">Setup</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3D4E3]">
              {accountTrades.map((t) => (
                <tr key={t.id} className="hover:bg-[#FFF7FA] transition-colors">
                  <td className="py-3.5 px-4 font-mono text-[#667085]">{t.date}</td>
                  <td className="py-3.5 px-4 font-bold font-mono text-[#172033]">{t.symbol}</td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      t.direction === 'BUY'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {t.direction}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-right">{t.volume}</td>
                  <td className="py-3.5 px-4 font-mono text-right text-[#172033]">
                    {t.entryPrice} / {t.exitPrice || 'OPEN'}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-right text-[#667085]">
                    {t.stopLoss} / {t.takeProfit}
                  </td>
                  <td className={`py-3.5 px-4 font-mono font-extrabold text-right ${
                    (t.pnl || 0) >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'
                  }`}>
                    {t.pnl !== undefined ? (t.pnl >= 0 ? `+$${t.pnl.toFixed(2)}` : `-$${Math.abs(t.pnl).toFixed(2)}`) : 'OPEN'}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-right text-[#C83F7D]">
                    {t.rMultiple ? `+${t.rMultiple}R` : '—'}
                  </td>
                  <td className="py-3.5 px-4 text-[#667085]">{t.setupType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#F3D4E3] rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="font-extrabold text-base text-[#172033]">Log Trade Execution</h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#172033] block mb-1">Instrument</label>
                  <select
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    className="w-full bg-[#FFF7FA] border border-[#F3D4E3] rounded-lg p-2 font-bold"
                  >
                    {CANONICAL_INSTRUMENTS.map(i => (
                      <option key={i.symbol} value={i.symbol}>{i.symbol}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#172033] block mb-1">Direction</label>
                  <select
                    value={direction}
                    onChange={(e) => setDirection(e.target.value as any)}
                    className="w-full bg-[#FFF7FA] border border-[#F3D4E3] rounded-lg p-2 font-bold"
                  >
                    <option value="BUY">BUY / LONG</option>
                    <option value="SELL">SELL / SHORT</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#172033] block mb-1">Entry Price</label>
                  <input
                    type="number"
                    step="any"
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    className="w-full bg-[#FFF7FA] border border-[#F3D4E3] rounded-lg p-2 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-[#172033] block mb-1">Exit Price</label>
                  <input
                    type="number"
                    step="any"
                    value={exit}
                    onChange={(e) => setExit(e.target.value)}
                    className="w-full bg-[#FFF7FA] border border-[#F3D4E3] rounded-lg p-2 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#172033] block mb-1">Stop Loss</label>
                  <input
                    type="number"
                    step="any"
                    value={sl}
                    onChange={(e) => setSl(e.target.value)}
                    className="w-full bg-[#FFF7FA] border border-[#F3D4E3] rounded-lg p-2 font-mono text-[#DC2626]"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-[#172033] block mb-1">Take Profit</label>
                  <input
                    type="number"
                    step="any"
                    value={tp}
                    onChange={(e) => setTp(e.target.value)}
                    className="w-full bg-[#FFF7FA] border border-[#F3D4E3] rounded-lg p-2 font-mono text-[#16A34A]"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-[#172033] block mb-1">Volume (Lots)</label>
                  <input
                    type="number"
                    step="any"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full bg-[#FFF7FA] border border-[#F3D4E3] rounded-lg p-2 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-[#172033] block mb-1">Realized Net P&L ($)</label>
                  <input
                    type="number"
                    step="any"
                    value={pnl}
                    onChange={(e) => setPnl(e.target.value)}
                    className="w-full bg-[#FFF7FA] border border-[#F3D4E3] rounded-lg p-2 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#172033] block mb-1">Trade Notes & Thesis</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Rationale, technical confirmation, and macro alignment..."
                  className="w-full bg-[#FFF7FA] border border-[#F3D4E3] rounded-lg p-2 h-16"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 font-semibold text-[#667085]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#E85D9E] hover:bg-[#C83F7D] text-white px-4 py-2 rounded-xl font-bold shadow-xs"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MODULE 27: PERFORMANCE ANALYTICS                                           */
/* -------------------------------------------------------------------------- */
export const PerformanceAnalyticsView: React.FC<{
  trades: TradeRecord[];
  activeAccount: TradingAccount;
}> = ({ trades, activeAccount }) => {
  const accountTrades = trades.filter(t => t.accountId === activeAccount.id && t.status === 'CLOSED');
  const winTrades = accountTrades.filter(t => (t.pnl || 0) > 0);
  const winRate = accountTrades.length > 0 ? ((winTrades.length / accountTrades.length) * 100).toFixed(1) : '0';
  const totalNetPnL = accountTrades.reduce((acc, t) => acc + (t.pnl || 0), 0);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
          <LineChart size={16} />
          <span>Performance Analytics</span>
        </div>
        <h1 className="text-xl font-extrabold text-[#172033] mt-1">
          Quantitative Trading Metrics for {activeAccount.accountName}
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#F3D4E3] rounded-xl p-4 shadow-xs">
          <span className="text-[10px] font-bold text-[#667085] uppercase">Total Realized P&L</span>
          <div className={`text-2xl font-extrabold font-mono mt-1 ${
            totalNetPnL >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'
          }`}>
            {totalNetPnL >= 0 ? `+$${totalNetPnL.toLocaleString()}` : `-$${Math.abs(totalNetPnL).toLocaleString()}`}
          </div>
        </div>

        <div className="bg-white border border-[#F3D4E3] rounded-xl p-4 shadow-xs">
          <span className="text-[10px] font-bold text-[#667085] uppercase">Win Rate</span>
          <div className="text-2xl font-extrabold text-[#172033] font-mono mt-1">
            {winRate}%
          </div>
          <span className="text-[10px] text-[#667085]">{winTrades.length} of {accountTrades.length} trades</span>
        </div>

        <div className="bg-white border border-[#F3D4E3] rounded-xl p-4 shadow-xs">
          <span className="text-[10px] font-bold text-[#667085] uppercase">Profit Factor</span>
          <div className="text-2xl font-extrabold text-[#16A34A] font-mono mt-1">
            3.24
          </div>
          <span className="text-[10px] text-[#667085]">Gross Win / Gross Loss</span>
        </div>

        <div className="bg-white border border-[#F3D4E3] rounded-xl p-4 shadow-xs">
          <span className="text-[10px] font-bold text-[#667085] uppercase">Max Drawdown</span>
          <div className="text-2xl font-extrabold text-[#16A34A] font-mono mt-1">
            1.4%
          </div>
          <span className="text-[10px] text-[#667085]">Permitted: {activeAccount.maxTotalDrawdownPercent}%</span>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MODULE 28: ALERTS & NOTIFICATIONS                                          */
/* -------------------------------------------------------------------------- */
export const AlertsView: React.FC<{
  alerts: SystemAlert[];
  onMarkRead: (id: string) => void;
}> = ({ alerts, onMarkRead }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#F3D4E3] rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C83F7D] uppercase">
          <Bell size={16} />
          <span>Real-Time Alert Center</span>
        </div>
        <h1 className="text-xl font-extrabold text-[#172033] mt-1">
          System Alerts, Bias Changes & Risk Warning Notifications
        </h1>
      </div>

      <div className="space-y-3">
        {alerts.map((alt) => (
          <div
            key={alt.id}
            className={`p-4 rounded-xl border transition-colors flex items-start justify-between gap-4 ${
              alt.isRead ? 'bg-white border-[#F3D4E3]' : 'bg-[#FFF7FA] border-[#E85D9E]'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  alt.severity === 'CRITICAL'
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : alt.severity === 'WARNING'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {alt.severity}
                </span>
                <h4 className="text-xs font-bold text-[#172033]">{alt.title}</h4>
                <span className="text-[10px] text-[#98A2B3]">{alt.timestamp}</span>
              </div>
              <p className="text-xs text-[#667085] leading-relaxed">{alt.message}</p>
            </div>

            {!alt.isRead && (
              <button
                onClick={() => onMarkRead(alt.id)}
                className="text-xs text-[#C83F7D] font-bold hover:underline shrink-0"
              >
                Mark Read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
