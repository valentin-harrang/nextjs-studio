import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge: string;
  badgeVariant: "default" | "secondary" | "outline" | "destructive";
  gradient: string;
}

export function FeatureCard({
  title,
  description,
  href,
  icon: Icon,
  badge,
  badgeVariant,
  gradient,
}: FeatureCardProps) {
  return (
    <Link href={href} title={title}>
      <Card className="group h-full p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary">
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <div
              className={cn(
                "p-3 rounded-lg bg-gradient-to-br text-white",
                gradient
              )}
            >
              <Icon className="size-6" />
            </div>
            <Badge variant={badgeVariant} className="text-xs">
              {badge}
            </Badge>
          </div>

          <h3 className="text-xl text-left font-semibold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          <p className="text-sm text-left text-muted-foreground grow">
            {description}
          </p>

          <div className="mt-4 text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
            Explorer
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
