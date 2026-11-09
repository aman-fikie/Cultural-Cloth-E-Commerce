import React from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  Tooltip, CartesianGrid 
} from 'recharts';
import { formatCurrency } from '../utils/formatCurrency';
import './RevenueChart.css';

export default function RevenueChart({ data }) {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <h3 className="chart-title">Revenue Performance</h3>
          <p className="chart-subtitle">Monthly financial velocity vs projection milestones</p>
        </div>
        <div className="chart-legend-pills">
          <span className="legend-pill revenue">Revenue</span>
          <span className="legend-pill target">Target</span>
        </div>
      </div>

      <div className="recharts-wrapper-container">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7A1E2C" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#7A1E2C" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#FAF6EF" vertical={false} />
            <XAxis dataKey="month" stroke="#757575" fontSize={12} tickLine={false} />
            <YAxis 
              stroke="#757575" 
              fontSize={12} 
              tickLine={false} 
              tickFormatter={(val) => `$${val / 1000}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #C8A44D', 
                borderRadius: '8px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.06)'
              }}
              formatter={(value) => [formatCurrency(value), '']}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#7A1E2C" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#revenueGrad)" 
            />
            <Area 
              type="monotone" 
              dataKey="target" 
              stroke="#C8A44D" 
              strokeWidth={2} 
              strokeDasharray="4 4" 
              fill="none" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}