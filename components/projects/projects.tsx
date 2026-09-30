"use client";

import { ArrowUpRight, Code } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type PointerEvent } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects, type Project } from "@/lib/data";
import { useMediaQuery } from "@/lib/use-media-query";

export function Projects() {
  // Pinned horizontal scroll on desktop; native swipe carousel on touch / reduced motion.
  const pinned = useMediaQuery("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (p) => {
    const track = trackRef.current;
    return track ? -p * Math.max(0, track.scrollWidth - innerWidth) : 0;
  });

  // Keyboard users: tabbing into an off-screen card scrolls the page to reveal it.
  function reveal(i: number) {
    const el = sectionRef.current;
    if (!pinned || !el) return;
    const top = el.getBoundingClientRect().top + scrollY;
    scrollTo({ top: top + ((el.offsetHeight - innerHeight) * i) / (projects.length - 1) });
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={pinned ? { height: `${projects.length * 75}vh` } : undefined}
      className="relative"
    >
      <div className={pinned ? "sticky top-0 flex h-svh flex-col justify-center gap-12 overflow-clip" : "py-24"}>
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
          <SectionHeading index="01" title="Selected work" note={pinned ? "scroll →" : "swipe →"} />
        </div>
        <motion.div
          ref={trackRef}
          style={pinned ? { x } : undefined}
          className={
            pinned
              ? "flex w-max gap-8 px-[max(2rem,calc((100vw-72rem)/2+2rem))]"
              : "mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 sm:px-8"
          }
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} onFocus={() => reveal(i)} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const tiltSpring = { stiffness: 200, damping: 18 };

function ProjectCard({ project: p, index, onFocus }: { project: Project; index: number; onFocus: () => void }) {
  const reduce = useReducedMotion();
  const rotateX = useSpring(0, tiltSpring);
  const rotateY = useSpring(0, tiltSpring);

  function onMove(e: PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    rotateY.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    rotateX.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
  }

  return (
    <motion.article
      onPointerMove={onMove}
      onPointerLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      onFocus={onFocus}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className="group relative flex min-h-[26rem] w-[82vw] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-[border-color,box-shadow] hover:border-violet/70 hover:shadow-[0_0_70px_-18px_var(--color-violet)] sm:w-[26rem] md:h-[60svh] md:w-[min(44vw,34rem)]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 -top-10 font-display text-[11rem] font-extrabold leading-none text-line/70 transition-colors group-hover:text-violet/20"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div style={{ transform: "translateZ(40px)" }}>
        <p className="font-mono text-xs text-muted">{p.year}</p>
        <h3 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">{p.title}</h3>
        <p className="mt-4 max-w-md text-muted">{p.blurb}</p>
      </div>

      <div style={{ transform: "translateZ(60px)" }} className="mt-8 space-y-6">
        <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
          {p.stack.map((s) => (
            <li key={s} className="rounded border border-lime/40 px-2 py-0.5 font-mono text-xs text-lime">
              {s}
            </li>
          ))}
        </ul>
        <div className="flex gap-5 font-mono text-sm">
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-lime">
              Live demo <ArrowUpRight aria-hidden size={16} />
              <span className="sr-only">for {p.title} (opens in new tab)</span>
            </a>
          )}
          {p.source && (
            <a href={p.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-lime">
              <Code aria-hidden size={16} /> Source
              <span className="sr-only">code for {p.title} (opens in new tab)</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
