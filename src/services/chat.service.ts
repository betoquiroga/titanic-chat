import { httpService } from './http.service';
import type { ChatRequest } from '../interfaces/api.interfaces';
import type { OpenAIResponse } from '../interfaces/api.interfaces';

class ChatService {
  async sendMessage(request: ChatRequest): Promise<OpenAIResponse> {
    return httpService.post<OpenAIResponse>('/api/chat', request);
  }
}

export const chatService = new ChatService(); 