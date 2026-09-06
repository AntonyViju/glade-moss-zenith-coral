import { useNavigate, useSearch } from "@tanstack/react-router";
import type { AppId } from "@/lib/erp-data";
import type { ViewKind } from "@/lib/desk-store";

export type DeskSearch = {
  m: AppId;
  v: ViewKind;
  d?: string;
  id?: string;
};

export function parseDeskSearch(s: Record<string, unknown>): DeskSearch {
  const m = (typeof s.m === "string" ? s.m : "home") as AppId;
  const v = (typeof s.v === "string" ? s.v : "workspace") as ViewKind;
  return {
    m: m || "home",
    v: v || "workspace",
    d: typeof s.d === "string" ? s.d : undefined,
    id: typeof s.id === "string" ? s.id : undefined,
  };
}

export function useDeskNav() {
  const navigate = useNavigate({ from: "/desk" });
  const search = useSearch({ from: "/desk" });

  const go = (patch: Partial<DeskSearch>) => {
    void navigate({
      to: "/desk",
      search: (prev) => {
        const next = { ...prev, ...patch };
        if (patch.v && patch.v !== "form") {
          next.id = patch.id;
        }
        if (patch.m && !patch.d && !patch.v) {
          next.v = "workspace";
          next.d = undefined;
          next.id = undefined;
        }
        return next;
      },
    });
  };

  return { search, go };
}
