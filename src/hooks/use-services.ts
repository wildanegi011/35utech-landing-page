import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
  categoryId: number;
  isPublished: boolean;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}

export function useServices() {
  return useQuery<Service[]>({
    queryKey: ["admin", "services"],
    queryFn: async () => {
      const res = await fetch("/api/admin/services");
      if (!res.ok) throw new Error("Gagal mengambil data layanan");
      return res.json();
    },
  });
}

export function useServiceCategories() {
  return useQuery<any[]>({
    queryKey: ["admin", "service-categories"],
    queryFn: async () => {
      const res = await fetch("/api/admin/service-categories");
      if (!res.ok) throw new Error("Gagal mengambil kategori layanan");
      return res.json();
    }
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Service>) => {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Gagal membuat layanan");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "services"] });
      toast.success("Layanan berhasil dibuat");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal membuat layanan");
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Service> }) => {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Gagal memperbarui layanan");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "services"] });
      toast.success("Layanan berhasil diperbarui");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal memperbarui layanan");
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal menghapus layanan");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "services"] });
      toast.success("Layanan berhasil dihapus");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menghapus layanan");
    },
  });
}
