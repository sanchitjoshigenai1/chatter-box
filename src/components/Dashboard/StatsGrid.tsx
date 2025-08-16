import React from 'react';
import { Card } from '../UI/Card';
import { ProgressBar } from '../UI/ProgressBar';
import { TrendingUp, TrendingDown, DollarSign, Target, PiggyBank } from 'lucide-react';
import { useFinanceStore } from '../../store/financeStore';
import { motion } from 'framer-motion';

export const StatsGrid: React.FC = () => {
  const { stats } = useFinanceStore();

  if (!stats) return null;

  const { totalBalance, monthlyIncome, monthlyExpenses, savingsRate, budgetUsage } = stats;

  const statCards = [
    {
      title: 'Total Balance',
      value: `$${totalBalance.toFixed(2)}`,
      icon: DollarSign,
      color: totalBalance >= 0 ? 'text-success' : 'text-error',
      bgColor: totalBalance >= 0 ? 'bg-green-50' : 'bg-red-50',
    },
    {
      title: 'Monthly Income',
      value: `$${monthlyIncome.toFixed(2)}`,
      icon: TrendingUp,
      color: 'text-success',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Monthly Expenses',
      value: `$${monthlyExpenses.toFixed(2)}`,
      icon: TrendingDown,
      color: 'text-error',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      icon: PiggyBank,
      color: savingsRate > 20 ? 'text-success' : 'text-warning',
      bgColor: savingsRate > 20 ? 'bg-green-50' : 'bg-yellow-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card hover className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="lg:col-span-4"
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Budget Usage</h3>
            <span className="text-sm text-gray-500">
              ${monthlyExpenses.toFixed(2)} / $500.00
            </span>
          </div>
          <ProgressBar
            progress={budgetUsage * 100}
            color={budgetUsage > 0.8 ? 'error' : budgetUsage > 0.6 ? 'warning' : 'success'}
            showPercentage
            label="Monthly Budget"
          />
          {budgetUsage > 0.8 && (
            <div className="mt-3 p-3 bg-red-50 rounded-lg">
              <p className="text-sm text-red-700">
                ⚠️ You're approaching your monthly budget limit. Consider reviewing your expenses.
              </p>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};