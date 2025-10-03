import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { ChartData } from '../../types';

interface ClientChartProps {
  data: ChartData[];
  onClientClick: (client: string) => void;
}

const COLORS = ['#3b82f6', '#818cf8', '#a78bfa', '#c084fc', '#e879f9', '#f472b6'];

export const ClientChart: React.FC<ClientChartProps> = ({ data, onClientClick }) => {
  if (!data || data.length === 0) {
    return <div className="text-center text-text-secondary">No client data available.</div>;
  }
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 80 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
          dataKey="name" 
          type="category" 
          stroke="#64748b" 
          tick={{ fontSize: 10 }} 
          angle={-45}
          textAnchor="end"
          interval={0}
        />
        <YAxis stroke="#64748b" allowDecimals={false} />
        <Tooltip
          contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', color: '#1e293b' }}
          cursor={{ fill: 'rgba(79, 70, 229, 0.05)' }}
        />
        <Bar dataKey="value" name="Employees" onClick={(d) => onClientClick(d.name)} cursor="pointer">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};