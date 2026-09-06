import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";
import { AureaMark } from "@/components/desk/logo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/install")({ component: InstallPage });

function InstallPage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-5 py-6">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold">
          <span className="text-accent">
            <AureaMark className="size-7" />
          </span>
          Aurea
        </Link>
        <Link to="/desk" search={{ m: "home", v: "workspace" }} className="text-sm text-muted hover:text-fg">
          Open desk
        </Link>
      </header>
      <main className="mx-auto max-w-3xl px-5 pb-16">
        <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted hover:text-fg">
          <ArrowLeft className="size-3.5" /> Back
        </Link>
        <h1 className="font-display mt-4 text-4xl md:text-5xl">Install on any ERPNext</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Aurea is a standard Frappe custom app. Drop it on a bench, install it on a site, rebuild
          assets. The Desk restyles globally — workspaces, lists, forms, kanban, chatter, login —
          without patching <code className="text-fg">frappe</code> or <code className="text-fg">erpnext</code>.
        </p>

        <a href="/aurea_theme.zip" download className="mt-6 inline-flex">
          <Button size="lg">
            <Download className="size-4" /> Download aurea_theme.zip
          </Button>
        </a>

        <ol className="mt-10 space-y-6">
          {[
            [
              "Place the app on your bench",
              "Unzip into apps/aurea_theme so the folder contains setup.py, pyproject.toml and the aurea_theme Python package.",
            ],
            [
              "Register and install",
              "bench get-app is optional if the folder is already there. Then: bench --site [site] install-app aurea_theme && bench build --app aurea_theme && bench --site [site] clear-cache && bench restart.",
            ],
            [
              "Confirm the Desk",
              "Hard-refresh /app. You should see the dark app rail, Plus Jakarta type, and harbor teal primary buttons. Search Aurea Settings to change accent, density, and dark mode.",
            ],
          ].map(([t, b], i) => (
            <li key={t} className="flex gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-fg">
                {i + 1}
              </span>
              <div>
                <h2 className="text-sm font-semibold text-fg">{t}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted">{b}</p>
              </div>
            </li>
          ))}
        </ol>

        <section className="mt-12 rounded-xl bg-surface p-5 shadow-card">
          <h2 className="text-sm font-semibold">Compatibility</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Built against Frappe v14 / v15 / v16 and ERPNext v14–v16. Hooks used:{" "}
            <code>app_include_css</code>, <code>app_include_js</code>, <code>web_include_css</code>,{" "}
            <code>web_include_js</code>, <code>boot_session</code>, <code>after_install</code>. Uninstall
            removes the skin; no DocTypes in ERPNext are modified.
          </p>
        </section>
      </main>
    </div>
  );
}
