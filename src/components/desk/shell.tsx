import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Bell,
  ChevronsLeft,
  ChevronsRight,
  Cog,
  IdCard,
  Kanban,
  Landmark,
  LayoutGrid,
  LogOut,
  Menu,
  Moon,
  PackageSearch,
  Palette,
  Search,
  ShoppingBag,
  Sun,
  SwatchBook,
  Users,
  Warehouse,
  X,
} from "lucide-react";
import { AureaMark } from "@/components/desk/logo";
import { CommandPalette } from "@/components/desk/command-palette";
import { Toasts } from "@/components/desk/toasts";
import { Workspace } from "@/components/desk/workspace";
import { ListView } from "@/components/desk/list-view";
import { FormView } from "@/components/desk/form-view";
import { KanbanView } from "@/components/desk/kanban-view";
import { Dashboard } from "@/components/desk/dashboard";
import { ThemeStudio } from "@/components/desk/theme-studio";
import { Button } from "@/components/ui/button";
import { APPS, NOTIFICATIONS, USER, type AppId } from "@/lib/erp-data";
import { useDeskStore } from "@/lib/desk-store";
import { useDeskNav } from "@/lib/nav";
import { cn, initials } from "@/lib/utils";

const ICONS: Record<string, typeof LayoutGrid> = {
  home: LayoutGrid,
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

export function DeskShell() {
  const skin = useDeskStore((s) => s.skin);
  const mode = useDeskStore((s) => s.mode);
  const accent = useDeskStore((s) => s.accent);
  const density = useDeskStore((s) => s.density);
  const { search } = useDeskNav();

  useEffect(() => {
    const el = document.documentElement;
    el.dataset.skin = skin;
    el.dataset.mode = mode;
    el.dataset.accent = accent;
    el.dataset.density = density;
  }, [skin, mode, accent, density]);

  const body =
    search.m === "studio" ? (
      <ThemeStudio />
    ) : search.m === "accounts" && (search.v === "workspace" || search.v === "dashboard") ? (
      <Dashboard />
    ) : search.v === "form" ? (
      <FormView />
    ) : search.v === "kanban" ? (
      <KanbanView />
    ) : search.v === "list" ? (
      <ListView />
    ) : (
      <Workspace />
    );

  return (
    <div className="flex h-dvh overflow-hidden bg-bg text-fg">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="min-h-0 flex-1 overflow-auto desk-scroll">{body}</main>
      </div>
      <CommandPalette />
      <Toasts />
      <MobileDrawer />
    </div>
  );
}

function Sidebar() {
  const expanded = useDeskStore((s) => s.sidebarExpanded);
  const setExpanded = useDeskStore((s) => s.setSidebarExpanded);
  const skin = useDeskStore((s) => s.skin);
  const { search, go } = useDeskNav();
  const aurea = skin === "aurea";

  return (
    <aside
      className={cn(
        "hidden h-full shrink-0 flex-col md:flex",
        aurea ? "bg-sidebar text-sidebar-fg" : "border-r border-line bg-surface text-fg",
        expanded ? "w-56" : "w-16",
      )}
    >
      <div className={cn("flex h-14 items-center gap-2 px-3", expanded ? "justify-start" : "justify-center")}>
        <span className={aurea ? "text-sidebar-fg" : "text-accent"}>
          <AureaMark className="size-8" />
        </span>
        {expanded ? (
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{aurea ? "Aurea" : "ERPNext"}</div>
            <div className={cn("truncate text-xs", aurea ? "text-sidebar-muted" : "text-muted")}>
              Harbor & Co.
            </div>
          </div>
        ) : null}
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-2 desk-scroll">
        {APPS.map((app) => {
          const Icon = ICONS[app.id] ?? LayoutGrid;
          const active = search.m === app.id || (app.id === "home" && search.m === "home");
          return (
            <button
              key={app.id}
              type="button"
              title={app.name}
              onClick={() => go({ m: app.id as AppId, v: "workspace", d: undefined, id: undefined })}
              className={cn(
                "mb-0.5 flex h-11 w-full items-center gap-3 rounded-md px-2 text-sm font-medium transition-colors duration-150",
                expanded ? "justify-start" : "justify-center",
                aurea
                  ? active
                    ? "bg-sidebar-hover text-sidebar-fg"
                    : "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-fg"
                  : active
                    ? "bg-accent-soft text-accent"
                    : "text-muted hover:bg-subtle hover:text-fg",
              )}
            >
              <Icon className="size-4 shrink-0" />
              {expanded ? <span className="truncate">{app.name}</span> : null}
            </button>
          );
        })}
      </nav>
      <div className="p-2">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "flex h-10 w-full items-center justify-center rounded-md",
            aurea ? "text-sidebar-muted hover:bg-sidebar-hover" : "text-muted hover:bg-subtle",
          )}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {expanded ? <ChevronsLeft className="size-4" /> : <ChevronsRight className="size-4" />}
        </button>
      </div>
    </aside>
  );
}

function Topbar() {
  const setCommand = useDeskStore((s) => s.setCommandOpen);
  const setMobile = useDeskStore((s) => s.setMobileNav);
  const notifOpen = useDeskStore((s) => s.notifOpen);
  const setNotif = useDeskStore((s) => s.setNotifOpen);
  const mode = useDeskStore((s) => s.mode);
  const setMode = useDeskStore((s) => s.setMode);
  const skin = useDeskStore((s) => s.skin);
  const setSkin = useDeskStore((s) => s.setSkin);
  const setLoggedIn = useDeskStore((s) => s.setLoggedIn);
  const navigate = useNavigate();
  const unread = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <header className="relative flex h-14 shrink-0 items-center gap-2 border-b border-line bg-surface px-3 md:px-4">
      <button
        type="button"
        className="flex size-10 items-center justify-center rounded-md text-fg hover:bg-subtle md:hidden"
        onClick={() => setMobile(true)}
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => setCommand(true)}
        className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-md bg-subtle px-3 text-left text-sm text-faint shadow-card md:max-w-md"
      >
        <Search className="size-4 shrink-0" />
        <span className="truncate">Search or jump…</span>
        <kbd className="ml-auto hidden rounded-sm bg-surface px-1.5 py-0.5 font-mono text-xs text-muted md:inline">
          ⌘K
        </kbd>
      </button>
      <Button
        variant="secondary"
        size="sm"
        className="hidden sm:inline-flex"
        onClick={() => setSkin(skin === "aurea" ? "standard" : "aurea")}
      >
        <SwatchBook className="size-3.5" />
        {skin === "aurea" ? "Aurea" : "Standard"}
      </Button>
      <button
        type="button"
        onClick={() => setMode(mode === "dark" ? "light" : "dark")}
        className="flex size-10 items-center justify-center rounded-md hover:bg-subtle"
        aria-label="Toggle appearance"
      >
        {mode === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </button>
      <div className="relative">
        <button
          type="button"
          onClick={() => setNotif(!notifOpen)}
          className="relative flex size-10 items-center justify-center rounded-md hover:bg-subtle"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          {unread ? (
            <span className="absolute top-2 right-2 size-1.5 rounded-full bg-danger" />
          ) : null}
        </button>
        {notifOpen ? (
          <div className="absolute right-0 z-40 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-lg bg-surface p-2 shadow-card-hover">
            {NOTIFICATIONS.map((n) => (
              <div key={n.id} className="rounded-md px-3 py-2 hover:bg-subtle">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-fg">{n.title}</span>
                  <span className="text-xs text-faint">{n.time}</span>
                </div>
                <p className="text-xs text-muted">{n.body}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <button
        type="button"
        onClick={() => {
          setLoggedIn(false);
          void navigate({ to: "/" });
        }}
        className="flex size-10 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-fg"
        title={`${USER.name} · Sign out`}
        aria-label="Sign out"
      >
        {initials(USER.name)}
      </button>
    </header>
  );
}

function MobileDrawer() {
  const open = useDeskStore((s) => s.mobileNav);
  const setOpen = useDeskStore((s) => s.setMobileNav);
  const setLoggedIn = useDeskStore((s) => s.setLoggedIn);
  const { search, go } = useDeskNav();
  const navigate = useNavigate();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button type="button" className="absolute inset-0 bg-fg/40" onClick={() => setOpen(false)} aria-label="Close menu" />
      <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-sidebar text-sidebar-fg">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <AureaMark />
            <span className="text-sm font-semibold">Aurea</span>
          </div>
          <button type="button" onClick={() => setOpen(false)} className="size-10" aria-label="Close">
            <X className="size-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-2">
          {APPS.map((app) => {
            const Icon = ICONS[app.id] ?? LayoutGrid;
            const active = search.m === app.id;
            return (
              <button
                key={app.id}
                type="button"
                onClick={() => {
                  go({ m: app.id as AppId, v: "workspace", d: undefined, id: undefined });
                  setOpen(false);
                }}
                className={cn(
                  "mb-0.5 flex h-11 w-full items-center gap-3 rounded-md px-3 text-sm",
                  active ? "bg-sidebar-hover" : "text-sidebar-muted hover:bg-sidebar-hover",
                )}
              >
                <Icon className="size-4" />
                {app.name}
              </button>
            );
          })}
        </nav>
        <button
          type="button"
          className="flex h-12 items-center gap-3 px-5 text-sm text-sidebar-muted"
          onClick={() => {
            setLoggedIn(false);
            setOpen(false);
            void navigate({ to: "/" });
          }}
        >
          <LogOut className="size-4" /> Sign out
        </button>
      </div>
    </div>
  );
}
