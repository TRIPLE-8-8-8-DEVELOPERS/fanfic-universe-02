
"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts } = useToast()
  
  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant, ...props }) => (
        <Toast key={id} {...props} className="bg-background border-border text-foreground" 
               variant={variant === "success" ? "default" : variant}>
          <div className="grid gap-1">
            {title && <ToastTitle>{typeof title === 'string' ? title : 'Notification'}</ToastTitle>}
            {description && (
              <ToastDescription className="text-muted-foreground">
                {typeof description === 'string' ? description : ''}
              </ToastDescription>
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
