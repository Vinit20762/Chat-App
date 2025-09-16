"use client";
import { Card } from "./ui/card-hover-effect";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { cn } from "../lib/utils";

export function CardHoverEffectDemo() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const cards = [
    {
      title: "Create Room",
      buttonLabel: "Create Room",
    },
    {
      title: "Join Room",
      buttonLabel: "Join Room",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>

          <Card>
            <h4 className="text-zinc-100 font-bold tracking-wide text-xl">
              {card.title}
            </h4>
            <div className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 text-zinc-200 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-slate-600"
              />
              <input
                type="text"
                placeholder="Enter room name"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 text-zinc-200 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-slate-600"
              />
              <button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition hover: cursor-pointer">
                {card.buttonLabel}
              </button>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
