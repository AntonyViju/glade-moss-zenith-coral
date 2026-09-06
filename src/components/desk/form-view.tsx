import { useMemo, useState } from "react";
import { ChevronLeft, MessageSquare, Plus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/desk/status-badge";
import { DOCTYPES, type DeskRecord, type LineItem } from "@/lib/erp-data";
import { useDeskStore } from "@/lib/desk-store";
import { useDeskNav } from "@/lib/nav";
import { cn, fmtDate, initials, sar, sarExact } from "@/lib/utils";

export function FormView() {
  const { search, go } = useDeskNav();
  const doctype = search.d ?? "Lead";
  const def = DOCTYPES[doctype];
  const records = useDeskStore((s) => s.records[doctype] ?? []);
  const updateRecord = useDeskStore((s) => s.updateRecord);
  const addComment = useDeskStore((s) => s.addComment);
  const addLine = useDeskStore((s) => s.addLine);
  const pushToast = useDeskStore((s) => s.pushToast);
  const chatterCollapsed = useDeskStore((s) => s.chatterCollapsed);
  const setChatterCollapsed = useDeskStore((s) => s.setChatterCollapsed);
  const density = useDeskStore((s) => s.density);

  const isNew = search.id === "new";
  const record = records.find((r) => r.id === search.id);

  const draft = useMemo<DeskRecord>(() => {
    if (record) return record;
    return {
      id: `${doctype.slice(0, 3).toUpperCase()}-NEW`,
      title: "",
      status: def?.workflow?.[0] ?? "Draft",
      fields: {},
      activity: [],
      lines: [],
    };
  }, [record, doctype, def]);

  if (!def) return <div className="p-8 text-sm text-muted">Unknown doctype.</div>;

  const workflow = def.workflow ?? [];
  const currentIdx = Math.max(0, workflow.findIndex((s) => s === draft.status));

  const setField = (name: string, value: string) => {
    if (isNew) return;
    const numeric = ["probability", "qty", "safety_stock", "grand_total"].includes(name);
    updateRecord(doctype, draft.id, {
      fields: { ...draft.fields, [name]: numeric ? Number(value) || 0 : value },
      title: name === "customer" || name === "organization" || name === "contact" ? value || draft.title : draft.title,
    });
  };

  const advance = (stage: string) => {
    if (isNew) {
      pushToast("Save the document first");
      return;
    }
    updateRecord(doctype, draft.id, { status: stage, stage });
    pushToast("Status updated", `${draft.id} → ${stage}`);
  };

  return (
    <div className="flex h-full min-h-0">
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-line px-4 py-3 md:px-6">
          <button
            type="button"
            onClick={() => go({ v: "list", d: doctype, id: undefined })}
            className="inline-flex items-center gap-1 text-xs text-muted hover:text-fg"
          >
            <ChevronLeft className="size-3.5" /> {def.plural}
          </button>
          <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="truncate text-xl font-semibold text-fg">
                  {isNew ? `New ${def.name}` : draft.title || draft.id}
                </h1>
                <StatusBadge status={draft.status} />
              </div>
              <p className="mt-0.5 font-mono text-xs text-faint">{draft.id}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => pushToast("Saved", `${draft.id} written to this session.`)}
              >
                Save
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  const next = workflow[currentIdx + 1];
                  if (next) advance(next);
                  else pushToast("Already at the last stage");
                }}
              >
                {workflow[currentIdx + 1] ? `Mark ${workflow[currentIdx + 1]}` : "Submit"}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setChatterCollapsed(!chatterCollapsed)}
                aria-label="Toggle chatter"
              >
                <MessageSquare className="size-4" />
              </Button>
            </div>
          </div>
          {workflow.length > 1 ? (
            <ol className="mt-4 flex gap-1 overflow-x-auto pb-1">
              {workflow.map((s, i) => {
                const done = i <= currentIdx;
                return (
                  <li key={s} className="flex min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => advance(s)}
                      className={cn(
                        "h-8 w-full truncate rounded-sm px-2 text-xs font-medium",
                        done ? "bg-accent text-accent-fg" : "bg-subtle text-muted",
                      )}
                    >
                      {s}
                    </button>
                  </li>
                );
              })}
            </ol>
          ) : null}
          {def.smart?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {def.smart.map((s) => (
                <span
                  key={s.label}
                  className="inline-flex h-9 items-center gap-2 rounded-md bg-subtle px-3 text-xs"
                >
                  <span className="text-muted">{s.label}</span>
                  <span className="font-semibold tabular-nums text-fg">{s.value}</span>
                </span>
              ))}
            </div>
          ) : null}
        </header>

        <div className="min-h-0 flex-1 overflow-auto p-4 desk-scroll md:p-6">
          <section className="rounded-xl bg-surface p-4 shadow-card md:p-6">
            <h2 className="mb-4 text-xs font-semibold tracking-wide text-muted uppercase">
              Details
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {def.fields.map((f) => (
                <label
                  key={f.name}
                  className={cn("block", f.span === 2 && "sm:col-span-2")}
                >
                  <span className="mb-1.5 block text-xs font-medium text-muted">{f.label}</span>
                  {f.type === "textarea" ? (
                    <textarea
                      defaultValue={String(draft.fields[f.name] ?? "")}
                      onBlur={(e) => setField(f.name, e.target.value)}
                      rows={3}
                      className="w-full rounded-md bg-subtle px-3 py-2 text-sm text-fg shadow-card focus:outline-none"
                    />
                  ) : f.type === "select" ? (
                    <select
                      defaultValue={String(draft.fields[f.name] ?? f.options?.[0] ?? "")}
                      onChange={(e) => setField(f.name, e.target.value)}
                      className="h-10 w-full rounded-md bg-subtle px-3 text-sm text-fg shadow-card"
                    >
                      {(f.options ?? []).map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      type={f.type === "number" || f.type === "percent" || f.type === "currency" ? "number" : "text"}
                      defaultValue={String(draft.fields[f.name] ?? "")}
                      onBlur={(e) => setField(f.name, e.target.value)}
                    />
                  )}
                </label>
              ))}
            </div>
          </section>

          {draft.lines ? (
            <Lines
              lines={draft.lines}
              density={density}
              onAdd={(line) => {
                if (isNew) {
                  pushToast("Save the document first");
                  return;
                }
                addLine(doctype, draft.id, line);
              }}
            />
          ) : null}
        </div>
      </div>

      <aside
        className={cn(
          "w-full shrink-0 border-l border-line bg-surface md:w-80 lg:w-96",
          chatterCollapsed ? "hidden lg:flex" : "flex",
          "flex-col",
        )}
      >
        <Chatter
          record={draft}
          onSend={(text) => {
            if (isNew) {
              pushToast("Save the document first");
              return;
            }
            addComment(doctype, draft.id, text);
          }}
        />
      </aside>
    </div>
  );
}

function Lines({
  lines,
  density,
  onAdd,
}: {
  lines: LineItem[];
  density: string;
  onAdd: (line: LineItem) => void;
}) {
  const total = lines.reduce((s, l) => s + l.qty * l.rate, 0);
  return (
    <section className="mt-4 rounded-xl bg-surface shadow-card">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <h2 className="text-xs font-semibold tracking-wide text-muted uppercase">Items</h2>
        <Button
          size="sm"
          variant="ghost"
          onClick={() =>
            onAdd({
              item: "MISC-001",
              description: "Additional line",
              qty: 1,
              rate: 0,
              uom: "Nos",
            })
          }
        >
          <Plus className="size-3.5" /> Add row
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-y border-line text-xs text-faint">
              <th className="px-4 py-2 font-medium md:px-6">Item</th>
              <th className="px-3 py-2 font-medium">Qty</th>
              <th className="px-3 py-2 font-medium">Rate</th>
              <th className="px-4 py-2 font-medium md:px-6">Amount</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((l, i) => (
              <tr key={`${l.item}-${i}`} className="border-b border-line">
                <td className={cn("px-4 md:px-6", density === "compact" ? "py-2" : "py-3")}>
                  <div className="font-mono text-xs text-faint">{l.item}</div>
                  <div>{l.description}</div>
                </td>
                <td className="px-3 tabular-nums">
                  {l.qty} {l.uom}
                </td>
                <td className="px-3 tabular-nums">{sarExact(l.rate)}</td>
                <td className="px-4 tabular-nums md:px-6">{sarExact(l.qty * l.rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end px-4 py-3 md:px-6">
        <div className="text-right">
          <div className="text-xs text-muted">Grand total</div>
          <div className="text-lg font-semibold tabular-nums">{sar(total)}</div>
        </div>
      </div>
    </section>
  );
}

function Chatter({
  record,
  onSend,
}: {
  record: DeskRecord;
  onSend: (text: string) => void;
}) {
  const [text, setText] = useState("");
  return (
    <>
      <div className="border-b border-line px-4 py-3">
        <h2 className="text-sm font-semibold text-fg">Chatter</h2>
        <p className="text-xs text-muted">
          {record.date ? `Created ${fmtDate(record.date)}` : "Conversation"}
        </p>
      </div>
      <div className="min-h-0 flex-1 overflow-auto p-4 desk-scroll">
        <ul className="flex flex-col gap-4">
          {(record.activity ?? []).map((a, i) => (
            <li key={`${a.time}-${i}`} className="flex gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-subtle text-xs font-medium text-muted">
                {initials(a.author)}
              </span>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-fg">{a.author}</span>
                  <span className="text-xs text-faint">{a.time}</span>
                </div>
                <p className="mt-0.5 text-sm leading-relaxed text-muted">{a.text}</p>
              </div>
            </li>
          ))}
          {(record.activity ?? []).length === 0 ? (
            <li className="text-sm text-muted">No messages yet. Leave the first note.</li>
          ) : null}
        </ul>
      </div>
      <form
        className="border-t border-line p-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          onSend(text.trim());
          setText("");
        }}
      >
        <div className="flex gap-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a note…"
          />
          <Button type="submit" size="icon" aria-label="Send">
            <Send className="size-4" />
          </Button>
        </div>
      </form>
    </>
  );
}
