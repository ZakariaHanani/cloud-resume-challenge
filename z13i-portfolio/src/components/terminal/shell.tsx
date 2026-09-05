import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate, useRouterState } from "@tanstack/react-router";
import { format } from "date-fns";
import {
  ChevronRight,
  Folder,
  Github,
  Layers,
  Linkedin,
  Mail,
  Maximize2,
  Menu,
  Moon,
  Minimize2,
  User,
  X,
  Sun,
} from "lucide-react";
import { CommandLine } from "@/components/terminal/command";
import {
  COMMANDS,
  HELP_SHORTCUTS,
  NAV,
  PROFILE,
  pageFromPath,
  type PageId,
} from "@/lib/site-data";
import { cn } from "@/lib/utils";

const NAV_ICONS: Record<PageId, typeof User> = {
  about: ChevronRight,
  experience: User,
  stack: Layers,
  projects: Folder,
  infrastructure: ChevronRight,
  contact: ChevronRight,
};

export function TerminalShell({ children }: { children: ReactNode }) {
  const pathname = useLocation({ select: (l) => l.pathname });
  const current = pageFromPath(pathname);
  const navigate = useNavigate();
  const [maximized, setMaximized] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [closed, setClosed] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState("");
  const [focusSignal, setFocusSignal] = useState(0);
  const [clock, setClock] = useState("");
  const [dangerousCommand, setDangerousCommand] = useState<string | null>(null);
  const [booting, setBooting] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem("portfolio-theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const outletKey = useRouterState({
    select: (s) => s.location.pathname,
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (window.localStorage.getItem("portfolio-booted")) {
      setBooting(false);
      return;
    }

    const id = window.setTimeout(() => {
      window.localStorage.setItem("portfolio-booted", "true");
      setBooting(false);
    }, 3000);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const tick = () => setClock(format(new Date(), "EEE d MMM HH:mm"));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    setDrawer(false);
    setHelpOpen(false);
    setPaletteOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      const ttyEmpty =
        target instanceof HTMLInputElement &&
        target.id === "tty" &&
        target.value.length === 0;

      if (e.key === "Escape") {
        setHelpOpen(false);
        setPaletteOpen(false);
        setDrawer(false);
        (target as HTMLInputElement | null)?.blur?.();
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        setHelpOpen(false);
        return;
      }

      if (e.key === "?") {
        if (!typing || ttyEmpty) {
          e.preventDefault();
          setHelpOpen((v) => !v);
        }
        return;
      }

      if (typing) return;
      if (e.key === ":" || e.key === "`") {
        e.preventDefault();
        setFocusSignal((n) => n + 1);
        return;
      }
      if (/^[1-6]$/.test(e.key)) {
        const item = NAV[Number(e.key) - 1];
        if (item) void navigate({ to: item.path });
        return;
      }
      if (e.key === "j" || e.key === "ArrowRight") {
        const idx = NAV.findIndex((n) => n.id === current.id);
        const next = NAV[(idx + 1) % NAV.length];
        if (next) void navigate({ to: next.path });
      }
      if (e.key === "k" || e.key === "ArrowLeft") {
        const idx = NAV.findIndex((n) => n.id === current.id);
        const prev = NAV[(idx - 1 + NAV.length) % NAV.length];
        if (prev) void navigate({ to: prev.path });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current.id, navigate]);

  const filteredPalette = useMemo(() => {
    const q = paletteQuery.trim().toLowerCase();
    const pages = NAV.filter(
      (n) => !q || n.label.includes(q) || n.number.includes(q),
    ).map((n) => ({
      id: n.id,
      label: n.label,
      hint: n.prompt,
      run: () => navigate({ to: n.path }),
    }));
    const cmds = COMMANDS.filter(
      (c) => !q || c.cmd.includes(q) || c.hint.includes(q),
    ).map((c) => ({
      id: c.cmd,
      label: c.cmd,
      hint: c.hint,
      run: () => {
        setPaletteOpen(false);
        setFocusSignal((n) => n + 1);
      },
    }));
    return { pages, cmds };
  }, [paletteQuery, navigate]);

  if (booting) return <BootScreen />;

  if (closed) {
    return (
      <div className="flex min-h-dvh items-center justify-center p-6">
        <div className="max-w-md text-center">
          <p className="text-sm text-term-muted">Connection closed.</p>
          <p className="mt-2 font-mono text-term-fg">
            {PROFILE.host}: logout
          </p>
          <button
            type="button"
            onClick={() => {
              setClosed(false);
            }}
            className="mt-6 rounded-md border border-term-border bg-term-panel px-4 py-2 text-sm text-term-accent transition-colors hover:border-term-accent"
          >
            reconnect
          </button>
        </div>
      </div>
    );
  }

  if (minimized) {
    return (
      <div className="flex min-h-dvh items-end p-4">
        <button
          type="button"
          onClick={() => setMinimized(false)}
          className="flex items-center gap-3 rounded-lg border border-term-border bg-term-window px-4 py-2.5 text-sm text-term-fg shadow-lg transition-colors hover:border-term-accent"
        >
          <span className="size-2.5 rounded-full bg-traffic-max" />
          <span className="term-wordmark text-term-accent">{PROFILE.wordmark}</span>
          <span className="text-term-muted">— click to restore</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-dvh items-center justify-center overflow-hidden">
      <div
        className={cn(
          "term-window",
          maximized
            ? "max-w-none"
            : "max-w-7xl",
        )}
      >
        <div className="term-titlebar-panel">
          <TitleBar
            onClose={() => setClosed(true)}
            onMin={() => setMinimized(true)}
            onMax={() => setMaximized((v) => !v)}
            maximized={maximized}
            onMenu={() => {
              if (typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches) {
                setPaletteOpen((v) => !v);
                setHelpOpen(false);
              } else {
                setDrawer((v) => !v);
              }
            }}
            theme={theme}
            onToggleTheme={() => setTheme((value) => value === "light" ? "dark" : "light")}
          />
        </div>

        <div className="term-workspace relative">
          <Sidebar currentId={current.id} className="term-sidebar-panel hidden md:flex" />

          {drawer ? (
            <div className="absolute inset-0 z-30 flex md:hidden">
              <button
                type="button"
                aria-label="Close menu"
                className="absolute inset-0 bg-term-bg/70"
                onClick={() => setDrawer(false)}
              />
              <Sidebar
                currentId={current.id}
                className="term-sidebar-panel relative z-10 flex h-full"
                onNavigate={() => setDrawer(false)}
              />
            </div>
          ) : null}

          <div className="term-content-panel min-w-0 flex-1">
            <main className="term-scroll relative min-h-0 flex-1 overflow-y-auto p-2">
              <div key={outletKey} className="page-enter">
                {children}
              </div>
              <CommandLine
                current={current}
                onNavigate={(path) => void navigate({ to: path })}
                focusSignal={focusSignal}
                onDangerousCommand={setDangerousCommand}
              />
            </main>
            <aside className="term-right-rail">
              <NeofetchPanel />
              <QuotePanel />
            </aside>
          </div>
        </div>

        <div className="term-status-window">
          <StatusBar
            current={current}
            clock={clock}
            onJump={(path) => void navigate({ to: path })}
          />
        </div>

        {helpOpen ? <HelpOverlay onClose={() => setHelpOpen(false)} /> : null}
        {paletteOpen ? (
          <Palette
            query={paletteQuery}
            onQuery={setPaletteQuery}
            pages={filteredPalette.pages}
            cmds={filteredPalette.cmds}
            onClose={() => {
              setPaletteOpen(false);
              setPaletteQuery("");
            }}
          />
        ) : null}
        {dangerousCommand ? (
          <DangerousCommandOverlay
            command={dangerousCommand}
            onClose={() => setDangerousCommand(null)}
          />
        ) : null}
      </div>
    </div>
  );
}

function BootScreen() {
  return (
    <main className="boot-screen" aria-label="Loading portfolio">
      <div className="boot-screen-inner">
        <div className="boot-logo term-wordmark text-4xl text-term-accent">
          {PROFILE.wordmark}
        </div>
        <p className="boot-kicker">archlinux :: user session</p>
        <div className="boot-lines" aria-hidden="true">
          <p>[ OK ] mounting /home/zakaria</p>
          <p>[ OK ] starting cloud systems</p>
          <p>[ .. ] loading portfolio<span className="term-waiting-dots" /></p>
        </div>
        <div className="boot-progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </main>
  );
}

function DangerousCommandOverlay({
  command,
  onClose,
}: {
  command: string;
  onClose: () => void;
}) {
  return (
    <div className="danger-overlay" role="alertdialog" aria-modal="true">
      <div className="danger-overlay-inner">
        <p className="danger-kicker">sir dar innak</p>
        <div className="danger-logo" aria-hidden="true">!</div>
        <h2>REALLY?</h2>
        <p className="danger-command">$ {command}</p>
        <p className="danger-copy">
          You confirm that you are a dumb stupid?
        </p>
        <div className="danger-actions">
          <button type="button" onClick={onClose} className="danger-cancel">
            yes am
          </button>
        </div>
      </div>
    </div>
  );
}

function NeofetchPanel() {
  return (
    <section className="term-neofetch-window" aria-label="System information">
      <header className="term-neofetch-title">
        <WindowDots />
        <span>neofetch</span>
      </header>
      <div className="term-neofetch-body">
        <div className="term-neofetch-logo flex flex-col items-center justify-center gap-2">
          <span className="term-wordmark text-xl text-term-accent">
            {PROFILE.wordmark}
          </span>
          <span className="text-center text-2xs text-term-dim">portfolio</span>
        </div>
        <div className="term-neofetch-data">
          <p className="text-term-accent">{PROFILE.host}</p>
          <p><span className="text-term-green">Name:</span> {PROFILE.displayName}</p>
          <p><span className="text-term-green">OS:</span> Arch Linux x86_64</p>
          <p><span className="text-term-green">Role:</span> {PROFILE.roles[0]}</p>
          <p><span className="text-term-green">Base:</span> {PROFILE.location}</p>
          <p><span className="text-term-green">Stack:</span> Cloud / Linux / Java</p>
          <p><span className="text-term-green">Web:</span> {PROFILE.website}</p>
          <p className="term-neofetch-status">
            <span className="text-term-green">Status:</span> Looking for PFE stage
            <span className="term-waiting-dots" aria-hidden="true" />
          </p>
        </div>
      </div>
    </section>
  );
}

function QuotePanel() {
  return (
    <section className="term-quote-window" aria-label="Quick note">
      <header className="term-neofetch-title">
        <span className="size-1.5 rounded-full bg-term-accent" />
        <span>note.txt</span>
      </header>
      <div className="p-3">
        <p className="flex items-center gap-2 text-xs font-medium text-term-accent">
          A quick note
        </p>
        <p className="mt-2 text-xs leading-relaxed text-term-muted text-pretty">
          {PROFILE.note}
        </p>
      </div>
    </section>
  );
}

function WindowDots() {
  return (
    <span className="term-window-dots" aria-hidden="true">
      <span className="size-2.5 rounded-full bg-traffic-close" />
      <span className="size-2.5 rounded-full bg-traffic-min" />
      <span className="size-2.5 rounded-full bg-traffic-max" />
    </span>
  );
}

function TitleBar({
  onClose,
  onMin,
  onMax,
  maximized,
  onMenu,
  theme,
  onToggleTheme,
}: {
  onClose: () => void;
  onMin: () => void;
  onMax: () => void;
  maximized: boolean;
  onMenu: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}) {
  return (
    <header className="flex h-11 shrink-0 items-center justify-between border-b border-term-border bg-term-sidebar px-3">
      <div className="flex w-20 items-center gap-2">
        <button
          type="button"
          aria-label="Close window"
          onClick={onClose}
          className="size-3 rounded-full bg-traffic-close transition-transform duration-150 hover:scale-110"
        />
        <button
          type="button"
          aria-label="Minimize window"
          onClick={onMin}
          className="size-3 rounded-full bg-traffic-min transition-transform duration-150 hover:scale-110"
        />
        <button
          type="button"
          aria-label={maximized ? "Restore window" : "Maximize window"}
          onClick={onMax}
          className="size-3 rounded-full bg-traffic-max transition-transform duration-150 hover:scale-110"
        />
      </div>
      <p className="truncate text-xs text-term-muted">
        {PROFILE.host}:~
      </p>
      <div className="flex w-20 items-center justify-end gap-1">
        <button
          type="button"
          aria-label={maximized ? "Restore" : "Maximize"}
          onClick={onMax}
          className="rounded p-1.5 text-term-dim transition-colors hover:text-term-fg"
        >
          {maximized ? (
            <Minimize2 className="size-3.5" />
          ) : (
            <Maximize2 className="size-3.5" />
          )}
        </button>
        <button
          type="button"
          aria-label="Open menu"
          onClick={onMenu}
          className="rounded p-3 text-term-dim transition-colors hover:text-term-fg md:p-1.5"
        >
          <Menu className="size-4" />
        </button>
        <button
          type="button"
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          onClick={onToggleTheme}
          className="rounded p-1.5 text-term-dim transition-colors hover:text-term-accent"
        >
          {theme === "light" ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
        </button>
      </div>
    </header>
  );
}

function Sidebar({
  currentId,
  className,
  onNavigate,
}: {
  currentId: PageId;
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <aside
      className={cn(
        "w-52 shrink-0 flex-col border-r border-term-border bg-term-sidebar",
        className,
      )}
    >
      <div className="px-5 pt-6 pb-5">
        <p
          className="term-wordmark term-logo-shutdown text-3xl text-term-accent"
          aria-label={PROFILE.wordmark}
        >
          <span aria-hidden="true" className="term-logo-letter">Z</span>
          <span aria-hidden="true" className="term-logo-letter">1</span>
          <span aria-hidden="true" className="term-logo-letter">3</span>
          <span aria-hidden="true" className="term-logo-letter">I</span>
        </p>
        <p className="mt-1 text-xs font-semibold tracking-wide text-term-accent">
          {PROFILE.name}
        </p>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 px-2" aria-label="Pages">
        {NAV.map((item) => {
          const Icon = NAV_ICONS[item.id];
          const active = item.id === currentId;
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-3 text-sm transition-colors duration-150 md:py-2",
                active
                  ? "bg-term-accent/10 text-term-accent"
                  : "text-term-muted hover:bg-term-raised hover:text-term-fg",
              )}
            >
              <Icon className="size-3.5 shrink-0" />
              <span className="flex-1">{item.label}</span>
              <span
                className={cn(
                  "text-2xs tabular-nums",
                  active ? "text-term-accent" : "text-term-dim",
                )}
              >
                {item.number}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="flex items-center gap-1 px-4 py-4">
        <a
          href={PROFILE.githubUrl}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="GitHub"
          className="rounded p-2 text-term-dim transition-colors hover:text-term-accent"
        >
          <Github className="size-4" />
        </a>
        <a
          href={PROFILE.linkedinUrl}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="LinkedIn"
          className="rounded p-2 text-term-dim transition-colors hover:text-term-accent"
        >
          <Linkedin className="size-4" />
        </a>
        <a
          href={`mailto:${PROFILE.email}`}
          aria-label="Email"
          className="rounded p-2 text-term-dim transition-colors hover:text-term-accent"
        >
          <Mail className="size-4" />
        </a>
      </div>
    </aside>
  );
}

function StatusBar({
  current,
  clock,
  onJump,
}: {
  current: (typeof NAV)[number];
  clock: string;
  onJump: (path: string) => void;
}) {
  return (
    <footer className="flex h-12 shrink-0 items-center justify-between gap-3 px-3 text-2xs text-term-muted sm:h-10 sm:text-xs">
      <p className="hidden truncate sm:block">{PROFILE.host}:~</p>
      <div className="flex items-center gap-1">
        {NAV.map((item, i) => {
          const active = item.id === current.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-label={`Page ${item.label}`}
              aria-current={active ? "page" : undefined}
              onClick={() => onJump(item.path)}
              className={cn(
                "flex size-9 items-center justify-center rounded-md tabular-nums transition-colors duration-150 sm:size-7",
                active
                  ? "bg-term-accent text-term-bg"
                  : "text-term-muted hover:bg-term-raised hover:text-term-fg",
              )}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-3">
        <span
          className="tabular-nums"
          data-visitor-counter
          aria-label="Visitor count"
        >
          Visitors: 0
        </span>
        <span className="tabular-nums">{clock || "—"}</span>
      </div>
    </footer>
  );
}

function HelpOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close help"
        className="absolute inset-0 bg-term-bg/70"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-labelledby="help-title"
        className="relative z-10 w-full max-w-md rounded-xl border border-term-border bg-term-panel p-5 shadow-2xl"
      >
        <div className="flex items-start justify-between">
          <h2 id="help-title" className="text-sm font-semibold text-term-accent">
            # shortcuts
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded p-1 text-term-dim hover:text-term-fg"
          >
            <X className="size-4" />
          </button>
        </div>
        <ul className="mt-4 space-y-2 text-sm">
          {HELP_SHORTCUTS.map((row) => (
            <li key={row.keys} className="flex justify-between gap-4">
              <kbd className="rounded border border-term-border bg-term-raised px-1.5 py-0.5 text-xs text-term-accent">
                {row.keys}
              </kbd>
              <span className="text-term-muted">{row.hint}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-term-dim">
          Type <span className="text-term-accent">help</span> in the prompt for
          the full command list.
        </p>
      </div>
    </div>
  );
}

function Palette({
  query,
  onQuery,
  pages,
  cmds,
  onClose,
}: {
  query: string;
  onQuery: (v: string) => void;
  pages: { id: string; label: string; hint: string; run: () => void }[];
  cmds: { id: string; label: string; hint: string; run: () => void }[];
  onClose: () => void;
}) {
  return (
    <div className="absolute inset-0 z-40 flex items-start justify-center p-4 pt-[12%]">
      <button
        type="button"
        aria-label="Close palette"
        className="absolute inset-0 bg-term-bg/70"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-labelledby="palette-title"
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-term-border bg-term-panel shadow-2xl"
      >
        <h2 id="palette-title" className="sr-only">
          Command palette
        </h2>
        <input
          autoFocus
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Jump to a page or command…"
          className="w-full border-b border-term-border bg-transparent px-4 py-3 text-sm text-term-fg outline-none placeholder:text-term-dim"
        />
        <div className="term-scroll max-h-72 overflow-y-auto p-2">
          <p className="px-2 py-1 text-2xs uppercase tracking-wider text-term-dim">
            Pages
          </p>
          {pages.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                p.run();
                onClose();
              }}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-term-fg hover:bg-term-raised"
            >
              <span>{p.label}</span>
              <span className="text-xs text-term-dim">{p.hint}</span>
            </button>
          ))}
          <p className="mt-2 px-2 py-1 text-2xs uppercase tracking-wider text-term-dim">
            Commands
          </p>
          {cmds.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={c.run}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-term-fg hover:bg-term-raised"
            >
              <span className="text-term-accent">{c.label}</span>
              <span className="text-xs text-term-dim">{c.hint}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
