"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef, type PointerEvent } from "react";
import { Stagger, StaggerItem } from "@/components/ui/animation-wrapper";
import { Magnetic } from "@/components/ui/magnetic";
import { profile } from "@/lib/data";
import { Terminal } from "./terminal";

export function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  // Write CSS vars directly: no React re-render per pointer move.
  function onMove(e: PointerEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    bgRef.current?.style.setProperty("--mx", `${e.clientX - r.left}px`);
    bgRef.current?.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <section
      id="top"
      onPointerMove={onMove}
      className="relative isolate flex min-h-svh items-center overflow-hidden px-4 pb-32 pt-20 sm:px-8"
    >
      <div ref={bgRef} aria-hidden className="hero-bg absolute inset-0 -z-10" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
        <Stagger>
          <StaggerItem>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
              <span className="size-2 animate-pulse rounded-full bg-lime" />
              available for new work
            </p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="font-display text-[clamp(2.75rem,7.5vw,6.25rem)] font-extrabold leading-[0.92] tracking-tight">
              I build systems that <span className="bg-lime px-2 text-ink">don&apos;t page</span> you at 3am.
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-6 max-w-xl text-lg text-muted">
              <span className="text-fg">{profile.name}</span> — {profile.role}. Distributed backends, fast frontends, and
              the boring infrastructure that keeps both alive.
            </p>
          </StaggerItem>
          <StaggerItem className="mt-10 flex flex-wrap gap-4">
            <Magnetic>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-lime px-6 py-3.5 font-bold text-ink transition-shadow hover:shadow-[0_0_40px_-4px_var(--color-lime)]"
              >
                See the work <ArrowUpRight aria-hidden size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center rounded-lg border-2 border-fg/80 px-6 py-3 font-bold transition-colors hover:border-violet hover:text-violet"
              >
                Get in touch
              </a>
            </Magnetic>
          </StaggerItem>
        </Stagger>

        <Stagger delay={0.35}>
          <StaggerItem>
            <Terminal />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
