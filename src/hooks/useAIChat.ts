import { useState, useCallback } from 'react';

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  status?: 'building' | 'done' | 'error';
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-ai`;

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

    // Prepare messages for API (excluding system messages)
    const apiMessages = [...messages, userMessage]
      .filter(m => m.type === 'user' || m.type === 'agent')
      .map(m => ({
        role: m.type === 'user' ? 'user' : 'assistant',
        content: m.content,
      }));

    let assistantContent = '';
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
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: apiMessages,
          projectDescription,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'فشل في الاتصال');
      }

      if (!response.body) {
        throw new Error('لا يوجد استجابة');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        // Process SSE lines
        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const deltaContent = parsed.choices?.[0]?.delta?.content;
            if (deltaContent) {
              assistantContent += deltaContent;
              setMessages(prev =>
                prev.map(m =>
                  m.id === assistantId
                    ? { ...m, content: assistantContent, status: 'building' }
                    : m
                )
              );
            }
          } catch {
            // Incomplete JSON, put back and wait
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Mark as done
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId ? { ...m, status: 'done' } : m
        )
      );

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
  }, []);

  return {
    messages,
    isStreaming,
    sendMessage,
    clearMessages,
  };
};
