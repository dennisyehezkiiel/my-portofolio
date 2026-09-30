"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/lib/data";

export function Timeline() {
  const listRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(0);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 55%"],
  });

  return (
    <section id="experience" className="px-4 py-24 md:py-28 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading index="02" title="Experience" note="click to expand" />

        <div ref={listRef} className="relative mt-14 pl-10 sm:pl-14">
          <div
            aria-hidden
            className="absolute bottom-0 left-[11px] top-0 w-0.5 bg-line sm:left-[19px]"
          >
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="h-full w-full origin-top bg-lime shadow-[0_0_14px_var(--color-lime)]"
            />
          </div>

          <ol className="space-y-6">
            {experience.map((job, i) => {
              const isOpen = open === i;
              return (
                <motion.li
                  key={job.company + job.period}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <span
                    aria-hidden
                    className={`absolute -left-10 top-0 size-6 rounded-full border-2 bg-ink transition-colors sm:-left-12 ${
                      isOpen
                        ? "border-lime shadow-[0_0_12px_var(--color-lime)]"
                        : "border-line"
                    }`}
                  />
                  <div
                    className={`rounded-xl border bg-surface transition-colors ${isOpen ? "border-violet/60" : "border-line hover:border-muted"}`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`role-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
                    >
                      <span>
                        <span className="block font-mono text-xs text-muted">
                          {job.period}
                        </span>
                        <span className="mt-1 block font-display text-xl font-bold sm:text-2xl">
                          {job.role}{" "}
                          <span className="text-violet">@ {job.company}</span>
                        </span>
                        <span className="mt-2 block text-muted">
                          {job.summary}
                        </span>
                      </span>
                      <ChevronDown
                        aria-hidden
                        className={`mt-1 shrink-0 text-muted transition-transform duration-300 ${isOpen ? "rotate-180 text-lime" : ""}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.ul
                          id={`role-${i}`}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-2 border-t border-line px-5 pb-6 pt-4 sm:px-6"
                        >
                          {job.highlights.map((h) => (
                            <li key={h} className="flex gap-3 text-sm">
                              <span aria-hidden className="font-mono text-lime">
                                +
                              </span>
                              {h}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
