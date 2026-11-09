import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './SalesPieChart.css';
// If formatCurrency is located in src/utils/formatCurrency.js:
import { formatCurrency } from "../utils/formatCurrency";
export default function SalesPieChart({ data }) {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <h3 className="chart-title">Sales by Category</h3>
          <p className="chart-subtitle">Revenue distribution by category</p>
        </div>
      </div>

      <div className="recharts-wrapper-container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Share']}
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                borderRadius: '8px',
                border: '1px solid #C8A44D' 
              }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}