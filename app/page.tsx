import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/hero/hero";
import { Projects } from "@/components/projects/projects";
import { Timeline } from "@/components/timeline/timeline";
import { Stagger, StaggerItem } from "@/components/ui/animation-wrapper";
import { Magnetic } from "@/components/ui/magnetic";
import { profile } from "@/lib/data";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Projects />
      <Timeline />

      <section
        id="contact"
        className="border-t border-line px-4 pb-28 md:pb-40 pt-20 md:pt-28 sm:px-8"
      >
        <Stagger className="mx-auto max-w-6xl">
          <StaggerItem>
            <p className="font-mono text-sm text-lime">03 — contact</p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,8vw,7rem)] font-extrabold leading-[0.9] tracking-tight">
              Got a gnarly system?
              <br />
              <span className="text-violet">Let&apos;s talk.</span>
            </h2>
          </StaggerItem>
          <StaggerItem className="mt-12 flex flex-wrap items-center gap-6">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-lg bg-lime px-7 py-4 text-sm md:text-lg font-bold text-ink transition-shadow hover:shadow-[0_0_50px_-6px_var(--color-lime)]"
              >
                {profile.email} <ArrowUpRight aria-hidden size={20} />
              </a>
            </Magnetic>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-muted hover:text-fg"
            >
              GitHub ↗
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-muted hover:text-fg"
            >
              LinkedIn ↗
            </a>
          </StaggerItem>
        </Stagger>
        <p className="mx-auto mt-24 max-w-6xl font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. Hand-built, no templates
          harmed.
        </p>
      </section>
    </main>
  );
}
