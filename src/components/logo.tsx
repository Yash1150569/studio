import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center justify-center">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          <path
            d="M39.84 31.92C42.48 28.56 44 24.36 44 19.8C44 10.08 35.04 2 24 2C12.96 2 4 10.08 4 19.8C4 25.32 7.08 30.12 11.52 33.12L11.76 33.24L12 33.36V46L21.84 38.64H24H34.44L39.84 31.92Z"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M24 16L26.25 21L32 22L27.5 25.5L29 31L24 28L19 31L20.5 25.5L16 22L21.75 21L24 16Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <span className="text-2xl font-bold tracking-tight text-foreground">
        BeyondChats AI Revitalizer
      </span>
    </div>
  );
}
