
import { toast as sonnerToast, type Toast as SonnerToast } from "sonner";
import React from "react";

type ReactNode = React.ReactNode;

// Define a proper type for our toast function
export type ToastProps = {
  title?: string;
  description?: string | React.ReactNode;
  action?: React.ReactNode;
  [key: string]: any;
};

// Create a wrapper function to handle both object and string params
const createToast = (props: ToastProps | string) => {
  if (typeof props === "string") {
    return sonnerToast(props, { 
      className: "bg-background text-foreground border-border",
      descriptionClassName: "text-muted-foreground" 
    });
  }
  return sonnerToast(props.title || "", { 
    description: props.description,
    action: props.action,
    className: "bg-background text-foreground border-border",
    descriptionClassName: "text-muted-foreground",
    ...props
  });
};

// Export a toast object with methods and the toast function
export const toast = {
  ...sonnerToast,
  // Override the default function to handle our custom props
  __proto__: {
    call: (props: ToastProps | string) => createToast(props)
  },
  success: (message: string | ReactNode) => 
    sonnerToast.success(message, { 
      className: "bg-background text-foreground border-border",
      descriptionClassName: "text-muted-foreground" 
    }),
  error: (message: string | ReactNode) => 
    sonnerToast.error(message, { 
      className: "bg-background text-destructive border-destructive/20",
      descriptionClassName: "text-muted-foreground" 
    }),
  info: (message: string | ReactNode) => 
    sonnerToast.info(message, { 
      className: "bg-background text-foreground border-border",
      descriptionClassName: "text-muted-foreground" 
    }),
  warning: (message: string | ReactNode) => 
    sonnerToast.warning(message, { 
      className: "bg-background text-amber-600 border-amber-200",
      descriptionClassName: "text-muted-foreground" 
    }),
  // Add toasts property to match the previous implementation
  get toasts() {
    return sonnerToast.getHistory();
  }
};

// For compatibility with existing code that uses useToast()
export function useToast() {
  return {
    toast: (props: ToastProps | string) => createToast(props)
  };
}
