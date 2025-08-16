import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  MessageCircle,
  CreditCard,
  Target,
  BookOpen,
  Trophy,
  Settings,
  BarChart3,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'AI Chat', href: '/chat', icon: MessageCircle },
  { name: 'Expenses', href: '/expenses', icon: CreditCard },
  { name: 'Goals', href: '/goals', icon: Target },
  { name: 'Learn', href: '/education', icon: BookOpen },
  { name: 'Achievements', href: '/achievements', icon: Trophy },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:bg-white lg:border-r lg:border-gray-200">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">FT</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">FinTeen</h1>
              <p className="text-xs text-gray-500">AI Finance Manager</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex-grow flex flex-col">
          <nav className="flex-1 px-4 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 border-r-2 border-primary-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon
                  className="mr-3 h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="px-4 pb-4">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg p-4 text-white">
            <div className="flex items-center space-x-3">
              <BarChart3 size={24} />
              <div>
                <h3 className="font-medium">Level 5</h3>
                <p className="text-sm opacity-90">1,250 points</p>
              </div>
            </div>
            <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
              <div className="bg-white rounded-full h-2 w-3/4"></div>
            </div>
            <p className="text-xs mt-1 opacity-75">250 points to next level</p>
          </div>
        </div>
      </div>
    </div>
  );
};