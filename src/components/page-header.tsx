import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <header className={cn("py-8 text-center md:py-12", className)}>
      <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">{subtitle}</p>
      )}
    </header>
  );
}
