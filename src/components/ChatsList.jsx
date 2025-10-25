import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatsList({ chats, activeChatId, onSelect }) {
  return (
    <div className="h-[calc(100vh-5.5rem)] rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <div className="p-3 border-b border-white/10 text-xs uppercase tracking-widest text-white/60">Chats</div>
      <div className="p-2 space-y-2 overflow-y-auto h-[calc(100%-44px)]">
        <AnimatePresence initial={false}>
          {chats.map((c, i) => (
            <motion.button
              key={c.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, delay: i * 0.03 }}
              onClick={() => onSelect(c.id)}
              className={`w-full text-left group rounded-xl border px-3 py-2.5 flex items-center gap-3 transition-all ${
                activeChatId === c.id
                  ? 'bg-fuchsia-500/10 border-fuchsia-400/30'
                  : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.06]'
              }`}
            >
              <div className="h-10 w-10 rounded-full bg-white/10 grid place-items-center text-lg border border-white/10">
                <span>{c.avatar}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">{c.name}</p>
                  {c.unread > 0 && (
                    <span className="ml-2 shrink-0 rounded-full bg-fuchsia-500 text-black text-[10px] font-semibold px-2 py-0.5">{c.unread}</span>
                  )}
                </div>
                <p className="text-sm text-white/60 truncate">{c.lastMessage}</p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
