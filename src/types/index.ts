export type DataStatus = 
  | 'LIVE' 
  | 'DELAYED' 
  | 'HISTORICAL' 
  | 'MANUAL' 
  | 'ESTIMATED' 
  | 'SAMPLE' 
  | 'STALE' 
  | 'UNAVAILABLE';

export type BiasDirection = 'BULLISH' | 'BEARISH' | 'MIXED' | 'NO_TRADE';

export type RiskRegimeState = 'RISK_ON' | 'RISK_OFF' | 'MIXED' | 'TRANSITIONING' | 'INSUFFICIENT_DATA';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CHF' | 'CAD' | 'AUD' | 'NZD';

export type AssetClass = 'INDICES' | 'FOREX' | 'COMMODITIES' | 'METALS' | 'FUTURES' | 'BONDS';

export interface Instrument {
  id: string;
  symbol: string;
  displayName: string;
  assetClass: AssetClass;
  providerSymbol: string;
  exchange?: string;
  quoteCurrency: string;
  tradingStatus: 'OPEN' | 'CLOSED' | 'HALTED';
  instrumentType: 'CFD' | 'FUTURES' | 'SPOT_FX' | 'INDEX';
  contractSize: number;
  tickSize: number;
  tickValue: number;
  minVolumeIncrement: number;
  tradingHours: string;
  lastPrice: number;
  change24h: number;
  change24hPercent: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  dataStatus: DataStatus;
  updatedAt: string;
}

export interface EconomicEvent {
  id: string;
  country: string;
  currency: Currency | 'ALL';
  eventName: string;
  importance: 'HIGH' | 'MEDIUM' | 'LOW';
  scheduledTime: string;
  actual?: number | string | null;
  forecast?: number | string | null;
  previous?: number | string | null;
  unit: string;
  releaseStatus: 'UPCOMING' | 'RELEASED' | 'REVISED';
  officialSource: string;
  interpretation?: string;
  marketImpact?: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
}

export interface CentralBankPolicy {
  bankName: string;
  bankCode: 'FED' | 'ECB' | 'BOE' | 'BOJ' | 'RBA' | 'RBNZ' | 'SNB' | 'BOC';
  currency: Currency;
  currentRate: number;
  previousRate: number;
  lastDecisionDate: string;
  nextMeetingDate: string;
  bias: 'HAWKISH' | 'DOVISH' | 'NEUTRAL';
  summary: string;
  lastStatementExcerpt: string;
  officialSourceUrl: string;
}

export interface SovereignYield {
  country: string;
  currency: Currency;
  yield2Y: number;
  yield5Y: number;
  yield10Y: number;
  yield30Y: number;
  spread10Y2Y: number;
  realYield10Y?: number;
  curveState: 'NORMAL' | 'INVERTED' | 'FLAT' | 'STEEPENING';
  updatedAt: string;
}

export interface CurrencyScore {
  currency: Currency;
  name: string;
  score: number; // -100 to +100
  rateDifferentialScore: number;
  economicMomentumScore: number;
  centralBankBiasScore: number;
  positioningScore: number;
  shortTermStrength: number;
  mediumTermStrength: number;
  longTermStrength: number;
  rank: number;
}

export interface CMEProduct {
  id: string;
  exchange: 'CME' | 'CBOT' | 'NYMEX' | 'COMEX';
  category: 'Equity Indices' | 'Interest Rates' | 'FX' | 'Energy' | 'Metals' | 'Agriculture';
  name: string;
  symbol: string;
  activeContractMonth: string;
  settlementPrice: number;
  priceChange: number;
  volume: number;
  openInterest: number;
  openInterestChange: number;
  impliedVolatility?: number;
  dataStatus: DataStatus;
}

export interface COTPositioning {
  instrument: string;
  category: string;
  reportDate: string;
  releaseDate: string;
  assetManagerLong: number;
  assetManagerShort: number;
  assetManagerNet: number;
  leveragedFundsLong: number;
  leveragedFundsShort: number;
  leveragedFundsNet: number;
  dealersNet: number;
  netPositionChange: number;
  openInterest: number;
  threeYearPercentile: number; // 0 - 100%
  signal: 'EXTREME_BULLISH' | 'BULLISH' | 'NEUTRAL' | 'BEARISH' | 'EXTREME_BEARISH';
}

export interface MarketBias {
  instrumentId: string;
  symbol: string;
  name: string;
  bias: BiasDirection;
  score: number; // -10 to +10
  confidencePercent: number;
  macroGrowthScore: number;
  monetaryPolicyScore: number;
  yieldSpreadScore: number;
  currencyStrengthScore: number;
  intermarketScore: number;
  cotPositioningScore: number;
  technicalConfirmation: 'CONFIRMED' | 'PENDING' | 'CONFLICTING';
  eventRisk: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';
  supportingFactors: string[];
  conflictingFactors: string[];
  invalidationLevel: number;
  keyTargetLevel: number;
  updatedAt: string;
}

export type AccountType = 
  | 'RETAIL_LIVE' 
  | 'RETAIL_DEMO' 
  | 'BROKER_LIVE' 
  | 'BROKER_DEMO' 
  | 'PROP_CHALLENGE' 
  | 'PROP_FUNDED' 
  | 'SIMULATED' 
  | 'MANUAL';

export interface TradingAccount {
  id: string;
  accountName: string;
  accountNumber: string;
  accountType: AccountType;
  broker: string;
  currency: string;
  balance: number;
  equity: number;
  startingBalance: number;
  maxTotalDrawdownPercent: number;
  maxDailyLossPercent: number;
  currentDailyLoss: number;
  currentDrawdown: number;
  profitTarget?: number;
  profitTargetReached?: boolean;
  connectionStatus: 'CONNECTED' | 'DISCONNECTED' | 'MANUAL_ONLY' | 'SYNC_ERROR';
  lastSyncedAt?: string;
  isPropFirm: boolean;
}

export interface TradeRecord {
  id: string;
  accountId: string;
  date: string;
  symbol: string;
  direction: 'BUY' | 'SELL';
  entryPrice: number;
  exitPrice?: number;
  stopLoss: number;
  takeProfit: number;
  volume: number; // lots or contracts
  pnl?: number;
  commission: number;
  swap: number;
  rMultiple?: number;
  riskReward: number;
  status: 'OPEN' | 'CLOSED' | 'CANCELLED';
  session: 'SYDNEY' | 'TOKYO' | 'LONDON' | 'NEW_YORK' | 'OVERLAP';
  setupType: 'Break of Structure' | 'Liquidity Sweep' | 'Macro Trend Follow' | 'Central Bank Divergence' | 'Yield Spread Play';
  timeframe: 'M15' | 'H1' | 'H4' | 'D1';
  notes: string;
}

export interface SystemAlert {
  id: string;
  type: 'BIAS_CHANGE' | 'HIGH_IMPACT_EVENT' | 'RISK_THRESHOLD' | 'DATA_HEALTH' | 'TECHNICAL_LEVEL';
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface ProviderHealth {
  name: string;
  category: 'Macro Data' | 'Broker Feed' | 'Exchange Feed' | 'Positioning' | 'Charting';
  status: 'HEALTHY' | 'DEGRADED' | 'OFFLINE';
  latencyMs: number;
  lastSuccess: string;
  rateLimitUsagePercent: number;
  errorCount24h: number;
}
