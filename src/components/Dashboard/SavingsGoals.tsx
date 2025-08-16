import React from 'react';
import { Card } from '../UI/Card';
import { ProgressBar } from '../UI/ProgressBar';
import { Button } from '../UI/Button';
import { Plus, Calendar, DollarSign } from 'lucide-react';
import { useFinanceStore } from '../../store/financeStore';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export const SavingsGoals: React.FC = () => {
  const { savingsGoals } = useFinanceStore();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Savings Goals</h3>
          <Button size="sm" variant="outline">
            <Plus size={16} className="mr-1" />
            Add Goal
          </Button>
        </div>

        <div className="space-y-4">
          {savingsGoals.map((goal, index) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const daysLeft = Math.ceil(
              (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
            );

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{goal.title}</h4>
                    {goal.description && (
                      <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                    )}
                  </div>
                  {goal.imageUrl && (
                    <img
                      src={goal.imageUrl}
                      alt={goal.title}
                      className="w-12 h-12 rounded-lg object-cover ml-3"
                    />
                  )}
                </div>

                <div className="space-y-3">
                  <ProgressBar
                    progress={progress}
                    color={progress >= 100 ? 'success' : progress >= 75 ? 'primary' : 'secondary'}
                    showPercentage
                  />

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <DollarSign size={14} className="mr-1" />
                        ${goal.currentAmount} / ${goal.targetAmount}
                      </span>
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                      </span>
                    </div>
                    <span className={`font-medium ${
                      progress >= 100 ? 'text-success' : 
                      daysLeft < 30 ? 'text-warning' : 'text-gray-700'
                    }`}>
                      ${(goal.targetAmount - goal.currentAmount).toFixed(0)} to go
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {savingsGoals.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Target size={48} className="mx-auto mb-3 text-gray-300" />
              <p>No savings goals yet</p>
              <p className="text-sm">Create your first goal to start saving!</p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};