import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  centered?: boolean;
}

export function PageContainer({
  children,
  centered = false,
}: PageContainerProps) {
  return (
    <main
      className={cn(
        "mx-auto max-w-5xl p-6 h-full",
        centered && "text-center flex flex-col items-center justify-center"
      )}
    >
      {children}
    </main>
  );
}
