import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TerminalInputProps {
  onSubmit: (value: string) => void;
  placeholder?: string;
  type?: "text" | "password";
  prefix?: string;
  className?: string;
  autoFocus?: boolean;
}

export function TerminalInput({ 
  onSubmit, 
  placeholder = "Enter command...",
  type = "text",
  prefix = ">",
  className,
  autoFocus = false
}: TerminalInputProps) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value);
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <div 
        className={cn(
          "flex items-center gap-2 border bg-input px-4 py-3 transition-colors duration-75",
          isFocused ? "border-primary" : "border-border"
        )}
      >
        <span className="text-primary text-sm font-medium">{prefix}</span>
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground/50 tracking-wide"
        />
        {isFocused && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="text-primary"
          >
            _
          </motion.span>
        )}
      </div>
      <button type="submit" className="sr-only">Submit</button>
    </form>
  );
}
