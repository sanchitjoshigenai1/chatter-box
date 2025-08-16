import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card } from '../UI/Card';
import { useFinanceStore } from '../../store/financeStore';
import { motion } from 'framer-motion';

const COLORS = ['#14b8a6', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981', '#06b6d4'];

export const ExpenseChart: React.FC = () => {
  const { stats } = useFinanceStore();

  if (!stats || stats.topCategories.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>No expense data available</p>
        </div>
      </Card>
    );
  }

  const data = stats.topCategories
    .filter(cat => cat.amount > 0)
    .map((cat, index) => ({
      name: cat.category,
      value: cat.amount,
      color: COLORS[index % COLORS.length],
    }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-primary-600">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {data.map((entry, index) => (
            <div key={entry.name} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600 truncate">{entry.name}</span>
              <span className="text-sm font-medium">${entry.value.toFixed(0)}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};