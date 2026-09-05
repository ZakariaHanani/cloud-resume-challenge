import { useEffect, useMemo, useRef, useState } from "react";
import { COMMANDS, NAV, PROFILE, type NavItem, type PagePath } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const startedAt = Date.now();

export type CommandResult = {
  lines: string[];
  navigate?: PagePath;
  open?: string;
  clear?: boolean;
};

const COMMAND_NAMES = [
  "help",
  "ls",
  "cd",
  "cat",
  "whoami",
  "neofetch",
  "pwd",
  "date",
  "uname",
  "resume",
  "open",
  "clear",
  "echo",
];

const OPEN_TARGETS: Record<string, string> = {
  github: PROFILE.githubUrl,
  gh: PROFILE.githubUrl,
  linkedin: PROFILE.linkedinUrl,
  email: `mailto:${PROFILE.email}`,
  mail: `mailto:${PROFILE.email}`,
  web: PROFILE.websiteUrl,
  website: PROFILE.websiteUrl,
  x: PROFILE.xUrl,
  twitter: PROFILE.xUrl,
};

function resolvePage(token: string | undefined): NavItem | undefined {
  if (!token) return undefined;
  const t = token.replace(/^~\//, "").replace(/^\//, "").toLowerCase();
  return NAV.find(
    (item) => item.id === t || item.label === t || item.number === t,
  );
}

export function runCommand(raw: string, current: NavItem): CommandResult {
  const input = raw.trim();
  if (!input) return { lines: [] };

  const [head, ...rest] = input.split(/\s+/);
  const cmd = (head ?? "").toLowerCase();
  const arg = rest.join(" ");

  if (cmd === "help" || cmd === "?") {
    return {
      lines: [
        "commands",
        ...COMMANDS.map((c) => `  ${c.cmd.padEnd(16)} ${c.hint}`),
        "",
        "pages: " + NAV.map((n) => n.id).join("  "),
      ],
    };
  }

  if (cmd === "ls") {
    return {
      lines: ["~", ...NAV.map((n) => `${n.number}  ${n.id}/`)],
    };
  }

  if (cmd === "pwd") {
    return { lines: [current.prompt] };
  }

  if (cmd === "whoami") {
    return {
      lines: [
        PROFILE.displayName,
        PROFILE.title,
        PROFILE.location,
      ],
    };
  }

  if (cmd === "date") {
    return { lines: [new Date().toString()] };
  }

  if (cmd === "uname") {
    return {
      lines: ["Linux archlinux 6.10.0-z13i #1 SMP PREEMPT x86_64 GNU/Linux"],
    };
  }

  if (cmd === "clear") {
    return { lines: [], clear: true };
  }

  if (cmd === "echo") {
    return { lines: [arg] };
  }

  if (cmd === "cd") {
    const page = resolvePage(arg) ?? (arg === "~" || arg === "" ? NAV[0] : undefined);
    if (!page) {
      return { lines: [`bash: cd: ${arg || "?"}: no such file or directory`] };
    }
    return { lines: [`${PROFILE.host}:${page.prompt}$`], navigate: page.path };
  }

  if (cmd === "cat") {
    const page = resolvePage(arg) ?? current;
    if (arg && !resolvePage(arg)) {
      return { lines: [`cat: ${arg}: no such file or directory`] };
    }
    if (page.id === "about") {
      return {
        lines: [
          `# About Me`,
          `Hi, I'm ${PROFILE.displayName}`,
          PROFILE.title,
          ...PROFILE.summary,
        ],
      };
    }
    if (page.id === "contact") {
      return {
        lines: [
          PROFILE.email,
          PROFILE.githubUrl,
          PROFILE.linkedinUrl,
          PROFILE.websiteUrl,
        ],
      };
    }
    return { lines: [`# ${page.label}`, `open ${page.prompt} for the full view`] };
  }

  if (cmd === "open") {
    const target = OPEN_TARGETS[arg.toLowerCase()];
    if (!target) {
      return {
        lines: [
          `open: unknown target '${arg}'`,
          "try: github | linkedin | email | web | x",
        ],
      };
    }
    return { lines: [`opening ${target}`], open: target };
  }

  if (cmd === "resume") {
    return {
      lines: [
        `${PROFILE.displayName}  —  ${PROFILE.roles.join(" · ")}`,
        `${PROFILE.location}  ·  ${PROFILE.email}`,
        "",
        "EXPERIENCE",
        "  2023–now   DevOps Engineer, freelance / personal",
        "  2022–2023  Backend Developer, various projects",
        "  2021–2022  Academic & personal, software engineering",
        "",
        "FOCUS    DevOps, Cloud, Distributed Systems",
        "STACK    Docker, Kubernetes, Helm, AWS, Terraform,",
        "         Cloudflare, GitHub Actions, Java, Python, Linux",
      ],
    };
  }

  if (cmd === "neofetch") {
    const uptime = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
    const mins = Math.floor(uptime / 60);
    const secs = uptime % 60;
    return {
      lines: [
        "      _____ ___ _____ ___",
        "     |__  /|_ _|___ /|_ _|",
        "       / /  | |  |_ \\ | |",
        "      / /_  | | ___) || |",
        "     /____||___|____/|___|",
        "",
        `     ${PROFILE.host}`,
        "     ---------------------",
        "     OS:        Arch Linux x86_64",
        "     Host:      Z13I Portfolio",
        "     Kernel:    6.10.0-z13i",
        "     Shell:     zsh 5.9",
        `     Role:      ${PROFILE.roles[0]}`,
        `     Location:  ${PROFILE.location}`,
        `     Uptime:    ${mins}m ${secs}s`,
        "     WM:        z13i-term",
      ],
    };
  }

  return { lines: [`bash: ${cmd}: command not found`] };
}

function complete(input: string): string {
  const parts = input.split(/\s+/);
  if (parts.length <= 1) {
    const prefix = parts[0] ?? "";
    const hits = COMMAND_NAMES.filter((c) => c.startsWith(prefix));
    return hits.length === 1 ? hits[0] : input;
  }
  const cmd = parts[0];
  const arg = parts[parts.length - 1] ?? "";
  if (cmd === "cd" || cmd === "cat") {
    const hits = NAV.map((n) => n.id).filter((id) => id.startsWith(arg));
    if (hits.length === 1) return `${cmd} ${hits[0]}`;
  }
  if (cmd === "open") {
    const hits = Object.keys(OPEN_TARGETS).filter((k) => k.startsWith(arg));
    if (hits.length === 1) return `${cmd} ${hits[0]}`;
  }
  return input;
}

type Props = {
  current: NavItem;
  onNavigate: (path: PagePath) => void;
  focusSignal: number;
  onDangerousCommand: (command: string) => void;
};

export function CommandLine({
  current,
  onNavigate,
  focusSignal,
  onDangerousCommand,
}: Props) {
  const [value, setValue] = useState("");
  const [log, setLog] = useState<string[]>([
    "Welcome to Z13I. Type help · press ? · Ctrl+K for the palette.",
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focusSignal > 0) inputRef.current?.focus();
  }, [focusSignal]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [log]);

  const prompt = useMemo(
    () => `${PROFILE.host}:${current.prompt}$`,
    [current.prompt],
  );

  function submit(raw: string) {
    if (raw.trim().replace(/\s+/g, " ") === "rm -rf /") {
      onDangerousCommand(raw.trim());
      setValue("");
      return;
    }
    const result = runCommand(raw, current);
    if (raw.trim()) {
      setHistory((h) => [raw, ...h].slice(0, 50));
    }
    setHistIdx(-1);
    if (result.clear) {
      setLog([]);
      setValue("");
      return;
    }
    const stamped = raw.trim()
      ? [`${prompt} ${raw}`, ...result.lines]
      : result.lines;
    if (stamped.length) setLog((prev) => [...prev, ...stamped].slice(-80));
    setValue("");
    if (result.navigate) onNavigate(result.navigate);
    if (result.open && typeof window !== "undefined") {
      window.open(result.open, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div className="term-command-window">
      <div className="term-command-title">
        <span className="term-window-dots" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-traffic-close" />
          <span className="size-2.5 rounded-full bg-traffic-min" />
          <span className="size-2.5 rounded-full bg-traffic-max" />
        </span>
        <span>shell</span>
      </div>
      {log.length > 0 ? (
        <div
          ref={logRef}
          className="term-scroll max-h-24 overflow-y-auto px-4 py-2 text-xs leading-relaxed text-term-muted whitespace-pre-wrap"
        >
          {log.map((line, i) => (
            <div
              key={`${i}-${line.slice(0, 12)}`}
              className={cn(line.startsWith(PROFILE.host) && "text-term-fg")}
            >
              {line || " "}
            </div>
          ))}
        </div>
      ) : null}
      <form
        className="flex items-center gap-2 px-4 py-2.5"
        onSubmit={(e) => {
          e.preventDefault();
          submit(value);
        }}
      >
        <label htmlFor="tty" className="shrink-0 text-xs text-term-green">
          <span className="hidden sm:inline">{prompt}</span>
          <span className="sm:hidden">$</span>
        </label>
        <input
          id="tty"
          ref={inputRef}
          value={value}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="help · ls · cd stack"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();
              setValue(complete(value));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              const next = Math.min(histIdx + 1, history.length - 1);
              if (history[next] !== undefined) {
                setHistIdx(next);
                setValue(history[next]);
              }
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              const next = histIdx - 1;
              if (next < 0) {
                setHistIdx(-1);
                setValue("");
              } else {
                setHistIdx(next);
                setValue(history[next] ?? "");
              }
            }
          }}
          className="min-w-0 flex-1 bg-transparent text-xs text-term-fg outline-none placeholder:text-term-dim"
        />
      </form>
    </div>
  );
}
