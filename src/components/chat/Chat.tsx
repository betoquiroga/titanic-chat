'use client';
import { useState } from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { chatService } from '../../services/chat.service';
import { 
  createUserMessage, 
  createAssistantMessage, 
  convertMessagesToOpenAIFormat 
} from '../../services/chat.helpers';
import type { Message } from '../../types/chat.types';

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = createUserMessage(inputValue.trim());
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      const history = convertMessagesToOpenAIFormat([...messages, userMessage]);
      const response = await chatService.sendMessage({
        message: userMessage.content,
        history
      });

      const assistantMessage = createAssistantMessage(
        response.choices[0]?.message?.content || 'Lo siento, no pude procesar tu mensaje.'
      );
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError('Error al enviar el mensaje. Por favor, intenta de nuevo.');
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex-1 flex flex-col">
        <MessageList messages={messages} />
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border-t border-red-200 dark:border-red-800">
            <div className="text-red-600 dark:text-red-400 text-sm">{error}</div>
          </div>
        )}
      </div>
      <MessageInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}; 