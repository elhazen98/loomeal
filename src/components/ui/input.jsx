import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, icon, ...props }) {
    return (
        <div
            className={cn(
                "flex h-9 w-full justify-between items-center rounded-md bg-secondary px-3 py-1 text-secondary-foreground shadow-xs transition-[color,box-shadow]",
                "focus-within:border-2 focus-within:border-primary",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                className
            )}
        >
            <input
                type={type}
                data-slot="input"
                className={cn(
                    "w-full file:text-foreground placeholder:text-primary/50 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                )}
                {...props}
            />
            <div className="opacity-50">{icon}</div>
        </div>
    );
}

export { Input };
