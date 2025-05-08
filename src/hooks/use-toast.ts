
import { toast as sonnerToast } from "sonner";
import React from "react";

type ReactNode = React.ReactNode;

// Define a proper type for our toast function
export type ToastProps = {
  id?: string | number;
  title?: string | ReactNode;
  description?: string | ReactNode;
  action?: ReactNode;
  variant?: "default" | "destructive" | "success";
  [key: string]: any;
};

// Create proper toast state management
type ToastState = {
  toasts: ToastProps[];
};

const TOAST_LIMIT = 20;
const TOAST_REMOVE_DELAY = 1000;

const toastState: ToastState = {
  toasts: [],
};

// Simple event system for toast state management
let listeners: ((state: ToastState) => void)[] = [];

function addToast(toast: ToastProps) {
  const id = toast.id || String(Date.now());
  
  toastState.toasts = [
    ...toastState.toasts,
    { ...toast, id }
  ].slice(-TOAST_LIMIT);
  
  emitChange();
  
  // Also use sonner to display toast
  if (typeof toast.description === 'string') {
    sonnerToast(toast.title as string, {
      description: toast.description,
      action: toast.action,
      className: "bg-background text-foreground border-border",
      descriptionClassName: "text-muted-foreground",
    });
  } else {
    sonnerToast(toast as any);
  }
  
  return id;
}

function dismissToast(toastId: string) {
  toastState.toasts = toastState.toasts.filter(
    (t) => t.id !== toastId
  );
  
  emitChange();
}

function emitChange() {
  listeners.forEach((listener) => {
    listener(toastState);
  });
}

// Export the toast function directly
export const toast = Object.assign(
  // Make the base toast function callable
  (props: ToastProps | string) => {
    if (typeof props === "string") {
      return addToast({ title: props });
    }
    return addToast(props);
  },
  {
    // Add all the sonner toast methods
    success: (message: string | ReactNode, options: Record<string, any> = {}) => {
      const toastId = addToast({
        title: message,
        variant: "success",
        ...options,
      });
      sonnerToast.success(message, {
        className: "bg-background text-foreground border-border",
        descriptionClassName: "text-muted-foreground",
        ...options,
      });
      return toastId;
    },
    error: (message: string | ReactNode, options: Record<string, any> = {}) => {
      const toastId = addToast({
        title: message,
        variant: "destructive",
        ...options,
      });
      sonnerToast.error(message, {
        className: "bg-background text-destructive border-destructive/20",
        descriptionClassName: "text-muted-foreground",
        ...options,
      });
      return toastId;
    },
    info: (message: string | ReactNode, options: Record<string, any> = {}) => {
      const toastId = addToast({
        title: message,
        ...options,
      });
      sonnerToast.info(message, {
        className: "bg-background text-foreground border-border",
        descriptionClassName: "text-muted-foreground",
        ...options,
      });
      return toastId;
    },
    warning: (message: string | ReactNode, options: Record<string, any> = {}) => {
      const toastId = addToast({
        title: message,
        ...options,
      });
      sonnerToast.warning(message, {
        className: "bg-background text-amber-600 border-amber-200",
        descriptionClassName: "text-muted-foreground",
        ...options,
      });
      return toastId;
    },
    dismiss: (toastId: string) => {
      dismissToast(toastId);
      sonnerToast.dismiss(toastId);
    },
    // Support for get/set toast history
    getHistory: () => sonnerToast.getHistory(),
  }
);

// For compatibility with existing code that uses useToast()
export function useToast() {
  const [state, setState] = React.useState<ToastState>(toastState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      listeners = listeners.filter((listener) => listener !== setState);
    };
  }, []);

  return {
    toast: (props: ToastProps | string) => {
      if (typeof props === "string") {
        return toast({ title: props });
      }
      return toast(props);
    },
    toasts: state.toasts,
    dismiss: toast.dismiss,
  };
}
