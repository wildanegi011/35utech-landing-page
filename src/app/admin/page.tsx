"use client";

import React from "react";
import { 
  Briefcase, 
  Award, 
  Layers, 
  ArrowUpRight,
  Plus,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const STATS = [
  { label: "Total Portofolio", value: "12", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Layanan Aktif", value: "6", icon: Layers, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Total Prestasi", value: "8", icon: Award, color: "text-amber-600", bg: "bg-amber-50" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Ikhtisar Dashboard<span className="text-primary italic">.</span></h2>
          <p className="text-slate-500 font-bold text-sm">Kelola konten website Anda dengan efisien dari satu tempat.</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl px-6 py-5 h-auto shadow-lg shadow-primary/20 transition-all">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Proyek
          </Button>
          <Button variant="outline" className="rounded-xl px-6 py-5 h-auto font-bold border-slate-200 hover:bg-slate-100">
            Lihat Website
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATS.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-[32px] bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} shadow-inner`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <button className="p-2 rounded-lg hover:bg-slate-50 text-slate-400 group-hover:text-primary transition-colors">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-1">
              <p className="text-slate-500 font-black text-[10px] uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions / Recent Activity Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-[40px] bg-slate-900 text-white overflow-hidden relative">
          <div className="relative z-10 space-y-6">
            <h4 className="text-xl font-black uppercase tracking-tight">Ketik 'Update' Portofolio</h4>
            <p className="text-slate-400 font-medium text-sm leading-relaxed max-w-sm">
              Sistem telah mendeteksi 2 draf proyek baru yang belum dipublikasikan. Segera selesaikan untuk meningkatkan kredibilitas perusahaan.
            </p>
            <Button className="bg-white text-slate-900 hover:bg-slate-100 font-black rounded-xl px-8 uppercase text-xs h-12">
              Buka Draf
            </Button>
          </div>
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[120px] rounded-full -mr-20 -mt-20" />
        </div>

        <div className="p-8 rounded-[40px] bg-white border border-slate-200 space-y-6">
          <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Statistik Pengunjung</h4>
          <div className="h-32 flex items-end gap-2">
            {[40, 60, 45, 90, 65, 80, 50, 70, 95, 60].map((h, i) => (
              <div key={i} className="flex-1 bg-slate-100 rounded-t-lg transition-all hover:bg-primary" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span>Senin</span>
            <span>Minggu</span>
          </div>
        </div>
      </div>
    </div>
  );
}
