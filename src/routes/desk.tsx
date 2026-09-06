import { createFileRoute } from "@tanstack/react-router";
import { DeskShell } from "@/components/desk/shell";
import { parseDeskSearch } from "@/lib/nav";

export const Route = createFileRoute("/desk")({
  validateSearch: parseDeskSearch,
  component: DeskShell,
});
