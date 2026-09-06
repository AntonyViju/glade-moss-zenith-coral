import { useDeskStore } from "@/lib/desk-store";
import { cn } from "@/lib/utils";

export function Toasts() {
  const toasts = useDeskStore((s) => s.toasts);
  const dismiss = useDeskStore((s) => s.dismissToast);

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2">
      {toasts.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => dismiss(t.id)}
          className={cn(
            "pointer-events-auto rounded-lg bg-fg px-4 py-3 text-left text-bg shadow-card",
            "animate-[aurea-in_250ms_cubic-bezier(0.22,1,0.36,1)]",
          )}
        >
          <div className="text-sm font-medium">{t.title}</div>
          {t.body ? <div className="mt-0.5 text-xs opacity-80">{t.body}</div> : null}
        </button>
      ))}
    </div>
  );
}
