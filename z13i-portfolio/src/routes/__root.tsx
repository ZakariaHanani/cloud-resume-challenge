import {
  createRootRoute,
  Outlet,
} from "@tanstack/react-router";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AppErrorComponent } from "@/lib/error-component";

const APP_NAME = "Z13I — Zakaria Hanani";
const APP_DESCRIPTION =
  "Terminal-style portfolio of Zakaria Hanani — DevOps & backend engineer. Linux, cloud, and distributed systems.";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "description", content: APP_DESCRIPTION },
      { name: "theme-color", content: "#f1f3f4" },
    ],
  }),
  errorComponent: AppErrorComponent,
  notFoundComponent: NotFound,
  component: RootDocument,
});

function RootDocument() {
  return (
    <>
      <PreviewHostBridge />
      <Outlet />
    </>
  );
}

function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 px-6 text-center">
      <p className="text-sm text-term-accent">zakaria@archlinux:~$ cd</p>
      <h1 className="text-lg font-semibold text-term-fg">
        bash: cd: no such file or directory
      </h1>
      <p className="max-w-md text-sm text-term-muted">
        That path is not mounted. Try{" "}
        <a href="/" className="text-term-accent underline-offset-4 hover:underline">
          ~/about
        </a>
        .
      </p>
    </main>
  );
}
