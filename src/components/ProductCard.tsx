import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CommandButton } from "./CommandButton";
import { FileText, ExternalLink } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  status: "available" | "preorder" | "restricted";
  price: number;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onAction?: (product: Product) => void;
  index?: number;
}

export function ProductCard({ product, onAction, index = 0 }: ProductCardProps) {
  const statusConfig = {
    available: { label: "IN_STOCK", color: "text-primary border-primary/30" },
    preorder: { label: "PREORDER", color: "text-system-amber border-system-amber/30" },
    restricted: { label: "EXCLUSIVE", color: "text-system-lavender border-system-lavender/30" },
  };

  const status = statusConfig[product.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="system-module group"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="flex items-center gap-2">
          <FileText className="w-3 h-3 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground tracking-wider">
            ITEM_{product.id.toUpperCase()}
          </span>
        </div>
        <span className={cn("text-[9px] px-2 py-0.5 border tracking-wider", status.color)}>
          {status.label}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Product Info */}
        <div>
          <p className="system-label mb-1">{product.category}</p>
          <h3 className="text-foreground font-medium tracking-wide">{product.name}</h3>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div>
            <p className="text-[10px] text-muted-foreground tracking-wider">PRICE</p>
            <p className="text-primary font-semibold tracking-wider">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <CommandButton
            variant={product.status === "restricted" ? "secondary" : "primary"}
            size="sm"
            onClick={() => onAction?.(product)}
          >
            {product.status === "preorder" ? "PREORDER" : "EXECUTE"}
            <ExternalLink className="w-3 h-3" />
          </CommandButton>
        </div>
      </div>
    </motion.div>
  );
}
