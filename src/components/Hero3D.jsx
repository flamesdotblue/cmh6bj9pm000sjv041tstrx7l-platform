import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero3D() {
  return (
    <div className="relative h-[80vh] md:h-[90vh]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,0,31,0.0)_0%,rgba(11,11,18,0.6)_55%,rgba(11,11,18,0.95)_100%)]" />

      <div className="relative z-10 h-full container mx-auto px-4 flex items-center">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-semibold leading-[1.1] tracking-tight"
          >
            Call. See. Type.
            <span className="block bg-gradient-to-r from-fuchsia-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">All in one cyber interface.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-4 text-white/70 text-base sm:text-lg"
          >
            A futuristic 3D communication hub that blends voice, video, and chat into a single animated canvas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#video" className="inline-flex items-center rounded-full bg-fuchsia-500/80 hover:bg-fuchsia-500 text-black font-medium px-5 py-2.5 transition-colors">Start video</a>
            <a href="#voice" className="inline-flex items-center rounded-full border border-white/20 hover:border-white/40 text-white px-5 py-2.5 transition-colors">Make a call</a>
            <a href="#chat" className="inline-flex items-center rounded-full border border-white/10 hover:border-white/30 text-white/90 px-5 py-2.5 transition-colors">Open chat</a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
