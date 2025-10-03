import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { ChartData } from '../../types';

interface LocationChartProps {
  data: ChartData[];
}

const COLORS = ['#3b82f6', '#818cf8', '#a78bfa', '#c084fc', '#e879f9', '#f472b6'];

export const LocationChart: React.FC<LocationChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-center text-text-secondary">No location data available.</div>;
  }
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis type="number" stroke="#64748b" allowDecimals={false} />
        <YAxis dataKey="name" type="category" stroke="#64748b" width={80} tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', color: '#1e293b' }}
          cursor={{ fill: 'rgba(79, 70, 229, 0.05)' }}
        />
        <Bar dataKey="value" name="Employees">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
