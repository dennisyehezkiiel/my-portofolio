export function SectionHeading({ index, title, note }: { index: string; title: string; note?: string }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
        <span className="mr-3 align-top font-mono text-sm font-normal text-lime">{index}</span>
        {title}
      </h2>
      {note && <p className="font-mono text-xs uppercase tracking-widest text-muted">{note}</p>}
    </header>
  );
}
