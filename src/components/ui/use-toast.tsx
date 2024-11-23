import { toast } from "sonner"

export type ToastProps = {
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  variant?: "default" | "destructive"
}

export function useToast() {
  const showToast = ({ title, description, action, variant = "default" }: ToastProps) => {
    toast(title, {
      description,
      action: action
        ? {
            label: action.label,
            onClick: action.onClick,
          }
        : undefined,
      className: variant === "destructive" ? "bg-destructive text-destructive-foreground" : undefined,
    })
  }

  return { toast: showToast }
}