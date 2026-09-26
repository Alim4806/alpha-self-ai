export default function RecentActivity() {
  const activities = [
    { id: 1, action: 'Chat with ALION', time: '2 mins ago', status: 'Completed' },
    { id: 2, action: 'Uploaded PDF report.pdf', time: '1 hour ago', status: 'Processed' },
    { id: 3, action: 'Voice command: "Set reminder"', time: '3 hours ago', status: 'Failed' },
  ];

  return (
    <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <h3 className="text-sm font-medium text-white mb-4">Recent Activity</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-white/5">
              <th className="pb-2 font-medium">Action</th>
              <th className="pb-2 font-medium">Time</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((item) => (
              <tr key={item.id} className="border-b border-white/5 last:border-0">
                <td className="py-3 text-white">{item.action}</td>
                <td className="py-3 text-gray-400">{item.time}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'Completed' || item.status === 'Processed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}