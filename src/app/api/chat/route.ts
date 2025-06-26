import { NextRequest, NextResponse } from 'next/server';
import type { ChatRequest, OpenAIRequest } from '../../../interfaces/api.interfaces';

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message, history } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'El mensaje es requerido' },
        { status: 400 }
      );
    }

    const openAIKey = process.env.OPENAI_API_KEY;
    if (!openAIKey) {
      return NextResponse.json(
        { error: 'API key de OpenAI no configurada' },
        { status: 500 }
      );
    }

    const messages = [
      {
        role: 'system' as const,
        content: 'Eres un asistente útil y amigable. Responde de manera clara y concisa.'
      },
      ...history,
      {
        role: 'user' as const,
        content: message
      }
    ];

    const openAIRequest: OpenAIRequest = {
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 1000,
      temperature: 0.7
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openAIKey}`
      },
      body: JSON.stringify(openAIRequest)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return NextResponse.json(
        { error: 'Error al comunicarse con OpenAI' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 