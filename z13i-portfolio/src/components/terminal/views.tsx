import type { ReactNode } from "react";
import {
  Cloud,
  Database,
  ExternalLink,
  GitBranch,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Network,
  Star,
  User,
  Zap,
} from "lucide-react";
import { TechMark } from "@/components/terminal/tech-icons";
import {
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  STACK,
} from "@/lib/site-data";
import { cn } from "@/lib/utils";

function PathHeading({
  path,
  title,
}: {
  path: string;
  title: string;
}) {
  return (
    <header className="mb-6">
      <p className="text-xs text-term-accent">{path}</p>
      <h1 className="mt-2 text-xl font-semibold tracking-tight text-term-fg sm:text-2xl">
        <span className="text-term-dim">#</span> {title}
      </h1>
    </header>
  );
}

export function AboutView() {
  return (
    <div className="term-route-window stagger-in">
      <PathHeading path="~/about" title="About Me" />
      <p className="text-term-fg">
        Hi, I'm{" "}
        <span className="font-semibold text-term-accent">
          {PROFILE.displayName}
        </span>
      </p>
      <p className="mt-2 text-sm text-term-green">{PROFILE.title}</p>
      <div className="mt-5 space-y-2 text-sm leading-relaxed text-term-fg text-pretty">
        {PROFILE.summary.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <ul className="mt-6 space-y-2.5 rounded-lg border border-term-border bg-term-panel px-4 py-3 text-sm">
        <AboutRow
          icon={<MapPin className="size-3.5" />}
          value={PROFILE.location}
        />
        <AboutRow
          icon={<Mail className="size-3.5" />}
          href={`mailto:${PROFILE.email}`}
          value={PROFILE.email}
        />
        <AboutRow
          icon={<Github className="size-3.5" />}
          href={PROFILE.githubUrl}
          value={`github.com/${PROFILE.github}`}
        />
        <AboutRow
          icon={<Globe className="size-3.5" />}
          href={PROFILE.websiteUrl}
          value={PROFILE.website}
        />
      </ul>

    </div>
  );
}

function AboutRow({
  icon,
  value,
  href,
}: {
  icon: ReactNode;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <span className="text-term-green">{icon}</span>
      <span>{value}</span>
    </>
  );
  if (href) {
    return (
      <li>
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
          className="flex items-center gap-3 text-term-fg transition-colors duration-150 hover:text-term-accent"
        >
          {inner}
        </a>
      </li>
    );
  }
  return (
    <li className="flex items-center gap-3 text-term-fg">
      {inner}
    </li>
  );
}

export function ExperienceView() {
  return (
    <div className="term-route-window stagger-in">
      <PathHeading path="~/experience" title="Experience" />
      <ol className="relative ml-2 border-l border-term-border pl-6">
        {EXPERIENCE.map((job) => (
          <li key={job.period} className="relative mb-8 last:mb-0">
            <span className="absolute -left-[29px] top-1.5 size-2.5 rounded-full bg-term-green shadow-[0_0_0_4px_var(--color-term-window)]" />
            <p className="text-xs text-term-muted">{job.period}</p>
            <h2 className="mt-1 text-base font-semibold text-term-green">
              {job.role}
            </h2>
            <p className="text-sm text-term-accent">{job.org}</p>
            <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-term-fg text-pretty">
              {job.points.map((point) => (
                <p key={point}>{point}</p>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function StackView() {
  return (
    <div className="term-route-window stagger-in">
      <PathHeading path="~/stack" title="Tech Stack" />
      <div className="grid gap-4">
        {STACK.map((group) => (
          <section
            key={group.title}
            className="rounded-lg border border-term-border bg-term-panel px-4 py-4"
          >
            <h2 className="mb-4 text-sm font-medium text-term-accent">
              {group.title}
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-4">
              {group.items.map((item) => (
                <TechMark key={item.name} mark={item.mark} name={item.name} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

const TAG_CLASS = {
  aws: "border-badge-aws/40 bg-badge-aws/10 text-badge-aws",
  kubernetes: "border-badge-kubernetes/40 bg-badge-kubernetes/10 text-badge-kubernetes",
  java: "border-badge-java/40 bg-badge-java/10 text-badge-java",
  php: "border-badge-php/40 bg-badge-php/10 text-badge-php",
  python: "border-badge-python/40 bg-badge-python/10 text-badge-python",
  shell: "border-badge-shell/40 bg-badge-shell/10 text-badge-shell",
  bi: "border-badge-bi/40 bg-badge-bi/10 text-badge-bi",
} as const;

export function ProjectsView() {
  return (
    <div className="term-route-window stagger-in">
      <PathHeading path="~/projects" title="Projects" />
      <ul className="grid gap-3">
        {PROJECTS.map((project) => (
          <li key={project.title}>
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group block rounded-lg border border-term-border bg-term-panel px-4 py-3 transition-colors duration-150 hover:border-term-accent/40 hover:bg-term-raised"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-sm font-semibold text-term-fg group-hover:text-term-accent">
                  {project.title}
                </h2>
                <span
                  className={cn(
                    "shrink-0 rounded-full border px-2 py-0.5 text-2xs font-medium",
                    TAG_CLASS[project.tagTone],
                  )}
                >
                  {project.tag}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-term-muted text-pretty">
                {project.blurb}
              </p>
              <p className="mt-2 flex items-center gap-1 text-xs text-term-amber">
                <Star className="size-3 fill-current" />
                {project.stars}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InfrastructureView() {
  return (
    <div className="term-route-window stagger-in">
      <PathHeading path="~/infrastructure" title="Infrastructure Behind This Site" />
      <p className="mb-5 max-w-xl text-sm text-term-muted text-pretty">
        Serverless architecture built on AWS. The frontend is a static site hosted on S3 and distributed globally via CloudFront. Visitor counts are fetched via API Gateway, processed by Lambda, and stored in DynamoDB.
      </p>
      <InfraDiagram />
    </div>
  );
}

function InfraNode({
  title,
  subtitle,
  tone,
  icon,
}: {
  title: string;
  subtitle?: string;
  tone: "user" | "cyan" | "green" | "amber" | "purple";
  icon?: ReactNode;
}) {
  const tones = {
    user: "border-term-border-strong text-term-fg",
    cyan: "border-term-accent/70 text-term-accent",
    green: "border-term-green/70 text-term-green",
    amber: "border-term-amber/70 text-term-amber",
    purple: "border-term-purple/70 text-term-purple",
  };
  return (
    <div
      className={cn(
        "flex w-36 min-h-12 flex-col items-center justify-center rounded-lg border bg-term-panel px-2.5 py-1.5 text-center",
        tones[tone],
      )}
    >
      {icon ? <div className="mb-1 text-current">{icon}</div> : null}
      <p className="text-xs font-medium">{title}</p>
      {subtitle ? (
        <p className="text-2xs text-term-muted">{subtitle}</p>
      ) : null}
    </div>
  );
}

function VLink() {
  return (
    <div className="flex h-4 flex-col items-center" aria-hidden="true">
      <div className="h-full w-px bg-term-border-strong" />
    </div>
  );
}

function HLink() {
  return (
    <div className="flex w-full items-center justify-center" aria-hidden="true">
      <div className="w-full h-px border-t border-dashed border-term-border-strong" />
    </div>
  );
}

function InfraDiagram() {
  // Frontend
  const user = <InfraNode tone="user" title="User" icon={<User className="size-4" />} />;
  const r53 = <InfraNode tone="purple" title="Route 53" subtitle="DNS" icon={<Globe className="size-4" />} />;
  const cf = <InfraNode tone="purple" title="CloudFront" subtitle="CDN / HTTPS" icon={<Cloud className="size-4" />} />;
  const s3 = <InfraNode tone="green" title="S3 Bucket" subtitle="Static Site" icon={<Database className="size-4" />} />;
  
  // Backend
  const api = <InfraNode tone="cyan" title="API Gateway" subtitle="REST API" icon={<Network className="size-4" />} />;
  const lambda = <InfraNode tone="amber" title="AWS Lambda" subtitle="Compute" icon={<Zap className="size-4" />} />;
  const db = <InfraNode tone="green" title="DynamoDB" subtitle="Visitor Count" icon={<Database className="size-4" />} />;
  
  // CI/CD
  const cicd = <InfraNode tone="user" title="GitHub Actions" subtitle="CI/CD" icon={<GitBranch className="size-4" />} />;

  return (
    <>
      {/* Mobile Layout (Vertical Flow) */}
      <div className="flex flex-col items-center md:hidden">
        {user}
        <VLink />
        {r53}
        <VLink />
        {cf}
        <VLink />
        {s3}
        <div className="my-4 h-px w-40 border-t border-dashed border-term-border-strong" />
        <p className="text-2xs text-term-muted mb-2 font-mono">Backend API Triggered</p>
        {api}
        <VLink />
        {lambda}
        <VLink />
        {db}
        <div className="my-4 h-px w-40 border-t border-dashed border-term-border-strong" />
        {cicd}
      </div>

      {/* Desktop Layout (2 Columns: Frontend vs Backend) */}
      <div className="hidden md:grid md:grid-cols-[9rem_3rem_9rem] md:items-center md:justify-center md:justify-items-center gap-y-1">
        {/* Row 1 */}
        {user}
        <span />
        {cicd}

        {/* Row 2 */}
        <VLink />
        <span />
        <VLink />

        {/* Row 3 */}
        {r53}
        <span />
        {api}

        {/* Row 4 */}
        <VLink />
        <span />
        <VLink />

        {/* Row 5 */}
        {cf}
        <HLink /> {/* Connecting Frontend JS to Backend API conceptually */}
        {lambda}

        {/* Row 6 */}
        <VLink />
        <span />
        <VLink />

        {/* Row 7 */}
        {s3}
        <span />
        {db}
      </div>
    </>
  );
}

export function ContactView() {
  const rows = [
    {
      icon: Mail,
      label: "Email",
      value: PROFILE.email,
      href: `mailto:${PROFILE.email}`,
    },
    {
      icon: Github,
      label: "GitHub",
      value: `github.com/${PROFILE.github}`,
      href: PROFILE.githubUrl,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: `linkedin.com/in/${PROFILE.linkedin}`,
      href: PROFILE.linkedinUrl,
    },
    {
      icon: Globe,
      label: "Website",
      value: PROFILE.website,
      href: PROFILE.websiteUrl,
    },
    {
      icon: MapPin,
      label: "Location",
      value: PROFILE.location,
    },
  ];

  return (
    <div className="term-route-window stagger-in">
      <PathHeading path="~/contact" title="Contact" />
      <p className="text-sm text-term-muted">Feel free to reach out!</p>
      <ul className="mt-5 overflow-hidden rounded-lg border border-term-border bg-term-panel">
        {rows.map((row) => {
          const Icon = row.icon;
          const body = (
            <>
              <span className="flex w-28 items-center gap-2 text-term-accent">
                <Icon className="size-3.5" />
                {row.label}
              </span>
              <span className="flex-1 text-term-fg">{row.value}</span>
              {row.href ? (
                <ExternalLink className="size-3.5 text-term-dim" />
              ) : null}
            </>
          );
          return (
            <li
              key={row.label}
              className="border-b border-term-border last:border-b-0"
            >
              {row.href ? (
                <a
                  href={row.href}
                  target={row.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    row.href.startsWith("http")
                      ? "noreferrer noopener"
                      : undefined
                  }
                  className="group flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-150 hover:bg-term-raised"
                >
                  {body}
                </a>
              ) : (
                <div className="flex items-center gap-3 px-4 py-3 text-sm">
                  {body}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-6 rounded-lg border border-term-border bg-term-panel px-4 py-4">
        <p className="text-xs text-term-dim">
          {PROFILE.host}:~$ whoami
        </p>
        <p className="mt-2 text-sm text-term-green">{PROFILE.title}</p>
        <p className="mt-3 text-sm text-term-fg">
          Let's build something great together.
        </p>
      </div>
    </div>
  );
}
