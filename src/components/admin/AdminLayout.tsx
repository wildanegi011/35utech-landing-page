"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Award,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Sparkles,
  Layers,
  Mail
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Briefcase, label: "Portfolio", href: "/admin/portofolio" },
  { icon: Layers, label: "Services", href: "/admin/layanan" },
  { icon: Award, label: "Achievements", href: "/admin/prestasi" },
  { icon: Mail, label: "Buletin", href: "/admin/newsletter" },
  { icon: Settings, label: "Konfigurasi", href: "/admin/konfigurasi" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? "w-64" : "w-20"
          } bg-white border-r border-slate-200 transition-all duration-300 ease-in-out fixed inset-y-0 left-0 z-50 lg:relative`}
      >
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="h-16 flex items-center px-6 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
              <Sparkles className="w-5 h-5" />
            </div>
            {isSidebarOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="ml-3 font-black text-lg tracking-tight uppercase"
              >
                35U<span className="text-primary italic">.</span>ADMIN
              </motion.span>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300
                    ${isActive
                      ? "bg-blue-50/60 text-primary"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}
                  `}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full"
                    />
                  )}

                  <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-primary" : "group-hover:text-primary transition-colors duration-300"}`} />
                  {isSidebarOpen && (
                    <span className={`font-black text-[11px] uppercase tracking-widest ${isActive ? "text-primary" : "text-slate-500 group-hover:text-slate-900 transition-colors"}`}>
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer Sidebar */}
          <div className="p-4 border-t border-slate-100">
            <Button
              variant="ghost"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className={`w-full flex items-center justify-start gap-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl px-3 transition-colors`}
            >
              <LogOut className="w-5 h-5" />
              {isSidebarOpen && <span className="font-bold text-sm">Keluar</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden md:block">
              <h1 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                {NAV_ITEMS.find(item => item.href === pathname)?.label || "Dashboard"}
              </h1>
              <p className="text-[10px] font-bold text-slate-400">Selamat datang kembali, Admin</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-linear-to-tr from-primary to-blue-400" />
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 no-scrollbar bg-slate-50/50">
          <div className="w-full max-w-(--breakpoint-2xl) mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
