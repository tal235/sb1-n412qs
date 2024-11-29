import { create } from 'zustand';
import { Chat, Message } from '../types/chat';
import { generateResponse } from '../lib/gemini';

interface ChatStore {
  chats: Chat[];
  currentChat: Chat | null;
  createNewChat: () => void;
  sendMessage: (content: string) => Promise<void>;
  setCurrentChat: (chatId: string) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  currentChat: null,

  createNewChat: () => {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
    };

    set((state) => ({
      chats: [newChat, ...state.chats],
      currentChat: newChat,
    }));
  },

  sendMessage: async (content: string) => {
    const { currentChat } = get();
    if (!currentChat) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    set((state) => ({
      currentChat: {
        ...currentChat,
        messages: [...currentChat.messages, userMessage],
      },
    }));

    try {
      const response = await generateResponse(content);
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      set((state) => ({
        currentChat: {
          ...currentChat,
          messages: [...currentChat.messages, assistantMessage],
        },
      }));
    } catch (error) {
      console.error('Failed to generate response:', error);
    }
  },

  setCurrentChat: (chatId: string) => {
    const { chats } = get();
    const chat = chats.find((c) => c.id === chatId);
    if (chat) {
      set({ currentChat: chat });
    }
  },
}));