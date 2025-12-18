import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Package, 
  Users, 
  Info, 
  Lock, 
  Terminal,
  ChevronRight
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  restricted?: boolean;
}

const navItems: NavItem[] = [
  { id: "terminal", label: "TERMINAL", icon: Terminal },
  { id: "products", label: "PRODUCTS", icon: Package },
  { id: "members", label: "MEMBERS", icon: Users },
  { id: "about", label: "SYS.INFO", icon: Info },
  { id: "exclusive", label: "QREW_EXCLUSIVE", icon: Lock, restricted: true },
];

interface SystemNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function SystemNav({ activeSection, onNavigate }: SystemNavProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-64 border-r border-border bg-card/30 backdrop-blur-sm min-h-screen"
    >
      {/* Logo / Brand */}
      <div className="border-b border-border p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-primary flex items-center justify-center">
            <span className="text-primary font-bold text-sm">Q</span>
          </div>
          <div>
            <h1 className="text-foreground font-semibold tracking-wider text-sm">QREW</h1>
            <p className="text-[10px] text-muted-foreground tracking-widest">SYSTEM PORTAL</p>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="border-b border-border px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] text-muted-foreground tracking-wider">SYSTEM ONLINE</span>
        </div>
        <p className="text-[10px] text-muted-foreground mt-1 font-light">
          {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' 
          })} // {new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          })}
        </p>
      </div>

      {/* Navigation Items */}
      <div className="py-4">
        <p className="px-6 system-label mb-3">MODULES</p>
        {navItems.map((item, index) => {
          const isActive = activeSection === item.id;
          const isHovered = hoveredItem === item.id;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={cn(
                "w-full flex items-center gap-3 px-6 py-3 text-left transition-colors duration-75",
                "border-l-2 border-transparent",
                isActive && "border-l-primary bg-primary/5 text-primary",
                !isActive && isHovered && "bg-muted/30 text-foreground",
                !isActive && !isHovered && "text-muted-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="text-xs tracking-wider flex-1">{item.label}</span>
              {item.restricted && (
                <span className="text-[8px] px-1.5 py-0.5 border border-system-amber text-system-amber tracking-wider">
                  LOCKED
                </span>
              )}
              {isActive && <ChevronRight className="w-3 h-3 text-primary" />}
            </motion.button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4">
        <p className="text-[9px] text-muted-foreground/50 tracking-wider text-center">
          QREW.SYS v2.4.1
        </p>
      </div>
    </motion.nav>
  );
}
