import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  type AppId,
  type DeskRecord,
  type LineItem,
  cloneRecords,
  findRecord,
} from "@/lib/erp-data";

export type Skin = "aurea" | "standard";
export type Mode = "light" | "dark";
export type Density = "comfortable" | "compact";
export type Accent = "harbor" | "ink" | "slate" | "olive";
export type ViewKind = "workspace" | "list" | "kanban" | "form" | "dashboard";

export type Toast = {
  id: string;
  title: string;
  body?: string;
};

type DeskState = {
  skin: Skin;
  mode: Mode;
  density: Density;
  accent: Accent;
  sidebarExpanded: boolean;
  mobileNav: boolean;
  commandOpen: boolean;
  notifOpen: boolean;
  studioOpen: boolean;
  chatterCollapsed: boolean;
  loggedIn: boolean;
  records: Record<string, DeskRecord[]>;
  toasts: Toast[];
  setSkin: (skin: Skin) => void;
  setMode: (mode: Mode) => void;
  setDensity: (density: Density) => void;
  setAccent: (accent: Accent) => void;
  setSidebarExpanded: (v: boolean) => void;
  setMobileNav: (v: boolean) => void;
  setCommandOpen: (v: boolean) => void;
  setNotifOpen: (v: boolean) => void;
  setStudioOpen: (v: boolean) => void;
  setChatterCollapsed: (v: boolean) => void;
  setLoggedIn: (v: boolean) => void;
  updateRecord: (doctype: string, id: string, patch: Partial<DeskRecord>) => void;
  moveStage: (doctype: string, id: string, stage: string) => void;
  addComment: (doctype: string, id: string, text: string) => void;
  addLine: (doctype: string, id: string, line: LineItem) => void;
  pushToast: (title: string, body?: string) => void;
  dismissToast: (id: string) => void;
};

export const useDeskStore = create<DeskState>()(
  persist(
    (set, get) => ({
      skin: "aurea",
      mode: "light",
      density: "comfortable",
      accent: "harbor",
      sidebarExpanded: true,
      mobileNav: false,
      commandOpen: false,
      notifOpen: false,
      studioOpen: false,
      chatterCollapsed: false,
      loggedIn: false,
      records: cloneRecords(),
      toasts: [],
      setSkin: (skin) => set({ skin }),
      setMode: (mode) => set({ mode }),
      setDensity: (density) => set({ density }),
      setAccent: (accent) => set({ accent }),
      setSidebarExpanded: (sidebarExpanded) => set({ sidebarExpanded }),
      setMobileNav: (mobileNav) => set({ mobileNav }),
      setCommandOpen: (commandOpen) => set({ commandOpen }),
      setNotifOpen: (notifOpen) => set({ notifOpen }),
      setStudioOpen: (studioOpen) => set({ studioOpen }),
      setChatterCollapsed: (chatterCollapsed) => set({ chatterCollapsed }),
      setLoggedIn: (loggedIn) => set({ loggedIn }),
      updateRecord: (doctype, id, patch) => {
        const records = { ...get().records };
        records[doctype] = (records[doctype] ?? []).map((r) =>
          r.id === id ? { ...r, ...patch, fields: { ...r.fields, ...(patch.fields ?? {}) } } : r,
        );
        set({ records });
      },
      moveStage: (doctype, id, stage) => {
        const rec = findRecord(get().records, doctype, id);
        if (!rec) return;
        get().updateRecord(doctype, id, { stage, status: stage });
        get().pushToast("Stage updated", `${rec.title} → ${stage}`);
      },
      addComment: (doctype, id, text) => {
        const rec = findRecord(get().records, doctype, id);
        if (!rec) return;
        const activity = [
          {
            type: "comment" as const,
            author: "Antony Viju",
            time: "Just now",
            text,
          },
          ...(rec.activity ?? []),
        ];
        get().updateRecord(doctype, id, { activity });
      },
      addLine: (doctype, id, line) => {
        const rec = findRecord(get().records, doctype, id);
        if (!rec) return;
        const lines = [...(rec.lines ?? []), line];
        const amount = lines.reduce((s, l) => s + l.qty * l.rate, 0);
        get().updateRecord(doctype, id, { lines, amount, fields: { ...rec.fields, grand_total: amount } });
      },
      pushToast: (title, body) => {
        const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        set({ toasts: [...get().toasts, { id, title, body }] });
        window.setTimeout(() => get().dismissToast(id), 3200);
      },
      dismissToast: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
    }),
    {
      name: "aurea-desk",
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        skin: s.skin,
        mode: s.mode,
        density: s.density,
        accent: s.accent,
        sidebarExpanded: s.sidebarExpanded,
        loggedIn: s.loggedIn,
        chatterCollapsed: s.chatterCollapsed,
      }),
    },
  ),
);

export type DeskNav = {
  app: AppId;
  view: ViewKind;
  doctype?: string;
  id?: string;
};
