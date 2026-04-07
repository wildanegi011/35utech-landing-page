import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface AchievementCategory {
  id: number;
  name: string;
  slug: string;
  order: number;
}

export function useAchievementCategories() {
  return useQuery<AchievementCategory[]>({
    queryKey: ["admin", "achievement-categories"],
    queryFn: async () => {
      const res = await fetch("/api/admin/achievement-categories");
      if (!res.ok) throw new Error("Gagal mengambil kategori prestasi");
      return res.json();
    }
  });
}

export function useCreateAchievementCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<AchievementCategory>) => {
      const res = await fetch("/api/admin/achievement-categories", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Gagal membuat kategori prestasi");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "achievement-categories"] });
      toast.success("Kategori prestasi berhasil dibuat");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal membuat kategori prestasi");
    },
  });
}

export function useUpdateAchievementCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<AchievementCategory> }) => {
      const res = await fetch(`/api/admin/achievement-categories/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal memperbarui kategori");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "achievement-categories"] });
      toast.success("Kategori berhasil diperbarui");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal memperbarui kategori");
    },
  });
}

export function useDeleteAchievementCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/achievement-categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal menghapus kategori");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "achievement-categories"] });
      toast.success("Kategori berhasil dihapus");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menghapus kategori");
    },
  });
}
