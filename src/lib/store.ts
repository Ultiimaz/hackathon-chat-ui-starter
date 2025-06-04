import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Message types
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Chat types
export interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

// Store types
interface ChatState {
  messages: Message[];
  chatHistory: Chat[];
  currentChatId: string | null;
  isGenerating: boolean;
  
  // Actions
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  createNewChat: () => void;
  loadChat: (chatId: string) => void;
  updateChatTitle: (userMessage: string) => void;
  clearAllData: () => void;
  setIsGenerating: (isGenerating: boolean) => void;
}

// Create store with persistence
export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      chatHistory: [],
      currentChatId: null,
      isGenerating: false,
      
      // Set all messages
      setMessages: (messages) => set({ messages }),
      
      // Add a single message
      addMessage: (message) => {
        const { messages, currentChatId, chatHistory } = get();
        const newMessages = [...messages, message];
        
        // Update state
        set({ messages: newMessages });
        
        // Update chat in history
        if (currentChatId) {
          const updatedHistory = chatHistory.map(chat => 
            chat.id === currentChatId 
              ? { ...chat, messages: newMessages } 
              : chat
          );
          set({ chatHistory: updatedHistory });
        }
      },
      
      // Create a new chat
      createNewChat: () => {
        const newChatId = Date.now().toString();
        const newChat = {
          id: newChatId,
          title: 'New Chat',
          messages: []
        };
        
        set({ 
          currentChatId: newChatId,
          messages: [],
          chatHistory: [newChat, ...get().chatHistory]
        });
      },
      
      // Load a chat from history
      loadChat: (chatId) => {
        const chat = get().chatHistory.find(c => c.id === chatId);
        if (chat) {
          set({
            currentChatId: chat.id,
            messages: [...chat.messages]
          });
        }
      },
      
      // Update chat title based on first user message
      updateChatTitle: (userMessage) => {
        const { currentChatId, chatHistory } = get();
        if (!currentChatId) return;
        
        const chatIndex = chatHistory.findIndex(chat => chat.id === currentChatId);
        if (chatIndex === -1) return;
        
        // Update title if it's still the default
        if (chatHistory[chatIndex].title === 'New Chat') {
          const title = userMessage.substring(0, 30) + (userMessage.length > 30 ? '...' : '');
          const updatedHistory = [...chatHistory];
          updatedHistory[chatIndex] = {
            ...updatedHistory[chatIndex],
            title
          };
          set({ chatHistory: updatedHistory });
        }
      },
      
      // Clear all data
      clearAllData: () => {
        set({
          messages: [],
          chatHistory: [],
          currentChatId: null
        });
        
        // Create a new chat after clearing
        get().createNewChat();
      },
      
      // Set generating state
      setIsGenerating: (isGenerating) => set({ isGenerating })
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({
        chatHistory: state.chatHistory
      })
    }
  )
);

// Theme store
interface ThemeState {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme })
    }),
    {
      name: 'theme-storage'
    }
  )
);