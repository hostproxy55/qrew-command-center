import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SystemModuleProps {
  title?: string;
  status?: "online" | "offline" | "restricted";
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function SystemModule({ 
  title, 
  status = "online", 
  children, 
  className,
  delay = 0 
}: SystemModuleProps) {
  const statusColors = {
    online: "bg-primary",
    offline: "bg-muted-foreground",
    restricted: "bg-system-amber",
  };

  const statusLabels = {
    online: "ACTIVE",
    offline: "INACTIVE",
    restricted: "RESTRICTED",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn("system-module relative", className)}
    >
      {title && (
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="system-label">{title}</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {statusLabels[status]}
            </span>
            <div className={cn("w-2 h-2 rounded-full", statusColors[status], status === "online" && "animate-pulse")} />
          </div>
        </div>
      )}
      <div className="p-4">{children}</div>
    </motion.div>
  );
}
