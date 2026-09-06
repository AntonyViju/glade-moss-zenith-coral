import {
  ArrowUpRight,
  Landmark,
  Package,
  ShoppingBag,
  Users,
  Warehouse,
  Cog,
  Kanban,
  IdCard,
  PackageSearch,
  Palette,
  Plus,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { APPS, MONTHLY_REVENUE, NOTIFICATIONS } from "@/lib/erp-data";
import { useDeskStore } from "@/lib/desk-store";
import { useDeskNav } from "@/lib/nav";
import { sar, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeStudio } from "@/components/desk/theme-studio";

const ICONS: Record<string, typeof Users> = {
  crm: Users,
  sales: ShoppingBag,
  buying: PackageSearch,
  stock: Warehouse,
  accounts: Landmark,
  hr: IdCard,
  mfg: Cog,
  projects: Kanban,
  studio: Palette,
};

const KPIS = [
  { label: "Revenue · Aug", value: sar(1680000), delta: "+19%", tone: "up" },
  { label: "Open pipeline", value: sar(3193000), delta: "6 deals", tone: "flat" },
  { label: "Receivables", value: sar(475200), delta: "1 overdue", tone: "warn" },
  { label: "Gross margin", value: "31.4%", delta: "+1.2pt", tone: "up" },
];

export function Workspace() {
  const { search, go } = useDeskNav();
  const records = useDeskStore((s) => s.records);

  if (search.m === "studio") return <ThemeStudio />;
  if (search.m !== "home") return <AppHome />;

  const recent = [
    ...(records["Sales Order"] ?? []).slice(0, 3),
    ...(records.Opportunity ?? []).slice(0, 2),
  ];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 p-4 md:p-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            Sunday, 6 September · Dammam
          </p>
          <h1 className="font-display mt-1 text-4xl text-fg md:text-5xl">
            Good afternoon, Antony.
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            onClick={() => go({ m: "crm", v: "form", d: "Lead", id: "new" })}
          >
            <Plus className="size-3.5" /> New lead
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => go({ m: "sales", v: "list", d: "Sales Order" })}
          >
            Sales orders
          </Button>
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 stagger-in">
        {KPIS.map((k) => (
          <article key={k.label} className="rounded-xl bg-surface p-4 shadow-card">
            <div className="text-xs font-medium text-muted">{k.label}</div>
            <div className="mt-2 font-medium text-2xl tabular-nums tracking-tight text-fg">
              {k.value}
            </div>
            <div
              className={cn(
                "mt-1 text-xs",
                k.tone === "up" && "text-success",
                k.tone === "warn" && "text-warning",
                k.tone === "flat" && "text-muted",
              )}
            >
              {k.delta}
            </div>
          </article>
        ))}
      </section>

      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-sm font-semibold text-fg">Apps</h2>
          <span className="text-xs text-faint">Installed on this site</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {APPS.filter((a) => a.id !== "home").map((app) => {
            const Icon = ICONS[app.id] ?? LayoutGridFallback;
            return (
              <button
                key={app.id}
                type="button"
                onClick={() => go({ m: app.id, v: "workspace", d: undefined, id: undefined })}
                className="group flex items-center gap-3 rounded-xl bg-surface p-3 text-left shadow-card transition-[box-shadow,transform] duration-150 hover:shadow-card-hover active:scale-[0.98]"
              >
                <span className="flex size-11 items-center justify-center rounded-md bg-accent-soft text-accent">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-fg">{app.name}</span>
                  <span className="block truncate text-xs text-muted">{app.blurb}</span>
                </span>
                <ArrowUpRight className="ml-auto size-4 text-faint opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            );
          })}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-5">
        <section className="rounded-xl bg-surface p-4 shadow-card lg:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-fg">Revenue</h2>
            <span className="text-xs text-muted">SAR · last 7 months</span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_REVENUE}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--aurea-accent)" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="var(--aurea-accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" hide />
                <Tooltip
                  contentStyle={{
                    background: "var(--aurea-surface)",
                    border: "none",
                    borderRadius: 12,
                    boxShadow: "var(--aurea-shadow)",
                    fontSize: 12,
                  }}
                  formatter={(v) => sar(Number(v ?? 0))}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--aurea-accent)"
                  strokeWidth={2}
                  fill="url(#rev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="rounded-xl bg-surface p-4 shadow-card lg:col-span-2">
          <h2 className="text-sm font-semibold text-fg">Inbox</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {NOTIFICATIONS.slice(0, 4).map((n) => (
              <li key={n.id} className="flex gap-3">
                <span
                  className={cn(
                    "mt-1.5 size-1.5 shrink-0 rounded-full",
                    n.unread ? "bg-accent" : "bg-subtle",
                  )}
                />
                <div className="min-w-0">
                  <div className="truncate text-sm text-fg">{n.title}</div>
                  <div className="truncate text-xs text-muted">{n.body}</div>
                </div>
                <span className="ml-auto shrink-0 text-xs text-faint">{n.time}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-fg">Recent documents</h2>
        <div className="overflow-hidden rounded-xl bg-surface shadow-card">
          {recent.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                const isOpp = (records.Opportunity ?? []).some((x) => x.id === r.id);
                go({
                  m: isOpp ? "crm" : "sales",
                  v: "form",
                  d: isOpp ? "Opportunity" : "Sales Order",
                  id: r.id,
                });
              }}
              className="flex w-full items-center gap-4 border-b border-line px-4 py-3 text-left last:border-0 hover:bg-subtle"
            >
              <span className="w-28 font-mono text-xs text-faint">{r.id}</span>
              <span className="min-w-0 flex-1 truncate text-sm text-fg">{r.title}</span>
              <span className="hidden text-xs text-muted sm:block">{r.status}</span>
              <span className="tabular-nums text-sm text-fg">
                {r.amount ? sar(r.amount) : "—"}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function AppHome() {
  const { search, go } = useDeskNav();
  const app = APPS.find((a) => a.id === search.m);
  const records = useDeskStore((s) => s.records);

  const doctypes = Object.values(APP_DOCTYPES_SAFE(search.m));

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 p-4 md:p-8">
      <header>
        <p className="text-xs font-medium tracking-wide text-muted uppercase">App</p>
        <h1 className="font-display mt-1 text-4xl text-fg">{app?.name}</h1>
        <p className="mt-2 text-sm text-muted">{app?.blurb}</p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {doctypes.map((name) => {
          const rows = records[name] ?? [];
          const amount = rows.reduce((s, r) => s + (r.amount ?? 0), 0);
          return (
            <div
              key={name}
              className="rounded-xl bg-surface p-5 shadow-card transition-[box-shadow] duration-150 hover:shadow-card-hover"
            >
              <button
                type="button"
                onClick={() => go({ m: search.m, v: "list", d: name, id: undefined })}
                className="w-full text-left"
              >
                <div className="text-sm font-medium text-fg">{name}</div>
                <div className="mt-3 text-2xl font-medium tabular-nums text-fg">{rows.length}</div>
                <div className="mt-1 text-xs text-muted">
                  {amount ? sar(amount) : `${rows.length} records`}
                </div>
              </button>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  className="text-xs font-medium text-accent"
                  onClick={() => go({ m: search.m, v: "list", d: name, id: undefined })}
                >
                  Open list
                </button>
                {name === "Opportunity" || name === "Task" || name === "Employee" ? (
                  <button
                    type="button"
                    className="text-xs text-muted hover:text-fg"
                    onClick={() => go({ m: search.m, v: "kanban", d: name, id: undefined })}
                  >
                    Kanban
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function APP_DOCTYPES_SAFE(app: string): string[] {
  const map: Record<string, string[]> = {
    crm: ["Lead", "Opportunity"],
    sales: ["Sales Order", "Quotation"],
    buying: ["Purchase Order"],
    stock: ["Item"],
    accounts: ["Sales Invoice"],
    hr: ["Employee"],
    mfg: ["Work Order"],
    projects: ["Task"],
  };
  return map[app] ?? [];
}

function LayoutGridFallback(props: { className?: string }) {
  return <Package {...props} />;
}
