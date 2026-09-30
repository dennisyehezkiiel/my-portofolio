"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { experience, profile, projects, stack } from "@/lib/data";

type Line = { kind: "in" | "out"; text: string };

// scrollIntoView() defaults to "auto", which follows CSS scroll-behavior (reduced-motion aware).
const jump = (id: string) => document.getElementById(id)?.scrollIntoView();

const commands: Record<string, () => string> = {
  help: () => "commands: about  stack  projects  experience  contact  clear",
  whoami: () => `${profile.name} — ${profile.role}`,
  about: () => profile.about,
  stack: () => stack.join(" · "),
  projects: () => {
    jump("projects");
    return `${projects.length} projects found. jumping → #projects`;
  },
  experience: () => {
    jump("experience");
    return `${experience.length} roles loaded. jumping → #experience`;
  },
  contact: () => `${profile.email}\n${profile.github}`,
};

const quick = ["help", "about", "stack", "projects"];

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "in", text: "whoami" },
    { kind: "out", text: commands.whoami() },
    { kind: "out", text: "type 'help' to poke around." },
  ]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [lines]);

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") return setLines([]);
    const out = cmd.startsWith("sudo")
      ? "permission granted. you clearly want to hire me → " + profile.email
      : (commands[cmd]?.() ?? `command not found: ${cmd}. try 'help'`);
    setLines((l) => [...l, { kind: "in", text: cmd }, { kind: "out", text: out }]);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    run(value);
    setValue("");
  }

  return (
    <div className="w-full rounded-xl border-2 border-fg/90 bg-surface font-mono text-sm shadow-[8px_8px_0_0_var(--color-lime)]">
      <div className="flex items-center gap-2 border-b-2 border-fg/90 px-4 py-2.5">
        <span className="size-3 bg-lime" />
        <span className="size-3 bg-violet" />
        <span className="size-3 border border-muted" />
        <span className="ml-auto text-xs text-muted">~/portfolio — zsh</span>
      </div>

      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        onClick={() => inputRef.current?.focus()}
        className="h-64 overflow-y-auto p-4 leading-relaxed"
      >
        {lines.map((l, i) => (
          <p key={i} className={l.kind === "in" ? "text-fg" : "whitespace-pre-wrap text-muted"}>
            {l.kind === "in" && <span className="text-lime">❯ </span>}
            {l.text}
          </p>
        ))}
        <form onSubmit={onSubmit} className="flex items-center">
          <span aria-hidden className="text-lime">❯&nbsp;</span>
          <label htmlFor="term-input" className="sr-only">
            Terminal command
          </label>
          <input
            id="term-input"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="flex-1 bg-transparent text-fg caret-lime outline-none"
          />
        </form>
      </div>

      <div className="flex flex-wrap gap-2 border-t-2 border-fg/90 p-3">
        {quick.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => run(c)}
            className="rounded border border-line px-2.5 py-1 text-xs text-muted transition-colors hover:border-lime hover:text-lime"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
