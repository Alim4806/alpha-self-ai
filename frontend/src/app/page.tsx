import React from 'react';
import AppLayout from '@/components/AppLayout';
import DashboardHero from './components/DashboardHero';
import MetricsBentoGrid from './components/MetricsBentoGrid';
import DashboardActivity from './components/DashboardActivity';
import DashboardCharts from './components/DashboardCharts';

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto space-y-6">
        <DashboardHero />
        <MetricsBentoGrid />
        <DashboardCharts />
        <DashboardActivity />
      </div>
    </AppLayout>
  );
}