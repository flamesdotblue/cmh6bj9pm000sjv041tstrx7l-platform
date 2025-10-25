import React from 'react';
import { Plus, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingActions() {
  return (
    <div className="fixed right-4 bottom-4 z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.2 }}
        className="flex flex-col items-end gap-2"
      >
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur px-3 py-1.5 text-sm transition-colors shadow-lg"
        >
          <User className="h-4 w-4" /> New contact
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.06, rotate: 7 }}
          whileTap={{ scale: 0.98 }}
          aria-label="New chat"
          className="h-12 w-12 grid place-items-center rounded-full bg-fuchsia-500 text-black shadow-xl"
        >
          <Plus className="h-6 w-6" />
        </motion.button>
      </motion.div>
    </div>
  );
}
