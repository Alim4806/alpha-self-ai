'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import ProfileSection from './components/ProfileSection';
import AppearanceSection from './components/AppearanceSection';
import PreferencesSection from './components/PreferencesSection';
import { Settings, User, Palette, Sliders, Shield, Database } from 'lucide-react';

export type SettingsData = {
  profile: {
    name: string;
    email: string;
    avatar: string;
  };
  appearance: {
    theme: 'dark' | 'light' | 'system';
    fontSize: 'small' | 'medium' | 'large';
    accentColor: string;
  };
  preferences: {
    aiTemperature: number;
    notifications: boolean;
    autoSave: boolean;
    voiceEnabled: boolean;
    language: string;
  };
};

const DEFAULT_SETTINGS: SettingsData = {
  profile: {
    name: 'ALION User',
    email: 'user@alion.ai',
    avatar: '👤',
  },
  appearance: {
    theme: 'dark',
    fontSize: 'medium',
    accentColor: '#06B6D4',
  },
  preferences: {
    aiTemperature: 0.7,
    notifications: true,
    autoSave: true,
    voiceEnabled: true,
    language: 'English',
  },
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsData>(DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState<'profile' | 'appearance' | 'preferences'>('profile');

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'appearance' as const, label: 'Appearance', icon: Palette },
    { id: 'preferences' as const, label: 'Preferences', icon: Sliders },
  ];

  const updateProfile = (data: Partial<SettingsData['profile']>) => {
    setSettings({
      ...settings,
      profile: { ...settings.profile, ...data },
    });
  };

  const updateAppearance = (data: Partial<SettingsData['appearance']>) => {
    setSettings({
      ...settings,
      appearance: { ...settings.appearance, ...data },
    });
  };

  const updatePreferences = (data: Partial<SettingsData['preferences']>) => {
    setSettings({
      ...settings,
      preferences: { ...settings.preferences, ...data },
    });
  };

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Settings
          </h1>
          <p className="text-sm text-gray-400">
            Manage your ALION preferences and account settings
          </p>
        </div>

        {/* Settings Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="md:col-span-1">
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3">
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
              {activeTab === 'profile' && (
                <ProfileSection
                  profile={settings.profile}
                  onUpdate={updateProfile}
                />
              )}
              {activeTab === 'appearance' && (
                <AppearanceSection
                  appearance={settings.appearance}
                  onUpdate={updateAppearance}
                />
              )}
              {activeTab === 'preferences' && (
                <PreferencesSection
                  preferences={settings.preferences}
                  onUpdate={updatePreferences}
                />
              )}
            </div>
          </div>
        </div>

        {/* Footer with Save Button */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <p className="text-[10px] text-gray-600 tracking-wider uppercase">
            ALION v2.5 • Settings are stored locally
          </p>
          <button
            onClick={() => {
              // In production, this would save to backend/localStorage
              alert('Settings saved successfully!');
            }}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/25"
          >
            Save Changes
          </button>
        </div>
      </div>
    </AppLayout>
  );
}