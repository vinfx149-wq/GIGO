import React, { useState } from 'react';
import { Shell } from './components/layout/Shell';
import { OverviewView } from './components/views/OverviewView';
import { CommandDeskView } from './components/views/CommandDeskView';
import {
  InterestRatesView,
  BondRealYieldView,
  EconomicCalendarView,
  EconomicDataCenterView,
  CentralBankLibraryView,
  IntermarketView,
  CurrencyScoringView,
  CurrencyStrengthView,
  RiskRegimeView
} from './components/views/MacroViews';
import {
  CMEFuturesView,
  COTPositioningView,
  CommoditiesView,
  SeasonalityView,
  EventDeskView,
  IndexPlaybooksView,
  ForexIntelligenceView,
  MarketSessionsView
} from './components/views/FuturesAndResearchViews';
import {
  MarketAnalysisView,
  TradingViewWorkspaceView,
  WatchlistsView,
  MT5BrokerView,
  MultiAccountView,
  RiskManagementView,
  TradeJournalView,
  PerformanceAnalyticsView,
  AlertsView
} from './components/views/TradingAndAccountsViews';
import {
  BacktestingView,
  DataSourcesView,
  SettingsView,
  SystemHealthView
} from './components/views/SystemViews';
import {
  INITIAL_ACCOUNTS,
  INITIAL_TRADES,
  INITIAL_ALERTS
} from './data/canonicalData';
import { TradingAccount, TradeRecord, SystemAlert } from './types';

export default function App() {
  const [currentModule, setCurrentModule] = useState<string>('overview');
  const [accounts, setAccounts] = useState<TradingAccount[]>(INITIAL_ACCOUNTS);
  const [activeAccountId, setActiveAccountId] = useState<string>(INITIAL_ACCOUNTS[0].id);
  const [trades, setTrades] = useState<TradeRecord[]>(INITIAL_TRADES);
  const [alerts, setAlerts] = useState<SystemAlert[]>(INITIAL_ALERTS);

  const activeAccount = accounts.find((a) => a.id === activeAccountId) || accounts[0];

  const handleAddAccount = (newAcc: Partial<TradingAccount>) => {
    const acc: TradingAccount = {
      id: `acc-${Date.now()}`,
      accountName: newAcc.accountName || 'New Account',
      accountNumber: newAcc.accountNumber || `ACC-${Date.now()}`,
      accountType: newAcc.accountType || 'RETAIL_LIVE',
      broker: newAcc.broker || 'Broker Gateway',
      currency: newAcc.currency || 'USD',
      balance: newAcc.balance || 100000,
      equity: newAcc.equity || 100000,
      startingBalance: newAcc.startingBalance || 100000,
      maxDailyLossPercent: newAcc.maxDailyLossPercent || 5,
      maxTotalDrawdownPercent: newAcc.maxTotalDrawdownPercent || 10,
      currentDailyLoss: 0,
      currentDrawdown: 0,
      connectionStatus: 'CONNECTED',
      isPropFirm: !!newAcc.isPropFirm
    };
    setAccounts((prev) => [...prev, acc]);
    setActiveAccountId(acc.id);
  };

  const handleAddTrade = (newTrd: Partial<TradeRecord>) => {
    const trd: TradeRecord = {
      id: `trd-${Date.now()}`,
      accountId: activeAccountId,
      date: newTrd.date || new Date().toISOString().slice(0, 16),
      symbol: newTrd.symbol || 'NAS100',
      direction: newTrd.direction || 'BUY',
      entryPrice: newTrd.entryPrice || 0,
      exitPrice: newTrd.exitPrice,
      stopLoss: newTrd.stopLoss || 0,
      takeProfit: newTrd.takeProfit || 0,
      volume: newTrd.volume || 1.0,
      pnl: newTrd.pnl,
      commission: newTrd.commission || 0,
      swap: newTrd.swap || 0,
      rMultiple: newTrd.rMultiple,
      riskReward: newTrd.riskReward || 2.0,
      status: newTrd.status || 'CLOSED',
      session: newTrd.session || 'NEW_YORK',
      setupType: newTrd.setupType || 'Break of Structure',
      timeframe: newTrd.timeframe || 'M15',
      notes: newTrd.notes || ''
    };
    setTrades((prev) => [trd, ...prev]);

    // Update account balance and daily loss if closed with PnL
    if (trd.pnl !== undefined) {
      const pnlAmount = trd.pnl;
      setAccounts((prev) =>
        prev.map((acc) => {
          if (acc.id === activeAccountId) {
            const newBal = acc.balance + pnlAmount;
            return {
              ...acc,
              balance: newBal,
              equity: newBal,
              currentDailyLoss: pnlAmount < 0 ? acc.currentDailyLoss + Math.abs(pnlAmount) : acc.currentDailyLoss
            };
          }
          return acc;
        })
      );
    }
  };

  const handleMarkAlertRead = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, isRead: true } : a))
    );
  };

  // Render current active module
  const renderModule = () => {
    switch (currentModule) {
      case 'overview':
        return (
          <OverviewView
            onNavigate={(mod) => setCurrentModule(mod)}
            activeAccount={activeAccount}
            alerts={alerts}
          />
        );
      case 'command-desk':
        return <CommandDeskView onNavigate={(mod) => setCurrentModule(mod)} />;
      case 'market-analysis':
        return <MarketAnalysisView />;
      case 'tradingview':
        return <TradingViewWorkspaceView />;
      case 'watchlists':
        return <WatchlistsView />;
      case 'interest-rates':
        return <InterestRatesView />;
      case 'bond-desk':
        return <BondRealYieldView />;
      case 'calendar':
        return <EconomicCalendarView />;
      case 'data-center':
        return <EconomicDataCenterView />;
      case 'central-bank':
        return <CentralBankLibraryView />;
      case 'intermarket':
        return <IntermarketView />;
      case 'currency-scoring':
        return <CurrencyScoringView />;
      case 'currency-strength':
        return <CurrencyStrengthView />;
      case 'risk-regime':
        return <RiskRegimeView />;
      case 'cme-futures':
        return <CMEFuturesView />;
      case 'cot-positioning':
        return <COTPositioningView />;
      case 'commodities':
        return <CommoditiesView />;
      case 'seasonality':
        return <SeasonalityView />;
      case 'event-desk':
        return <EventDeskView />;
      case 'index-playbooks':
        return <IndexPlaybooksView />;
      case 'forex-intelligence':
        return <ForexIntelligenceView />;
      case 'market-sessions':
        return <MarketSessionsView />;
      case 'mt5-broker':
        return <MT5BrokerView />;
      case 'multi-account':
        return (
          <MultiAccountView
            accounts={accounts}
            activeAccount={activeAccount}
            onSelectAccount={(id) => setActiveAccountId(id)}
            onAddAccount={handleAddAccount}
          />
        );
      case 'risk-management':
        return <RiskManagementView activeAccount={activeAccount} />;
      case 'trade-journal':
        return (
          <TradeJournalView
            trades={trades}
            activeAccount={activeAccount}
            onAddTrade={handleAddTrade}
          />
        );
      case 'performance':
        return (
          <PerformanceAnalyticsView
            trades={trades}
            activeAccount={activeAccount}
          />
        );
      case 'alerts':
        return (
          <AlertsView alerts={alerts} onMarkRead={handleMarkAlertRead} />
        );
      case 'backtesting':
        return <BacktestingView />;
      case 'data-sources':
        return <DataSourcesView />;
      case 'settings':
        return <SettingsView />;
      case 'system-health':
        return <SystemHealthView />;
      default:
        return (
          <OverviewView
            onNavigate={(mod) => setCurrentModule(mod)}
            activeAccount={activeAccount}
            alerts={alerts}
          />
        );
    }
  };

  return (
    <Shell
      currentModule={currentModule}
      onSelectModule={(mod) => setCurrentModule(mod)}
      accounts={accounts}
      activeAccount={activeAccount}
      onSelectAccount={(id) => setActiveAccountId(id)}
      alerts={alerts}
    >
      {renderModule()}
    </Shell>
  );
}
