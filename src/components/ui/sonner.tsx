import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast bg-gray-800 text-black border-border shadow-lg",
          description: "text-black-300",
          actionButton:
            "bg-blue-500 text-black",
          cancelButton:
            "bg-gray-500 text-black",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
