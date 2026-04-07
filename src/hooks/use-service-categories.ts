import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface ServiceCategory {
  id: number;
  name: string;
  slug: string;
  order: number;
}

export function useServiceCategories() {
  return useQuery<ServiceCategory[]>({
    queryKey: ["admin", "service-categories"],
    queryFn: async () => {
      const res = await fetch("/api/admin/service-categories");
      if (!res.ok) throw new Error("Gagal mengambil kategori layanan");
      return res.json();
    }
  });
}

export function useCreateServiceCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<ServiceCategory>) => {
      const res = await fetch("/api/admin/service-categories", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal membuat kategori layanan");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "service-categories"] });
      toast.success("Kategori layanan berhasil dibuat");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal membuat kategori layanan");
    },
  });
}

export function useUpdateServiceCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<ServiceCategory> }) => {
      const res = await fetch(`/api/admin/service-categories/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal memperbarui kategori layanan");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "service-categories"] });
      toast.success("Kategori layanan berhasil diperbarui");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal memperbarui kategori layanan");
    },
  });
}

export function useDeleteServiceCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/service-categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal menghapus kategori layanan");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "service-categories"] });
      toast.success("Kategori layanan berhasil dihapus");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menghapus kategori layanan");
    },
  });
}
