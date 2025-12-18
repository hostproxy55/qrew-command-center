import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SystemModule } from "../SystemModule";

const bootSequence = [
  "INITIALIZING QREW.SYS...",
  "LOADING KERNEL MODULES...",
  "ESTABLISHING SECURE CONNECTION...",
  "AUTHENTICATING SYSTEM CREDENTIALS...",
  "MOUNTING /DEV/QREW...",
  "SYSTEM READY.",
];

const systemInfo = [
  { label: "VERSION", value: "2.4.1" },
  { label: "UPTIME", value: "847d 14h 23m" },
  { label: "CONNECTIONS", value: "2,847" },
  { label: "STATUS", value: "OPERATIONAL" },
];

export function TerminalSection() {
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    if (currentLine < bootSequence.length) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setBootComplete(true);
    }
  }, [currentLine]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Boot Sequence */}
      <SystemModule title="BOOT_SEQUENCE" status={bootComplete ? "online" : "restricted"}>
        <div className="font-mono text-xs space-y-1">
          {bootSequence.slice(0, currentLine).map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <span className="text-primary">[OK]</span>
              <span className="text-muted-foreground">{line}</span>
            </motion.div>
          ))}
          {!bootComplete && (
            <div className="flex items-center gap-2">
              <span className="text-system-amber">[..]</span>
              <span className="text-muted-foreground">
                {bootSequence[currentLine]}
                {showCursor && <span className="text-primary">_</span>}
              </span>
            </div>
          )}
        </div>
      </SystemModule>

      {bootComplete && (
        <>
          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="border border-primary/20 bg-primary/5 p-6"
          >
            <pre className="text-primary text-xs leading-relaxed tracking-wide">
{`
 ██████╗ ██████╗ ███████╗██╗    ██╗
██╔═══██╗██╔══██╗██╔════╝██║    ██║
██║   ██║██████╔╝█████╗  ██║ █╗ ██║
██║▄▄ ██║██╔══██╗██╔══╝  ██║███╗██║
╚██████╔╝██║  ██║███████╗╚███╔███╔╝
 ╚══▀▀═╝ ╚═╝  ╚═╝╚══════╝ ╚══╝╚══╝ 
`}
            </pre>
            <p className="text-muted-foreground text-xs mt-4 tracking-wider">
              WELCOME TO THE QREW SYSTEM PORTAL
            </p>
            <p className="text-muted-foreground/60 text-[10px] mt-2 tracking-wide">
              Navigate using the side panel. Access restricted areas with proper credentials.
            </p>
          </motion.div>

          {/* System Info */}
          <SystemModule title="SYSTEM_INFO" status="online" delay={0.4}>
            <div className="grid grid-cols-2 gap-4">
              {systemInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <p className="system-label">{item.label}</p>
                  <p className="text-foreground text-sm tracking-wider mt-1">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </SystemModule>
        </>
      )}
    </div>
  );
}
