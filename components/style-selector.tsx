"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { number } from "zod";
type Props = {
  styles: Style[];
  onValueChange: (...event: any[]) => void;
  defaultValue: string;
};

const DEFAULT_STYLE_ID = 9; // Default set to 'Realism'

export const StyleSelector = ({ styles }: Props) => {
  const [index, setIndex] = useState<number>(DEFAULT_STYLE_ID);

  const getStyleById = (id: number): Style | undefined => {
    return styles.find((style) => style.id === id);
  };

  return (
    <Select
      defaultValue={""}
      onValueChange={(value) => {
        setIndex(parseInt(value));

        const style = getStyleById(parseInt(value));
        console.log("onValueChange style: ", style?.name);
      }}
    >
      <SelectTrigger className="w-[280px] border-none bg-black/20 rounded-full border-white/20">
        <SelectValue placeholder="Select a style" defaultValue={"Realisn"} />
      </SelectTrigger>
      <SelectContent className="overflow-y-auto max-h-[50vh]">
        <SelectGroup>
          <SelectLabel>Select a style</SelectLabel>
          {styles.map((style) => (
            <SelectItem key={style.id} value={style.id.toString()}>
              {style.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
