"use client";

import { Briefcase, FolderGit2, House, Mail, type LucideIcon } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

const items: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "top", label: "Home", icon: House },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "contact", label: "Contact", icon: Mail },
];

function useActiveSection() {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

export function DockNav() {
  const mouseX = useMotionValue(Infinity);
  const active = useActiveSection();

  return (
    <nav aria-label="Primary" className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4">
      <motion.ul
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 22 }}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-2 rounded-2xl border border-line bg-surface/80 p-2 shadow-[0_10px_40px_-10px_var(--color-violet)] backdrop-blur-md"
      >
        {items.map((item) => (
          <DockItem key={item.id} {...item} mouseX={mouseX} active={active === item.id} />
        ))}
      </motion.ul>
    </nav>
  );
}

function DockItem({ id, label, icon: Icon, mouseX, active }: (typeof items)[number] & { mouseX: MotionValue<number>; active: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const distance = useTransform(mouseX, (x) => {
    const r = ref.current?.getBoundingClientRect();
    return r ? x - r.left - r.width / 2 : Infinity;
  });
  // Scale (not width) keeps magnification on the compositor.
  const scale = useSpring(useTransform(distance, [-110, 0, 110], [1, 1.4, 1]), { stiffness: 300, damping: 20 });

  return (
    <li>
      <motion.a
        ref={ref}
        href={`#${id}`}
        aria-current={active ? "location" : undefined}
        style={{ scale }}
        className={`group relative grid size-12 origin-bottom place-items-center rounded-xl border transition-colors ${
          active ? "border-lime/60 bg-lime/10 text-lime" : "border-transparent text-muted hover:text-fg"
        }`}
      >
        <Icon aria-hidden size={20} />
        <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md bg-fg px-2 py-0.5 font-mono text-[11px] text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          {label}
        </span>
        {active && <span aria-hidden className="absolute -bottom-1 size-1 rounded-full bg-lime" />}
      </motion.a>
    </li>
  );
}
