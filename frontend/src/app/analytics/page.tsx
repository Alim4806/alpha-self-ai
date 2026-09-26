'use client';

import { RefreshCw } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import StatCard from './components/StatCard';
import ActivityChart from './components/ActivityChart';
import UsageBreakdown from './components/UsageBreakdown';
import RecentActivity from './components/RecentActivity';

export default function AnalyticsPage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* ===== HEADER ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Analytics Dashboard
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Real-time overview of your ALION assistant usage
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              Last 30 Days
            </span>
            <button
              onClick={handleRefresh}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-200 hover:scale-105"
              aria-label="Refresh data"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        {/* ===== ROW 1: STATS CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Chats" value="342" change="+12.5%" trend="up" />
          <StatCard title="Messages Sent" value="1,284" change="+8.1%" trend="up" />
          <StatCard title="Tokens Used" value="45.2K" change="-2.3%" trend="down" />
          <StatCard title="Avg Response Time" value="1.4s" change="+0.3s" trend="up" />
        </div>

        {/* ===== ROW 2: CHARTS ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityChart />
          </div>
          <div className="lg:col-span-1">
            <UsageBreakdown />
          </div>
        </div>

        {/* ===== ROW 3: RECENT ACTIVITY ===== */}
        <RecentActivity />

        {/* ===== FOOTER ===== */}
        <div className="pt-2 text-center">
          <p className="text-[10px] text-gray-600 tracking-wider uppercase">
            ALION v2.5 • Data refreshes automatically every 5 minutes
          </p>
        </div>
      </div>
    </AppLayout>
  );
}