import { useState } from "react";
import { motion } from "framer-motion";
import { SystemModule } from "../SystemModule";
import { ProductCard } from "../ProductCard";
import { StatusMessage } from "../StatusMessage";
import { toast } from "@/hooks/use-toast";

const products = [
  {
    id: "001",
    name: "QREW CORE TEE",
    category: "APPAREL",
    status: "available" as const,
    price: 48.00,
    description: "Essential crew neck constructed from heavyweight organic cotton. Minimal branding. System approved.",
  },
  {
    id: "002",
    name: "UTILITY CARGO PANTS",
    category: "APPAREL",
    status: "preorder" as const,
    price: 128.00,
    description: "Technical cargo with reinforced seams. Multiple utility pockets. Drop scheduled Q2 2025.",
  },
  {
    id: "003",
    name: "SYSTEM HOODIE V2",
    category: "OUTERWEAR",
    status: "available" as const,
    price: 98.00,
    description: "Oversized silhouette. Hidden interior pockets. Embroidered system codes.",
  },
  {
    id: "004",
    name: "ACCESS CAP",
    category: "ACCESSORIES",
    status: "preorder" as const,
    price: 38.00,
    description: "Structured six-panel cap. Laser-cut ventilation. Member identification tag.",
  },
];

export function ProductsSection() {
  const [actionMessage, setActionMessage] = useState<{
    type: "success" | "error" | "warning" | "loading";
    message: string;
  } | null>(null);

  const handleProductAction = (product: typeof products[0]) => {
    setActionMessage({ type: "loading", message: `PROCESSING ${product.name}...` });
    
    setTimeout(() => {
      if (product.status === "preorder") {
        setActionMessage({ type: "success", message: `PREORDER CONFIRMED: ${product.name}` });
        toast({
          title: "PREORDER CONFIRMED",
          description: `${product.name} has been added to your queue.`,
        });
      } else {
        setActionMessage({ type: "success", message: `ADDED TO CART: ${product.name}` });
        toast({
          title: "ITEM ADDED",
          description: `${product.name} added to your cart.`,
        });
      }
      
      setTimeout(() => setActionMessage(null), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <SystemModule title="PRODUCT_DATABASE" status="online">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-foreground text-sm tracking-wider">CATALOG ACCESS</p>
            <p className="text-muted-foreground text-xs mt-1">
              {products.length} items available in current inventory
            </p>
          </div>
          <div className="text-right">
            <p className="system-label">LAST SYNC</p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
            </p>
          </div>
        </div>
      </SystemModule>

      {/* Status Message */}
      {actionMessage && (
        <StatusMessage 
          type={actionMessage.type} 
          message={actionMessage.message} 
          visible={true} 
        />
      )}

      {/* Products Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            onAction={handleProductAction}
            index={index}
          />
        ))}
      </motion.div>

      {/* Footer Note */}
      <div className="border-t border-border pt-4">
        <p className="text-[10px] text-muted-foreground/60 tracking-wider text-center">
          EXCLUSIVE ITEMS AVAILABLE IN QREW_EXCLUSIVE MODULE // ACCESS REQUIRED
        </p>
      </div>
    </div>
  );
}
