"use client";
import React from "react";
import { Tooltip, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { Maximize, Minimize } from "lucide-react";
import { TooltipContent } from "@radix-ui/react-tooltip";

type Props = {};

export const TopBar = (props: Props) => {
  return (
    <div className="max-w-5xl mx-auto flex justify-end items-center gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"icon"}
              type="button"
              // onClick={() => {
              //    setIsFullscreen((prev) => !prev);
              //   screenfull.toggle();
              // }}
              onClick={() => console.log("click")}
            >
              {true ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={30}>
            <p>Fullscreen</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
