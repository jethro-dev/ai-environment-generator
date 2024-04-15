"use client";
import React from "react";
import { Tooltip, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import {
  Download,
  Eye,
  EyeOff,
  Maximize,
  Minimize,
  Rotate3D,
} from "lucide-react";
import { TooltipContent } from "@radix-ui/react-tooltip";
import screenfull from "screenfull";
import { saveAs } from "file-saver";
import { useSkybox } from "@/hooks/use-skybox";
import { usePanel } from "@/hooks/use-panel";
import { isMobile } from "mobile-device-detect";

type Props = {};

export const TopBar = (props: Props) => {
  const { skybox } = useSkybox((state) => state);
  const { togglePanel, isPanelHidden } = usePanel((state) => state);
  return (
    <div className="absolute bottom-[100%] right-0 -translate-y-4 flex justify-end items-center gap-3 bg-black/20 border border-white/10 rounded-2xl  backdrop-blur py-2.5 px-3">
      {isMobile && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size={"icon"}
                type="button"
                className="bg-black/20 border-white/10 backdrop-blur h-8 w-8"
                onClick={() => {
                  const gyroBtn = document.querySelector(
                    ".psv-gyroscope-button"
                  ) as HTMLButtonElement;

                  if (gyroBtn.style.display !== "none") {
                    gyroBtn.click();
                  }
                }}
              >
                <Rotate3D className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              sideOffset={20}
              className="p-2 text-neutral-300 font-light text-sm rounded-md bg-black/20 border border-white/10 backdrop-blur"
            >
              <p>Enable Motion</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"icon"}
              type="button"
              className="bg-black/20 border-white/10 backdrop-blur h-8 w-8"
              onClick={() => {
                //  setIsFullscreen((prev) => !prev);
                screenfull.toggle();
              }}
            >
              {true ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent
            sideOffset={20}
            className="p-2 text-neutral-300 font-light text-sm rounded-md bg-black/20 border border-white/10 backdrop-blur"
          >
            <p>Fullscreen</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"icon"}
              type="button"
              onClick={() => saveAs(skybox.file_url, "generated-image.png")}
              className="bg-black/20 border-white/10 backdrop-blur h-8 w-8"
            >
              <Download className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            sideOffset={20}
            className="p-2 text-neutral-300 font-light text-sm rounded-md bg-black/20 border border-white/10 backdrop-blur"
          >
            <p>Download</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"icon"}
              type="button"
              className="bg-black/20 border-white/10 backdrop-blur h-8 w-8"
              onClick={() =>
                // saveAs(skybox.file_url, "generated-image.png")
                togglePanel()
              }
            >
              {isPanelHidden ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent
            sideOffset={20}
            className="p-2 text-neutral-300 font-light text-sm rounded-md bg-black/20 border border-white/10 backdrop-blur"
          >
            {isPanelHidden ? <p>Show UI</p> : <p>Hide UI</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
