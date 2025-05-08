
"use client"

import { toast } from "sonner"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  return (
    <ToastProvider>
      {toast.getHistory().map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props} className="bg-background border-border text-foreground">
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && (
              <ToastDescription className="text-muted-foreground">{description}</ToastDescription>
            )}
          </div>
          {action}
          <ToastClose className="text-foreground" />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
