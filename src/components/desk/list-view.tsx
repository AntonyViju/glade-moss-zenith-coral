import { useMemo, useState } from "react";
import { Kanban, LayoutList, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/desk/status-badge";
import { DOCTYPES, type DeskRecord } from "@/lib/erp-data";
import { useDeskStore } from "@/lib/desk-store";
import { useDeskNav } from "@/lib/nav";
import { cn, fmtDate, sar } from "@/lib/utils";

export function ListView() {
  const { search, go } = useDeskNav();
  const doctype = search.d ?? "Lead";
  const def = DOCTYPES[doctype];
  const records = useDeskStore((s) => s.records[doctype] ?? []);
  const density = useDeskStore((s) => s.density);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");

  const statuses = useMemo(() => {
    const set = new Set(records.map((r) => r.status));
    return ["all", ...set];
  }, [records]);

  const filtered = records.filter((r) => {
    const hay = `${r.id} ${r.title} ${r.subtitle ?? ""} ${r.status} ${r.owner ?? ""}`.toLowerCase();
    if (q && !hay.includes(q.toLowerCase())) return false;
    if (status !== "all" && r.status !== status) return false;
    return true;
  });

  if (!def) return <div className="p-8 text-sm text-muted">Unknown doctype.</div>;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex flex-col gap-3 border-b border-line px-4 py-4 md:flex-row md:items-center md:px-6">
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-semibold text-fg">{def.plural}</h1>
          <p className="text-xs text-muted">{filtered.length} records</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-48 flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-faint" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={`Search ${def.plural.toLowerCase()}…`}
              className="pl-9"
            />
          </div>
          {def.views.includes("kanban") ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => go({ v: "kanban", d: doctype, id: undefined })}
            >
              <Kanban className="size-3.5" /> Board
            </Button>
          ) : (
            <Button variant="secondary" size="sm" disabled>
              <LayoutList className="size-3.5" /> List
            </Button>
          )}
          <Button
            size="sm"
            onClick={() => go({ v: "form", d: doctype, id: "new" })}
          >
            <Plus className="size-3.5" /> New
          </Button>
        </div>
      </header>
      <div className="flex gap-2 overflow-x-auto px-4 py-3 md:px-6">
        {statuses.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            className={cn(
              "h-8 shrink-0 rounded-full px-3 text-xs font-medium",
              status === s ? "bg-fg text-bg" : "bg-subtle text-muted hover:text-fg",
            )}
          >
            {s === "all" ? "All" : s}
          </button>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-auto desk-scroll">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 bg-bg">
            <tr className="border-b border-line text-xs text-faint">
              {def.columns.map((c) => (
                <th key={c.key} className="px-4 py-2 font-medium md:px-6">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr
                key={r.id}
                onClick={() => go({ v: "form", d: doctype, id: r.id })}
                className="cursor-pointer border-b border-line hover:bg-surface"
              >
                {def.columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn(
                      "px-4 md:px-6",
                      density === "compact" ? "py-2" : "py-3",
                    )}
                  >
                    <Cell record={r} col={c} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 ? (
          <div className="px-6 py-16 text-center text-sm text-muted">No matching records.</div>
        ) : null}
      </div>
    </div>
  );
}

function Cell({
  record,
  col,
}: {
  record: DeskRecord;
  col: { key: string; kind?: string };
}) {
  const raw = valueOf(record, col.key);
  if (col.kind === "status") return <StatusBadge status={String(raw ?? record.status)} />;
  if (col.kind === "currency")
    return <span className="tabular-nums">{typeof raw === "number" ? sar(raw) : "—"}</span>;
  if (col.kind === "date")
    return <span className="text-muted">{raw ? fmtDate(String(raw)) : "—"}</span>;
  if (col.key === "id")
    return <span className="font-mono text-xs text-faint">{String(raw)}</span>;
  if (col.key === "title")
    return (
      <div>
        <div className="font-medium text-fg">{record.title}</div>
        {record.subtitle ? <div className="text-xs text-muted">{record.subtitle}</div> : null}
      </div>
    );
  return <span className="text-fg">{raw === undefined || raw === "" ? "—" : String(raw)}</span>;
}

function valueOf(record: DeskRecord, key: string): string | number | undefined {
  if (key === "id") return record.id;
  if (key === "title") return record.title;
  if (key === "status") return record.status;
  if (key === "amount") return record.amount;
  if (key === "date") return record.date;
  if (key === "owner") return record.owner;
  const f = record.fields[key];
  if (typeof f === "string" || typeof f === "number") return f;
  return undefined;
}
