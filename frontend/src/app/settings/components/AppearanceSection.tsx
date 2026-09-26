import { SettingsData } from '../page';
import { Check } from 'lucide-react';

interface AppearanceSectionProps {
  appearance: SettingsData['appearance'];
  onUpdate: (data: Partial<SettingsData['appearance']>) => void;
}

export default function AppearanceSection({ appearance, onUpdate }: AppearanceSectionProps) {
  const themes = [
    { id: 'dark', label: 'Dark', description: 'Deep dark theme for night owls' },
    { id: 'light', label: 'Light', description: 'Bright and clean interface' },
    { id: 'system', label: 'System', description: 'Follows your system preference' },
  ];

  const fontSizes = [
    { id: 'small', label: 'Small', value: '14px' },
    { id: 'medium', label: 'Medium', value: '16px' },
    { id: 'large', label: 'Large', value: '18px' },
  ];

  const accentColors = [
    { id: '#06B6D4', label: 'Cyan', class: 'bg-cyan-500' },
    { id: '#3B82F6', label: 'Blue', class: 'bg-blue-500' },
    { id: '#8B5CF6', label: 'Purple', class: 'bg-purple-500' },
    { id: '#EC4899', label: 'Pink', class: 'bg-pink-500' },
    { id: '#F59E0B', label: 'Amber', class: 'bg-amber-500' },
    { id: '#10B981', label: 'Emerald', class: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white">Appearance</h3>
        <p className="text-sm text-gray-400 mt-1">
          Customize the look and feel of ALION
        </p>
      </div>

      {/* Theme */}
      <div>
        <label className="text-sm text-gray-400 block mb-2">Theme</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onUpdate({ theme: theme.id as SettingsData['appearance']['theme'] })}
              className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                appearance.theme === theme.id
                  ? 'border-cyan-400 bg-cyan-500/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${appearance.theme === theme.id ? 'text-cyan-400' : 'text-white'}`}>
                  {theme.label}
                </span>
                {appearance.theme === theme.id && <Check size={14} className="text-cyan-400" />}
              </div>
              <p className="text-xs text-gray-500 mt-1">{theme.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div>
        <label className="text-sm text-gray-400 block mb-2">Font Size</label>
        <div className="flex gap-3">
          {fontSizes.map((size) => (
            <button
              key={size.id}
              onClick={() => onUpdate({ fontSize: size.id as SettingsData['appearance']['fontSize'] })}
              className={`flex-1 p-2 rounded-lg border text-center transition-all duration-200 ${
                appearance.fontSize === size.id
                  ? 'border-cyan-400 bg-cyan-500/10 text-cyan-400'
                  : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              <span style={{ fontSize: size.value }}>Aa</span>
              <p className="text-xs text-gray-500 mt-1">{size.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color */}
      <div>
        <label className="text-sm text-gray-400 block mb-2">Accent Color</label>
        <div className="flex flex-wrap gap-3">
          {accentColors.map((color) => (
            <button
              key={color.id}
              onClick={() => onUpdate({ accentColor: color.id })}
              className={`w-10 h-10 rounded-full ${color.class} transition-all duration-200 ${
                appearance.accentColor === color.id
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0a0f1e]'
                  : 'hover:scale-110'
              }`}
              aria-label={`Select ${color.label} accent`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}