'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', chats: 12 },
  { name: 'Tue', chats: 19 },
  { name: 'Wed', chats: 15 },
  { name: 'Thu', chats: 27 },
  { name: 'Fri', chats: 22 },
  { name: 'Sat', chats: 34 },
  { name: 'Sun', chats: 30 },
];

export default function ActivityChart() {
  return (
    <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm h-72">
      <h3 className="text-sm font-medium text-white mb-4">Chat Activity (Weekly)</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
          <YAxis stroke="#94A3B8" fontSize={12} />
          <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: '8px' }} />
          <Line type="monotone" dataKey="chats" stroke="#06B6D4" strokeWidth={2} dot={{ fill: '#06B6D4' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}