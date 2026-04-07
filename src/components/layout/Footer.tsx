"use client";

import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { SOCIAL_PLATFORMS } from "@/constants/socials";

import { siteConfig } from "@/config/site-config";

export default function Footer({ configs }: { configs?: any[] }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getConfig = (key: string) => configs?.find(c => c.configKey === key)?.configValue;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal berlangganan");

      toast.success(data.message);
      setEmail("");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <footer className="bg-white w-full pt-28 pb-16 border-t border-outline/30">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          <div className="md:col-span-5 space-y-8">
            <div className="text-3xl font-extrabold text-on-surface tracking-tight">
              {getConfig("siteName") || siteConfig.name}<span className="text-primary">.</span>
            </div>
            <p className="text-on-surface-variant text-base leading-relaxed max-w-sm font-medium">
              {getConfig("siteDescription") || siteConfig.description}
            </p>
            <div className="flex gap-4">
              {SOCIAL_PLATFORMS.map((platform, idx) => {
                let href = getConfig(platform.key) || (siteConfig.links as any)[platform.key];
                if (!href) return null;

                // Auto-format WhatsApp number to Link
                if (platform.key === "whatsappNumber" && !href.startsWith("http")) {
                  // Remove non-digit characters and leadings 0
                  const cleanNumber = href.replace(/\D/g, "").replace(/^0/, "62");
                  href = `https://wa.me/${cleanNumber}`;
                }

                return (
                  <Link
                    key={idx}
                    href={href}
                    aria-label={platform.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl border border-outline/50 hover:border-primary hover:text-primary hover:bg-primary/5 flex items-center justify-center transition-all duration-300 text-on-surface-variant"
                  >
                    {platform.icon}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <h4 className="text-on-surface font-bold text-xs uppercase tracking-[0.2em] mb-8">Keahlian</h4>
              <ul className="space-y-5 text-on-surface-variant text-sm font-medium">
                {siteConfig.footerNav.expertise.map((item) => (
                  <li key={item.label}><Link className="hover:text-primary transition-colors" href={item.href}>{item.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-on-surface font-bold text-xs uppercase tracking-[0.2em] mb-8">Perusahaan</h4>
              <ul className="space-y-5 text-on-surface-variant text-sm font-medium">
                {siteConfig.footerNav.company.map((item) => (
                  <li key={item.label}><Link className="hover:text-primary transition-colors" href={item.href}>{item.label}</Link></li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-on-surface font-bold text-xs uppercase tracking-[0.2em] mb-8">Buletin</h4>
              <p className="text-on-surface-variant text-sm mb-5 leading-relaxed font-medium">Dapatkan wawasan teknologi terbaru langsung ke email Anda.</p>
              <form onSubmit={handleSubmit} className="relative group">
                <input
                  type="email"
                  value={email}
                  disabled={isLoading}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Alamat Email"
                  className="w-full bg-slate-50 border border-outline/30 rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
                  required
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-50 group shadow-lg shadow-primary/20"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-outline/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-surface-variant text-sm font-medium">
            {getConfig("footerText") || siteConfig.footerText}
          </p>
          <div className="flex gap-8">
            <Link className="text-on-surface-variant hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors" href="#">Kebijakan Privasi</Link>
            <Link className="text-on-surface-variant hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors" href="#">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
