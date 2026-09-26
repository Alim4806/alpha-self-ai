import { SettingsData } from '../page';
import { User, Mail, Camera } from 'lucide-react';

interface ProfileSectionProps {
  profile: SettingsData['profile'];
  onUpdate: (data: Partial<SettingsData['profile']>) => void;
}

export default function ProfileSection({ profile, onUpdate }: ProfileSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white">Profile Settings</h3>
        <p className="text-sm text-gray-400 mt-1">
          Manage your personal information
        </p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/20">
            {profile.avatar}
          </div>
          <button
            className="absolute bottom-0 right-0 p-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
            aria-label="Change avatar"
          >
            <Camera size={14} />
          </button>
        </div>
        <div className="text-sm text-gray-400">
          <p className="text-white font-medium">{profile.name}</p>
          <p>{profile.email}</p>
          <button className="text-cyan-400 hover:text-cyan-300 text-xs mt-1 transition-colors">
            Change avatar
          </button>
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="text-sm text-gray-400 block mb-1.5">Full Name</label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-cyan-400/30 transition-colors"
        />
      </div>

      {/* Email */}
      <div>
        <label className="text-sm text-gray-400 block mb-1.5">Email Address</label>
        <input
          type="email"
          value={profile.email}
          onChange={(e) => onUpdate({ email: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-cyan-400/30 transition-colors"
        />
      </div>

      {/* Note */}
      <div className="text-xs text-gray-500 bg-white/5 p-3 rounded-lg border border-white/5">
        <p>💡 Your profile information is used to personalize your ALION experience.</p>
      </div>
    </div>
  );
}