"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { IconCirclePlusFilled, IconMail, IconPlus, type Icon } from "@tabler/icons-react"

import { CreateLicenseDialog } from "@/components/licenses/create-license-dialog"
import { CreatePolicyDialog } from "@/components/policies/create-policy-dialog"
import { CreateProductDialog } from "@/components/products/create-product-dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  const [quickMenuOpen, setQuickMenuOpen] = useState(false)
  const [quickCreateTarget, setQuickCreateTarget] = useState<
    "license" | "policy" | "product" | null
  >(null)

  const handleOpenChange = useMemo(
    () => ({
      license: (open: boolean) => setQuickCreateTarget(open ? "license" : null),
      policy: (open: boolean) => setQuickCreateTarget(open ? "policy" : null),
      product: (open: boolean) => setQuickCreateTarget(open ? "product" : null),
    }),
    []
  )

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <DropdownMenu open={quickMenuOpen} onOpenChange={setQuickMenuOpen}>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  tooltip="Quick Create"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                >
                  <IconCirclePlusFilled />
                  <span>Quick Create</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem
                  onClick={() => {
                    setQuickCreateTarget("license")
                    setQuickMenuOpen(false)
                  }}
                >
                  <IconPlus className="mr-2 h-4 w-4" />
                  License
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setQuickCreateTarget("policy")
                    setQuickMenuOpen(false)
                  }}
                >
                  <IconPlus className="mr-2 h-4 w-4" />
                  Policy
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setQuickCreateTarget("product")
                    setQuickMenuOpen(false)
                  }}
                >
                  <IconPlus className="mr-2 h-4 w-4" />
                  Product
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <CreateLicenseDialog
          hideTrigger
          open={quickCreateTarget === "license"}
          onOpenChange={handleOpenChange.license}
        />
        <CreatePolicyDialog
          hideTrigger
          mode="create"
          open={quickCreateTarget === "policy"}
          onOpenChange={handleOpenChange.policy}
        />
        <CreateProductDialog
          hideTrigger
          open={quickCreateTarget === "product"}
          onOpenChange={handleOpenChange.product}
        />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
