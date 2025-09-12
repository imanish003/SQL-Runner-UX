import { Textarea } from "@/components/ui/textarea";

export interface IQueryInputProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function QueryInput({
  value,
  onChange,
  placeholder = "Enter your SQL query here...",
}: IQueryInputProps) {
  return (
    <Textarea
      id="query-input"
      className="flex-1 w-full font-mono resize-none min-h-[60px] text-sm"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}
