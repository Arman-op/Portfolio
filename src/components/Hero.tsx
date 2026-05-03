"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [text, setText] = useState("");
  const fullText = "Full-Stack Developer & Neo-Retro UI Architect.";

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      if (i <= fullText.length) {
        setText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      <div className="absolute top-10 left-10 pixel-border bg-neo-bg p-4 flex flex-col items-center">
        <span className="text-neo-cyan font-bold text-2xl">LVL</span>
        <span className="text-4xl text-neo-magenta">05</span>
        <span className="text-sm">EXP</span>
      </div>

      <motion.div
        className="w-48 h-48 pixel-border bg-zinc-800 mb-8 flex items-center justify-center overflow-hidden"
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }}
      >
        {/* Placeholder for pixel avatar */}
        <div className="w-32 h-32 bg-neo-cyan pixel-border-magenta relative">
           <div className="absolute top-8 left-4 w-6 h-6 bg-neo-bg"></div>
           <div className="absolute top-8 right-4 w-6 h-6 bg-neo-bg"></div>
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-4 bg-neo-bg"></div>
        </div>
      </motion.div>

      <h1 className="text-5xl md:text-7xl font-bold mb-4 uppercase text-neo-white">
        Player One
      </h1>
      <h2 className="text-2xl md:text-4xl text-neo-cyan min-h-[4rem]">
        {text}<span className="animate-pulse">_</span>
      </h2>

      <div className="mt-12">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pixel-btn bg-neo-magenta text-neo-bg text-2xl px-8 py-4 font-bold uppercase"
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Press Start
        </motion.button>
      </div>
    </section>
  );
}
