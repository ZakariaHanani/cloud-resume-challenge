import { createFileRoute } from "@tanstack/react-router";
import { ContactView } from "@/components/terminal/views";

export const Route = createFileRoute("/_os/contact")({
  component: ContactView,
});
