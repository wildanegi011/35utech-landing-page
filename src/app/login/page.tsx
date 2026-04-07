import LoginForm from "@/components/auth/login-form";
import { ShieldCheck, ArrowLeft, Loader2, Mail, Lock, AlertCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | 35utech",
  description: "Masuk ke dashboard administrasi 35utech.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 selection:bg-primary/10">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-slate-100 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-sm relative z-10">
        {/* Logo and Brand Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-20 h-20 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-primary shadow-2xl shadow-primary/10 mb-8 relative group">
            <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] scale-90 group-hover:scale-110 transition-transform duration-500" />
            <ShieldCheck className="w-10 h-10 relative z-10" />
            <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-amber-400 opacity-50" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-6 bg-primary/30" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                Otoritas Akses
              </span>
              <div className="h-px w-6 bg-primary/30" />
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tighter uppercase leading-tight">
              selamat datang<span className="text-primary italic">.</span>
            </h1>

            <p className="text-[11px] font-bold text-slate-400 leading-relaxed max-w-[280px] mx-auto uppercase tracking-widest">
              Gunakan kredensial terenkripsi untuk mengelola <span className="text-slate-600">ekosistem 35utech.</span>
            </p>
          </div>
        </div>

        {/* Login Form Container */}
        <div className="relative group">
          {/* Subtle Glow Effect */}
          <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
          <div className="absolute inset-x-0 -bottom-px h-px bg-linear-to-r from-transparent via-slate-100 to-transparent" />

          <LoginForm />
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-[0.2em] transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Portal Publik
          </Link>
        </div>
      </div>

      {/* Micro Info Footer */}
      <div className="fixed bottom-8 text-center">
        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
          &copy; 2026 35utech Interactive Systems
          <span className="w-1 h-1 rounded-full bg-slate-200" />
          v2.4.0
        </p>
      </div>
    </div>
  );
}
