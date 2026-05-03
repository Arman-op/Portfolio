"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // Replace with actual formspree endpoint, e.g., "https://formspree.io/f/your_id"
      const response = await fetch("https://formspree.io/f/placeholder", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg("Failed to send transmission. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-20 px-8 max-w-3xl mx-auto relative">
      <div className="pixel-border-cyan p-2 inline-block bg-neo-bg mb-12">
        <h2 className="text-4xl text-neo-cyan uppercase px-4 py-2">Terminal</h2>
      </div>

      <div className="pixel-border bg-zinc-900 p-8 relative">
        <div className="mb-6 border-b-4 border-zinc-700 pb-4 flex gap-2">
          <div className="w-4 h-4 bg-red-500 pixel-border"></div>
          <div className="w-4 h-4 bg-yellow-500 pixel-border"></div>
          <div className="w-4 h-4 bg-green-500 pixel-border"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-neo-cyan text-lg">{">"} ENTER_EMAIL:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="bg-black text-neo-white pixel-border p-4 outline-none focus:border-neo-cyan focus:ring-0"
              placeholder="player@domain.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-neo-cyan text-lg">{">"} ENTER_MESSAGE:</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="bg-black text-neo-white pixel-border p-4 outline-none focus:border-neo-cyan focus:ring-0 resize-none"
              placeholder="Type your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="pixel-btn bg-neo-cyan text-neo-bg text-xl px-4 py-4 uppercase font-bold mt-4 disabled:opacity-50"
          >
            {status === "submitting" ? "TRANSMITTING..." : "SEND_MESSAGE"}
          </button>
        </form>

        {status === "error" && (
          <div className="mt-4 text-red-500 font-bold uppercase">{errorMsg}</div>
        )}
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          >
            <div className="pixel-border-magenta bg-neo-bg p-8 text-center max-w-md w-full">
              <h3 className="text-4xl text-neo-magenta uppercase mb-4 animate-bounce">Level Up!</h3>
              <p className="text-xl text-neo-white mb-8">Message transmitted successfully.</p>
              <button
                onClick={() => setStatus("idle")}
                className="pixel-btn bg-neo-white text-neo-black px-6 py-2 uppercase font-bold"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
