import { useEffect, useMemo, useState } from "react";
import { Command } from "cmdk";
import {
  BookOpen,
  LayoutGrid,
  Moon,
  Palette,
  Search,
  Sun,
  SwatchBook,
} from "lucide-react";
import { APPS, DOCTYPES } from "@/lib/erp-data";
import { useDeskStore } from "@/lib/desk-store";
import { useDeskNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function CommandPalette() {
  const open = useDeskStore((s) => s.commandOpen);
  const setOpen = useDeskStore((s) => s.setCommandOpen);
  const setMode = useDeskStore((s) => s.setMode);
  const mode = useDeskStore((s) => s.mode);
  const setSkin = useDeskStore((s) => s.setSkin);
  const skin = useDeskStore((s) => s.skin);
  const setStudio = useDeskStore((s) => s.setStudioOpen);
  const records = useDeskStore((s) => s.records);
  const { go } = useDeskNav();
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const hits = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (needle.length < 2) return [];
    const out: Array<{ doctype: string; id: string; title: string }> = [];
    for (const [doctype, rows] of Object.entries(records)) {
      for (const r of rows) {
        const hay = `${r.id} ${r.title} ${r.subtitle ?? ""} ${r.status}`.toLowerCase();
        if (hay.includes(needle)) out.push({ doctype, id: r.id, title: r.title });
        if (out.length >= 8) return out;
      }
    }
    return out;
  }, [q, records]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-24">
      <button
        type="button"
        aria-label="Close command palette"
        className="absolute inset-0 bg-fg/30"
        onClick={() => setOpen(false)}
      />
      <Command
        className="relative w-full max-w-lg overflow-hidden rounded-xl bg-surface shadow-card-hover"
        loop
      >
        <div className="flex items-center gap-2 border-b border-line px-3">
          <Search className="size-4 text-faint" />
          <Command.Input
            value={q}
            onValueChange={setQ}
            placeholder="Jump to an app, document, or action…"
            className="h-12 w-full bg-transparent text-sm text-fg outline-none placeholder:text-faint"
          />
        </div>
        <Command.List className="max-h-80 overflow-y-auto p-2 desk-scroll">
          <Command.Empty className="px-3 py-6 text-center text-sm text-muted">
            Nothing matches.
          </Command.Empty>
          <Group heading="Apps">
            {APPS.filter((a) => a.id !== "home").map((app) => (
              <Item
                key={app.id}
                onSelect={() => {
                  go({ m: app.id, v: app.id === "studio" ? "workspace" : "workspace" });
                  setOpen(false);
                  if (app.id === "studio") setStudio(true);
                }}
              >
                <LayoutGrid className="size-3.5" />
                {app.name}
                <span className="ml-auto text-xs text-faint">{app.blurb}</span>
              </Item>
            ))}
          </Group>
          <Group heading="Doctypes">
            {Object.values(DOCTYPES).map((d) => (
              <Item
                key={d.name}
                onSelect={() => {
                  go({
                    m: d.app,
                    v: d.views.includes("kanban") ? "kanban" : "list",
                    d: d.name,
                    id: undefined,
                  });
                  setOpen(false);
                }}
              >
                <BookOpen className="size-3.5" />
                {d.plural}
              </Item>
            ))}
          </Group>
          {hits.length ? (
            <Group heading="Documents">
              {hits.map((h) => (
                <Item
                  key={h.id}
                  onSelect={() => {
                    const dt = DOCTYPES[h.doctype];
                    go({ m: dt?.app ?? "home", v: "form", d: h.doctype, id: h.id });
                    setOpen(false);
                  }}
                >
                  <span className="font-mono text-xs text-faint">{h.id}</span>
                  {h.title}
                </Item>
              ))}
            </Group>
          ) : null}
          <Group heading="Theme">
            <Item
              onSelect={() => {
                setMode(mode === "dark" ? "light" : "dark");
                setOpen(false);
              }}
            >
              {mode === "dark" ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
              Toggle {mode === "dark" ? "light" : "dark"} mode
            </Item>
            <Item
              onSelect={() => {
                setSkin(skin === "aurea" ? "standard" : "aurea");
                setOpen(false);
              }}
            >
              <SwatchBook className="size-3.5" />
              Switch to {skin === "aurea" ? "standard ERPNext" : "Aurea"}
            </Item>
            <Item
              onSelect={() => {
                setStudio(true);
                go({ m: "studio", v: "workspace" });
                setOpen(false);
              }}
            >
              <Palette className="size-3.5" />
              Open Theme Studio
            </Item>
          </Group>
        </Command.List>
      </Command>
    </div>
  );
}

function Group({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <Command.Group
      heading={heading}
      className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-faint"
    >
      {children}
    </Command.Group>
  );
}

function Item({
  children,
  onSelect,
}: {
  children: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-sm text-fg",
        "data-[selected=true]:bg-accent-soft data-[selected=true]:text-accent",
      )}
    >
      {children}
    </Command.Item>
  );
}
