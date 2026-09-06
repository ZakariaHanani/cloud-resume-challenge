export type PageId =
  | "about"
  | "experience"
  | "stack"
  | "projects"
  | "infrastructure"
  | "contact";

export type PagePath =
  | "/"
  | "/experience"
  | "/stack"
  | "/projects"
  | "/infrastructure"
  | "/contact";

export type NavItem = {
  id: PageId;
  path: PagePath;
  label: string;
  number: string;
  prompt: string;
};

export const PROFILE = {
  wordmark: "Z13I",
  name: "zakaria hanani",
  displayName: "Zakaria Hanani",
  host: "zakaria@archlinux",
  title: " Software Engineer | System Administrator | Linux Enthusiast | Problem Solver",
  roles: ["DevOps Engineer", "System Administrator", "Linux Enthusiast", "Problem Solver"],
  location: "Biougra, Chtouka Ait Baha,  Morocco",
  email: "zakariahanani20@gmail.com",
  github: "ZakariaHanani",
  githubUrl: "https://github.com/ZakariaHanani",
  linkedin: "zakariahanani",
  linkedinUrl: "https://www.linkedin.com/in/zakaria-hanani-72518123a/",
  website: "zakariahanani.com",
  websiteUrl: "https://zakariahanani.com",
  summary: [
    "Breaking things, fixing them, automating them — and occasionally wondering why they broke in the first place.",
    "Linux, containers, cloud infrastructure, distributed systems, and a lot of terminal time",
    "Currently somewhere between DevOps, Cloud, and “let me see how this actually works under the hood."

  ],
  note: "I'm not a frontend developer (and honestly, I never enjoyed it). I prefer building robust backend systems and reliable infrastructure. Frontend is just something I do when I have to — because of AI.",
} as const;

export const NAV: NavItem[] = [
  { id: "about", path: "/", label: "about", number: "01", prompt: "~/about" },
  {
    id: "experience",
    path: "/experience",
    label: "experience",
    number: "02",
    prompt: "~/experience",
  },
  { id: "stack", path: "/stack", label: "stack", number: "03", prompt: "~/stack" },
  {
    id: "projects",
    path: "/projects",
    label: "projects",
    number: "04",
    prompt: "~/projects",
  },
  {
    id: "infrastructure",
    path: "/infrastructure",
    label: "infrastructure",
    number: "05",
    prompt: "~/infrastructure",
  },
  {
    id: "contact",
    path: "/contact",
    label: "contact",
    number: "06",
    prompt: "~/contact",
  },
];

export function pageFromPath(pathname: string): NavItem {
  const exact = NAV.find((item) => item.path === pathname);
  if (exact) return exact;
  return NAV[0];
}

export const EXPERIENCE = [
  { period: "2024", role: "Android Developer Intern", org: "Vala Bleu — Agadir", points: [ "Developed an Android mobile application to showcase the company's services and provide users with information about its offerings.", "Designed and implemented the application's interface and functionality based on the company's requirements.", ], }  , 
  { period: "2024", role: "Freelance Web Developer", org: "Roti d'Or", points: [ "Designed and developed a business website for a local food business.", "Built and customized the website based on the client's requirements and delivered a production-ready solution.", ], },
  { period: "2023", role: "Software Engineering Intern", org: "Commune Urbaine de Biougra", points: [ "Participated in an internship focused on discovering information systems and administrative workflows.", ], }, ] as const;

export type TechGroup = {
  title: string;
  items: { name: string; mark: string }[];
};

export const STACK: TechGroup[] = [
  {
    title: "Cloud & Infrastructure",
    items: [
      { name: "AWS", mark: "aws" },
      { name: "IAM", mark: "iam" },
      { name: "Lambda", mark: "lambda" },
      { name: "EC2", mark: "ec2" },
      { name: "S3", mark: "s3" },
    ],
  },
  {
    title: "Containers & Orchestration",
    items: [
      { name: "Docker", mark: "docker" },
      { name: "Kubernetes", mark: "k8s" },
      { name: "Minikube", mark: "minikube" },
    ],
  },
  {
    title: "CI/CD & Automation",
    items: [
      { name: "Jenkins", mark: "jenkins" },
      { name: "GitHub", mark: "github" },
      { name: "Bash", mark: "bash" },
    ],
  },
  {
    title: "Backend & Development",
    items: [
      { name: "Java", mark: "java" },
      { name: "Spring Boot", mark: "spring" },
      { name: "SQL", mark: "sql" },
      { name: "MySQL", mark: "mysql" },
      { name: "Python", mark: "python" },
    ],
  },
  {
    title: "Systems & Networking",
    items: [
      { name: "Linux", mark: "linux" },
      { name: "Arch Linux", mark: "arch" },
      { name: "CentOS", mark: "centos" },
      { name: "Nginx", mark: "nginx" },
      { name: "SSH", mark: "ssh" },
    ],
  },
];

export const PROJECTS = [
  {
    title: "Cloud Resume Challenge",
    blurb:
      "A cloud-hosted resume built with AWS, focusing on cloud infrastructure, serverless services, and automated deployment.",
    tag: "AWS",
    tagTone: "aws" as const,
    stars: 0,
    href: "https://github.com/ZakariaHanani/cloud-resume-challenge",
  },

  {
    title: "Microservices on Kubernetes",
    blurb:
      "A microservices voting application deployed with Docker and Kubernetes, using Redis, PostgreSQL, worker services, and Kubernetes networking.",
    tag: "Kubernetes",
    tagTone: "kubernetes" as const,
    stars: 1,
    href: "https://github.com/ZakariaHanani/microservices-on-k8s",
  },

  {
    title: "Distributed CPU Monte Carlo",
    blurb:
      "A distributed computing system for traffic-jam Monte Carlo simulations, using Java RMI to distribute computation across multiple nodes.",
    tag: "Java",
    tagTone: "java" as const,
    stars: 3,
    href: "https://github.com/ZakariaHanani/distributed-cpu-montecarlo-traffic",
  },

  {
    title: "Attendance Management",
    blurb:
      "A web and mobile attendance system using Django and Flutter, including QR-code based attendance scanning.",
    tag: "Django",
    tagTone: "python" as const,
    stars: 2,
    href: "https://github.com/ZakariaHanani/Gestion-Absence-Django",
  },

  {
    title: "Vala Bleu Mobile App",
    blurb:
      "A mobile application developed for Vala Bleu as part of a real-world project.",
    tag: "Mobile",
    tagTone: "java" as const,
    stars: 2,
    href: "https://github.com/ZakariaHanani/valableu-showcase-app",
  },

  {
    title: "Rôti d'Or",
    blurb:
      "A responsive showcase website for Rôti d'Or, a butcher shop, built with WordPress and the Astra theme.",
    tag: "WordPress",
    tagTone: "php" as const,
    stars: 1,
    href: "https://github.com/ZakariaHanani/Roti-Or",
  },
];


export const COMMANDS = [
  { cmd: "help", hint: "list available commands" },
  { cmd: "ls", hint: "list pages in ~" },
  { cmd: "cd <page>", hint: "open a page" },
  { cmd: "cat <page>", hint: "print a page summary" },
  { cmd: "whoami", hint: "print identity" },
  { cmd: "neofetch", hint: "system info" },
  { cmd: "pwd", hint: "current path" },
  { cmd: "date", hint: "clock" },
  { cmd: "uname", hint: "kernel string" },
  { cmd: "resume", hint: "print a text resume" },
  { cmd: "open <target>", hint: "github | linkedin | email | web | x" },
  { cmd: "clear", hint: "clear the tty" },
] as const;

export const HELP_SHORTCUTS = [
  { keys: "1–6", hint: "jump to a page" },
  { keys: "j / k", hint: "next / previous page" },
  { keys: ":", hint: "focus the command line" },
  { keys: "Ctrl+K", hint: "command palette" },
  { keys: "?", hint: "keyboard cheat sheet" },
  { keys: "Esc", hint: "close overlays" },
] as const;
