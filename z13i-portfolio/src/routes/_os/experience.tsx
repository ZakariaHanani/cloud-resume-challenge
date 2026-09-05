import { createFileRoute } from "@tanstack/react-router";
import { ExperienceView } from "@/components/terminal/views";

export const Route = createFileRoute("/_os/experience")({
  component: ExperienceView,
});
