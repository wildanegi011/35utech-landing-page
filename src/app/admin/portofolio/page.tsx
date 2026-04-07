"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Briefcase,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
} from "@/hooks/use-projects";
import {
  useProjectCategories,
  useCreateProjectCategory,
  useUpdateProjectCategory,
  useDeleteProjectCategory
} from "@/hooks/use-project-categories";
import { CategoryManagerModal } from "@/components/admin/modals/CategoryManagerModal";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { ProjectForm } from "@/components/admin/forms/ProjectForm";
import { AdminFormModal } from "@/components/admin/modals/AdminFormModal";
import { ConfirmModal } from "@/components/admin/modals/ConfirmModal";
import { ImagePreviewModal } from "@/components/admin/modals/ImagePreviewModal";
import { Project } from "@/data/portfolio";
import { getColumns } from "./columns";
import { DataTableFilter } from "@/components/admin/DataTableFilter";

export default function PortfolioAdmin() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Project | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  const { data: projectsData, isLoading, error } = useProjects();
  const { data: categoriesData } = useProjectCategories();
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();

  const createCategoryMutation = useCreateProjectCategory();
  const updateCategoryMutation = useUpdateProjectCategory();
  const deleteCategoryMutation = useDeleteProjectCategory();

  const handleCreate = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (project: Project) => {
    setItemToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const handlePreview = (project: Project) => {
    setPreviewProject(project);
    setIsPreviewModalOpen(true);
  };

  const handleToggleVisibility = async (project: Project, isPublished: boolean) => {
    try {
      await updateMutation.mutateAsync({ 
        id: project.id, 
        data: { isPublished } 
      });
    } catch (err) {
      // toast handled in hook
    }
  };

  const columns = getColumns({
    onEdit: handleEdit,
    onDelete: handleDeleteClick,
    onPreview: handlePreview,
    onToggleVisibility: handleToggleVisibility
  });

  const filteredProjects = (projectsData || []).filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                         p.client.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === "all" ? true : 
                         statusFilter === "published" ? p.isPublished === true : 
                         p.isPublished === false;
                         
    const matchesCategory = categoryFilter === "all" ? true : 
                           p.categoryId.toString() === categoryFilter || p.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteMutation.mutateAsync(itemToDelete.id);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (err) {
      // toast handled in hook
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingProject) {
        await updateMutation.mutateAsync({ id: editingProject.id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      setIsModalOpen(false);
    } catch (err) {
      // toast handled in hook
    }
  };

  return (
    <div className="space-y-6 font-sans pb-12">
      <PageHeader
        title="Manajemen Portofolio"
        description="Overview and strategic management of active development cycles."
        icon={Briefcase}
      />

      {/* Admin Form Modal */}
      <AdminFormModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={editingProject ? "Edit Proyek" : "Tambah Proyek Baru"}
        description="Isi detail proyek dengan lengkap untuk publikasi di halaman portofolio utama."
        badge="Editor Portofolio"
      >
        <ProjectForm
          initialData={editingProject || undefined}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          loading={createMutation.isPending || updateMutation.isPending}
        />
      </AdminFormModal>

      {/* Category Manager Modal */}
      <CategoryManagerModal
        isOpen={isCategoryModalOpen}
        onOpenChange={setIsCategoryModalOpen}
        title="Kategori Proyek"
        description="Kelola klasifikasi bidang industri dan jenis proyek."
        useDataHook={useProjectCategories}
        useCreateHook={useCreateProjectCategory}
        useUpdateHook={useUpdateProjectCategory}
        useDeleteHook={useDeleteProjectCategory}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        title="Hapus Proyek"
        description={`Apakah Anda yakin ingin menghapus proyek "${itemToDelete?.title}"? Tindakan ini tidak dapat dibatalkan.`}
        isLoading={deleteMutation.isPending}
      />

      <ImagePreviewModal
        project={previewProject}
        isOpen={isPreviewModalOpen}
        onOpenChange={setIsPreviewModalOpen}
      />

      {/* Table Section */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Cari proyek..."
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
            className="h-12 px-6 rounded-xl bg-primary hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] shadow-[0_4px_12px_-4px_rgba(37,99,235,0.4)] transition-all flex items-center shrink-0"
          >
            <Plus className="w-4 h-4 mr-2.5 stroke-3" />
            Proyek Baru
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
            <Button onClick={() => window.location.reload()} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">Coba Lagi</Button>
          </div>
        ) : (
          <DataTable columns={columns} data={filteredProjects} pageSize={5} />
        )}
      </div>
    </div>
  );
}
