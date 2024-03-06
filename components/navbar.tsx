"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = {};

const navbar = (props: Props) => {
  return (
    <div className="fixed top-0 px-8 py-4 z-10 w-full">
      <div className="h-20 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center glassify rounded-lg p-4 ring-[0.4px] ring-neutral-300 ring-inset">
          <Link href="/">
            <Image
              src={"/logo.png"}
              alt="LIVR Studios"
              width={172}
              height={58}
              className="h-full"
              priority={true}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default navbar;
