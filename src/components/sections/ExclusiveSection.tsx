import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SystemModule } from "../SystemModule";
import { TerminalInput } from "../TerminalInput";
import { StatusMessage } from "../StatusMessage";
import { ProductCard } from "../ProductCard";
import { CommandButton } from "../CommandButton";
import { Lock, Unlock, Settings, Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const exclusiveProducts = [
  {
    id: "X001",
    name: "ARCHIVE JACKET",
    category: "EXCLUSIVE // OUTERWEAR",
    status: "restricted" as const,
    price: 248.00,
    description: "Limited run technical shell. Internal labeling system. Archive collection piece.",
  },
  {
    id: "X002",
    name: "SYSTEM BOOT V1",
    category: "EXCLUSIVE // FOOTWEAR",
    status: "restricted" as const,
    price: 298.00,
    description: "Handcrafted leather boot. Vibram sole. Only 100 pairs produced.",
  },
];

// Demo password: "QREW2024"
const VALID_PASSWORD = "QREW2024";

export function ExclusiveSection() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authStatus, setAuthStatus] = useState<{
    type: "success" | "error" | "warning" | "loading";
    message: string;
  } | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [exclusiveEnabled, setExclusiveEnabled] = useState(true);

  const handlePasswordSubmit = (password: string) => {
    setAuthStatus({ type: "loading", message: "VERIFYING CREDENTIALS..." });
    
    setTimeout(() => {
      if (password === VALID_PASSWORD) {
        setAuthStatus({ type: "success", message: "ACCESS GRANTED // WELCOME QREW MEMBER" });
        setTimeout(() => {
          setIsAuthenticated(true);
          setAuthStatus(null);
        }, 1500);
      } else {
        setAttempts((prev) => prev + 1);
        setAuthStatus({ 
          type: "error", 
          message: `ACCESS DENIED // ATTEMPT ${attempts + 1}/3` 
        });
        
        if (attempts >= 2) {
          setTimeout(() => {
            setAuthStatus({ 
              type: "warning", 
              message: "LOCKOUT WARNING // CONTACT ADMIN" 
            });
          }, 2000);
        }
      }
    }, 1500);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowAdminPanel(false);
    setAttempts(0);
    setAuthStatus(null);
    toast({
      title: "SESSION TERMINATED",
      description: "You have been logged out of the exclusive area.",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        {/* Lock Screen */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border border-system-amber/30 bg-system-amber/5 p-8 text-center"
        >
          <Lock className="w-12 h-12 text-system-amber mx-auto mb-4" />
          <h2 className="text-foreground text-lg tracking-wider mb-2">RESTRICTED AREA</h2>
          <p className="text-muted-foreground text-xs tracking-wide mb-6 max-w-sm mx-auto">
            This module requires authentication. Enter your QREW access code to proceed.
          </p>
          
          <div className="max-w-sm mx-auto">
            <TerminalInput
              type="password"
              prefix="ACCESS_CODE >"
              placeholder="Enter password..."
              onSubmit={handlePasswordSubmit}
              autoFocus
            />
          </div>

          <p className="text-muted-foreground/50 text-[10px] mt-4 tracking-wider">
            HINT: TRY "QREW2024"
          </p>
        </motion.div>

        {/* Status Messages */}
        <AnimatePresence>
          {authStatus && (
            <StatusMessage
              type={authStatus.type}
              message={authStatus.message}
              visible={true}
            />
          )}
        </AnimatePresence>

        {/* Access Info */}
        <SystemModule title="ACCESS_INFORMATION" status="restricted">
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              The QREW EXCLUSIVE module contains limited-edition products and 
              member-only releases. Access is granted to verified members only.
            </p>
            <div className="border-t border-border pt-3">
              <p className="system-label">NO ACCESS CODE?</p>
              <p className="text-xs text-muted-foreground mt-1">
                Apply for membership in the MEMBERS module.
              </p>
            </div>
          </div>
        </SystemModule>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Authenticated Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border border-primary/30 bg-primary/5 p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Unlock className="w-5 h-5 text-primary" />
          <div>
            <p className="text-primary text-xs tracking-wider">ACCESS GRANTED</p>
            <p className="text-muted-foreground text-[10px]">QREW EXCLUSIVE MODULE UNLOCKED</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CommandButton
            variant="secondary"
            size="sm"
            onClick={() => setShowAdminPanel(!showAdminPanel)}
          >
            <Settings className="w-3 h-3" />
            ADMIN
          </CommandButton>
          <CommandButton
            variant="danger"
            size="sm"
            onClick={handleLogout}
          >
            LOGOUT
          </CommandButton>
        </div>
      </motion.div>

      {/* Admin Panel (Visual Only) */}
      <AnimatePresence>
        {showAdminPanel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <SystemModule title="ADMIN_CONTROLS" status="online">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-border">
                  <div className="flex items-center gap-3">
                    {exclusiveEnabled ? (
                      <Eye className="w-4 h-4 text-primary" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    )}
                    <div>
                      <p className="text-xs tracking-wider">EXCLUSIVE MODULE</p>
                      <p className="text-[10px] text-muted-foreground">
                        Toggle visibility of exclusive products
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setExclusiveEnabled(!exclusiveEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      exclusiveEnabled ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-foreground transition-transform ${
                        exclusiveEnabled ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
                
                <div className="border-t border-border pt-3">
                  <p className="text-[10px] text-muted-foreground/60 tracking-wider">
                    ADMIN PANEL // VISUAL DEMO ONLY
                  </p>
                </div>
              </div>
            </SystemModule>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exclusive Products */}
      {exclusiveEnabled ? (
        <>
          <SystemModule title="EXCLUSIVE_INVENTORY" status="online">
            <div>
              <p className="text-foreground text-sm tracking-wider">MEMBER-ONLY ITEMS</p>
              <p className="text-muted-foreground text-xs mt-1">
                Limited availability. Priority access for verified members.
              </p>
            </div>
          </SystemModule>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {exclusiveProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAction={(p) => {
                  toast({
                    title: "PREORDER INITIATED",
                    description: `${p.name} added to exclusive queue.`,
                  });
                }}
                index={index}
              />
            ))}
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border border-muted p-8 text-center"
        >
          <EyeOff className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm tracking-wider">
            EXCLUSIVE MODULE DISABLED
          </p>
          <p className="text-muted-foreground/60 text-xs mt-1">
            Enable in admin controls to view products
          </p>
        </motion.div>
      )}

      {/* Session Info */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground/60 tracking-wider">
          <span>SESSION_ID: QRW-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          <span>EXPIRES: {new Date(Date.now() + 3600000).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}
