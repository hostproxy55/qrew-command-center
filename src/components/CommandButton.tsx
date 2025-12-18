import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface CommandButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
}

export function CommandButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className,
  type = "button"
}: CommandButtonProps) {
  const variants = {
    primary: "border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground focus:ring-primary",
    secondary: "border-secondary/50 text-secondary hover:bg-secondary hover:text-secondary-foreground focus:ring-secondary",
    danger: "border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground focus:ring-destructive",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-[10px]",
    md: "px-4 py-2 text-xs",
    lg: "px-6 py-3 text-sm",
  };

  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "border bg-transparent uppercase tracking-wider font-medium",
        "transition-colors duration-75",
        "focus:outline-none focus:ring-1",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "flex items-center justify-center gap-2",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {loading && <Loader2 className="w-3 h-3 animate-spin" />}
      {children}
    </motion.button>
  );
}
