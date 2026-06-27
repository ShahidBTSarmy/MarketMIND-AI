export interface TrendItem {
  id: string;
  topic: string;
  growth: number; // percentage
  momentum: number; // score out of 100
  volume: string; // e.g., "1.2M searches"
  category: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  heatmap: { region: string; intensity: number }[];
  recommendation: string;
  timeline: { date: string; value: number }[];
}

export interface SentimentAnalysis {
  healthScore: number; // 0-100
  distribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  emotions: {
    joy: number;
    surprise: number;
    sadness: number;
    anger: number;
    fear: number;
  };
  painPoints: string[];
  desires: string[];
  recentComments: {
    id: string;
    text: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    platform: string;
    emotion: string;
  }[];
  aiInsights: string[];
}

export interface CompetitorData {
  id: string;
  name: string;
  marketShare: number; // percentage
  growthRate: number; // percentage
  pricingAlerts: string[];
  recentLaunches: string[];
  shareOfVoice: number; // percentage
  adSpendScore: number; // 1-10
  sentimentScore: number; // 0-100
  socialFollowing: { platform: string; count: string; growth: string }[];
  recommendation: string;
}

export interface CampaignInputs {
  budget: number;
  platform: string;
  audience: string;
  location: string;
  creativeType: string;
  campaignObjective: string;
}

export interface CampaignPredictions {
  predictedReach: string;
  ctr: number; // percentage
  conversions: number;
  revenue: number;
  roi: number; // multiplier e.g. 4.8
  confidenceScore: number; // percentage
  aiInsights: string[];
  optimizationTips: string[];
}

export interface CustomerPersona {
  name: string;
  age: number;
  profession: string;
  goals: string[];
  painPoints: string[];
  interests: string[];
  preferredPlatforms: string[];
  buyingTriggers: string[];
  marketingRecommendations: string[];
  avatarSeed: string;
}

export interface AttributionChannel {
  channel: string;
  contribution: number; // percentage
  spend: number;
  revenue: number;
  roi: number;
  conversions: number;
}

export interface AttributionJourney {
  path: string[];
  percentage: number;
}

export interface AttributionData {
  channels: AttributionChannel[];
  journeys: AttributionJourney[];
  recommendations: string[];
}

export interface ForecastDataPoint {
  period: string; // "7 Days" | "30 Days" | "90 Days" | "6 Months"
  demandScore: number; // 0-100
  growthProbability: number; // percentage
  opportunityScore: number; // 0-100
  factors: string[];
}

export interface MarketForecast {
  forecasts: ForecastDataPoint[];
  executiveSummary: string;
}

export interface ContentAnalysisInputs {
  contentType: 'ad-copy' | 'blog' | 'social-post' | 'landing-page';
  contentBody: string;
}

export interface ContentAnalysisResult {
  engagementScore: number; // 0-100
  readability: string; // e.g. "Grade 8", "College Level"
  emotionAnalysis: {
    primaryEmotion: string;
    intensity: number; // 0-100
  };
  viralityPotential: 'Low' | 'Medium' | 'High' | 'Viral Candidate';
  conversionProbability: number; // percentage
  suggestions: string[];
}

export interface CopilotMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface DashboardOverview {
  healthScore: number;
  sentimentScore: number;
  trendOpportunityScore: number;
  campaignROIScore: number;
  competitorThreatScore: number;
  customerGrowthIndicator: string;
  forecastConfidenceLevel: number;
  anomalies: {
    id: string;
    title: string;
    severity: 'critical' | 'warning' | 'info';
    description: string;
  }[];
}
