import React from 'react';
import { Rocket, Phone, Video, MessageSquare } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/[0.02] border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="group inline-flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-fuchsia-500/30 blur-md" />
              <Rocket className="relative h-6 w-6 text-fuchsia-400" />
            </div>
            <span className="font-semibold tracking-tight">Nebula Comms</span>
          </a>

          <nav className="hidden sm:flex items-center gap-6 text-sm text-white/80">
            <a href="#voice" className="hover:text-white inline-flex items-center gap-2 transition-colors">
              <Phone className="h-4 w-4" /> Voice
            </a>
            <a href="#video" className="hover:text-white inline-flex items-center gap-2 transition-colors">
              <Video className="h-4 w-4" /> Video
            </a>
            <a href="#chat" className="hover:text-white inline-flex items-center gap-2 transition-colors">
              <MessageSquare className="h-4 w-4" /> Chat
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a href="#video" className="rounded-full bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 text-sm">Launch</a>
          </div>
        </div>
      </div>
    </header>
  );
}
