import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  status?: 'building' | 'done' | 'error';
}

interface AIResponse {
  message: string;
  html: string | null;
}

export const useAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      content: 'مرحبًا. أنا Chat2Site، وكيلك الذكي لبناء المواقع. أخبرني عن مشروعك وسأبدأ البناء فورًا.',
      timestamp: new Date(),
      status: 'done',
    },
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [projectDescription, setProjectDescription] = useState('');
  const [generatedHTML, setGeneratedHTML] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isStreaming) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsStreaming(true);

    // Update project description for context
    if (!projectDescription && content.length > 20) {
      setProjectDescription(content);
    }

    // Prepare messages for API
    const apiMessages = [...messages, userMessage]
      .filter(m => m.type === 'user' || m.type === 'agent')
      .map(m => ({
        role: m.type === 'user' ? 'user' : 'assistant',
        content: m.content,
      }));

    const assistantId = (Date.now() + 1).toString();

    // Add placeholder for assistant response
    setMessages(prev => [
      ...prev,
      {
        id: assistantId,
        type: 'agent',
        content: '',
        timestamp: new Date(),
        status: 'building',
      },
    ]);

    try {
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: {
          messages: apiMessages,
          projectDescription,
        },
      });

      if (error) {
        throw new Error(error.message || 'فشل في الاتصال');
      }

      const response = data as AIResponse;
      
      // Update message with response
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, content: response.message || 'تم التنفيذ', status: 'done' }
            : m
        )
      );

      // Update generated HTML if available
      if (response.html) {
        setGeneratedHTML(response.html);
      }

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = error instanceof Error ? error.message : 'خطأ غير معروف';
      
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, content: `❌ ${errorMessage}`, status: 'error' }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  }, [messages, isStreaming, projectDescription]);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: '1',
        type: 'agent',
        content: 'مرحبًا. أنا Chat2Site، وكيلك الذكي لبناء المواقع. أخبرني عن مشروعك وسأبدأ البناء فورًا.',
        timestamp: new Date(),
        status: 'done',
      },
    ]);
    setProjectDescription('');
    setGeneratedHTML(null);
  }, []);

  return {
    messages,
    isStreaming,
    sendMessage,
    clearMessages,
    generatedHTML,
  };
};
