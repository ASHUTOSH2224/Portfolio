import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  color = 'primary',
  trend 
}) => {
  const colorClasses = {
    primary: {
      bg: 'from-accent-primary/10 to-accent-primary/5',
      border: 'border-accent-primary/30',
      text: 'text-accent-primary',
      icon: 'text-accent-primary'
    },
    secondary: {
      bg: 'from-accent-secondary/10 to-accent-secondary/5',
      border: 'border-accent-secondary/30',
      text: 'text-accent-secondary',
      icon: 'text-accent-secondary'
    },
    tertiary: {
      bg: 'from-accent-tertiary/10 to-accent-tertiary/5',
      border: 'border-accent-tertiary/30',
      text: 'text-accent-tertiary',
      icon: 'text-accent-tertiary'
    },
    success: {
      bg: 'from-green-500/10 to-green-500/5',
      border: 'border-green-500/30',
      text: 'text-green-400',
      icon: 'text-green-400'
    },
    warning: {
      bg: 'from-yellow-500/10 to-yellow-500/5',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400',
      icon: 'text-yellow-400'
    },
    danger: {
      bg: 'from-red-500/10 to-red-500/5',
      border: 'border-red-500/30',
      text: 'text-red-400',
      icon: 'text-red-400'
    }
  };

  const currentColor = colorClasses[color];

  return (
    <div className={`glass-effect rounded-xl p-6 border ${currentColor.border} bg-gradient-to-br ${currentColor.bg} hover:scale-105 transition-all duration-300 hover-glow group`}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium text-text-muted">{title}</div>
        {Icon && (
          <div className={`p-2 rounded-lg bg-gradient-to-r ${currentColor.bg} ${currentColor.border} border`}>
            <Icon className={`w-5 h-5 ${currentColor.icon}`} />
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between">
        <div className={`text-3xl font-bold ${currentColor.text} group-hover:animate-pulse`}>
          {value}
        </div>
        
        {trend && (
          <div className={`text-sm flex items-center ${
            trend.isPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            <span className="mr-1">
              {trend.isPositive ? '↗' : '↘'}
            </span>
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard; 