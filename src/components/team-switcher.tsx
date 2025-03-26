"use client";

import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Image, { StaticImageData } from "next/image";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    image: StaticImageData;
  }[];
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="hover:bg-transparent !bg-transparent block justify-center h-[75px] -mt-2"
        >
          <div className="flex mx-auto items-center justify-center">
            <Image
              src={teams[0].image}
              alt={teams[0].name}
              width={125}
              height={125}
            />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
