import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { AureaMark } from "@/components/desk/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDeskStore } from "@/lib/desk-store";

export const Route = createFileRoute("/")({ component: Login });

function Login() {
  const navigate = useNavigate();
  const setLoggedIn = useDeskStore((s) => s.setLoggedIn);
  const [email, setEmail] = useState("antony@harbor.co");
  const [password, setPassword] = useState("demo");

  const enter = () => {
    setLoggedIn(true);
    void navigate({ to: "/desk", search: { m: "home", v: "workspace" } });
  };

  return (
    <div className="min-h-dvh bg-bg text-fg lg:grid lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-sidebar text-sidebar-fg lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="flex items-center gap-3">
          <span className="text-sidebar-fg">
            <AureaMark />
          </span>
          <span className="text-sm font-semibold tracking-tight">Aurea</span>
        </div>
        <div>
          <p className="text-xs font-medium tracking-widest text-sidebar-muted uppercase">
            Desk theme for ERPNext
          </p>
          <h1 className="font-display mt-4 max-w-lg text-5xl leading-tight text-balance">
            The desk Odoo wishes it still designed.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-sidebar-muted">
            Install one Frappe app. Navbar, workspace, lists, forms, kanban, chatter and login
            restyle on every site — no core forks, survives every bench update.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Odoo-like app rail and status pipeline",
              "Designed dark mode, not an invert",
              "Aurea Settings DocType for accent & density",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sidebar-fg">
                <Check className="size-4 text-accent" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-sidebar-muted">Harbor & Co. · Dammam preview company</p>
      </section>

      <section className="flex min-h-dvh flex-col justify-center px-5 py-12 sm:px-10">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="text-accent">
              <AureaMark />
            </span>
            <span className="text-sm font-semibold">Aurea</span>
          </div>
          <h2 className="font-display text-3xl text-fg">Sign in to Harbor & Co.</h2>
          <p className="mt-2 text-sm text-muted">
            Preview the themed desk. Any password works.
          </p>
          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              enter();
            }}
          >
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-muted">Email</span>
              <Input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-muted">Password</span>
              <Input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <Button type="submit" className="w-full" size="lg">
              Enter desk <ArrowRight className="size-4" />
            </Button>
          </form>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs">
            <Link to="/desk" search={{ m: "home", v: "workspace" }} className="font-medium text-accent">
              Skip to desk
            </Link>
            <Link to="/install" className="text-muted hover:text-fg">
              Get the Frappe app
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
