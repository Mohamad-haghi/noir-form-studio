import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  index?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "start" | "between";
  className?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  align = "between",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-6",
        align === "between" && "lg:flex-row lg:items-end lg:justify-between lg:gap-16",
        className,
      )}
    >
      <div className="flex items-start gap-5 sm:gap-8">
        {index ? (
          <span aria-hidden="true" className="section-index shrink-0">
            {index}
          </span>
        ) : null}
        <div className="min-w-0 pt-1">
          {eyebrow ? <p className="label mb-4 text-brand">{eyebrow}</p> : null}
          <h2 className="display-xl text-balance">{title}</h2>
        </div>
      </div>
      {subtitle ? (
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:pb-3">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
