import React, { useRef, useState } from 'react';
import { Send } from 'lucide-react';

export default function ChatPanel() {
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: 'Welcome to Nebula chat. How can I help?' },
  ]);
  const [input, setInput] = useState('');
  const listRef = useRef(null);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg = { id: Date.now(), from: 'me', text };
    setMessages((m) => [...m, userMsg]);
    setInput('');

    setTimeout(() => {
      const reply = { id: Date.now() + 1, from: 'bot', text: 'Echo: ' + text };
      setMessages((m) => [...m, reply]);
      if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
    }, 500);
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="grid md:grid-cols-3 gap-6 p-6 sm:p-8">
        <div className="md:col-span-2">
          <div ref={listRef} className="h-80 overflow-y-auto rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${m.from === 'me' ? 'bg-fuchsia-500 text-black' : 'bg-white/10 text-white'} max-w-[75%] rounded-2xl px-4 py-2 text-sm`}>{m.text}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-end gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              rows={2}
              placeholder="Type a message..."
              className="w-full resize-none rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-fuchsia-400/60 placeholder:text-white/40"
            />
            <button onClick={send} className="h-[42px] shrink-0 inline-flex items-center gap-2 rounded-xl bg-fuchsia-500/90 hover:bg-fuchsia-500 text-black font-medium px-4 transition-colors">
              <Send className="h-4 w-4" /> Send
            </button>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="h-full rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="font-medium tracking-tight">Presence</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-white/80">You</span>
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </li>
              <li className="flex items-center justify-between">
                <span className="text-white/60">Astronaut</span>
                <span className="h-2 w-2 rounded-full bg-orange-400" />
              </li>
              <li className="flex items-center justify-between">
                <span className="text-white/60">Synth</span>
                <span className="h-2 w-2 rounded-full bg-sky-400" />
              </li>
            </ul>
            <p className="mt-4 text-xs text-white/50">Tip: Press Enter to send, Shift+Enter for a new line.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
