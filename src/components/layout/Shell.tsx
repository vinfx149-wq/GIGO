import React, { useState, useEffect } from 'react';
import { GigoLogo } from '../common/Logo';
import { TradingAccount, SystemAlert } from '../../types';
import {
  LayoutDashboard,
  Compass,
  LineChart,
  CandlestickChart,
  ListFilter,
  Percent,
  TrendingUp,
  Calendar,
  Database,
  Building2,
  GitCompare,
  Gauge,
  Activity,
  Layers,
  BarChart3,
  Flame,
  CalendarClock,
  Sparkles,
  BookOpen,
  Globe2,
  Clock,
  Radio,
  Wallet,
  ShieldAlert,
  BookMarked,
  PieChart,
  Bell,
  Cpu,
  Server,
  Sliders,
  HeartPulse,
  Menu,
  X,
  Search,
  RefreshCw,
  ChevronDown,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export interface NavItem {
  id: string;
  name: string;
  group: 'Market Intelligence' | 'Macroeconomics' | 'Futures & Research' | 'Trading & Accounts' | 'System';
  icon: React.ElementType;
  badge?: string;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  // Market Intelligence
  { id: 'overview', name: 'Overview', group: 'Market Intelligence', icon: LayoutDashboard },
  { id: 'command-desk', name: 'Global Command Desk', group: 'Market Intelligence', icon: Compass, badge: 'CORE' },
  { id: 'market-analysis', name: 'Market Analysis', group: 'Market Intelligence', icon: LineChart },
  { id: 'tradingview', name: 'TradingView Workspace', group: 'Market Intelligence', icon: CandlestickChart },
  { id: 'watchlists', name: 'Asset Watchlists', group: 'Market Intelligence', icon: ListFilter },

  // Macroeconomics
  { id: 'interest-rates', name: 'Global Interest Rates', group: 'Macroeconomics', icon: Percent },
  { id: 'bond-desk', name: 'Bond & Real-Yield Desk', group: 'Macroeconomics', icon: TrendingUp },
  { id: 'calendar', name: 'Economic Calendar', group: 'Macroeconomics', icon: Calendar },
  { id: 'data-center', name: 'Economic Data Center', group: 'Macroeconomics', icon: Database },
  { id: 'central-bank', name: 'Central Bank Library', group: 'Macroeconomics', icon: Building2 },
  { id: 'intermarket', name: 'Intermarket Intelligence', group: 'Macroeconomics', icon: GitCompare },
  { id: 'currency-scoring', name: 'Currency Scoring', group: 'Macroeconomics', icon: Gauge },
  { id: 'currency-strength', name: 'Currency Strength', group: 'Macroeconomics', icon: Activity },
  { id: 'risk-regime', name: 'Risk Regime & Sentiment', group: 'Macroeconomics', icon: Layers },

  // Futures and Research
  { id: 'cme-futures', name: 'CME & Futures', group: 'Futures & Research', icon: BarChart3 },
  { id: 'cot-positioning', name: 'COT & Positioning', group: 'Futures & Research', icon: PieChart },
  { id: 'commodities', name: 'Commodities & Metals', group: 'Futures & Research', icon: Flame },
  { id: 'seasonality', name: 'Seasonality Desk', group: 'Futures & Research', icon: CalendarClock },
  { id: 'event-desk', name: 'Event Desk', group: 'Futures & Research', icon: Sparkles },
  { id: 'index-playbooks', name: 'Index Playbooks', group: 'Futures & Research', icon: BookOpen },
  { id: 'forex-intelligence', name: 'Forex Intelligence', group: 'Futures & Research', icon: Globe2 },
  { id: 'market-sessions', name: 'Market Sessions', group: 'Futures & Research', icon: Clock },

  // Trading and Accounts
  { id: 'mt5-broker', name: 'MT5 & Broker Connections', group: 'Trading & Accounts', icon: Radio },
  { id: 'multi-account', name: 'Multi-Account Manager', group: 'Trading & Accounts', icon: Wallet },
  { id: 'risk-management', name: 'Risk Management', group: 'Trading & Accounts', icon: ShieldAlert },
  { id: 'trade-journal', name: 'Trade Journal', group: 'Trading & Accounts', icon: BookMarked },
  { id: 'performance', name: 'Performance Analytics', group: 'Trading & Accounts', icon: LineChart },
  { id: 'alerts', name: 'Alerts & Notifications', group: 'Trading & Accounts', icon: Bell },

  // System
  { id: 'backtesting', name: 'Backtesting & Analysis', group: 'System', icon: Cpu },
  { id: 'data-sources', name: 'Data Sources & Health', group: 'System', icon: Server },
  { id: 'settings', name: 'Settings & Integrations', group: 'System', icon: Sliders },
  { id: 'system-health', name: 'System Health & Quality', group: 'System', icon: HeartPulse }
];

interface ShellProps {
  currentModule: string;
  onSelectModule: (moduleId: string) => void;
  accounts: TradingAccount[];
  activeAccount: TradingAccount;
  onSelectAccount: (accountId: string) => void;
  alerts: SystemAlert[];
  children: React.ReactNode;
}

export const Shell: React.FC<ShellProps> = ({
  currentModule,
  onSelectModule,
  accounts,
  activeAccount,
  onSelectAccount,
  alerts,
  children
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().slice(17, 22) + ' UTC');
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const currentNav = NAVIGATION_ITEMS.find((item) => item.id === currentModule) || NAVIGATION_ITEMS[0];

  const filteredNavItems = searchQuery.trim()
    ? NAVIGATION_ITEMS.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.group.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const unreadAlerts = alerts.filter(a => !a.isRead).length;

  return (
    <div className="min-h-screen bg-[#FFF7FA] text-[#172033] flex flex-col antialiased">
      {/* Top Header - Strictly Zone 1, Zone 2, Zone 3 Contract */}
      <header className="sticky top-0 z-40 h-16 bg-white border-b border-[#F3D4E3] px-4 lg:px-6 flex items-center justify-between gap-4 select-none">
        {/* Zone 1: Brand & Mobile Menu */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#667085] hover:text-[#C83F7D] hover:bg-[#FCE7F3] rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <GigoLogo size="md" />
        </div>

        {/* Zone 2: Navigation Breadcrumb & Live Session Bar */}
        <div className="hidden md:flex items-center gap-3 text-xs text-[#667085] whitespace-nowrap">
          <span className="font-medium text-[#172033]">{currentNav.group}</span>
          <span className="text-[#F3D4E3]">/</span>
          <span className="font-semibold text-[#C83F7D]">{currentNav.name}</span>
          <span className="text-[#F3D4E3]">·</span>
          <span className="font-mono tabular-nums text-[#172033] bg-[#FFF7FA] px-2 py-0.5 rounded border border-[#F3D4E3]">
            {currentTime}
          </span>
          <span className="text-[#F3D4E3]">·</span>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-[#16A34A] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
            NY Session Open
          </span>
        </div>

        {/* Zone 3: Search, Account Switcher, Notification, Refresh Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Quick Search */}
          <div className="relative hidden sm:block w-48 lg:w-64">
            <div className="flex items-center bg-[#FFF7FA] border border-[#F3D4E3] rounded-lg px-2.5 py-1.5 focus-within:border-[#E85D9E] transition-all">
              <Search size={14} className="text-[#98A2B3] mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search module... (Ctrl+K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                className="w-full bg-transparent text-xs text-[#172033] placeholder-[#98A2B3] focus:outline-none"
              />
            </div>

            {/* Instant Search Dropdown */}
            {searchFocused && filteredNavItems.length > 0 && (
              <div className="absolute right-0 top-full mt-1.5 w-72 bg-white border border-[#F3D4E3] rounded-xl shadow-lg p-1.5 z-50">
                <div className="text-[10px] font-semibold text-[#98A2B3] uppercase px-2 py-1">
                  Matching Modules ({filteredNavItems.length})
                </div>
                {filteredNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectModule(item.id);
                      setSearchQuery('');
                    }}
                    className="w-full text-left flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs hover:bg-[#FCE7F3] transition-colors"
                  >
                    <span className="font-medium text-[#172033]">{item.name}</span>
                    <span className="text-[10px] text-[#C83F7D] font-mono">{item.group}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Account Selector Pill */}
          <div className="relative">
            <button
              onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
              className="flex items-center gap-2 bg-[#FFF7FA] hover:bg-[#FCE7F3] border border-[#F3D4E3] px-3 py-1.5 rounded-lg text-xs transition-colors"
            >
              <Wallet size={14} className="text-[#C83F7D]" />
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="font-bold text-[#172033] truncate max-w-[120px]">
                  {activeAccount.accountName}
                </span>
                <span className="font-mono tabular-nums text-[10px] text-[#16A34A] font-semibold">
                  ${activeAccount.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <ChevronDown size={14} className="text-[#98A2B3]" />
            </button>

            {/* Account Switcher Dropdown */}
            {accountDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-80 bg-white border border-[#F3D4E3] rounded-xl shadow-xl p-2 z-50">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F3D4E3] px-2">
                  <span className="text-[11px] font-bold text-[#172033] uppercase tracking-wider">
                    Switch Active Account
                  </span>
                  <span className="text-[10px] text-[#667085] bg-[#FFF7FA] px-1.5 py-0.5 rounded border border-[#F3D4E3]">
                    {accounts.length} Profiles
                  </span>
                </div>
                <div className="space-y-1">
                  {accounts.map((acc) => {
                    const isSelected = acc.id === activeAccount.id;
                    return (
                      <button
                        key={acc.id}
                        onClick={() => {
                          onSelectAccount(acc.id);
                          setAccountDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-[#FCE7F3] border-[#E85D9E] shadow-xs'
                            : 'bg-white hover:bg-[#FFF7FA] border-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-[#172033]">{acc.accountName}</span>
                          {isSelected && <CheckCircle2 size={14} className="text-[#C83F7D]" />}
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-[#667085]">
                          <span>{acc.broker}</span>
                          <span className="font-mono font-semibold text-[#172033]">
                            ${acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        {acc.isPropFirm && (
                          <div className="mt-1 flex items-center justify-between text-[10px] text-[#D97706] bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                            <span>Max Daily: {acc.maxDailyLossPercent}%</span>
                            <span>Max Total DD: {acc.maxTotalDrawdownPercent}%</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Quick Refresh Button */}
          <button
            onClick={handleRefresh}
            title="Refresh Market Intelligence"
            className={`p-2 text-[#667085] hover:text-[#C83F7D] hover:bg-[#FCE7F3] rounded-lg transition-colors border border-transparent hover:border-[#F3D4E3] ${
              isRefreshing ? 'animate-spin text-[#C83F7D]' : ''
            }`}
          >
            <RefreshCw size={16} />
          </button>

          {/* Alert Bell */}
          <button
            onClick={() => onSelectModule('alerts')}
            className="relative p-2 text-[#667085] hover:text-[#C83F7D] hover:bg-[#FCE7F3] rounded-lg transition-colors border border-transparent hover:border-[#F3D4E3]"
            title="System Alerts & Notifications"
          >
            <Bell size={16} />
            {unreadAlerts > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E85D9E] ring-2 ring-white"></span>
            )}
          </button>
        </div>
      </header>

      {/* Main Workspace with Sidebar & Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Navigation (Desktop) */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#F3D4E3] shrink-0 select-none overflow-y-auto">
          <div className="p-3 space-y-6">
            {(
              [
                'Market Intelligence',
                'Macroeconomics',
                'Futures & Research',
                'Trading & Accounts',
                'System'
              ] as const
            ).map((groupName) => {
              const groupItems = NAVIGATION_ITEMS.filter((item) => item.group === groupName);
              return (
                <div key={groupName}>
                  <div className="px-3 mb-1.5 text-[11px] font-bold text-[#98A2B3] uppercase tracking-wider">
                    {groupName}
                  </div>
                  <nav className="space-y-0.5">
                    {groupItems.map((item) => {
                      const isActive = item.id === currentModule;
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => onSelectModule(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                            isActive
                              ? 'bg-[#FCE7F3] text-[#C83F7D] font-bold shadow-xs'
                              : 'text-[#667085] hover:bg-[#FFF7FA] hover:text-[#172033]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <IconComponent
                              size={16}
                              className={`shrink-0 ${isActive ? 'text-[#C83F7D]' : 'text-[#98A2B3]'}`}
                            />
                            <span className="truncate">{item.name}</span>
                          </div>
                          {item.badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#E85D9E] text-white">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              );
            })}
          </div>

          {/* Sidebar Footer with System Status */}
          <div className="mt-auto p-3 border-t border-[#F3D4E3] bg-[#FFF7FA]">
            <div className="flex items-center justify-between text-[11px] text-[#667085]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                <span className="font-semibold text-[#172033]">7 Providers Synced</span>
              </div>
              <span className="font-mono text-[10px] text-[#98A2B3]">v2.6 Enterprise</span>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            ></div>
            <div className="relative w-72 max-w-[80vw] bg-white h-full flex flex-col p-4 shadow-2xl z-10 overflow-y-auto">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F3D4E3]">
                <GigoLogo size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#667085] hover:text-[#C83F7D] rounded-lg"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                {(
                  [
                    'Market Intelligence',
                    'Macroeconomics',
                    'Futures & Research',
                    'Trading & Accounts',
                    'System'
                  ] as const
                ).map((groupName) => {
                  const groupItems = NAVIGATION_ITEMS.filter((item) => item.group === groupName);
                  return (
                    <div key={groupName}>
                      <div className="text-[10px] font-bold text-[#98A2B3] uppercase tracking-wider mb-1">
                        {groupName}
                      </div>
                      <div className="space-y-0.5">
                        {groupItems.map((item) => {
                          const isActive = item.id === currentModule;
                          const IconComponent = item.icon;
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                onSelectModule(item.id);
                                setMobileMenuOpen(false);
                              }}
                              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium ${
                                isActive
                                  ? 'bg-[#FCE7F3] text-[#C83F7D] font-bold'
                                  : 'text-[#667085] hover:bg-[#FFF7FA]'
                              }`}
                            >
                              <IconComponent size={16} />
                              <span>{item.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Primary Viewport Canvas */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-[#FFF7FA]">
          <div className="max-w-[1600px] mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
