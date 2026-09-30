"use client";

import { motion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/use-media-query";

const spring = { stiffness: 500, damping: 40, mass: 0.4 };

// Decorative follower. Native cursor stays visible; skipped on touch and reduced motion.
export function Cursor() {
  const enabled = useMediaQuery("(pointer: fine) and (prefers-reduced-motion: no-preference)");
  const [hover, setHover] = useState(false);
  const x = useSpring(-100, spring);
  const y = useSpring(-100, spring);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHover(!!(e.target as Element).closest("a, button, input, [data-cursor]"));
    };
    addEventListener("pointermove", move);
    return () => removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] size-12 rounded-full bg-lime mix-blend-difference"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      animate={{ scale: hover ? 1 : 0.25 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    />
  );
}
