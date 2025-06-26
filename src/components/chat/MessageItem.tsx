'use client';
import type { Message } from '../../types/chat.types';
import { User, Bot } from 'lucide-react';

type MessageItemProps = {
  message: Message;
};

export const MessageItem = ({ message }: MessageItemProps) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex gap-3 p-4 ${isUser ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-800'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-500' : 'bg-green-500'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium mb-1">
          {isUser ? 'Tú' : 'Asistente'}
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {message.content}
        </div>
        <div className="text-xs text-gray-500 mt-2">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}; 