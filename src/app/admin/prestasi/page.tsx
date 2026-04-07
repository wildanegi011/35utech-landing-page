"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Award,
  Layers,
} from "lucide-react";
import {
  useAchievements,
  useCreateAchievement,
  useUpdateAchievement,
  useDeleteAchievement,
} from "@/hooks/use-achievements";
import {
  useAchievementCategories,
  useCreateAchievementCategory,
  useUpdateAchievementCategory,
  useDeleteAchievementCategory
} from "@/hooks/use-achievement-categories";
import { AchievementForm } from "@/components/admin/forms/AchievementForm";
import { AdminFormModal } from "@/components/admin/modals/AdminFormModal";
import { ConfirmModal } from "@/components/admin/modals/ConfirmModal";
import { CategoryManagerModal } from "@/components/admin/modals/CategoryManagerModal";
import { DataTable } from "@/components/admin/DataTable";
import { PageHeader } from "@/components/admin/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTableFilter } from "@/components/admin/DataTableFilter";
import { getColumns } from "./columns";

export default function AchievementsAdmin() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<any>(null);
  const [itemToDelete, setItemToDelete] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: achievementsData, isLoading, error } = useAchievements();
  const { data: categoriesData = [] } = useAchievementCategories();
  const createMutation = useCreateAchievement();
  const updateMutation = useUpdateAchievement();
  const deleteMutation = useDeleteAchievement();

  const columns = getColumns({
    onEdit: (achievement) => {
      setEditingAchievement(achievement);
      setIsModalOpen(true);
    },
    onDelete: (achievement) => {
      setItemToDelete(achievement);
      setIsDeleteModalOpen(true);
    },
    onToggleVisibility: (achievement, isPublished) => {
      updateMutation.mutate({ id: achievement.id, data: { isPublished } });
    }
  });

  const handleCreate = () => {
    setEditingAchievement(null);
    setIsModalOpen(true);
  };

  const filteredAchievements = (achievementsData || []).filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category?.name.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" ? true :
      statusFilter === "published" ? a.isPublished === true :
        a.isPublished === false;

    const matchesCategory = categoryFilter === "all" ? true :
      a.categoryId.toString() === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteMutation.mutateAsync(itemToDelete.id);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (err) { }
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingAchievement) {
        await updateMutation.mutateAsync({ id: editingAchievement.id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      setIsModalOpen(false);
    } catch (err) { }
  };

  return (
    <div className="space-y-6 font-sans pb-12">
      <PageHeader
        title="Manajemen Prestasi"
        description="Catat dan kelola setiap pencapaian serta sertifikasi perusahaan untuk menjaga kredibilitas."
        icon={Award}
      />

      {/* Admin Form Modal */}
      <AdminFormModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={editingAchievement ? "Edit Prestasi" : "Catat Prestasi Baru"}
        description="Lengkapi detail penghargaan atau sertifikasi untuk ditampilkan di halaman publik."
        badge="Editor Prestasi"
      >
        <AchievementForm
          initialData={editingAchievement}
          categories={categoriesData}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          loading={createMutation.isPending || updateMutation.isPending}
        />
      </AdminFormModal>

      {/* Category Manager Modal */}
      <CategoryManagerModal
        isOpen={isCategoryModalOpen}
        onOpenChange={setIsCategoryModalOpen}
        title="Tipe Pencapaian"
        description="Kelola klasifikasi penghargaan dan sertifikasi perusahaan."
        useDataHook={useAchievementCategories}
        useCreateHook={useCreateAchievementCategory}
        useUpdateHook={useUpdateAchievementCategory}
        useDeleteHook={useDeleteAchievementCategory}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        title="Hapus Prestasi"
        description={`Apakah Anda yakin ingin menghapus "${itemToDelete?.title}"? Tindakan ini tidak dapat dibatalkan.`}
      />

      {/* Table Section */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Cari prestasi..."
              className="pl-11 h-12 bg-slate-100/50 border-transparent focus-visible:bg-white focus-visible:ring-primary/20 focus-visible:border-primary/30 rounded-lg text-sm font-medium transition-all shadow-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <DataTableFilter
            title="Semua Status"
            options={[
              { label: "Semua Status", value: "all" },
              { label: "Published", value: "published" },
              { label: "Draft", value: "draft" },
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
            className="w-[140px]"
          />

          <DataTableFilter
            title="Semua Kategori"
            options={[
              { label: "Semua Kategori", value: "all" },
              ...categoriesData.map((cat) => ({
                label: cat.name,
                value: cat.id.toString(),
              })),
            ]}
            value={categoryFilter}
            onChange={setCategoryFilter}
            className="w-[180px]"
          />

          <div className="flex-1 hidden sm:block" />

          <Button
            variant="outline"
            onClick={() => setIsCategoryModalOpen(true)}
            className="h-12 px-6 rounded-xl border-slate-200 text-slate-600 font-bold uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all flex items-center shrink-0"
          >
            <Layers className="w-4 h-4 mr-2.5 stroke-3 text-primary" />
            Kelola Kategori
          </Button>

          <Button
            onClick={handleCreate}
            className="h-12 px-6 rounded-xl bg-primary hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] shadow-[0_4px_12px_-4px_rgba(37,99,235,0.4)] transition-all flex items-center shrink-0"
          >
            <Plus className="w-4 h-4 mr-2.5 stroke-3" />
            Prestasi Baru
          </Button>
        </div>

        {isLoading ? (
          <div className="h-64 flex flex-col items-center justify-center bg-white rounded-[24px] border border-slate-100 shadow-sm gap-4">
            <div className="w-10 h-10 border-4 border-blue-50 border-t-primary rounded-full animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sinkronisasi Data...</p>
          </div>
        ) : error ? (
          <div className="h-64 flex flex-col items-center justify-center bg-red-50/30 rounded-[24px] border border-red-100 shadow-sm gap-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-red-500">Gagal Memuat Database</p>
          </div>
        ) : (
          <DataTable columns={columns} data={filteredAchievements} pageSize={5} />
        )}
      </div>

    </div>
  );
}
