"use client";

import React, { useEffect, useState } from "react";
import { Mail, Calendar, Trash2, Search, Loader2, UserPlus, Download } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { DataTable } from "@/components/admin/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { ConfirmModal } from "@/components/admin/modals/ConfirmModal";

interface Subscriber {
  id: number;
  email: string;
  createdAt: string;
}

export default function NewsletterPage() {
  const [isMounted, setIsMounted] = useState(false);
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: subscribers, isLoading } = useQuery<Subscriber[]>({
    queryKey: ["admin", "newsletter"],
    queryFn: async () => {
      const res = await fetch("/api/admin/newsletter");
      if (!res.ok) throw new Error("Gagal mengambil data");
      return res.json();
    },
    enabled: isMounted,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/newsletter?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal menghapus pelanggan");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "newsletter"] });
      toast.success("Pelanggan berhasil dihapus");
      setIsDeleteDialogOpen(false);
      setSelectedId(null);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const columns: ColumnDef<Subscriber>[] = [
    {
      accessorKey: "email",
      header: "Email Anggota",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-500">
            <Mail className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-700 tracking-tight">{row.original.email}</span>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Tanggal Daftar",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-slate-500 font-medium">
          <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
          {row.original.createdAt ? format(new Date(row.original.createdAt), "dd MMM yyyy, HH:mm", { locale: localeId }) : "-"}
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Aksi</div>,
      cell: ({ row }) => (
        <div className="text-right">
          <Button
            onClick={() => {
              setSelectedId(row.original.id);
              setIsDeleteDialogOpen(true);
            }}
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const filteredSubscribers = subscribers?.filter((s) =>
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyAllEmails = () => {
    if (!subscribers) return;
    const emails = subscribers.map((s) => s.email).join(", ");
    navigator.clipboard.writeText(emails);
    toast.success("Semua email berhasil disalin ke clipboard");
  };

  if (!isMounted || isLoading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Memuat Data Pelanggan...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <PageHeader
          title="Manajemen Buletin"
          description="Kelola daftar pelanggan yang tertarik menerima informasi berkala dari 35utech."
          icon={Mail}
        />
        
        <div className="flex items-center gap-3">
          <Button
            onClick={copyAllEmails}
            variant="outline"
            className="h-12 px-6 rounded-xl border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-[10px] uppercase tracking-[0.15em] gap-2 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Salin Semua Email
          </Button>
        </div>
      </div>

      {/* High-Density Stats & Search Bar */}
      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        <div className="flex-1 relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-slate-400 group-focus-within:text-primary transition-colors">
            <Search className="w-5 h-5" strokeWidth={2.5} />
          </div>
          <Input
            placeholder="Cari email anggota atau domain..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-14 h-16 bg-white border-slate-200 focus-visible:ring-primary/20 rounded-[22px] text-sm font-bold transition-all shadow-sm placeholder:text-slate-400 placeholder:font-medium"
          />
        </div>
        
        <div className="bg-white border border-slate-100 rounded-[22px] px-8 py-3 flex items-center gap-5 shadow-sm min-w-[240px]">
          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-primary border border-blue-100 transition-transform group-hover:scale-105">
            <UserPlus className="w-5.5 h-5.5" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1.5">Total Pelanggan</p>
            <p className="text-2xl font-black text-slate-900 leading-none tracking-tight">{subscribers?.length || 0}</p>
          </div>
        </div>
      </div>

      {/* Premium DataTable Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <DataTable 
          columns={columns} 
          data={filteredSubscribers || []} 
          pageSize={10}
        />
      </motion.div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={() => selectedId && deleteMutation.mutate(selectedId)}
        isLoading={deleteMutation.isPending}
        title="Hapus Pelanggan"
        description="Apakah Anda yakin ingin menghapus pelanggan ini dari daftar buletin? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
}
