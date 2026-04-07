import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface ProjectCategory {
  id: number;
  name: string;
  slug: string;
  order: number;
}

export function useProjectCategories() {
  return useQuery<ProjectCategory[]>({
    queryKey: ["admin", "project-categories"],
    queryFn: async () => {
      const res = await fetch("/api/admin/project-categories");
      if (!res.ok) throw new Error("Gagal mengambil kategori proyek");
      return res.json();
    }
  });
}

export function useCreateProjectCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<ProjectCategory>) => {
      const res = await fetch("/api/admin/project-categories", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal membuat kategori proyek");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "project-categories"] });
      toast.success("Kategori proyek berhasil dibuat");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal membuat kategori proyek");
    },
  });
}

export function useUpdateProjectCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<ProjectCategory> }) => {
      const res = await fetch(`/api/admin/project-categories/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal memperbarui kategori proyek");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "project-categories"] });
      toast.success("Kategori proyek berhasil diperbarui");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal memperbarui kategori proyek");
    },
  });
}

export function useDeleteProjectCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/project-categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal menghapus kategori proyek");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "project-categories"] });
      toast.success("Kategori proyek berhasil dihapus");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menghapus kategori proyek");
    },
  });
}
