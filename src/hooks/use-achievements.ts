import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface Gallery {
  id: number;
  achievementId: number;
  imageUrl: string;
  order: number;
}

export interface Achievement {
  id: number;
  title: string;
  year: string;
  description: string;
  categoryId: number;
  scope: string; // "Lokal" | "Nasional"
  image: string;
  icon?: string;
  isPublished: boolean;
  gallery?: Gallery[];
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}

export function useAchievements() {
  return useQuery<Achievement[]>({
    queryKey: ["admin", "achievements"],
    queryFn: async () => {
      const res = await fetch("/api/admin/achievements");
      if (!res.ok) throw new Error("Gagal mengambil data prestasi");
      return res.json();
    },
  });
}

export function useAchievement(id: string | number) {
  return useQuery<Achievement>({
    queryKey: ["admin", "achievement", id],
    queryFn: async () => {
      const res = await fetch(`/api/admin/achievements/${id}`);
      if (!res.ok) throw new Error("Gagal mengambil detail prestasi");
      return res.json();
    },
    enabled: !!id,
  });
}

export function useCreateAchievement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Achievement>) => {
      const res = await fetch("/api/admin/achievements", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Gagal membuat prestasi");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "achievements"] });
      toast.success("Prestasi berhasil dibuat");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal membuat prestasi");
    },
  });
}

export function useUpdateAchievement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Achievement> }) => {
      const res = await fetch(`/api/admin/achievements/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Gagal memperbarui prestasi");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "achievements"] });
      toast.success("Prestasi berhasil diperbarui");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal memperbarui prestasi");
    },
  });
}

export function useDeleteAchievement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/achievements/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal menghapus prestasi");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "achievements"] });
      toast.success("Prestasi berhasil dihapus");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menghapus prestasi");
    },
  });
}
