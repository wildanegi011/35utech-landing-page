"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Layers
} from "lucide-react";
import {
  useServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
} from "@/hooks/use-services";
import {
  useServiceCategories,
  useCreateServiceCategory,
  useUpdateServiceCategory,
  useDeleteServiceCategory,
} from "@/hooks/use-service-categories";
import { CategoryManagerModal } from "@/components/admin/modals/CategoryManagerModal";
import { DataTable } from "@/components/admin/DataTable";
import { ServiceForm } from "@/components/admin/forms/ServiceForm";
import { AdminFormModal } from "@/components/admin/modals/AdminFormModal";
import { ConfirmModal } from "@/components/admin/modals/ConfirmModal";
import { PageHeader } from "@/components/admin/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTableFilter } from "@/components/admin/DataTableFilter";
import { getColumns } from "./columns";

export default function ServicesAdmin() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [itemToDelete, setItemToDelete] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: servicesData, isLoading, error } = useServices();
  const { data: categoriesData } = useServiceCategories();
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const deleteMutation = useDeleteService();

  const createCategoryMutation = useCreateServiceCategory();
  const updateCategoryMutation = useUpdateServiceCategory();
  const deleteCategoryMutation = useDeleteServiceCategory();

  const columns = getColumns({
    onEdit: (service) => {
      setEditingService(service);
      setIsModalOpen(true);
    },
    onDelete: (service) => {
      setItemToDelete(service);
      setIsDeleteModalOpen(true);
    },
    onToggleVisibility: (service, isPublished) => {
      updateMutation.mutate({ id: service.id, data: { isPublished } });
    }
  });

  const handleCreate = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const filteredServices = (servicesData || []).filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === "all" ? true :
                         statusFilter === "published" ? s.isPublished === true :
                         s.isPublished === false;
                         
    const matchesCategory = categoryFilter === "all" ? true :
                           s.categoryId.toString() === categoryFilter;

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
      if (editingService) {
        await updateMutation.mutateAsync({ id: editingService.id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      setIsModalOpen(false);
    } catch (err) { }
  };

  return (
    <div className="space-y-6 font-sans pb-12">
      <PageHeader
        title="Manajemen Layanan"
        description="Kelola pilar keahlian strategis yang Anda tawarkan kepada klien agar tetap relevan."
        icon={Layers}
      />

      {/* Admin Form Modal */}
      <AdminFormModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={editingService ? "Edit Layanan" : "Tambah Layanan Baru"}
        description="Perbarui detail penawaran strategis Anda untuk dipublikasikan di website."
        badge="Editor Layanan"
      >
        <ServiceForm
          initialData={editingService}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          loading={createMutation.isPending || updateMutation.isPending}
          categories={categoriesData?.map((cat: any) => ({
            label: cat.name,
            value: cat.id.toString(),
          })) || []}
        />
      </AdminFormModal>

      {/* Category Manager Modal */}
      <CategoryManagerModal
        isOpen={isCategoryModalOpen}
        onOpenChange={setIsCategoryModalOpen}
        title="Kategori Layanan"
        description="Kelola klasifikasi jasa dan bidang keahlian perusahaan."
        useDataHook={useServiceCategories}
        useCreateHook={useCreateServiceCategory}
        useUpdateHook={useUpdateServiceCategory}
        useDeleteHook={useDeleteServiceCategory}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        title="Hapus Layanan"
        description={`Apakah Anda yakin ingin menghapus layanan "${itemToDelete?.title}"? Tindakan ini tidak dapat dibatalkan.`}
      />

      {/* Table Section */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Cari layanan..."
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
              ...(categoriesData?.map((cat: any) => ({
                label: cat.name,
                value: cat.id.toString(),
              })) || []),
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
            className="h-12 px-6 rounded-xl bg-primary hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] shadow-[0_4px_12px_-4_rgba(37,99,235,0.4)] transition-all flex items-center shrink-0"
          >
            <Plus className="w-4 h-4 mr-2.5 stroke-3" />
            Layanan Baru
          </Button>
        </div>

        {isLoading ? (
          <div className="h-64 flex flex-col items-center justify-center bg-white rounded-[24px] border border-slate-100 shadow-sm gap-4">
            <div className="w-10 h-10 border-4 border-blue-50 border-t-primary rounded-full animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Menghubungkan Database...</p>
          </div>
        ) : error ? (
          <div className="h-64 flex flex-col items-center justify-center bg-red-50/30 rounded-[24px] border border-red-100 shadow-sm gap-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-red-500">Gagal Memuat Data</p>
          </div>
        ) : (
          <DataTable columns={columns} data={filteredServices} pageSize={5} />
        )}
      </div>
    </div>
  );
}
