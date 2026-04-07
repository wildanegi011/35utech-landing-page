import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Project } from "@/data/portfolio";
import { toast } from "sonner";

const API_URL = "/api/admin/portofolio";

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Gagal mengambil data proyek");
      const data = await res.json();
      
      // Transform relational data to match the expected Project type
      return data.map((item: any) => ({
        ...item,
        category: item.category?.name || "Uncategorized",
        status: item.status?.name || item.status || "Unknown",
        gallery: item.gallery?.map((g: any) => g.imageUrl) || [],
        techStack: item.techStack || [],
        features: item.features?.map((f: any) => f.name) || [],
      }));
    }
  });
}

export function useProject(id: string | number | undefined) {
  return useQuery<Project>({
    queryKey: ["projects", id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error("Gagal mengambil data proyek");
      return res.json();
    },
    enabled: !!id,
  });
}

export function useProjectCategories() {
  return useQuery<any[]>({
    queryKey: ["admin", "project-categories"],
    queryFn: async () => {
      const res = await fetch("/api/admin/project-categories");
      if (!res.ok) throw new Error("Gagal mengambil kategori proyek");
      return res.json();
    }
  });
}

export function useProjectStatuses() {
  return useQuery<any[]>({
    queryKey: ["project-statuses"],
    queryFn: async () => {
      const res = await fetch("/api/admin/projects/statuses");
      if (!res.ok) throw new Error("Gagal mengambil status");
      return res.json();
    }
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Project> & { categoryId: number; statusId: number }) => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Gagal membuat proyek");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Proyek berhasil dibuat");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Project> & { categoryId?: number; statusId?: number } }) => {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Gagal memperbarui proyek");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Proyek berhasil diperbarui");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Gagal menghapus proyek");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Proyek berhasil dihapus");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
}
