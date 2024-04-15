"use client";
import { TopBar } from "./top-bar";
import { InputForm } from "./input-form";
import { cn } from "@/lib/utils";
import { usePanel } from "@/hooks/use-panel";

type Props = {};

export const UIPanel = (props: Props) => {
  const { togglePanel, isPanelHidden } = usePanel((state) => state);
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden px-6 flex flex-col justify-end gap-4`}
    >
      <div
        className={cn(
          `pointer-events-auto max-w-5xl mx-auto w-full transition-all duration-1000 ease-in-out pb-6`,
          isPanelHidden ? "translate-y-full" : "translate-y-0"
        )}
      >
        <TopBar />
        <InputForm />
      </div>
    </div>
  );
};
