import React, { useMemo, useState } from 'react';
import TopBar from './components/TopBar';
import ChatsList from './components/ChatsList';
import ChatWindow from './components/ChatWindow';
import FloatingActions from './components/FloatingActions';

export default function App() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [chats] = useState([
    {
      id: 'astro',
      name: 'Astronaut',
      avatar: '🧑‍🚀',
      lastMessage: 'See you in orbit!',
      unread: 2,
    },
    {
      id: 'synth',
      name: 'Synth',
      avatar: '🤖',
      lastMessage: 'Calibrating vibes...',
      unread: 0,
    },
    {
      id: 'nova',
      name: 'Nova',
      avatar: '🌌',
      lastMessage: 'Sending the star map now.',
      unread: 1,
    },
  ]);

  const initialMessages = useMemo(
    () => ({
      astro: [
        { id: 1, from: 'them', text: 'Touchdown complete.' },
        { id: 2, from: 'me', text: 'Copy that. Systems green?' },
        { id: 3, from: 'them', text: 'All nominal. See you in orbit!' },
      ],
      synth: [
        { id: 1, from: 'them', text: 'Calibrating vibes...' },
      ],
      nova: [
        { id: 1, from: 'them', text: 'Hey! The new star map looks insane.' },
      ],
    }),
    []
  );

  const [messagesByChat, setMessagesByChat] = useState(initialMessages);
  const [activeChatId, setActiveChatId] = useState(chats[0]?.id || '');

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];
  const messages = messagesByChat[activeChat?.id] || [];

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const newMsg = { id: Date.now(), from: 'me', text: text.trim() };
    setMessagesByChat((prev) => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMsg],
    }));

    setTimeout(() => {
      setMessagesByChat((prev) => ({
        ...prev,
        [activeChat.id]: [
          ...(prev[activeChat.id] || []),
          { id: Date.now() + 1, from: 'them', text: 'Echo: ' + text.trim() },
        ],
      }));
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0b0b12] text-white antialiased">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(255,0,184,0.14),transparent),radial-gradient(1200px_600px_at_120%_110%,rgba(70,21,255,0.16),transparent)]" />

      <TopBar onMenu={() => setMobileSidebarOpen(true)} />

      <div className="container mx-auto px-4 pb-4">
        <div className="mt-4 grid md:grid-cols-[320px_1fr] gap-4">
          <div className="hidden md:block">
            <ChatsList
              chats={chats}
              activeChatId={activeChatId}
              onSelect={(id) => setActiveChatId(id)}
            />
          </div>

          <div className="md:hidden" />

          <ChatWindow
            chat={activeChat}
            messages={messages}
            onSend={sendMessage}
          />
        </div>
      </div>

      <FloatingActions />

      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="absolute left-0 top-0 h-full w-[86%] max-w-sm bg-[#111117] border-r border-white/10 p-3">
            <ChatsList
              chats={chats}
              activeChatId={activeChatId}
              onSelect={(id) => {
                setActiveChatId(id);
                setMobileSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
