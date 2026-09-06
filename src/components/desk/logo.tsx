import { cn } from "@/lib/utils";

export function AureaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden>
      <rect width="32" height="32" rx="9" fill="var(--aurea-accent)" />
      <path
        d="M8.5 22.5V15.2c0-4.1 3.3-7.2 7.5-7.2s7.5 3.1 7.5 7.2v7.3"
        fill="none"
        stroke="var(--aurea-accent-fg)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M16 12.2v10.3"
        fill="none"
        stroke="var(--aurea-accent-fg)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HarborMark({ className }: { className?: string }) {
  return <AureaMark className={className} />;
}
