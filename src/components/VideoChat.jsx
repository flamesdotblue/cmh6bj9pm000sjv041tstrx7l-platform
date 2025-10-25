import React, { useEffect, useRef, useState } from 'react';
import { Video, VideoOff, Mic, MicOff, PhoneOff, User } from 'lucide-react';

export default function VideoChat() {
  const localVideoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [videoOn, setVideoOn] = useState(false);
  const [micOn, setMicOn] = useState(true);

  useEffect(() => {
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [stream]);

  const startVideo = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(s);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = s;
      }
      setVideoOn(true);
      setMicOn(true);
    } catch (e) {
      console.error(e);
      alert('Camera or microphone is blocked. Please allow permissions.');
    }
  };

  const stopVideo = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
    }
    setStream(null);
    setVideoOn(false);
  };

  const toggleMic = () => {
    if (!stream) return;
    const audioTracks = stream.getAudioTracks();
    audioTracks.forEach((t) => (t.enabled = !t.enabled));
    setMicOn((m) => !m);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="grid lg:grid-cols-3 gap-6 p-6 sm:p-8">
        <div className="lg:col-span-2">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-fuchsia-900/40 via-indigo-900/30 to-black border border-white/10">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 h-full w-full object-cover"
            />
            {!videoOn && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <User className="h-8 w-8 text-white/80" />
                  </div>
                  <p className="text-white/70">Camera is off</p>
                </div>
              </div>
            )}

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg.black/40 backdrop-blur px-2 py-2 border border-white/10">
              {!videoOn ? (
                <button onClick={startVideo} className="inline-flex items-center gap-2 rounded-full bg-fuchsia-500/90 hover:bg-fuchsia-500 text-black font-medium px-4 py-2 transition-colors">
                  <Video className="h-4 w-4" /> Start
                </button>
              ) : (
                <button onClick={stopVideo} className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2 transition-colors">
                  <VideoOff className="h-4 w-4" /> Stop
                </button>
              )}
              <button
                onClick={toggleMic}
                disabled={!videoOn}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 transition-colors ${videoOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-white/5 text-white/50 cursor-not-allowed'}`}
              >
                {micOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />} {micOn ? 'Mute' : 'Unmute'}
              </button>
              {videoOn && (
                <button onClick={stopVideo} className="inline-flex items-center gap-2 rounded-full bg-red-500/90 hover:bg-red-500 text-white font-medium px-4 py-2 transition-colors">
                  <PhoneOff className="h-4 w-4" /> Hang up
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="h-full rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="font-medium tracking-tight">Remote preview</h3>
            <p className="text-xs text-white/60 mt-1">Waiting for participant...</p>
            <div className="mt-4 aspect-video rounded-lg border border-white/10 bg-[linear-gradient(110deg,rgba(255,255,255,0.06)_8%,rgba(255,255,255,0.01)_18%,rgba(255,255,255,0.06)_33%)] bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />
            <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>Encrypted stream</li>
              <li>Adaptive bitrate</li>
              <li>Spatial audio ready</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
