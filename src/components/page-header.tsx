import { cn } from "@/lib/utils";
import { Logo } from "./logo";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <header className={cn("py-8 text-center md:py-12", className)}>
      <Logo className="justify-center" />
      {subtitle && (
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">{subtitle}</p>
      )}
    </header>
  );
}
