import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "sidebar";
type Size = "sm" | "md" | "lg" | "icon";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-fg hover:opacity-90 shadow-card",
  secondary: "bg-surface text-fg shadow-card hover:shadow-card-hover",
  ghost: "bg-transparent text-fg hover:bg-subtle",
  danger: "bg-danger text-accent-fg hover:opacity-90",
  sidebar: "bg-transparent text-sidebar-fg hover:bg-sidebar-hover",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm gap-1.5 rounded-sm",
  md: "h-10 px-4 text-sm gap-2 rounded-md",
  lg: "h-11 px-5 text-sm gap-2 rounded-md",
  icon: "size-10 rounded-md",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  href?: string;
  download?: boolean | string;
  children?: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = "primary", size = "md", type = "button", href, download, children, ...props },
  ref,
) {
  const cls = cn(
    "inline-flex items-center justify-center font-medium transition-[opacity,transform,box-shadow,background-color] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-40",
    variants[variant],
    sizes[size],
    className,
  );
  if (href) {
    return (
      <a href={href} download={download} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button ref={ref} type={type} className={cls} {...props}>
      {children}
    </button>
  );
});
