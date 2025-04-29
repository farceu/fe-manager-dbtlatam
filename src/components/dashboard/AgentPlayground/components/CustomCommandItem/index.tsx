import { CommandItem } from "@/components/ui/command";
import { useMutationObserver } from "@/hooks/useMutationObserver";
import { cn } from "@/lib/utils";
import { LLMProvidersType, ModelNames, ModelType } from "@/mock/model";
import { Check } from "lucide-react";
import React from "react";

interface CustomCommandItemProps {
  value: LLMProvidersType | ModelType | ModelNames;
  isSelected: boolean;
  onSelect: () => void;
  onPeek: (value: LLMProvidersType | ModelType | ModelNames | string) => void;
}

export default function CustomCommandItem({
  value,
  isSelected,
  onSelect,
  onPeek,
}: CustomCommandItemProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  useMutationObserver(ref, mutations => {
    mutations.forEach(mutation => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "aria-selected" &&
        ref.current?.getAttribute("aria-selected") === "true"
      ) {
        onPeek(value);
      }
    });
  });
  return (
    <CommandItem
      key={value}
      onSelect={onSelect}
      ref={ref}
      className="data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
    >
      {value}
      <Check className={cn("ml-auto", isSelected ? "opacity-100" : "opacity-0")} />
    </CommandItem>
  );
}
