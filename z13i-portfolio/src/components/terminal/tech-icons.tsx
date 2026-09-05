import type { JSX, ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarkProps = { className?: string };

function Svg({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8", className)}
      fill="none"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function DockerMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <path
        fill="#2496ed"
        d="M4 18.2h3.2V21H4v-2.8Zm3.6 0h3.2V21H7.6v-2.8Zm3.6 0h3.2V21h-3.2v-2.8Zm-7.2-3.2h3.2v2.8H4v-2.8Zm3.6 0h3.2v2.8H7.6v-2.8Zm3.6 0h3.2v2.8h-3.2v-2.8Zm3.6 0h3.2v2.8h-3.2v-2.8Zm-3.6-3.2h3.2v2.8h-3.2v-2.8Zm3.6 0h3.2v2.8h-3.2v-2.8Zm4.4 4.4c.7 0 2.4-.2 3.4-1.3.4.2 1.4.6 2.4.2-.2.9-.4 1.5-1.1 2.1C21.3 23 17.8 24 14 24c-5.2 0-9.4-1.7-10-6.4h18.7c0-2.4-1-5.8-4.1-5.8-1.1 0-2.1.4-2.8 1.2-.6-.4-1.4-.6-2.2-.6-.2 0-.9 0-1.6.4 0-2.6 2.2-4.8 4.8-4.8 1.4 0 2.2.6 2.6.9l.9-1.3C19.8 7 18.6 6 16.8 6 13.6 6 11 8.4 10.6 11.4 9.8 11 8.8 11 8 11.4 7.4 9.6 5.6 8.4 3.6 8.4v1.6c1.2 0 2.2.8 2.6 1.8H4v2.8h16.8c.1.6.1 1.2 0 1.8H18.4v-2.8Z"
      />
    </Svg>
  );
}

function K8sMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <polygon
        points="16,3 27,9.2 27,22.8 16,29 5,22.8 5,9.2"
        stroke="#326ce5"
        strokeWidth="1.6"
        fill="#326ce5"
        fillOpacity="0.15"
      />
      <circle cx="16" cy="16" r="4.2" fill="#326ce5" />
      <path
        d="M16 7.5v4.2M16 20.3v4.2M8.8 11.8l3.6 2.1M19.6 18.1l3.6 2.1M24.2 11.8l-3.6 2.1M12.4 18.1l-3.6 2.1"
        stroke="#9ec1ff"
        strokeWidth="1.4"
      />
    </Svg>
  );
}

function HelmMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <circle cx="16" cy="16" r="11" stroke="#0f1689" strokeWidth="1.6" fill="#eef2ff" />
      <circle cx="16" cy="16" r="3.2" fill="#0f1689" />
      <path
        d="M16 5v6.5M16 20.5V27M5 16h6.5M20.5 16H27M8.2 8.2l4.6 4.6M19.2 19.2l4.6 4.6M23.8 8.2l-4.6 4.6M12.8 19.2l-4.6 4.6"
        stroke="#0f1689"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </Svg>
  );
}

function AwsMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <text
        x="16"
        y="15"
        textAnchor="middle"
        fill="#f90"
        fontSize="9"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        aws
      </text>
      <path
        d="M8 20c3.5 2.6 12.5 2.6 16 0"
        stroke="#f90"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M24 20.2l1.6-1.4M24 20.2l1.8.8" stroke="#f90" strokeWidth="1.5" />
    </Svg>
  );
}

function IamMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <circle cx="16" cy="9" r="3.5" fill="#dd344c" />
      <circle cx="9" cy="13" r="2.8" fill="#f59e0b" />
      <circle cx="23" cy="13" r="2.8" fill="#f59e0b" />
      <path d="M10 25c.4-4.8 2.2-7.2 6-7.2s5.6 2.4 6 7.2M4.5 24c.3-3.7 1.8-5.5 4.5-5.5 1.3 0 2.4.4 3.2 1.2M27.5 24c-.3-3.7-1.8-5.5-4.5-5.5-1.3 0-2.4.4-3.2 1.2" fill="none" stroke="#dd344c" strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}

function LambdaMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <path d="M8 25 14.3 7h3.4L24 25h-4l-1.6-5.2h-5.2L11.7 25H8Zm6.2-8.3h3.2L16 11.4l-1.8 5.3Z" fill="#ff9900" />
      <path d="M20.5 25 23 18.7 26.5 25h-4.1Z" fill="#ff9900" />
    </Svg>
  );
}

function TerraformMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <path fill="#7b42bc" d="M12 6.5 20 11v9l-8-4.5V6.5Z" />
      <path fill="#7b42bc" d="M4.5 11 12.5 15.5v9L4.5 20v-9Z" />
      <path fill="#7b42bc" d="M20 11 28 6.5v9L20 20v-9Z" />
    </Svg>
  );
}

function CloudflareMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <path
        fill="#f38020"
        d="M8 20.5c-.8-3.4 1.4-5.6 4.6-5.2.6-3.2 3.2-5.2 6.4-4.6 2.6.5 4.2 2.6 4.6 5.2 1.8.2 3.4 1.8 3.2 3.8H8.4c-.4 0-.6-.4-.4-.8Z"
      />
      <path
        fill="#faae40"
        d="M7 21.2c2-2.4 5.6-2 7.4-.2h10.8c.4 1.6-.6 3-2.4 3.2H9.2c-1.6 0-2.8-1.2-2.2-3Z"
      />
    </Svg>
  );
}

function S3Mark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <path
        fill="#e25303"
        d="M8 11c0-2 3.6-4 8-4s8 2 8 4v11c0 2-3.6 4-8 4s-8-2-8-4V11Z"
      />
      <ellipse cx="16" cy="11" rx="8" ry="4" fill="#f97316" />
      <path
        d="M8 15c1.6 1.6 4.6 2.6 8 2.6s6.4-1 8-2.6"
        stroke="#7c2d12"
        strokeWidth="1.2"
        opacity="0.5"
      />
    </Svg>
  );
}

function Ec2Mark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <rect x="6" y="7" width="20" height="18" rx="2" fill="#f90" />
      <rect x="9" y="11" width="14" height="8" rx="1" fill="#1b1b1b" />
      <circle cx="12" cy="21.5" r="1" fill="#1b1b1b" />
      <circle cx="16" cy="21.5" r="1" fill="#1b1b1b" />
      <circle cx="20" cy="21.5" r="1" fill="#1b1b1b" />
    </Svg>
  );
}

function GhaMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <rect x="5" y="5" width="22" height="22" rx="6" fill="#2088ff" />
      <path
        d="M12 16.5h3.2c.8 0 1.3-.5 1.3-1.2 0-.8-.5-1.3-1.3-1.3H12V16.5Zm0 5V21h3.6c1.2 0 2.1-.8 2.1-2s-.9-2-2.1-2H12"
        stroke="#fff"
        strokeWidth="1.7"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="21" cy="12" r="1.6" fill="#fff" />
    </Svg>
  );
}

function GitlabMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <path fill="#e24329" d="M16 26 6.5 8.8h4.2L16 22.2 21.3 8.8h4.2L16 26Z" />
      <path fill="#fc6d26" d="M16 26 10.7 8.8H6.5L16 26Z" />
      <path fill="#fca326" d="M6.5 8.8 4 16.2 16 26 6.5 8.8Z" />
      <path fill="#fc6d26" d="M16 26 21.3 8.8h4.2L16 26Z" />
      <path fill="#fca326" d="M25.5 8.8 28 16.2 16 26 25.5 8.8Z" />
    </Svg>
  );
}

function JenkinsMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <circle cx="16" cy="16" r="12" fill="#d33833" />
      <text
        x="16"
        y="21"
        textAnchor="middle"
        fill="#fff"
        fontSize="14"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        J
      </text>
    </Svg>
  );
}

function GithubMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <path
        fill="#24292f"
        d="M16 3.5a12.5 12.5 0 0 0-4 24.34c.63.12.86-.27.86-.6v-2.2c-3.5.76-4.24-1.48-4.24-1.48-.57-1.45-1.4-1.84-1.4-1.84-1.14-.78.09-.76.09-.76 1.26.1 1.93 1.3 1.93 1.3 1.12 1.92 2.94 1.37 3.66 1.05.11-.81.44-1.37.8-1.68-2.79-.32-5.72-1.4-5.72-6.23 0-1.38.49-2.5 1.3-3.38-.13-.32-.56-1.6.12-3.34 0 0 1.06-.34 3.46 1.29a12 12 0 0 1 6.3 0c2.4-1.63 3.46-1.29 3.46-1.29.68 1.74.25 3.02.12 3.34.81.88 1.3 2 1.3 3.38 0 4.84-2.94 5.9-5.74 6.22.45.39.85 1.15.85 2.32v3.44c0 .34.23.73.87.6A12.5 12.5 0 0 0 16 3.5Z"
      />
    </Svg>
  );
}

function SpringMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <path fill="#6db33f" d="M26.5 6.2C18.2 6.3 10 9.1 8.5 16.1c-.7 3.3 1.1 6.1 4.4 6.1 4.8 0 8.4-4.5 9.2-8.7-2.4 2.1-5.3 3.5-8.9 3.7 3.4-1.2 6.1-3.3 8.1-6.2-4.8 3.2-10.1 4.7-13.5 8.7 1.4-5.5 5.2-8.6 10.4-10.3-3.6.1-6.7 1.1-9.3 2.7 3.4-4.6 9.6-6.3 17.6-5.9Z" />
      <path fill="#4b8f29" d="M7.8 25.2c3.7-3.8 7.8-6 13.1-7.3-3.2 2.9-6.1 5-9.6 6.5-1.3.5-2.5.8-3.5.8Z" />
    </Svg>
  );
}

function DjangoMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <path fill="#092e20" d="M8 6h5v14.2c.7.2 1.6.3 2.4.3 2.9 0 4.5-1.6 4.5-4.5V6h5v10.2c0 5.7-3.1 9-9.3 9-2.8 0-5.3-.6-7.6-1.7V6Z" />
      <path fill="#44b78b" d="M20 3h5v4h-5z" />
    </Svg>
  );
}

function ArchMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <path fill="#1793d1" d="m16 4 12 24h-5.4l-2.1-4.7h-9L9.3 28H4L16 4Zm0 8.5-2.7 6.1h5.4L16 12.5Z" />
    </Svg>
  );
}

function SshMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <rect x="4" y="6" width="24" height="20" rx="2.5" fill="#202124" stroke="#7f8c8d" strokeWidth="1.4" />
      <path d="m9 12 4 3.2L9 18.4M16 19h7" stroke="#9bb5a0" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="11" r="1.3" fill="#f05d5e" />
    </Svg>
  );
}

function BashMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <rect x="4" y="7" width="24" height="18" rx="3" fill="#3e3e3e" />
      <path
        d="M9 13.5 13 16 9 18.5"
        stroke="#5ee07a"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 19.5H23"
        stroke="#d4deea"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </Svg>
  );
}

function JavaMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <path
        d="M16 6c2 3-4 3.5-2 7 3-2 6 0 3 4"
        stroke="#5382a1"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M10 20c4 2 8 2 12 0"
        stroke="#e76f00"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M9 23c5 2.4 9 2.4 14 0"
        stroke="#e76f00"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M11 26c3.4 1.4 6.6 1.4 10 0"
        stroke="#e76f00"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </Svg>
  );
}

function PythonMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <path
        fill="#3776ab"
        d="M16 5c4.4 0 6 1.8 6 5.2v3.2h-6.4v.8H22c2.2 0 4 2.2 4 4.8 0 2.6-1.8 4.8-4 4.8h-2v-2.6c0-2.2-2-4-4.4-4H10.2V10.2C10.2 6.8 12 5 16 5Zm-1.6 2.4a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z"
      />
      <path
        fill="#ffd43b"
        d="M16 27c-4.4 0-6-1.8-6-5.2v-3.2h6.4v-.8H10c-2.2 0-4-2.2-4-4.8 0-2.6 1.8-4.8 4-4.8h2v2.6c0 2.2 2 4 4.4 4h5.4v5.6c0 3.4-1.8 5.2-5.8 5.2Zm1.6-2.4a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8Z"
      />
    </Svg>
  );
}

function SqlMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <ellipse cx="16" cy="9" rx="9" ry="3.4" fill="#336791" />
      <path
        fill="#336791"
        d="M7 9v10c0 1.9 4 3.4 9 3.4s9-1.5 9-3.4V9"
        opacity="0.9"
      />
      <ellipse cx="16" cy="19" rx="9" ry="3.4" fill="#4479a1" />
    </Svg>
  );
}

function YamlMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <rect x="7" y="5" width="18" height="22" rx="2" fill="#cb171e" />
      <path
        d="M11 11h10M11 15h10M11 19h7"
        stroke="#fff"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </Svg>
  );
}

function LinuxMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <ellipse cx="16" cy="22.5" rx="8" ry="5" fill="#333" />
      <ellipse cx="16" cy="13" rx="6.4" ry="7.4" fill="#222" />
      <ellipse cx="13.4" cy="12.2" rx="1.4" ry="1.8" fill="#f5d76e" />
      <ellipse cx="18.6" cy="12.2" rx="1.4" ry="1.8" fill="#f5d76e" />
      <circle cx="13.6" cy="12.4" r="0.6" fill="#111" />
      <circle cx="18.8" cy="12.4" r="0.6" fill="#111" />
      <ellipse cx="16" cy="16.4" rx="1.6" ry="1.1" fill="#f0c14a" />
      <path
        d="M12 22.5c1.2 1.6 2.8 2.4 4 2.4s2.8-.8 4-2.4"
        stroke="#e8c547"
        strokeWidth="1.2"
        fill="none"
      />
    </Svg>
  );
}

function CentosMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <circle cx="16" cy="16" r="11" fill="none" stroke="#932279" strokeWidth="3" />
      <path d="M16 5v7h-7M27 16h-7v-7M16 27v-7h7M5 16h7v7" fill="none" stroke="#f0c341" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="m16 10 6 6-6 6-6-6 6-6Z" fill="#932279" />
      <path d="m16 12 4 4-4 4-4-4 4-4Z" fill="#f0c341" />
    </Svg>
  );
}

function NginxMark({ className }: MarkProps) {
  return (
    <Svg className={className}>
      <circle cx="16" cy="16" r="11" fill="#009639" />
      <path d="M10 22V10h2.5l7 8.1V10H22v12h-2.4l-7.1-8.1V22H10Z" fill="#fff" />
    </Svg>
  );
}

const MARKS: Record<string, (props: MarkProps) => JSX.Element> = {
  docker: DockerMark,
  k8s: K8sMark,
  helm: HelmMark,
  aws: AwsMark,
  iam: IamMark,
  lambda: LambdaMark,
  terraform: TerraformMark,
  cloudflare: CloudflareMark,
  s3: S3Mark,
  ec2: Ec2Mark,
  gha: GhaMark,
  gitlab: GitlabMark,
  jenkins: JenkinsMark,
  github: GithubMark,
  spring: SpringMark,
  django: DjangoMark,
  arch: ArchMark,
  ssh: SshMark,
  bash: BashMark,
  java: JavaMark,
  python: PythonMark,
  sql: SqlMark,
  yaml: YamlMark,
  linux: LinuxMark,
  centos: CentosMark,
  nginx: NginxMark,
};

export function TechMark({ mark, name }: { mark: string; name: string }) {
  const Icon = MARKS[mark] ?? BashMark;
  return (
    <div className="flex w-16 flex-col items-center gap-2 sm:w-[4.5rem]">
      <div className="flex size-12 items-center justify-center rounded-lg border border-term-border bg-term-raised">
        <Icon />
      </div>
      <span className="text-center text-2xs leading-tight text-term-muted sm:text-xs">
        {name}
      </span>
    </div>
  );
}
