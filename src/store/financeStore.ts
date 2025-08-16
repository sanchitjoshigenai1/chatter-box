import { create } from 'zustand';
import { Transaction, SavingsGoal, DashboardStats, Category } from '../types';

interface FinanceState {
  transactions: Transaction[];
  savingsGoals: SavingsGoal[];
  categories: Category[];
  stats: DashboardStats | null;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id'>) => void;
  updateSavingsGoal: (id: string, goal: Partial<SavingsGoal>) => void;
  fetchStats: () => void;
}

const defaultCategories: Category[] = [
  { id: '1', name: 'Food & Dining', icon: '🍔', color: '#ef4444', budget: 150 },
  { id: '2', name: 'Entertainment', icon: '🎮', color: '#8b5cf6', budget: 100 },
  { id: '3', name: 'Shopping', icon: '🛍️', color: '#f59e0b', budget: 200 },
  { id: '4', name: 'Transportation', icon: '🚌', color: '#06b6d4', budget: 50 },
  { id: '5', name: 'Education', icon: '📚', color: '#10b981', budget: 100 },
  { id: '6', name: 'Health', icon: '💊', color: '#ec4899', budget: 50 },
  { id: '7', name: 'Other', icon: '📦', color: '#6b7280', budget: 50 },
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: '1',
    amount: 25,
    category: 'Food & Dining',
    description: 'Lunch with friends',
    type: 'expense',
    date: new Date('2024-12-15'),
    tags: ['social', 'restaurant'],
  },
  {
    id: '2',
    userId: '1',
    amount: 100,
    category: 'Entertainment',
    description: 'Monthly allowance',
    type: 'income',
    date: new Date('2024-12-01'),
  },
  {
    id: '3',
    userId: '1',
    amount: 15,
    category: 'Transportation',
    description: 'Bus card top-up',
    type: 'expense',
    date: new Date('2024-12-14'),
  },
  {
    id: '4',
    userId: '1',
    amount: 45,
    category: 'Shopping',
    description: 'New headphones',
    type: 'expense',
    date: new Date('2024-12-13'),
  },
];

export const useFinanceStore = create<FinanceState>((set, get) => ({
  transactions: mockTransactions,
  savingsGoals: [
    {
      id: '1',
      userId: '1',
      title: 'New iPhone',
      targetAmount: 800,
      currentAmount: 320,
      deadline: new Date('2024-06-15'),
      description: 'Saving for the latest iPhone model',
      imageUrl: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
    },
    {
      id: '2',
      userId: '1',
      title: 'College Fund',
      targetAmount: 5000,
      currentAmount: 1200,
      deadline: new Date('2025-08-01'),
      description: 'Emergency fund for college expenses',
    },
  ],
  categories: defaultCategories,
  stats: null,

  addTransaction: (transaction) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    set((state) => ({
      transactions: [newTransaction, ...state.transactions],
    }));
    get().fetchStats();
  },

  updateTransaction: (id, updatedTransaction) => {
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updatedTransaction } : t
      ),
    }));
    get().fetchStats();
  },

  deleteTransaction: (id) => {
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    }));
    get().fetchStats();
  },

  addSavingsGoal: (goal) => {
    const newGoal: SavingsGoal = {
      ...goal,
      id: Date.now().toString(),
    };
    set((state) => ({
      savingsGoals: [...state.savingsGoals, newGoal],
    }));
  },

  updateSavingsGoal: (id, updatedGoal) => {
    set((state) => ({
      savingsGoals: state.savingsGoals.map((g) =>
        g.id === id ? { ...g, ...updatedGoal } : g
      ),
    }));
  },

  fetchStats: () => {
    const { transactions, categories } = get();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyTransactions = transactions.filter((t) => {
      const transactionDate = new Date(t.date);
      return (
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    });

    const monthlyIncome = monthlyTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyExpenses = monthlyTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = transactions.reduce((balance, t) => {
      return t.type === 'income' ? balance + t.amount : balance - t.amount;
    }, 0);

    const categoryExpenses = categories.map((category) => {
      const amount = monthlyTransactions
        .filter((t) => t.type === 'expense' && t.category === category.name)
        .reduce((sum, t) => sum + t.amount, 0);
      
      return {
        category: category.name,
        amount,
        percentage: monthlyExpenses > 0 ? (amount / monthlyExpenses) * 100 : 0,
      };
    }).sort((a, b) => b.amount - a.amount);

    const budgetUsage = monthlyExpenses / 500; // Assuming $500 monthly budget
    const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0;

    set({
      stats: {
        totalBalance,
        monthlyIncome,
        monthlyExpenses,
        savingsRate,
        budgetUsage,
        topCategories: categoryExpenses.slice(0, 5),
      },
    });
  },
}));