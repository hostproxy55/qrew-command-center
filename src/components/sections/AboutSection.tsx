import { motion } from "framer-motion";
import { SystemModule } from "../SystemModule";
import { Terminal, Cpu, Database, Lock } from "lucide-react";

const systemSpecs = [
  { label: "PLATFORM", value: "QREW.SYS" },
  { label: "VERSION", value: "2.4.1" },
  { label: "ARCHITECTURE", value: "DISTRIBUTED" },
  { label: "ENCRYPTION", value: "AES-256" },
  { label: "UPTIME", value: "99.97%" },
  { label: "LATENCY", value: "<50ms" },
];

const timeline = [
  { year: "2021", event: "SYSTEM INITIALIZATION", description: "QREW.SYS goes online" },
  { year: "2022", event: "NETWORK EXPANSION", description: "1,000 verified members" },
  { year: "2023", event: "PROTOCOL UPGRADE", description: "V2.0 system overhaul" },
  { year: "2024", event: "GLOBAL SYNC", description: "47 countries connected" },
];

export function AboutSection() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <SystemModule title="SYSTEM_DOCUMENTATION" status="online">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 border border-primary/50 flex items-center justify-center">
            <Terminal className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-foreground text-sm tracking-wider">ABOUT QREW</p>
            <p className="text-muted-foreground text-xs mt-1">
              System information and operational documentation
            </p>
          </div>
        </div>
      </SystemModule>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border border-border p-6 bg-card/30"
      >
        <p className="system-label mb-3">// MISSION_STATEMENT</p>
        <p className="text-foreground text-sm leading-relaxed tracking-wide">
          QREW operates at the intersection of utility and exclusivity. 
          We build products for those who understand that less is more, 
          that quality outlasts trends, and that access is earned.
        </p>
        <p className="text-muted-foreground text-xs mt-4 leading-relaxed">
          Our system is designed for intentional consumption. No noise. 
          No excess. Just essential products for the informed consumer.
        </p>
      </motion.div>

      {/* System Specs */}
      <SystemModule title="SYSTEM_SPECIFICATIONS" status="online" delay={0.3}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {systemSpecs.map((spec, index) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="flex items-center gap-2"
            >
              <span className="text-primary text-[10px]">▸</span>
              <div>
                <p className="system-label">{spec.label}</p>
                <p className="text-foreground text-xs tracking-wider">{spec.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </SystemModule>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Cpu, title: "PRECISION", desc: "Every detail engineered with purpose" },
          { icon: Database, title: "INTEGRITY", desc: "Quality that stands the test of time" },
          { icon: Lock, title: "EXCLUSIVITY", desc: "Access reserved for the committed" },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="system-module p-4 text-center"
            >
              <Icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <p className="text-foreground text-xs tracking-wider font-medium">{item.title}</p>
              <p className="text-muted-foreground text-[10px] mt-1">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Timeline */}
      <SystemModule title="SYSTEM_LOG" status="online" delay={0.6}>
        <div className="space-y-3">
          {timeline.map((entry, index) => (
            <motion.div
              key={entry.year}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-start gap-4 border-l-2 border-border pl-4 py-2"
            >
              <span className="text-primary text-xs font-medium tracking-wider">
                {entry.year}
              </span>
              <div>
                <p className="text-foreground text-xs tracking-wider">{entry.event}</p>
                <p className="text-muted-foreground text-[10px] mt-0.5">{entry.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </SystemModule>
    </div>
  );
}
