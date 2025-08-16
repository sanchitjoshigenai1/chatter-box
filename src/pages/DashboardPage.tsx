import React, { useEffect } from 'react';
import { StatsGrid } from '../components/Dashboard/StatsGrid';
import { ExpenseChart } from '../components/Dashboard/ExpenseChart';
import { SavingsGoals } from '../components/Dashboard/SavingsGoals';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Plus, TrendingUp, AlertCircle, Target } from 'lucide-react';
import { useFinanceStore } from '../store/financeStore';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';

export const DashboardPage: React.FC = () => {
  const { fetchStats, stats, transactions } = useFinanceStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const recentTransactions = transactions.slice(0, 5);

  const quickActions = [
    {
      title: 'Add Expense',
      description: 'Log a new expense',
      icon: Plus,
      color: 'bg-red-500',
      action: () => console.log('Add expense'),
    },
    {
      title: 'Set Goal',
      description: 'Create a savings goal',
      icon: Target,
      color: 'bg-green-500',
      action: () => console.log('Set goal'),
    },
    {
      title: 'Chat with AI',
      description: 'Get financial advice',
      icon: TrendingUp,
      color: 'bg-blue-500',
      action: () => console.log('Open chat'),
    },
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-lg opacity-90">
              You're doing great with your finances. Here's your overview for today.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <div className="text-sm opacity-75">Your Level</div>
            <div className="text-3xl font-bold">Level {user?.level}</div>
            <div className="text-sm opacity-75">{user?.totalPoints} points</div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <StatsGrid />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Expense Chart */}
          <ExpenseChart />

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              
              <div className="space-y-3">
                {recentTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <span className="text-sm">
                          {transaction.category.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {recentTransactions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No transactions yet</p>
                  <p className="text-sm">Add your first expense or income!</p>
                </div>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <button
                    key={action.title}
                    onClick={action.action}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                      <action.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{action.title}</p>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Savings Goals */}
          <SavingsGoals />

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertCircle className="text-primary-500" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">Today's Tip</h3>
              </div>
              <div className="bg-primary-50 rounded-lg p-4">
                <p className="text-sm text-primary-700 leading-relaxed">
                  💡 Try the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings. 
                  It's a simple way to balance your spending and build wealth over time!
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};