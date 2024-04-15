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

const links = [
  {
    id: "about",
    name: "About",
    href: "/about",
  },
  {
    id: "creator",
    name: "Creator",
    href: "/creator",
  },
];

export const Navbar = (props: Props) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 w-full px-5 container">
      <div className="w-full  h-20 flex items-center justify-between gap-4 ">
        <div>
          <Link href={"/"} className="font-medium text-2xl">
            SceneAI
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {links.map((link) => (
            <Link
              key={link.id}
              className="text-base font-light transition"
              href={link.href}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
