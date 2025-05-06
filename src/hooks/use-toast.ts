
import { toast as sonnerToast, Toast, useToast as useSonnerToast } from "sonner";

// Create a wrapped version of sonner toast
export const toast = {
  ...sonnerToast,
  success: (message: string) => 
    sonnerToast.success(message, { 
      className: "bg-background text-foreground border-border",
      descriptionClassName: "text-muted-foreground" 
    }),
  error: (message: string) => 
    sonnerToast.error(message, { 
      className: "bg-background text-destructive border-destructive/20",
      descriptionClassName: "text-muted-foreground" 
    }),
  info: (message: string) => 
    sonnerToast.info(message, { 
      className: "bg-background text-foreground border-border",
      descriptionClassName: "text-muted-foreground" 
    }),
  warning: (message: string) => 
    sonnerToast.warning(message, { 
      className: "bg-background text-amber-600 border-amber-200",
      descriptionClassName: "text-muted-foreground" 
    })
};

export const useToast = useSonnerToast;

export type { Toast };
