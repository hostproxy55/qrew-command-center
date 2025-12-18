import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react";

interface StatusMessageProps {
  type: "success" | "error" | "warning" | "loading";
  message: string;
  visible: boolean;
}

export function StatusMessage({ type, message, visible }: StatusMessageProps) {
  const config = {
    success: {
      icon: CheckCircle,
      color: "text-primary border-primary/30 bg-primary/5",
    },
    error: {
      icon: XCircle,
      color: "text-system-red border-system-red/30 bg-system-red/5",
    },
    warning: {
      icon: AlertCircle,
      color: "text-system-amber border-system-amber/30 bg-system-amber/5",
    },
    loading: {
      icon: Loader2,
      color: "text-system-cyan border-system-cyan/30 bg-system-cyan/5",
    },
  };

  const { icon: Icon, color } = config[type];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "flex items-center gap-3 border px-4 py-3",
            color
          )}
        >
          <Icon className={cn("w-4 h-4", type === "loading" && "animate-spin")} />
          <span className="text-xs tracking-wider uppercase">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
