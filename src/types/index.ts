export interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  avatar?: string;
  level: number;
  totalPoints: number;
  joinedAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  currency: string;
  monthlyBudget: number;
  savingsGoal: number;
  notifications: boolean;
  theme: 'light' | 'dark';
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  category: string;
  description: string;
  type: 'income' | 'expense';
  date: Date;
  tags?: string[];
  location?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  budget?: number;
}

export interface SavingsGoal {
  id: string;
  userId: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  description?: string;
  imageUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  requirement: string;
  unlockedAt?: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  points: number;
  progress: number;
  target: number;
  expiresAt: Date;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'transaction' | 'goal' | 'tip';
  data?: any;
}

export interface EducationalContent {
  id: string;
  title: string;
  content: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  points: number;
  imageUrl?: string;
}

export interface Quiz {
  id: string;
  contentId: string;
  questions: QuizQuestion[];
  passingScore: number;
  points: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface DashboardStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
  budgetUsage: number;
  topCategories: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
}