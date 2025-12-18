import { useState } from "react";
import { motion } from "framer-motion";
import { SystemNav } from "@/components/SystemNav";
import { TerminalSection } from "@/components/sections/TerminalSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { MembersSection } from "@/components/sections/MembersSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExclusiveSection } from "@/components/sections/ExclusiveSection";

const sections: Record<string, React.ComponentType> = {
  terminal: TerminalSection,
  products: ProductsSection,
  members: MembersSection,
  about: AboutSection,
  exclusive: ExclusiveSection,
};

const sectionTitles: Record<string, string> = {
  terminal: "SYSTEM TERMINAL",
  products: "PRODUCT DATABASE",
  members: "MEMBER REGISTRY",
  about: "SYSTEM INFORMATION",
  exclusive: "QREW EXCLUSIVE",
};

const Index = () => {
  const [activeSection, setActiveSection] = useState("terminal");
  const ActiveComponent = sections[activeSection];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Navigation */}
      <SystemNav activeSection={activeSection} onNavigate={setActiveSection} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header Bar */}
        <header className="border-b border-border px-6 py-4 bg-card/20 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-foreground text-sm tracking-wider font-medium">
                {sectionTitles[activeSection]}
              </h1>
              <p className="text-[10px] text-muted-foreground tracking-wider mt-0.5">
                PATH: /QREW/{activeSection.toUpperCase()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground tracking-wider">TIMESTAMP</p>
                <p className="text-xs text-foreground tracking-wider">
                  {new Date().toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                  })}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ActiveComponent />
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border px-6 py-4 mt-auto">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground/50 tracking-wider">
            <span>© 2024 QREW SYSTEMS // ALL RIGHTS RESERVED</span>
            <span>BUILD: 2.4.1-STABLE // ENV: PRODUCTION</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
