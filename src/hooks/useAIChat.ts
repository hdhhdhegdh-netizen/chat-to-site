import { useState, useCallback, useEffect } from 'react';
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

export const useAIChat = (projectId?: string) => {
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

  // Load previous messages if projectId is provided
  useEffect(() => {
    if (projectId) {
      loadMessages(projectId);
    }
  }, [projectId]);

  const loadMessages = async (projId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('project_id', projId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        const loadedMessages: Message[] = data.map(msg => ({
          id: msg.id,
          type: msg.role === 'user' ? 'user' : 'agent',
          content: msg.content,
          timestamp: new Date(msg.created_at),
          status: 'done',
        }));
        
        setMessages([
          {
            id: '0',
            type: 'agent',
            content: 'مرحبًا. أنا Chat2Site، وكيلك الذكي لبناء المواقع. أخبرني عن مشروعك وسأبدأ البناء فورًا.',
            timestamp: new Date(),
            status: 'done',
          },
          ...loadedMessages,
        ]);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const saveMessage = async (projId: string, role: string, content: string) => {
    try {
      await supabase.from('chat_messages').insert({
        project_id: projId,
        role,
        content,
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const sendMessage = useCallback(async (content: string, currentProjectId?: string) => {
    if (!content.trim() || isStreaming) return;

    const projId = currentProjectId || projectId;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsStreaming(true);

    // Save user message to database
    if (projId) {
      saveMessage(projId, 'user', content);
    }

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
          previousHtml: generatedHTML,
        },
      });

      if (error) {
        throw new Error(error.message || 'فشل في الاتصال');
      }

      const response = data as AIResponse;
      
      // Update message with response
      const responseMessage = response.message || 'تم التنفيذ';
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, content: responseMessage, status: 'done' }
            : m
        )
      );

      // Save assistant message to database
      if (projId) {
        saveMessage(projId, 'assistant', responseMessage);
      }

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
  }, [messages, isStreaming, projectDescription, generatedHTML, projectId]);

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
    setGeneratedHTML,
  };
};
