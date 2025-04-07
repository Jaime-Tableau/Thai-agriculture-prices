import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
  } from 'recharts';
  
  const PriceChart = ({ data }) => {
    if (!data || data.length === 0) return null;
  
    // Sort by date
    const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  
    return (
      <div className="bg-white p-4 border rounded shadow mt-6">
        <h2 className="text-lg font-semibold mb-2">Average Price Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sorted}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="avg_price" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default PriceChart;
  