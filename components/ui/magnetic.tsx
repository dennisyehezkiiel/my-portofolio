"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

const spring = { stiffness: 220, damping: 15, mass: 0.3 };

export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const reduce = useReducedMotion();
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  }

  return (
    <motion.div
      className="inline-block"
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
