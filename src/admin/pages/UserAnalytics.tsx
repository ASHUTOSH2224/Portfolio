import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  Activity, 
  BarChart3,
  Calendar,
  Filter,
  Globe,
  Smartphone,
  Monitor,
  Download,
  Eye,
  Clock
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import StatsCard from '../components/StatsCard';
import analyticsService from '../../services/analyticsService';
import toast from 'react-hot-toast';

const UserAnalytics: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [selectedComponent, setSelectedComponent] = useState('User Analytics');

  const analyticsComponents = [
    'User Analytics',
    'Engagement Metrics', 
    'Technical Metrics',
    'Demographics'
  ];

  // Fetch analytics data
  const { data: analyticsData, isLoading: analyticsLoading } = useQuery({
    queryKey: ['analytics-dashboard', selectedTimeframe],
    queryFn: () => analyticsService.getDashboardAnalytics(selectedTimeframe),
    refetchInterval: 30000,
  });

  // Fetch user analytics
  const { data: userAnalytics, isLoading: userLoading } = useQuery({
    queryKey: ['user-analytics', selectedTimeframe],
    queryFn: () => analyticsService.getUserAnalytics(selectedTimeframe),
    refetchInterval: 60000,
  });

  // Fetch device analytics
  const { data: deviceData } = useQuery({
    queryKey: ['device-analytics', selectedTimeframe],
    queryFn: () => analyticsService.getDeviceAnalytics(selectedTimeframe),
    refetchInterval: 300000,
  });

  // Fetch location analytics
  const { data: locationData } = useQuery({
    queryKey: ['location-analytics', selectedTimeframe],
    queryFn: () => analyticsService.getLocationAnalytics(selectedTimeframe),
    refetchInterval: 300000,
  });

  // Fetch traffic analytics
  const { data: trafficData } = useQuery({
    queryKey: ['traffic-analytics', selectedTimeframe],
    queryFn: () => analyticsService.getTrafficAnalytics(selectedTimeframe),
    refetchInterval: 300000,
  });

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
    toast.success(`Analytics updated for ${timeframe}`);
  };

  const renderUserAnalytics = () => (
    <div className="space-y-6">
      {/* User Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={userAnalytics?.totalUsers?.toLocaleString() || '0'}
          color="primary"
          icon={Users}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="New Users"
          value={userAnalytics?.newUsers?.toLocaleString() || '0'}
          color="secondary"
          icon={TrendingUp}
          trend={{ value: 8.3, isPositive: true }}
        />
        <StatsCard
          title="Returning Users"
          value={userAnalytics?.returningUsers?.toLocaleString() || '0'}
          color="tertiary"
          icon={Activity}
          trend={{ value: 15.2, isPositive: true }}
        />
        <StatsCard
          title="Avg Session"
          value={`${Math.floor((userAnalytics?.avgSessionDuration || 0) / 60)}m ${Math.floor((userAnalytics?.avgSessionDuration || 0) % 60)}s`}
          color="success"
          icon={Clock}
          trend={{ value: 7.8, isPositive: true }}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* User Growth Chart */}
        <div className="glass-effect rounded-2xl border border-surface-border p-6">
          <h3 className="text-xl font-semibold text-text-primary mb-6">User Growth Over Time</h3>
          <div className="h-64 bg-surface-tertiary/30 rounded-lg border border-surface-border p-4">
            {userLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary"></div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-accent-primary mx-auto mb-4" />
                  <p className="text-text-muted mb-2">User Growth Chart</p>
                  <div className="space-y-2">
                    {userAnalytics?.userGrowth?.slice(0, 5).map((data, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-text-muted">{new Date(data.date).toLocaleDateString()}</span>
                        <span className="text-accent-primary">+{data.newUsers}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Top Pages */}
        <div className="glass-effect rounded-2xl border border-surface-border p-6">
          <h3 className="text-xl font-semibold text-text-primary mb-6">Most Visited Pages</h3>
          <div className="space-y-4">
            {userAnalytics?.topPages?.slice(0, 6).map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 glass-effect rounded-lg border border-surface-border">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent-primary rounded-full"></div>
                  <span className="text-text-primary font-medium">{page.page}</span>
                </div>
                <div className="text-right">
                  <div className="text-accent-primary font-bold">{page.views.toLocaleString()}</div>
                  <div className="text-xs text-text-muted">{page.uniqueViews} unique</div>
                </div>
              </div>
            )) || (
              <div className="text-center py-8 text-text-muted">
                <Eye className="w-8 h-8 mx-auto mb-2" />
                <p>No page data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEngagementMetrics = () => (
    <div className="space-y-6">
      {/* Engagement Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatsCard
          title="Page Views"
          value={analyticsData?.pageViews?.toLocaleString() || '0'}
          color="primary"
          icon={Eye}
          trend={{ value: 18.2, isPositive: true }}
        />
        <StatsCard
          title="Sessions"
          value={analyticsData?.sessions?.toLocaleString() || '0'}
          color="secondary"
          icon={Activity}
          trend={{ value: 12.7, isPositive: true }}
        />
        <StatsCard
          title="Bounce Rate"
          value={`${((analyticsData?.bounceRate || 0) * 100).toFixed(1)}%`}
          color="warning"
          icon={TrendingUp}
          trend={{ value: 2.3, isPositive: false }}
        />
        <StatsCard
          title="Conversion Rate"
          value={`${((analyticsData?.conversionRate || 0) * 100).toFixed(1)}%`}
          color="success"
          icon={BarChart3}
          trend={{ value: 9.4, isPositive: true }}
        />
      </div>

      {/* Traffic Sources */}
      <div className="glass-effect rounded-2xl border border-surface-border p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-6">Traffic Sources</h3>
        <div className="space-y-4">
          {trafficData?.trafficSources?.slice(0, 5).map((source, index) => (
            <div key={index} className="flex items-center justify-between p-4 glass-effect rounded-lg border border-surface-border">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-accent-primary" />
                <span className="text-text-primary font-medium">{source.source}</span>
              </div>
              <div className="text-right">
                <div className="text-accent-primary font-bold">{source.visits.toLocaleString()}</div>
                <div className="text-xs text-text-muted">{source.percentage.toFixed(1)}%</div>
              </div>
            </div>
          )) || (
            <div className="text-center py-8 text-text-muted">
              <Globe className="w-8 h-8 mx-auto mb-2" />
              <p>No traffic source data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderTechnicalMetrics = () => (
      <div className="space-y-6">
      {/* Device Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        {deviceData?.deviceTypes?.map((device, index) => (
          <StatsCard
            key={index}
            title={device.type}
            value={`${device.percentage.toFixed(1)}%`}
            color={index === 0 ? 'primary' : index === 1 ? 'secondary' : 'tertiary'}
            icon={device.type === 'Desktop' ? Monitor : device.type === 'Mobile' ? Smartphone : Activity}
          />
        )) || Array.from({ length: 3 }, (_, index) => (
          <StatsCard
            key={index}
            title="Loading..."
            value="0%"
            color="primary"
            icon={Monitor}
          />
        ))}
      </div>

      {/* Browser and OS Data */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Browsers */}
        <div className="glass-effect rounded-2xl border border-surface-border p-6">
          <h3 className="text-xl font-semibold text-text-primary mb-6">Top Browsers</h3>
          <div className="space-y-4">
            {deviceData?.browsers?.slice(0, 5).map((browser, index) => (
              <div key={index} className="flex items-center justify-between p-3 glass-effect rounded-lg border border-surface-border">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent-secondary rounded-full"></div>
                  <span className="text-text-primary font-medium">{browser.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-accent-secondary font-bold">{browser.count.toLocaleString()}</div>
                  <div className="text-xs text-text-muted">{browser.percentage.toFixed(1)}%</div>
                </div>
              </div>
            )) || (
              <div className="text-center py-8 text-text-muted">
                <Monitor className="w-8 h-8 mx-auto mb-2" />
                <p>No browser data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Operating Systems */}
        <div className="glass-effect rounded-2xl border border-surface-border p-6">
          <h3 className="text-xl font-semibold text-text-primary mb-6">Operating Systems</h3>
          <div className="space-y-4">
            {deviceData?.operatingSystems?.slice(0, 5).map((os, index) => (
              <div key={index} className="flex items-center justify-between p-3 glass-effect rounded-lg border border-surface-border">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent-tertiary rounded-full"></div>
                  <span className="text-text-primary font-medium">{os.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-accent-tertiary font-bold">{os.count.toLocaleString()}</div>
                  <div className="text-xs text-text-muted">{os.percentage.toFixed(1)}%</div>
                </div>
              </div>
            )) || (
              <div className="text-center py-8 text-text-muted">
                <Activity className="w-8 h-8 mx-auto mb-2" />
                <p>No OS data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDemographics = () => (
    <div className="space-y-6">
      {/* Location Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatsCard
          title="Countries"
          value={locationData?.countries?.length?.toString() || '0'}
          color="primary"
          icon={Globe}
        />
        <StatsCard
          title="Cities"
          value={locationData?.cities?.length?.toString() || '0'}
          color="secondary"
          icon={Globe}
        />
        <StatsCard
          title="Top Country"
          value={locationData?.topCountries?.[0]?.country || 'N/A'}
          color="tertiary"
          icon={Globe}
        />
      </div>

      {/* Top Countries */}
      <div className="glass-effect rounded-2xl border border-surface-border p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-6">Top Countries</h3>
        <div className="space-y-4">
          {locationData?.topCountries?.slice(0, 8).map((country, index) => (
            <div key={index} className="flex items-center justify-between p-3 glass-effect rounded-lg border border-surface-border">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent-primary rounded-full"></div>
                <span className="text-text-primary font-medium">{country.country}</span>
              </div>
              <div className="text-accent-primary font-bold">{country.visits.toLocaleString()}</div>
            </div>
          )) || (
            <div className="text-center py-8 text-text-muted">
              <Globe className="w-8 h-8 mx-auto mb-2" />
              <p>No location data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'User Analytics':
        return renderUserAnalytics();
      case 'Engagement Metrics':
        return renderEngagementMetrics();
      case 'Technical Metrics':
        return renderTechnicalMetrics();
      case 'Demographics':
        return renderDemographics();
      default:
        return renderUserAnalytics();
    }
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Controls */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Component Selector */}
        <div className="glass-effect rounded-xl border border-surface-border p-4">
          <h3 className="text-lg font-semibold text-text-primary mb-3">Analytics View</h3>
          <select 
            value={selectedComponent}
            onChange={(e) => setSelectedComponent(e.target.value)}
            className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary bg-matteBlack-800 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
          >
            {analyticsComponents.map((component) => (
              <option key={component} value={component}>{component}</option>
            ))}
          </select>
        </div>

        {/* Timeframe Selector */}
        <div className="glass-effect rounded-xl border border-surface-border p-4">
          <h3 className="text-lg font-semibold text-text-primary mb-3">Time Period</h3>
          <div className="flex space-x-2">
            {['7d', '30d', '90d'].map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => handleTimeframeChange(timeframe)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  selectedTimeframe === timeframe
                    ? 'bg-accent-primary text-matteBlack-800 font-semibold'
                    : 'glass-effect border border-surface-border text-text-muted hover:text-accent-primary hover:border-accent-primary/50'
                }`}
              >
                {timeframe === '7d' ? 'Last 7 Days' : timeframe === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
              </button>
            ))}
              </div>
            </div>
          </div>

      {/* Analytics Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-text-primary mb-2">{selectedComponent}</h2>
        <p className="text-text-muted">
          Detailed analysis for the {selectedTimeframe === '7d' ? 'last 7 days' : selectedTimeframe === '30d' ? 'last 30 days' : 'last 90 days'}
        </p>
              </div>
              
      {/* Component Content */}
      {analyticsLoading ? (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
          <p className="text-text-muted">Loading analytics data...</p>
        </div>
      ) : (
        renderComponent()
      )}
      </div>
  );
};

export default UserAnalytics; 