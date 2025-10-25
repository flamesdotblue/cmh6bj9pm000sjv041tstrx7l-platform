import React, { useEffect, useRef, useState } from 'react';
import { Phone, Video, MoreVertical, Send, Smile, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatWindow({ chat, messages, onSend }) {
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, typing, chat?.id]);

  useEffect(() => {
    if (!input.trim()) {
      const t = setTimeout(() => setTyping(false), 150);
      return () => clearTimeout(t);
    }
    setTyping(true);
    const t = setTimeout(() => setTyping(false), 1200);
    return () => clearTimeout(t);
  }, [input]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    onSend(text);
    setInput('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!chat) return null;

  return (
    <div className="h-[calc(100vh-5.5rem)] rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden flex flex-col">
      <div className="h-14 flex items-center justify-between px-4 border-b border-white/10 backdrop-blur bg-black/10">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-white/10 grid place-items-center text-base border border-white/10">
            <span>{chat.avatar}</span>
          </div>
          <div>
            <p className="font-medium leading-none">{chat.name}</p>
            <p className="text-xs text-white/60 mt-0.5">online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 w-9 grid place-items-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors" aria-label="Voice call">
            <Phone className="h-4 w-4" />
          </button>
          <button className="h-9 w-9 grid place-items-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors" aria-label="Video call">
            <Video className="h-4 w-4" />
          </button>
          <button className="h-9 w-9 grid place-items-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors" aria-label="More">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div ref={listRef} className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-2 bg-[linear-gradient(110deg,rgba(255,255,255,0.04)_8%,rgba(255,255,255,0.01)_18%,rgba(255,255,255,0.04)_33%)] bg-[length:200%_100%] animate-[shimmer_6s_infinite]">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`${
                  m.from === 'me'
                    ? 'bg-fuchsia-500 text-black'
                    : 'bg-white/10 text-white'
                } max-w-[78%] rounded-2xl px-4 py-2 text-sm shadow-sm border ${
                  m.from === 'me' ? 'border-fuchsia-300/40' : 'border-white/10'
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex justify-start"
            >
              <div className="bg-white/10 text-white max-w-[60%] rounded-2xl px-3 py-2 text-sm border border-white/10">
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/70 animate-bounce [animation-delay:0ms] inline-block" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/70 animate-bounce [animation-delay:120ms] inline-block" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/70 animate-bounce [animation-delay:240ms] inline-block" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-3 sm:p-4 border-t border-white/10">
        <div className="flex items-end gap-2">
          <button className="h-10 w-10 grid place-items-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors" aria-label="Attach">
            <Paperclip className="h-4 w-4" />
          </button>
          <div className="flex-1 relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-500/20 to-violet-500/0 rounded-2xl blur opacity-70" />
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Message"
              className="relative w-full resize-none rounded-2xl bg-white/5 border border-white/10 px-4 py-2.5 outline-none placeholder:text-white/40 focus:border-fuchsia-400/60"
            />
          </div>
          <button className="h-10 w-10 grid place-items-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors" aria-label="Emoji">
            <Smile className="h-4 w-4" />
          </button>
          <button
            onClick={handleSend}
            className="h-10 shrink-0 inline-flex items-center gap-2 rounded-xl bg-fuchsia-500/90 hover:bg-fuchsia-500 text-black font-medium px-4 transition-colors"
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
