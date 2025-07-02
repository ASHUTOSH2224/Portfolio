import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  Activity, 
  BarChart3,
  Calendar,
  Filter
} from 'lucide-react';
import AdminLayout from '../layout/AdminLayout';
import StatsCard from '../components/StatsCard';

const UserAnalytics: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState('User Analytics');

  const analyticsComponents = [
    'User Analytics',
    'Engagement Metrics', 
    'Technical Metrics',
    'Demographics'
  ];

  const analyticsData = {
    totalUsers: 15420,
    newUsers: 1234,
    returningUsers: 14186,
    growthRate: 12.5,
    dailyActive: 8450,
    weeklyActive: 12340,
    monthlyActive: 15420
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Dashboard Component Selector */}
        <div className="glass-effect rounded-2xl border border-surface-border p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Dashboard Component</h3>
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

        {/* Analytics Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-text-primary mb-2">User Analytics</h2>
          <p className="text-text-muted">Detailed analysis of user behavior and patterns.</p>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Total Users Chart */}
          <div className="glass-effect rounded-2xl border border-surface-border p-6">
            <h3 className="text-xl font-semibold text-text-primary mb-6">Total Users</h3>
            <div className="h-64 flex items-center justify-center bg-surface-tertiary/30 rounded-lg border border-surface-border">
              <div className="text-center">
                <Users className="w-12 h-12 text-accent-primary mx-auto mb-4" />
                <p className="text-text-muted">Chart visualization will be displayed here</p>
                <div className="mt-4 text-3xl font-bold text-accent-primary">
                  {analyticsData.totalUsers.toLocaleString()}
                </div>
                <p className="text-text-muted text-sm">Total Users</p>
              </div>
            </div>
          </div>

          {/* New vs Returning Users */}
          <div className="glass-effect rounded-2xl border border-surface-border p-6">
            <h3 className="text-xl font-semibold text-text-primary mb-6">New vs Returning Users</h3>
            <div className="h-64 flex items-center justify-center bg-surface-tertiary/30 rounded-lg border border-surface-border">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-accent-secondary mx-auto mb-4" />
                <div className="flex items-center justify-center space-x-8 mt-4">
                  <div className="text-center">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-accent-primary rounded-full"></div>
                      <span className="text-sm text-text-muted">new</span>
                    </div>
                    <div className="text-xl font-bold text-accent-primary">
                      {analyticsData.newUsers.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-accent-secondary rounded-full"></div>
                      <span className="text-sm text-text-muted">returning</span>
                    </div>
                    <div className="text-xl font-bold text-accent-secondary">
                      {analyticsData.returningUsers.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Users (DAU, WAU, MAU) */}
          <div className="glass-effect rounded-2xl border border-surface-border p-6">
            <h3 className="text-xl font-semibold text-text-primary mb-6">Active Users (DAU, WAU, MAU)</h3>
            <div className="h-64 bg-surface-tertiary/30 rounded-lg border border-surface-border p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Daily Active Users</span>
                  <span className="text-xl font-bold text-accent-primary">
                    {analyticsData.dailyActive.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Weekly Active Users</span>
                  <span className="text-xl font-bold text-accent-secondary">
                    {analyticsData.weeklyActive.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Monthly Active Users</span>
                  <span className="text-xl font-bold text-accent-tertiary">
                    {analyticsData.monthlyActive.toLocaleString()}
                  </span>
                </div>
              </div>
              
              {/* Chart Legend */}
              <div className="mt-6 pt-4 border-t border-surface-border">
                <div className="flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent-primary rounded-full"></div>
                    <span className="text-text-muted">Daily Active Users</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-text-muted">Weekly Active Users</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-text-muted">Monthly Active Users</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Growth Rate */}
          <div className="glass-effect rounded-2xl border border-surface-border p-6">
            <h3 className="text-xl font-semibold text-text-primary mb-6">User Growth Rate (%)</h3>
            <div className="h-64 flex items-center justify-center bg-surface-tertiary/30 rounded-lg border border-surface-border">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <div className="text-4xl font-bold text-green-400 mb-2">
                  +{analyticsData.growthRate}%
                </div>
                <p className="text-text-muted">Growth Rate This Month</p>
                <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>Positive growth trend</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatsCard
            title="Session Duration"
            value="4m 32s"
            color="primary"
            icon={Activity}
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatsCard
            title="Bounce Rate"
            value="23.4%"
            color="warning"
            icon={BarChart3}
            trend={{ value: 2.1, isPositive: false }}
          />
          <StatsCard
            title="Page Views"
            value="45.2K"
            color="success"
            icon={Calendar}
            trend={{ value: 15.3, isPositive: true }}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserAnalytics; 