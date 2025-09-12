import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/utils/cn";

export interface IQueryCardProps {
  title: string;
  description?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function QueryCard({
  title,
  description,
  isSelected = false,
  onClick,
}: IQueryCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md gap-0 py-3",
        isSelected && "border-primary bg-primary/5"
      )}
      onClick={onClick}
    >
      <CardHeader className="px-4 py-1">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      {description && (
        <CardContent className="px-4">
          <p className="text-xs leading-relaxed">{description}</p>
        </CardContent>
      )}
    </Card>
  );
}
