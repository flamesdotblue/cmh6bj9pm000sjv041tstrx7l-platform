import React from 'react';
import { MessageSquare, Search } from 'lucide-react';

export default function TopBar({ onMenu }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/20 backdrop-blur supports-[backdrop-filter]:bg-black/20">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <button
          onClick={onMenu}
          className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          aria-label="Open chats"
        >
          <span className="i">≡</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-fuchsia-500/30 blur-md" />
            <MessageSquare className="relative h-5 w-5 text-fuchsia-400" />
          </div>
          <span className="font-semibold tracking-tight">Neon Chat</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1.5">
            <Search className="h-4 w-4 text-white/60" />
            <input
              placeholder="Search"
              className="bg-transparent outline-none text-sm placeholder:text-white/40 w-40"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
