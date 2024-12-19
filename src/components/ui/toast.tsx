import { Toaster as ReactToaster } from "react-hot-toast";

export function Toaster() {
  return (
    <ReactToaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      containerClassName="mt-16"
      toastOptions={{
        duration: 4000,
        className:
          "!bg-background !text-foreground rounded-lg shadow-lg border border-border p-4",
        success: {
          className:
            "!bg-green-50 !text-green-900 dark:!bg-green-950 dark:!text-green-50 border-green-200 dark:border-green-900",
          iconTheme: {
            primary: "hsl(var(--primary))",
            secondary: "hsl(var(--primary-foreground))",
          },
        },
        error: {
          className:
            "!bg-red-50 !text-red-900 dark:!bg-red-950 dark:!text-red-50 border-red-200 dark:border-red-900",
          iconTheme: {
            primary: "hsl(var(--destructive))",
            secondary: "hsl(var(--destructive-foreground))",
          },
        },
        loading: {
          className:
            "!bg-blue-50 !text-blue-900 dark:!bg-blue-950 dark:!text-blue-50 border-blue-200 dark:border-blue-900",
        },
        style: {
          maxWidth: "420px",
          animation: "slide-in 0.2s ease-out",
        },
      }}
    />
  );
}
