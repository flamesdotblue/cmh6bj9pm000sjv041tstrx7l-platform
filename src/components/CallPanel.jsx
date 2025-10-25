import React, { useState } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2 } from 'lucide-react';

export default function CallPanel() {
  const [number, setNumber] = useState('');
  const [inCall, setInCall] = useState(false);
  const [muted, setMuted] = useState(false);
  const [ringing, setRinging] = useState(false);

  const startCall = () => {
    if (!number.trim()) return;
    setRinging(true);
    setTimeout(() => {
      setRinging(false);
      setInCall(true);
    }, 1200);
  };

  const endCall = () => {
    setInCall(false);
    setMuted(false);
    setRinging(false);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-2xl">
      <div className="absolute -inset-0.5 bg-gradient-to-br from-fuchsia-500/10 via-purple-500/10 to-indigo-500/10 blur-2xl pointer-events-none" />

      <div className="relative p-6 sm:p-8">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <label className="text-xs uppercase tracking-widest text-white/60">Call ID or Number</label>
            <div className="mt-2 flex items-center gap-3">
              <input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="e.g., +1 555 0123 or @astronaut"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none ring-0 placeholder:text-white/40 focus:border-fuchsia-400/60"
              />
              {!inCall ? (
                <button onClick={startCall} className="inline-flex items-center gap-2 rounded-xl bg-fuchsia-500/90 hover:bg-fuchsia-500 text-black font-medium px-4 py-3 transition-colors">
                  <Phone className="h-4 w-4" /> Call
                </button>
              ) : (
                <button onClick={endCall} className="inline-flex items-center gap-2 rounded-xl bg-red-500/90 hover:bg-red-500 text-white font-medium px-4 py-3 transition-colors">
                  <PhoneOff className="h-4 w-4" /> Hang up
                </button>
              )}
            </div>
            <p className="mt-2 text-sm text-white/60 h-5">
              {ringing && 'Ringing...'}
              {inCall && !ringing && 'In call — secure, end-to-end.'}
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
              <button
                onClick={() => setMuted((m) => !m)}
                disabled={!inCall}
                className={`rounded-lg px-3 py-2 transition-colors ${inCall ? 'hover:bg-white/10' : 'opacity-50 cursor-not-allowed'}`}
              >
                {muted ? <MicOff className="h-5 w-5 text-white" /> : <Mic className="h-5 w-5 text-white" />}
              </button>
              <div className="h-6 w-px bg-white/10" />
              <button disabled className="rounded-lg px-3 py-2 opacity-50 cursor-not-allowed">
                <Volume2 className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
