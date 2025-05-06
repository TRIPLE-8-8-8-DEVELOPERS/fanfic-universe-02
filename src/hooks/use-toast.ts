
import { toast as sonnerToast } from "sonner";

// Create a wrapped version of sonner toast
export const toast = {
  ...sonnerToast,
  success: (message: string | React.ReactNode) => 
    sonnerToast.success(message, { 
      className: "bg-background text-foreground border-border",
      descriptionClassName: "text-muted-foreground" 
    }),
  error: (message: string | React.ReactNode) => 
    sonnerToast.error(message, { 
      className: "bg-background text-destructive border-destructive/20",
      descriptionClassName: "text-muted-foreground" 
    }),
  info: (message: string | React.ReactNode) => 
    sonnerToast.info(message, { 
      className: "bg-background text-foreground border-border",
      descriptionClassName: "text-muted-foreground" 
    }),
  warning: (message: string | React.ReactNode) => 
    sonnerToast.warning(message, { 
      className: "bg-background text-amber-600 border-amber-200",
      descriptionClassName: "text-muted-foreground" 
    })
};

// Export the original toast function for direct usage
export { toast as useToast };
