import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { User } from "@/lib/catalog";

const button = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[transform,opacity] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-fg",
        ghost: "bg-surface-2 text-fg",
        line: "bg-transparent text-fg shadow-[0_0_0_1px_rgb(242_238_230_/_0.14)]",
        quiet: "bg-transparent text-fg",
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-sm",
        md: "h-11 px-4 text-sm rounded-md",
        lg: "h-12 px-5 text-sm rounded-lg w-full",
        icon: "size-11 rounded-md",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof button>) {
  return <button type={type} className={cn(button({ variant, size }), className)} {...props} />;
}

export function Avatar({
  user,
  size = "md",
  className,
}: {
  user: Pick<User, "name" | "avatar">;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const dim =
    size === "sm" ? "size-8" : size === "lg" ? "size-14" : size === "xl" ? "size-20" : "size-11";
  const radius = size === "xl" || size === "lg" ? "rounded-lg" : "rounded-md";
  const letter = user.name.trim().charAt(0).toUpperCase() || "S";
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-surface-2 text-accent font-medium",
        dim,
        radius,
        className,
      )}
    >
      {user.avatar ? (
        <img
          src={user.avatar}
          alt=""
          className="size-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
        />
      ) : (
        <span className="font-display text-lg">{letter}</span>
      )}
    </span>
  );
}

export function ScreenHeader({
  title,
  onBack,
  right,
}: {
  title: string;
  onBack?: () => void;
  right?: ReactNode;
}) {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 px-3 pt-[env(safe-area-inset-top)]">
      {onBack ? (
        <Button variant="quiet" size="icon" onClick={onBack} aria-label="Retour" className="size-11">
          <BackIcon />
        </Button>
      ) : (
        <span className="size-11" />
      )}
      <h1 id="screen-title" className="flex-1 text-center text-base font-medium tracking-tight">
        {title}
      </h1>
      <span className="flex size-11 items-center justify-center">{right}</span>
    </header>
  );
}

function BackIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 5 L8 12 L15 19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
