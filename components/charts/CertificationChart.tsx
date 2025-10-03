import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { ChartData } from '../../types';

interface CertificationChartProps {
  data: ChartData[];
  onCertificationClick: (certification: string) => void;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: {
  cx: number;
  cy: number;
  midAngle?: number;
  innerRadius: number;
  outerRadius: number;
  percent?: number;
}) => {
  if (midAngle === undefined || percent === undefined || percent < 0.05) {
    return null;
  }

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="#ffffff" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


export const CertificationChart: React.FC<CertificationChartProps> = ({ data, onCertificationClick }) => {
   if (!data || data.length === 0) {
    return <div className="text-center text-text-secondary">No certification data available.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={110}
          fill="#8884d8"
          dataKey="value"
          onClick={(d) => onCertificationClick(d.name)}
          cursor="pointer"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', color: '#1e293b' }}
        />
        <Legend iconSize={10} />
      </PieChart>
    </ResponsiveContainer>
  );
};