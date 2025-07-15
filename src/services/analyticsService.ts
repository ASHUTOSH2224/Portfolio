import api from './api';

export interface AnalyticsData {
  totalSessions: number;
  totalPageViews: number;
  totalEvents: number;
  avgSessionDuration: number;
  bounceRate: number;
}

export interface UserAnalytics {
  totalUsers: number;
  newUsers: number;
  returningUsers: number;
  avgSessionDuration: number;
}

export interface TrafficAnalytics {
  totalTraffic: number;
  trafficSources: TrafficSource[];
}

export interface TrafficSource {
  source: string;
  visits: number;
  pageViews: number;
  percentage: number;
}

export interface PageViewData {
  sessionId: string;
  path: string;
  title: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
}

export interface DeviceType {
  type: string;
  count: number;
  percentage: number;
}

export interface Location {
  country: string;
  city?: string;
  visits: number;
  percentage: number;
}

export interface TimelineData {
  date: string;
  pageViews: number;
  uniqueVisitors: number;
  sessions: number;
  bounceRate: number;
}

export interface EventData {
  sessionId: string;
  type: 'click' | 'form_submit' | 'download' | 'email_click' | 'phone_click' | 'social_click' | 'project_view' | 'scroll' | 'video_play' | 'modal_open' | 'modal_close' | 'file_download' | 'external_link' | 'contact_form' | 'resume_download' | 'other';
  element: string;
  value?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export interface ConversionData {
  sessionId: string;
  type: 'contact_form' | 'resume_download' | 'email_click' | 'phone_click' | 'social_follow' | 'project_inquiry' | 'calendly_booking' | 'other';
  value?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

class AnalyticsService {
  // Get dashboard analytics
  async getDashboardAnalytics(timeframe: string = '30d'): Promise<AnalyticsData> {
    const response = await api.get('/analytics/dashboard', {
      params: { timeframe }
    });
    return response.data.data;
  }

  // Get resume download statistics
  async getResumeDownloadStats(timeframe: string = '30d'): Promise<{
    totalDownloads: number;
    uniqueDownloads: number;
    downloadsByDay: { date: string; downloads: number }[];
    topReferrers: { source: string; downloads: number }[];
  }> {
    const response = await api.get('/analytics/resume-downloads', {
      params: { timeframe }
    });
    return response.data;
  }

  // Track page view
  async trackPageView(data: PageViewData): Promise<void> {
    await api.post('/analytics/pageview', data);
  }

  // Track event
  async trackEvent(data: EventData): Promise<void> {
    await api.post('/analytics/event', data);
  }

  // Track conversion
  async trackConversion(data: ConversionData): Promise<void> {
    await api.post('/analytics/conversion', data);
  }

  // Get real-time analytics
  async getRealTimeAnalytics(): Promise<{
    activeUsers: number;
    currentPageViews: PageViewData[];
    recentEvents: EventData[];
    onlineUsers: number;
  }> {
    const response = await api.get('/analytics/realtime');
    return response.data;
  }

  // Get user analytics
  async getUserAnalytics(timeframe: string = '30d'): Promise<UserAnalytics> {
    const response = await api.get('/analytics/users', {
      params: { timeframe }
    });
    return response.data.data;
  }

  // Get traffic analytics
  async getTrafficAnalytics(timeframe: string = '30d'): Promise<TrafficAnalytics> {
    const response = await api.get('/analytics/traffic', {
      params: { timeframe }
    });
    return response.data.data;
  }

  // Get device analytics
  async getDeviceAnalytics(timeframe: string = '30d'): Promise<{
    deviceTypes: DeviceType[];
    browsers: { name: string; count: number; percentage: number }[];
    operatingSystems: { name: string; count: number; percentage: number }[];
    screenResolutions: { resolution: string; count: number; percentage: number }[];
  }> {
    const response = await api.get('/analytics/devices', {
      params: { timeframe }
    });
    return response.data;
  }

  // Get location analytics
  async getLocationAnalytics(timeframe: string = '30d'): Promise<{
    countries: Location[];
    cities: Location[];
    topCountries: { country: string; visits: number }[];
    mapData: { country: string; visits: number; lat: number; lng: number }[];
  }> {
    const response = await api.get('/analytics/locations', {
      params: { timeframe }
    });
    return response.data;
  }

  // Generate session ID
  generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Get or create session ID
  getSessionId(): string {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = this.generateSessionId();
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }
}

export default new AnalyticsService(); 