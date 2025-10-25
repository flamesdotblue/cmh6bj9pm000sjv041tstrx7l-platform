import React from 'react';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import CallPanel from './components/CallPanel';
import VideoChat from './components/VideoChat';
import ChatPanel from './components/ChatPanel';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0b12] text-white antialiased"> 
      <Navbar />
      <main>
        <section id="home" className="relative">
          <Hero3D />
        </section>

        <section id="voice" className="relative container mx-auto px-4 py-16 sm:py-24">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Ultra-clear voice calls</h2>
              <p className="text-sm sm:text-base text-white/60 mt-2">Crystal voice pipeline with spatial UI controls.</p>
            </div>
          </div>
          <CallPanel />
        </section>

        <section id="video" className="relative bg-gradient-to-b from-white/0 via-white/[0.02] to-white/[0.04]">
          <div className="container mx-auto px-4 py-16 sm:py-24">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Holographic video rooms</h2>
                <p className="text-sm sm:text-base text-white/60 mt-2">Latency-aware video with cinematic controls.</p>
              </div>
            </div>
            <VideoChat />
          </div>
        </section>

        <section id="chat" className="relative container mx-auto px-4 py-16 sm:py-24">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Realtime chat</h2>
              <p className="text-sm sm:text-base text-white/60 mt-2">Type, send, react — all in a neon flow.</p>
            </div>
          </div>
          <ChatPanel />
        </section>
      </main>

      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center text-white/50 text-sm">
          © {new Date().getFullYear()} Nebula Comms — A futuristic communication experience
        </div>
      </footer>
    </div>
  );
}
