import { useState } from "react";
import { LayoutList, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/desk/status-badge";
import { DOCTYPES } from "@/lib/erp-data";
import { useDeskStore } from "@/lib/desk-store";
import { useDeskNav } from "@/lib/nav";
import { cn, sar } from "@/lib/utils";

export function KanbanView() {
  const { search, go } = useDeskNav();
  const doctype = search.d ?? "Opportunity";
  const def = DOCTYPES[doctype];
  const records = useDeskStore((s) => s.records[doctype] ?? []);
  const moveStage = useDeskStore((s) => s.moveStage);
  const [dragId, setDragId] = useState<string | null>(null);

  if (!def) return <div className="p-8 text-sm text-muted">Unknown doctype.</div>;
  const stages = def.stages ?? def.workflow ?? ["New"];

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-4 md:px-6">
        <div>
          <h1 className="text-lg font-semibold text-fg">{def.plural}</h1>
          <p className="text-xs text-muted">Drag cards between stages</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => go({ v: "list", d: doctype })}>
            <LayoutList className="size-3.5" /> List
          </Button>
          <Button size="sm" onClick={() => go({ v: "form", d: doctype, id: "new" })}>
            <Plus className="size-3.5" /> New
          </Button>
        </div>
      </header>
      <div className="flex min-h-0 flex-1 gap-3 overflow-x-auto p-4 desk-scroll md:p-6">
        {stages.map((stage) => {
          const cards = records.filter((r) => (r.stage ?? r.status) === stage);
          const sum = cards.reduce((s, r) => s + (r.amount ?? 0), 0);
          return (
            <section
              key={stage}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragId) moveStage(doctype, dragId, stage);
                setDragId(null);
              }}
              className={cn(
                "flex w-72 shrink-0 flex-col rounded-xl bg-subtle/60 p-2",
                dragId ? "outline outline-dashed outline-line" : "",
              )}
            >
              <div className="flex items-baseline justify-between px-2 py-2">
                <h2 className="text-sm font-semibold text-fg">{stage}</h2>
                <span className="text-xs tabular-nums text-muted">
                  {cards.length}
                  {sum ? ` · ${sar(sum)}` : ""}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {cards.map((c) => (
                  <article
                    key={c.id}
                    draggable
                    onDragStart={() => setDragId(c.id)}
                    onDragEnd={() => setDragId(null)}
                    onClick={() => go({ v: "form", d: doctype, id: c.id })}
                    className={cn(
                      "cursor-grab rounded-lg bg-surface p-3 shadow-card active:cursor-grabbing",
                      dragId === c.id && "opacity-50",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-medium text-fg">{c.title}</div>
                      <StatusBadge status={c.status} />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted">
                      <span>{c.owner}</span>
                      <span className="tabular-nums">{c.amount ? sar(c.amount) : c.id}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
