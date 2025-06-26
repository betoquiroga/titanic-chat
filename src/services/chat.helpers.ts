import type { Message } from '../types/chat.types';
import type { OpenAIMessage } from '../interfaces/api.interfaces';

export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const convertMessagesToOpenAIFormat = (messages: Message[]): OpenAIMessage[] => {
  return messages.map(message => ({
    role: message.role,
    content: message.content
  }));
};

export const createUserMessage = (content: string): Message => ({
  id: generateId(),
  role: 'user',
  content,
  timestamp: new Date()
});

export const createAssistantMessage = (content: string): Message => ({
  id: generateId(),
  role: 'assistant',
  content,
  timestamp: new Date()
}); 