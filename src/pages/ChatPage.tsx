import React from 'react';
import { ChatInterface } from '../components/Chat/ChatInterface';

export const ChatPage: React.FC = () => {
  return (
    <div className="pb-20 lg:pb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">AI Finance Buddy</h1>
        <p className="text-gray-600">
          Chat with Finn, your AI-powered finance assistant. Ask about budgeting, expenses, savings goals, or get personalized advice!
        </p>
      </div>
      <ChatInterface />
    </div>
  );
};