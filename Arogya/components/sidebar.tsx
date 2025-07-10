"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconCalendarEvent,
  IconChartBar,
} from "@tabler/icons-react";

export function AppSidebar() {
  const [open, setOpen] = useState(false);

  const topLinks = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-sidebar-foreground h-5 w-5 flex-shrink-0" />
      ),
    },
    
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: (
        <IconSettings className="text-sidebar-foreground h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Schedule Visits",
      href: "/dashboard/visits",
      icon: (
        <IconCalendarEvent className="text-sidebar-foreground h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Reports",
      href: "/dashboard/reports",
      icon: (
        <IconChartBar className="text-sidebar-foreground h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const logoutLink = {
    label: "Log Out",
    href: "#",
    icon: (
      <IconArrowLeft className="text-sidebar-foreground h-5 w-5 flex-shrink-0" />
    ),
  };

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="pt-16 flex flex-col justify-between">
        {/* Top menu items */}
        <div className="flex flex-col gap-2">
          {topLinks.map((link, idx) => (
            <SidebarLink key={idx} link={link} />
          ))}
        </div>

        {/* Logout at bottom */}
        <div className="mb-4">
          <SidebarLink
            link={logoutLink}
            className="hover:bg-sidebar-hover transition-colors"
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
