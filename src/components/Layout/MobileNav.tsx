import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageCircle, CreditCard, Target, BookOpen } from 'lucide-react';

const mobileNavigation = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Chat', href: '/chat', icon: MessageCircle },
  { name: 'Expenses', href: '/expenses', icon: CreditCard },
  { name: 'Goals', href: '/goals', icon: Target },
  { name: 'Learn', href: '/education', icon: BookOpen },
];

export const MobileNav: React.FC = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-5 gap-1">
        {mobileNavigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-3 text-xs transition-colors ${
                isActive
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`
            }
          >
            <item.icon size={20} className="mb-1" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};