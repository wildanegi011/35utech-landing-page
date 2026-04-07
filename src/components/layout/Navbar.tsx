"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { siteConfig } from "@/config/site-config";

export default function Navbar({ configs }: { configs?: any[] }) {
  const [activeItem, setActiveItem] = useState("#beranda");
  const [isScrolled, setIsScrolled] = useState(false);

  const getConfig = (key: string) => configs?.find(c => c.configKey === key)?.configValue;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      for (let i = siteConfig.mainNav.length - 1; i >= 0; i--) {
        const el = document.querySelector(siteConfig.mainNav[i].href);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveItem(siteConfig.mainNav[i].href);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-500 border-b",
      isScrolled
        ? "bg-white/95 backdrop-blur-xl py-4 border-outline/50 shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
        : "bg-transparent py-6 border-transparent"
    )}>
      <div className="flex items-center justify-between px-8 max-w-7xl mx-auto">
        {/* Logo - Left */}
        <Link
          href="/"
          className={cn(
            "text-2xl font-extrabold tracking-tight transition-colors duration-300 shrink-0",
            isScrolled ? "text-on-surface" : "text-white"
          )}
        >
          {getConfig("siteName") || siteConfig.name}<span className="text-primary">.</span>
        </Link>

        {/* Nav Items - Center */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {siteConfig.mainNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={cn(
                "text-sm font-bold transition-all duration-300 relative py-2 px-1 whitespace-nowrap",
                activeItem === item.href
                  ? (isScrolled ? "text-primary" : "text-white")
                  : (isScrolled ? "text-on-surface-variant hover:text-primary" : "text-white/70 hover:text-white"),
              )}
            >
              {item.label}
              <span className={cn(
                "absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full transition-transform duration-300 origin-left",
                activeItem === item.href ? "scale-x-100" : "scale-x-0"
              )} />
            </a>
          ))}
        </div>

        {/* CTA Button - Right */}
        <div className="hidden md:block shrink-0">
          <Button
            onClick={() => {
              document.querySelector("#kontak")?.scrollIntoView({ behavior: "smooth" });
            }}
            className={cn(
              "font-bold text-xs px-5 py-2.5 h-auto rounded-lg transition-all",
              isScrolled
                ? "bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20"
                : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20"
            )}
          >
            Hubungi Kami
          </Button>
        </div>
      </div>
    </nav>
  );
}
