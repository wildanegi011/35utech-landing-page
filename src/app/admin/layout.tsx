import { AdminLayout } from "@/components/admin/AdminLayout";
import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </AdminLayout>
  )
}
