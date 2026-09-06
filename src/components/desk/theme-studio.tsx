import {
  Check,
  Download,
  Moon,
  Sun,
  SwatchBook,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useDeskStore, type Accent, type Density, type Mode, type Skin } from "@/lib/desk-store";
import { cn } from "@/lib/utils";

const ACCENTS: Array<{ id: Accent; label: string; swatch: string }> = [
  { id: "harbor", label: "Harbor", swatch: "#0e5c54" },
  { id: "ink", label: "Ink", swatch: "#1a1916" },
  { id: "slate", label: "Slate", swatch: "#3d5a6c" },
  { id: "olive", label: "Olive", swatch: "#4a5c3a" },
];

export function ThemeStudio() {
  const skin = useDeskStore((s) => s.skin);
  const mode = useDeskStore((s) => s.mode);
  const density = useDeskStore((s) => s.density);
  const accent = useDeskStore((s) => s.accent);
  const setSkin = useDeskStore((s) => s.setSkin);
  const setMode = useDeskStore((s) => s.setMode);
  const setDensity = useDeskStore((s) => s.setDensity);
  const setAccent = useDeskStore((s) => s.setAccent);
  const pushToast = useDeskStore((s) => s.pushToast);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 p-4 md:p-8">
      <header className="stagger-in">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">Theme Studio</p>
        <h1 className="font-display mt-1 text-4xl text-fg md:text-5xl">
          Skin every desk. One app.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Aurea replaces ERPNext’s stock chrome the moment it is installed — navbar, workspace,
          lists, forms, kanban, chatter, login. Toggle the live desk against stock Frappe, then
          drop the same CSS onto any site.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Panel title="Skin">
          <Seg
            value={skin}
            onChange={(v) => setSkin(v as Skin)}
            options={[
              { id: "aurea", label: "Aurea" },
              { id: "standard", label: "Standard ERPNext" },
            ]}
          />
          <p className="mt-3 text-xs leading-relaxed text-muted">
            Standard is the stock Frappe look. Aurea is the installable theme — Odoo’s layout
            discipline with quieter type, concentric radii, and a dark app rail.
          </p>
        </Panel>
        <Panel title="Appearance">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={mode === "light" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setMode("light" as Mode)}
            >
              <Sun className="size-3.5" /> Light
            </Button>
            <Button
              variant={mode === "dark" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setMode("dark" as Mode)}
            >
              <Moon className="size-3.5" /> Dark
            </Button>
          </div>
          <div className="mt-4">
            <div className="mb-2 text-xs font-medium text-muted">Density</div>
            <Seg
              value={density}
              onChange={(v) => setDensity(v as Density)}
              options={[
                { id: "comfortable", label: "Comfortable" },
                { id: "compact", label: "Compact" },
              ]}
            />
          </div>
        </Panel>
        <Panel title="Accent">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {ACCENTS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setAccent(a.id)}
                className={cn(
                  "flex h-16 flex-col items-start justify-between rounded-md p-3 text-left text-on-accent shadow-card transition-transform duration-150 active:scale-[0.96]",
                  accent === a.id && "ring-2 ring-accent ring-offset-2 ring-offset-bg",
                )}
                style={{ background: a.swatch }}
              >
                <span className="size-4 rounded-full bg-on-accent">
                  {accent === a.id ? <Check className="size-4 text-on-accent-ink" /> : null}
                </span>
                <span className="text-xs font-medium">{a.label}</span>
              </button>
            ))}
          </div>
        </Panel>
        <Panel title="Install on any ERPNext">
          <p className="text-sm leading-relaxed text-muted">
            Aurea ships as a Frappe custom app. Install it on a site and the Desk restyles
            globally — no core patches, survives `bench update`.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href="/aurea_theme.zip" download>
              <Button size="sm">
                <Download className="size-3.5" /> Download app
              </Button>
            </a>
            <Link to="/install">
              <Button variant="secondary" size="sm">
                <SwatchBook className="size-3.5" /> Install guide
              </Button>
            </Link>
          </div>
        </Panel>
      </div>

      <Panel title="What changes after install">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Desk chrome", "Navbar, awesomebar, sidebar, and workspace cards restyled."],
            ["List & Kanban", "Hairline rows, status pills, quieter filters, Odoo-like boards."],
            ["Forms + chatter", "Status pipeline, smart buttons, two-column fields, refined timeline."],
            ["Login & website", "Same type and accent on /login and portal pages."],
            ["Dark mode", "A designed dark desk — not an invert filter."],
            ["Aurea Settings", "Single DocType for accent, density, and custom CSS."],
          ].map(([t, b]) => (
            <li key={t} className="rounded-md bg-subtle p-4">
              <div className="text-sm font-medium text-fg">{t}</div>
              <p className="mt-1 text-xs leading-relaxed text-muted">{b}</p>
            </li>
          ))}
        </ul>
        <Button
          className="mt-4"
          variant="secondary"
          size="sm"
          onClick={() => {
            setSkin("aurea");
            pushToast("Aurea applied", "This is the desk your users will see.");
          }}
        >
          Preview Aurea on this desk
        </Button>
      </Panel>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl bg-surface p-5 shadow-card">
      <h2 className="text-sm font-semibold text-fg">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Seg({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Array<{ id: string; label: string }>;
}) {
  return (
    <div className="inline-flex rounded-md bg-subtle p-1">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={cn(
            "h-9 rounded-sm px-3 text-sm font-medium transition-colors duration-150",
            value === o.id ? "bg-surface text-fg shadow-card" : "text-muted hover:text-fg",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
