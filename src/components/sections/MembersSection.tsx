import { motion } from "framer-motion";
import { SystemModule } from "../SystemModule";
import { CommandButton } from "../CommandButton";
import { Users, Shield, Star, Clock } from "lucide-react";

const memberBenefits = [
  {
    icon: Shield,
    title: "EXCLUSIVE ACCESS",
    description: "Unlock restricted product drops and member-only releases",
  },
  {
    icon: Star,
    title: "PRIORITY QUEUE",
    description: "First access to preorders and limited edition items",
  },
  {
    icon: Clock,
    title: "EARLY INTEL",
    description: "Receive system updates and drop notifications 48h early",
  },
  {
    icon: Users,
    title: "COMMUNITY",
    description: "Connect with verified QREW members in private channels",
  },
];

const memberStats = [
  { label: "ACTIVE MEMBERS", value: "2,847" },
  { label: "COUNTRIES", value: "47" },
  { label: "ITEMS SHIPPED", value: "12,493" },
  { label: "SATISFACTION", value: "99.2%" },
];

export function MembersSection() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <SystemModule title="MEMBER_REGISTRY" status="online">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 border border-secondary flex items-center justify-center">
            <Users className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <p className="text-foreground text-sm tracking-wider">MEMBERSHIP PROGRAM</p>
            <p className="text-muted-foreground text-xs mt-1">
              Join the QREW network. Gain access to restricted areas.
            </p>
          </div>
        </div>
      </SystemModule>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {memberStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="system-module p-4"
          >
            <p className="system-label">{stat.label}</p>
            <p className="text-foreground text-xl font-semibold tracking-wider mt-2">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Benefits */}
      <SystemModule title="MEMBER_BENEFITS" status="online" delay={0.3}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {memberBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-3 p-3 border border-border/50 bg-muted/20"
              >
                <Icon className="w-4 h-4 text-secondary mt-0.5" />
                <div>
                  <p className="text-foreground text-xs tracking-wider font-medium">
                    {benefit.title}
                  </p>
                  <p className="text-muted-foreground text-[11px] mt-1 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </SystemModule>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="border border-secondary/30 bg-secondary/5 p-6 text-center"
      >
        <p className="text-secondary text-sm tracking-wider mb-2">REQUEST ACCESS</p>
        <p className="text-muted-foreground text-xs mb-4 max-w-md mx-auto">
          Submit your application to join the QREW network. 
          Verification process takes 24-48 hours.
        </p>
        <CommandButton variant="secondary">
          INITIATE APPLICATION
        </CommandButton>
      </motion.div>
    </div>
  );
}
