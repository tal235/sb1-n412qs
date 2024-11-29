import React from 'react';
import { PlusCircle, MessageSquare } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';

export function Sidebar() {
  const { chats, createNewChat, currentChat, setCurrentChat } = useChatStore();

  return (
    <div className="bg-[#202123] w-64 h-screen p-2 flex flex-col">
      <button
        onClick={createNewChat}
        className="border border-gray-600 rounded-md p-3 text-white flex items-center gap-3 hover:bg-gray-700 transition-colors"
      >
        <PlusCircle size={16} />
        New chat
      </button>

      <div className="mt-4 flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setCurrentChat(chat.id)}
            className={`w-full text-left p-3 rounded-md flex items-center gap-3 hover:bg-gray-700 transition-colors ${
              currentChat?.id === chat.id ? 'bg-gray-700' : ''
            }`}
          >
            <MessageSquare size={16} className="text-gray-400" />
            <span className="text-white truncate">{chat.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}