import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AGED_RECEIVABLES, MONTHLY_REVENUE } from "@/lib/erp-data";
import { useDeskStore } from "@/lib/desk-store";
import { useDeskNav } from "@/lib/nav";
import { sar } from "@/lib/utils";
import { StatusBadge } from "@/components/desk/status-badge";

export function Dashboard() {
  const invoices = useDeskStore((s) => s.records["Sales Invoice"] ?? []);
  const { go } = useDeskNav();
  const outstanding = invoices.reduce((s, r) => s + (r.amount ?? 0), 0);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 p-4 md:p-8">
      <header>
        <p className="text-xs font-medium tracking-wide text-muted uppercase">Accounting</p>
        <h1 className="font-display mt-1 text-4xl text-fg">Books at a glance</h1>
      </header>
      <section className="grid gap-3 sm:grid-cols-3">
        <Kpi label="Outstanding AR" value={sar(outstanding)} hint="Open invoices" />
        <Kpi label="Collected · Aug" value={sar(54800)} hint="SABIC settled" />
        <Kpi label="Overdue" value={sar(86400)} hint="Al-Nour · 12 days" />
      </section>
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl bg-surface p-4 shadow-card">
          <h2 className="mb-4 text-sm font-semibold text-fg">Revenue</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_REVENUE}>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--aurea-muted)" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: "var(--aurea-surface)",
                    border: "none",
                    borderRadius: 12,
                    fontSize: 12,
                    boxShadow: "var(--aurea-shadow)",
                  }}
                  formatter={(v) => sar(Number(v ?? 0))}
                />
                <Bar dataKey="value" fill="var(--aurea-accent)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="rounded-xl bg-surface p-4 shadow-card">
          <h2 className="mb-4 text-sm font-semibold text-fg">Aged receivables</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={AGED_RECEIVABLES} layout="vertical">
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="bucket"
                  width={56}
                  tick={{ fontSize: 11, fill: "var(--aurea-muted)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--aurea-surface)",
                    border: "none",
                    borderRadius: 12,
                    fontSize: 12,
                    boxShadow: "var(--aurea-shadow)",
                  }}
                  formatter={(v) => sar(Number(v ?? 0))}
                />
                <Bar dataKey="value" fill="var(--aurea-accent)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
      <section className="overflow-hidden rounded-xl bg-surface shadow-card">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-sm font-semibold text-fg">Sales invoices</h2>
          <button
            type="button"
            className="text-xs font-medium text-accent"
            onClick={() => go({ m: "accounts", v: "list", d: "Sales Invoice" })}
          >
            Open list
          </button>
        </div>
        {invoices.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => go({ m: "accounts", v: "form", d: "Sales Invoice", id: r.id })}
            className="flex w-full items-center gap-3 border-t border-line px-4 py-3 text-left hover:bg-subtle"
          >
            <span className="w-32 font-mono text-xs text-faint">{r.id}</span>
            <span className="flex-1 truncate text-sm">{r.title}</span>
            <StatusBadge status={r.status} />
            <span className="w-24 text-right text-sm tabular-nums">{sar(r.amount ?? 0)}</span>
          </button>
        ))}
      </section>
    </div>
  );
}

function Kpi({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <article className="rounded-xl bg-surface p-4 shadow-card">
      <div className="text-xs font-medium text-muted">{label}</div>
      <div className="mt-2 text-2xl font-medium tabular-nums text-fg">{value}</div>
      <div className="mt-1 text-xs text-faint">{hint}</div>
    </article>
  );
}
