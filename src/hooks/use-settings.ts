import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface SiteConfig {
  id: number;
  configKey: string;
  configLabel: string;
  configValue: string | null;
  configType: string;
  configGroup: string;
  configOptions: string | null;
  isActive: boolean;
  isDisabled: boolean;
  updatedAt: string | null;
}

export function useSettings() {
  return useQuery<SiteConfig[]>({
    queryKey: ["admin", "settings"],
    queryFn: async () => {
      const res = await fetch("/api/admin/settings");
      if (!res.ok) throw new Error("Gagal mengambil konfigurasi");
      return res.json();
    },
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { configKey: string, configValue: string | null }[]) => {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal memperbarui konfigurasi");
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "settings"] });
      toast.success("Konfigurasi berhasil diperbarui");
    },
    onError: (error: any) => {
      toast.error(error.message || "Terjadi kesalahan sistem");
    },
  });
}
