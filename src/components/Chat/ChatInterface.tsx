import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Smile } from 'lucide-react';
import { Button } from '../UI/Button';
import { Card } from '../UI/Card';
import { ChatMessage, Transaction } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { useFinanceStore } from '../../store/financeStore';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hey there! 👋 I'm Finn, your AI finance buddy! I'm here to help you track your money, reach your savings goals, and learn about personal finance. What would you like to talk about today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addTransaction } = useFinanceStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAIResponse = (userInput: string): ChatMessage => {
    const input = userInput.toLowerCase();
    
    // Simple keyword-based responses (in a real app, this would use OpenAI API)
    if (input.includes('spend') || input.includes('bought') || input.includes('paid')) {
      return {
        id: Date.now().toString(),
        text: "I can help you track that expense! Can you tell me how much you spent and what category it was for? (like food, entertainment, shopping, etc.)",
        sender: 'ai',
        timestamp: new Date(),
        type: 'text',
      };
    }
    
    if (input.includes('save') || input.includes('goal')) {
      return {
        id: Date.now().toString(),
        text: "That's awesome that you want to save money! 💰 What are you saving for? I can help you set up a savings goal and track your progress. Setting specific goals makes it much easier to save!",
        sender: 'ai',
        timestamp: new Date(),
        type: 'text',
      };
    }
    
    if (input.includes('budget')) {
      return {
        id: Date.now().toString(),
        text: "Budgeting is super important! 📊 Based on your recent spending, I notice you spend the most on food and entertainment. Would you like me to suggest some ways to optimize your budget?",
        sender: 'ai',
        timestamp: new Date(),
        type: 'text',
      };
    }

    if (input.match(/\$?\d+/)) {
      const amount = parseFloat(input.match(/\d+\.?\d*/)?.[0] || '0');
      if (amount > 0) {
        // Simulate adding a transaction based on context
        const transaction: Omit<Transaction, 'id'> = {
          userId: '1',
          amount,
          category: 'Other',
          description: `Expense from chat: ${userInput}`,
          type: 'expense',
          date: new Date(),
        };
        
        setTimeout(() => addTransaction(transaction), 500);
        
        return {
          id: Date.now().toString(),
          text: `Got it! I've recorded a $${amount} expense for you. 📝 To help categorize this better, what did you spend it on? Was it for food, entertainment, shopping, transportation, or something else?`,
          sender: 'ai',
          timestamp: new Date(),
          type: 'transaction',
          data: { amount, category: 'Other' },
        };
      }
    }

    // Default responses
    const responses = [
      "That's interesting! Tell me more about your financial goals. I'm here to help you manage your money better! 💫",
      "I love helping teens learn about money! What specific area would you like to explore - budgeting, saving, or tracking expenses? 🎯",
      "Great question! Managing money as a teen is all about building good habits early. What's your biggest financial challenge right now? 🤔",
      "Money management can be fun when you have the right tools! Have you checked out your dashboard to see your spending patterns? 📈",
    ];

    return {
      id: Date.now().toString(),
      text: responses[Math.floor(Math.random() * responses.length)],
      sender: 'ai',
      timestamp: new Date(),
      type: 'text',
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <Card className="flex-1 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-xs">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-end space-x-2">
            <div className="flex-1 relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about your finances, expenses, or savings goals..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
              <button
                onClick={() => {/* Emoji picker */}}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Smile size={20} />
              </button>
            </div>
            
            <button
              onClick={toggleListening}
              className={`p-3 rounded-full transition-colors ${
                isListening 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            
            <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <Send size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};