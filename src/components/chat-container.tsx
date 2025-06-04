import { useState, useEffect } from 'react';
import { useChatStore } from '@/lib/store';
import { ChatSidebar } from './chat/chat-sidebar';
import { ChatMessages } from './chat/chat-messages';
import { ChatInput } from './chat/chat-input';
import { ClearDataDialog } from './chat/clear-data-dialog';
import { useTranslation } from 'react-i18next';
import { formatMarkdown } from '@/lib/utils';

export function ChatContainer() {
  const { t } = useTranslation();
  const { 
    messages,
    isGenerating,
    addMessage,
    createNewChat,
    updateChatTitle,
    clearAllData,
    setIsGenerating
  } = useChatStore();
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  
  // Create a new chat on first load if no chat exists
  useEffect(() => {
    if (messages.length === 0) {
      createNewChat();
    }
  }, [messages.length, createNewChat]);
  
  // Handle sending a message
  const handleSendMessage = async (content: string) => {
    // Add user message to state
    addMessage({ role: 'user', content });
    
    // Update chat title if it's the first message
    updateChatTitle(content);
    
    // Set generating state
    setIsGenerating(true);
    
    try {
      /////////////////// BACKEND CALL HERE ///////////////////
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add AI response
      const aiResponse = 'This is some response from your API';
      addMessage({
        role: 'assistant',
        content: formatMarkdown(aiResponse)
      });
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage({
        role: 'assistant',
        content: t('errorMessage')
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <>
      <div className="flex h-screen bg-background">
        <ChatSidebar onOpenClearModal={() => setIsClearModalOpen(true)} />
        <div className="flex-1 flex flex-col h-full">
          <ChatMessages 
            messages={messages} 
            isGenerating={isGenerating} 
          />
          <ChatInput 
            onSubmit={handleSendMessage}
            isGenerating={isGenerating}
          />
        </div>
      </div>
      
      <ClearDataDialog 
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onClearData={clearAllData}
      />
    </>
  );
}