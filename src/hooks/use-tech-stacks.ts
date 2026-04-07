import { useQuery } from "@tanstack/react-query";

export interface TechStack {
  id: number;
  name: string;
  icon: string;
}

export function useTechStacks() {
  return useQuery<TechStack[]>({
    queryKey: ["tech-stacks"],
    queryFn: async () => {
      const res = await fetch("/api/admin/tech-stack");
      if (!res.ok) throw new Error("Failed to fetch tech stacks");
      return res.json();
    },
  });
}
