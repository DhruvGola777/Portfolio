import React from 'react';
import useAnalytics from '../hooks/useAnalytics';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const AdminAnalytics = () => {
  const { data, loading, refetch } = useAnalytics();

  if (loading) {
    return <div className="text-gray-400 p-8 text-center">Loading analytics data...</div>;
  }

  // Calculate totals
  const totalViews = data.reduce((acc, curr) => acc + curr.views, 0);
  const totalVisitors = data.reduce((acc, curr) => acc + curr.visitors, 0);
  const totalMobile = data.reduce((acc, curr) => acc + curr.mobile, 0);
  const totalDesktop = data.reduce((acc, curr) => acc + curr.desktop, 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Analytics Dashboard (Last 30 Days)</h2>
        <button 
          onClick={refetch}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
        >
          Refresh Data
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <p className="text-sm text-gray-400 mb-1">Total Views</p>
          <p className="text-3xl font-bold">{totalViews}</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <p className="text-sm text-gray-400 mb-1">Unique Visitors</p>
          <p className="text-3xl font-bold">{totalVisitors}</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <p className="text-sm text-gray-400 mb-1">Mobile Users</p>
          <p className="text-3xl font-bold">{totalMobile}</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <p className="text-sm text-gray-400 mb-1">Desktop Users</p>
          <p className="text-3xl font-bold">{totalDesktop}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl h-[400px]">
        <h3 className="text-lg font-medium mb-6">Traffic Overview</h3>
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            No data recorded yet. Visit the homepage to generate data!
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
              <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#000000', borderColor: '#ffffff20', borderRadius: '8px' }}
                itemStyle={{ color: '#ffffff' }}
              />
              <Legend />
              <Line type="monotone" dataKey="views" name="Page Views" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="visitors" name="Unique Visitors" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;
