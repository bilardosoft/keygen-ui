"use client"

import * as React from "react"
import {
  IconKey,
  IconDeviceDesktop,
  IconUsers,
  IconPackage,
  IconShield,
  IconChartBar,
  IconSettings,
  IconHelp,
  IconReportAnalytics,
  IconUsersGroup,
  IconShieldCheck,
  IconWebhook,
  IconLock,
  IconActivity,
  IconCpu,
  IconGlobe,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useEdition } from "@/lib/config/edition-context"
import { EditionFeatures } from "@/lib/config/features"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconChartBar,
    },
    {
      title: "Licenses",
      url: "/licenses",
      icon: IconKey,
    },
    {
      title: "Tokens",
      url: "/tokens",
      icon: IconLock,
    },
    {
      title: "Machines",
      url: "/machines", 
      icon: IconDeviceDesktop,
    },
    {
      title: "Processes",
      url: "/processes",
      icon: IconActivity,
    },
    {
      title: "Components",
      url: "/components",
      icon: IconCpu,
    },
    {
      title: "Products",
      url: "/products",
      icon: IconPackage,
    },
    {
      title: "Policies",
      url: "/policies",
      icon: IconShield,
    },
    {
      title: "Groups",
      url: "/groups",
      icon: IconUsersGroup,
    },
    {
      title: "Environments",
      url: "/environments",
      icon: IconGlobe,
    },
    {
      title: "Entitlements",
      url: "/entitlements",
      icon: IconShieldCheck,
    },
    {
      title: "Webhooks",
      url: "/webhooks",
      icon: IconWebhook,
    },
    {
      title: "Users",
      url: "/users",
      icon: IconUsers,
    },
  ],
  navSecondary: [
    {
      title: "Analytics",
      url: "/analytics",
      icon: IconReportAnalytics,
      requiresFeature: 'requestLogs' as const,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isFeatureAvailable } = useEdition()

  // Filter nav items based on feature availability
  const filteredNavMain = data.navMain.filter(item => {
    if ('requiresFeature' in item && item.requiresFeature) {
      return isFeatureAvailable(item.requiresFeature as keyof EditionFeatures)
    }
    return true
  })

  const filteredNavSecondary = data.navSecondary.filter(item => {
    if ('requiresFeature' in item && item.requiresFeature) {
      return isFeatureAvailable(item.requiresFeature as keyof EditionFeatures)
    }
    return true
  })

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <IconKey className="!size-5" />
                <span className="text-base font-semibold">Keygen</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavMain} />
        <NavSecondary items={filteredNavSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
