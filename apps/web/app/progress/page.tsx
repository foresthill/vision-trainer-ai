'use client';

import { CalendarHeatmap } from '@/components/progress/calendar-heatmap';
import { StatsDashboard } from '@/components/progress/stats-dashboard';
import { AchievementBadges } from '@/components/progress/achievement-badges';

export default function ProgressPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">進捗管理</h1>

      <div className="space-y-8">
        <StatsDashboard />
        <CalendarHeatmap />
        <AchievementBadges />
      </div>
    </div>
  );
}
