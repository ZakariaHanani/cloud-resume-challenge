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
import { EXPERIENCE, PROFILE, PROJECTS, STACK } from "@/lib/site-data";
import { cn } from "@/lib/utils";

function PathHeading({ path, title }: { path: string; title: string }) {
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
        Hi, I'm <span className="font-semibold text-term-accent">{PROFILE.displayName}</span>
      </p>
      <p className="mt-2 text-sm text-term-green">{PROFILE.title}</p>
      <div className="mt-5 space-y-2 text-sm leading-relaxed text-term-fg text-pretty">
        {PROFILE.summary.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <ul className="mt-6 space-y-2.5 rounded-lg border border-term-border bg-term-panel px-4 py-3 text-sm">
        <AboutRow icon={<MapPin className="size-3.5" />} value={PROFILE.location} />
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

function AboutRow({ icon, value, href }: { icon: ReactNode; value: string; href?: string }) {
  const inner = (
    <>
      <span className="text-term-green">{icon}</span>
      <span>{value}</span>
    </>
  );
  if (href)
    return (
      <li>
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
          className="flex items-center gap-3 text-term-fg transition-colors hover:text-term-accent"
        >
          {inner}
        </a>
      </li>
    );
  return <li className="flex items-center gap-3 text-term-fg">{inner}</li>;
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
            <h2 className="mt-1 text-base font-semibold text-term-green">{job.role}</h2>
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
            <h2 className="mb-4 text-sm font-medium text-term-accent">{group.title}</h2>
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
              className="group block rounded-lg border border-term-border bg-term-panel px-4 py-3 transition-colors hover:border-term-accent/40 hover:bg-term-raised"
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
    <article className="term-route-window infra-article stagger-in">
      <header className="infra-article-header">
        <p className="text-xs text-term-accent">~/infrastructure</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-term-fg sm:text-5xl">
          Started with a resume, learned AWS the hard way
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-term-muted">
          What I built, what broke, and how the browser, AWS, GitHub Actions, and Docker ended up
          fitting together behind this portfolio.
        </p>
        <div className="infra-article-byline">
          <span>BY {PROFILE.displayName.toUpperCase()}</span>
          <span>•</span>
          <span>8 MIN READ</span>
          <span>•</span>
          <span>UPDATED 2026</span>
        </div>
        <div className="infra-article-links">
          <a href="https://github.com/ZakariaHanani/cloud-resume-challenge" target="_blank" rel="noreferrer noopener">
            <Github className="size-3.5" />
            cloud-resume-challenge
          </a>
          <a href="https://github.com/ZakariaHanani/devops-notes" target="_blank" rel="noreferrer noopener">
            <Github className="size-3.5" />
            devops-notes / foundation
          </a>
        </div>
      </header>
      <div className="infra-article-body">
        <p className="infra-article-lead">
          The Cloud Resume Challenge looked simple at first: build a resume, host it on AWS, and add
          a visitor counter. In practice, it became a useful tour through static hosting, edge
          delivery, serverless APIs, CI/CD, containers, and the tiny configuration details that
          decide whether a deployment works.
        </p>
        <div className="infra-source-note">
          <p className="infra-post-meta">FIELD NOTES / SOURCE</p>
          <p>
            The AWS and operations foundation for this post lives in my{" "}
            <a href="https://github.com/ZakariaHanani/devops-notes" target="_blank" rel="noreferrer noopener">
              devops-notes repository
            </a>
            . It collects the practical commands, concepts, and troubleshooting notes that sit
            underneath this project.
          </p>
        </div>
        <div className="infra-article-index">
          <span>IN THIS POST</span>
          <a href="#delivery">01 / Delivery path</a>
          <a href="#counter">02 / Visitor counter</a>
          <a href="#lessons">03 / What I encountered</a>
          <a href="#docker">04 / Container path</a>
        </div>
        <section id="delivery" className="infra-article-section">
          <p className="infra-post-meta">01 / DELIVERY PATH</p>
          <h2>From React source to a global edge</h2>
          <p>
            The frontend is a React, TypeScript, and Vite application. Running{" "}
            <code>npm run build</code> creates a <code>dist/</code> directory containing the static
            HTML, JavaScript, CSS, and assets.
          </p>
          <p>
            GitHub Actions runs that build after a push, uploads the result to Amazon S3, and
            triggers a CloudFront invalidation. Route 53 points the custom domain to CloudFront,
            which serves the files over HTTPS.
          </p>
          <pre>
            <code>{`git push
  -> GitHub Actions
  -> npm run build
  -> S3
  -> CloudFront invalidation
  -> zakariahanani.com`}</code>
          </pre>
          <InfraDiagram />
          <div className="infra-aws-deep">
            <div>
              <p className="infra-post-meta">THE AWS REQUEST</p>
              <h3>What happens when someone opens the site?</h3>
              <p>
                Route 53 is the signpost, not the web server. It resolves the domain to a
                CloudFront distribution. CloudFront is the public HTTPS edge: it checks its cache
                first, and when an object is not available there, it requests the static file from
                the S3 origin.
              </p>
            </div>
            <div>
              <p className="infra-post-meta">THE ORIGIN</p>
              <h3>Why S3 works for the frontend</h3>
              <p>
                After Vite turns the source into browser assets, S3 only needs to store and return
                files. There is no application process to patch or scale. CloudFront handles the
                public delivery layer while S3 acts as the durable origin behind it.
              </p>
            </div>
            <div>
              <p className="infra-post-meta">THE EDGE</p>
              <h3>Why a new deploy needs invalidation</h3>
              <p>
                CloudFront can keep a previous object at an edge location for a while. The upload
                to S3 can succeed while a visitor still sees the old JavaScript bundle, so the
                workflow invalidates the distribution after publishing the new build.
              </p>
            </div>
          </div>
          <div className="infra-aws-deep infra-aws-deep-accent">
            <div>
              <p className="infra-post-meta">THE CERTIFICATE TRAP</p>
              <h3>CloudFront has a special regional rule</h3>
              <p>
                ACM certificates are regional resources, but the certificate attached to CloudFront
                must live in <code>us-east-1</code>. That was the confusing part: the certificate
                can be created in N. Virginia even when the S3 bucket or Lambda work elsewhere.
              </p>
            </div>
            <div className="infra-aws-region-map" aria-hidden="true">
              <span>ACM</span>
              <i />
              <b>us-east-1</b>
              <em>CloudFront</em>
            </div>
          </div>
        </section>
        <section id="counter" className="infra-article-section">
          <p className="infra-post-meta">02 / SERVERLESS COUNTER</p>
          <h2>How the visitor count works</h2>
          <p>
            The browser calls an API Gateway endpoint when the page loads. API Gateway passes the
            request to Lambda, Lambda reads and updates the count in DynamoDB, and the response
            returns to the browser.
          </p>
          <p>
            This is deliberately small: there is no server to keep running and no database
            connection to manage. It also taught me an important distinction: the counter measures
            page-load requests, not guaranteed unique people. Refreshing the page increments it
            again.
          </p>
          <div className="infra-callout">
            <strong>The request path</strong>
            <span>Browser → API Gateway → Lambda → DynamoDB → Browser</span>
          </div>
          <div className="infra-aws-deep infra-aws-deep-stack">
            <div>
              <p className="infra-post-meta">THE SERVERLESS CONTRACT</p>
              <h3>Each service owns one small responsibility</h3>
              <p>
                API Gateway is the HTTP boundary, Lambda is the short-lived compute step, and
                DynamoDB is the durable state. Because the pieces communicate through a request
                and response, the frontend never needs to know where the count is stored.
              </p>
            </div>
            <div>
              <p className="infra-post-meta">THE TRADE-OFF</p>
              <h3>Simple does not mean invisible</h3>
              <p>
                The architecture avoids a permanent server, but it does not remove operational
                behavior. CORS, cold starts, API errors, and repeated refreshes are still part of
                the system and need to be understood at the browser boundary.
              </p>
            </div>
          </div>
        </section>
        <section id="lessons" className="infra-article-section">
          <p className="infra-post-meta">03 / INCIDENT NOTES</p>
          <h2>The parts that did not work immediately</h2>
          <h3>CloudFront and the missing certificate</h3>
          <p>
            I created the ACM certificate in my usual AWS region and could not find it in
            CloudFront. The reason was regional: CloudFront requires its ACM certificate in{" "}
            <code>us-east-1</code>, even when the rest of the infrastructure lives elsewhere.
          </p>
          <h3>CORS and the browser boundary</h3>
          <p>
            The frontend and API have different origins, so the browser blocked the request until
            API Gateway and Lambda returned the right CORS headers. For this public counter,
            allowing <code>*</code> was a reasonable choice because there is no private user data.
          </p>
          <h3>The workflow in the wrong directory</h3>
          <p>
            The app lives in <code>z13i-portfolio/</code>, but GitHub Actions looks for workflows at
            the repository root. The working location is <code>.github/workflows/deploy.yml</code>,
            beside the app directory, not inside it.
          </p>
        </section>
        <section id="docker" className="infra-article-section">
          <p className="infra-post-meta">04 / CONTAINER PATH</p>
          <h2>The same build, packaged with Docker</h2>
          <p>
            AWS is the production hosting path, but the portfolio can also run as a container. The
            Dockerfile uses two stages: Node.js installs dependencies and builds the app, then Nginx
            serves only the final static files from <code>/usr/share/nginx/html</code>.
          </p>
          <pre>
            <code>{`Node.js -> npm ci -> npm run build -> dist/
Nginx   <- copy dist/ <- static runtime`}</code>
          </pre>
          <p>
            Keeping the build toolchain out of the final image makes the runtime smaller and gives
            the project a second, portable way to ship.
          </p>
        </section>
        <footer className="infra-article-footer">
          <span>END OF LOG</span>
          <span>build / deploy / observe / repeat</span>
        </footer>
      </div>
    </article>
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
      {subtitle ? <p className="text-2xs text-term-muted">{subtitle}</p> : null}
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
      <div className="h-px w-full border-t border-dashed border-term-border-strong" />
    </div>
  );
}

function InfraDiagram() {
  const user = <InfraNode tone="user" title="User" icon={<User className="size-4" />} />;
  const r53 = (
    <InfraNode tone="purple" title="Route 53" subtitle="DNS" icon={<Globe className="size-4" />} />
  );
  const cf = (
    <InfraNode
      tone="purple"
      title="CloudFront"
      subtitle="CDN / HTTPS"
      icon={<Cloud className="size-4" />}
    />
  );
  const s3 = (
    <InfraNode
      tone="green"
      title="S3 Bucket"
      subtitle="Static Site"
      icon={<Database className="size-4" />}
    />
  );
  const api = (
    <InfraNode
      tone="cyan"
      title="API Gateway"
      subtitle="REST API"
      icon={<Network className="size-4" />}
    />
  );
  const lambda = (
    <InfraNode
      tone="amber"
      title="AWS Lambda"
      subtitle="Compute"
      icon={<Zap className="size-4" />}
    />
  );
  const db = (
    <InfraNode
      tone="green"
      title="DynamoDB"
      subtitle="Visitor Count"
      icon={<Database className="size-4" />}
    />
  );
  const cicd = (
    <InfraNode
      tone="user"
      title="GitHub Actions"
      subtitle="CI/CD"
      icon={<GitBranch className="size-4" />}
    />
  );
  return (
    <>
      <div className="flex flex-col items-center md:hidden">
        {user}
        <VLink />
        {r53}
        <VLink />
        {cf}
        <VLink />
        {s3}
        <div className="my-4 h-px w-40 border-t border-dashed border-term-border-strong" />
        <p className="mb-2 text-2xs text-term-muted">Backend API Triggered</p>
        {api}
        <VLink />
        {lambda}
        <VLink />
        {db}
        <div className="my-4 h-px w-40 border-t border-dashed border-term-border-strong" />
        {cicd}
      </div>
      <div className="hidden gap-y-1 md:grid md:grid-cols-[9rem_3rem_9rem] md:items-center md:justify-center md:justify-items-center">
        {user}
        <span />
        {cicd}
        <VLink />
        <span />
        <VLink />
        {r53}
        <span />
        {api}
        <VLink />
        <span />
        <VLink />
        {cf}
        <HLink />
        {lambda}
        <VLink />
        <span />
        <VLink />
        {s3}
        <span />
        {db}
      </div>
    </>
  );
}

export function ContactView() {
  const rows = [
    { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
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
    { icon: Globe, label: "Website", value: PROFILE.website, href: PROFILE.websiteUrl },
    { icon: MapPin, label: "Location", value: PROFILE.location },
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
              {row.href ? <ExternalLink className="size-3.5 text-term-dim" /> : null}
            </>
          );
          return (
            <li key={row.label} className="border-b border-term-border last:border-b-0">
              {row.href ? (
                <a
                  href={row.href}
                  target={row.href.startsWith("http") ? "_blank" : undefined}
                  rel={row.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="group flex items-center gap-3 px-4 py-3 text-sm hover:bg-term-raised"
                >
                  {body}
                </a>
              ) : (
                <div className="flex items-center gap-3 px-4 py-3 text-sm">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
      <div className="mt-6 rounded-lg border border-term-border bg-term-panel px-4 py-4">
        <p className="text-xs text-term-dim">{PROFILE.host}:~$ whoami</p>
        <p className="mt-2 text-sm text-term-green">{PROFILE.title}</p>
        <p className="mt-3 text-sm text-term-fg">Let's build something great together.</p>
      </div>
    </div>
  );
}
