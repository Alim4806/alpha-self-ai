import { SettingsData } from '../page';

interface PreferencesSectionProps {
  preferences: SettingsData['preferences'];
  onUpdate: (data: Partial<SettingsData['preferences']>) => void;
}

export default function PreferencesSection({ preferences, onUpdate }: PreferencesSectionProps) {
  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white">Preferences</h3>
        <p className="text-sm text-gray-400 mt-1">
          Configure how ALION behaves and interacts with you
        </p>
      </div>

      {/* AI Temperature */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-sm text-gray-400">AI Creativity Level</label>
          <span className="text-sm text-cyan-400">{preferences.aiTemperature}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={preferences.aiTemperature}
          onChange={(e) => onUpdate({ aiTemperature: parseFloat(e.target.value) })}
          className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Precise (0.0)</span>
          <span>Balanced (0.5)</span>
          <span>Creative (1.0)</span>
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5">
          <div>
            <p className="text-sm text-white">Notifications</p>
            <p className="text-xs text-gray-500">Receive alerts and updates</p>
          </div>
          <button
            onClick={() => onUpdate({ notifications: !preferences.notifications })}
            className={`w-10 h-6 rounded-full transition-all duration-200 ${
              preferences.notifications ? 'bg-cyan-500' : 'bg-gray-600'
            }`}
            aria-label="Toggle notifications"
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-all duration-200 mt-1 ${
              preferences.notifications ? 'ml-5' : 'ml-1'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5">
          <div>
            <p className="text-sm text-white">Auto-Save</p>
            <p className="text-xs text-gray-500">Automatically save your work</p>
          </div>
          <button
            onClick={() => onUpdate({ autoSave: !preferences.autoSave })}
            className={`w-10 h-6 rounded-full transition-all duration-200 ${
              preferences.autoSave ? 'bg-cyan-500' : 'bg-gray-600'
            }`}
            aria-label="Toggle auto-save"
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-all duration-200 mt-1 ${
              preferences.autoSave ? 'ml-5' : 'ml-1'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5">
          <div>
            <p className="text-sm text-white">Voice Assistant</p>
            <p className="text-xs text-gray-500">Enable voice commands</p>
          </div>
          <button
            onClick={() => onUpdate({ voiceEnabled: !preferences.voiceEnabled })}
            className={`w-10 h-6 rounded-full transition-all duration-200 ${
              preferences.voiceEnabled ? 'bg-cyan-500' : 'bg-gray-600'
            }`}
            aria-label="Toggle voice assistant"
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-all duration-200 mt-1 ${
              preferences.voiceEnabled ? 'ml-5' : 'ml-1'
            }`} />
          </button>
        </div>
      </div>

      {/* Language */}
      <div>
        <label className="text-sm text-gray-400 block mb-1.5">Language</label>
        <select
          value={preferences.language}
          onChange={(e) => onUpdate({ language: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/30 transition-colors"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang} className="bg-[#0a0f1e]">
              {lang}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}