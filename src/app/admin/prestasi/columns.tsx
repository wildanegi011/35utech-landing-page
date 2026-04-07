import { ColumnDef } from "@tanstack/react-table";
import { Achievement } from "@/hooks/use-achievements";
import {
  MoreHorizontal,
  Globe,
  EyeOff,
  Award,
  Globe2,
  MapPin,
  Edit2,
  Trash2,
  Images,
} from "lucide-react";
import SafeImage from "@/components/ui/safe-image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface ColumnProps {
  onEdit: (achievement: Achievement) => void;
  onDelete: (achievement: Achievement) => void;
  onToggleVisibility: (achievement: Achievement, isPublished: boolean) => void;
}

export const getColumns = ({ onEdit, onDelete, onToggleVisibility }: ColumnProps): ColumnDef<Achievement>[] => [
  {
    accessorKey: "title",
    header: "Pencapaian",
    cell: ({ row }) => {
      const achievement = row.original;
      return (
        <div className="flex items-center gap-6 group/row text-left">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-900 shrink-0 relative flex items-center justify-center shadow-lg group-hover/row:scale-110 transition-transform duration-500">
            <SafeImage src={achievement.image} alt={achievement.title} fill className="object-cover opacity-60" />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 to-transparent" />
          </div>
          <div>
            <p className="font-extrabold text-slate-900 text-base tracking-tight leading-tight mb-1.5">{achievement.title}</p>
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-primary/5 border border-primary/10">
                <p className="text-[9px] font-black text-primary uppercase tracking-widest">{achievement.year}</p>
              </div>
              <div className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-slate-50 border border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{achievement.scope}</p>
              </div>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "gallery",
    header: "Dokumentasi",
    cell: ({ row }) => {
      const gallery = row.original.gallery || [];
      const hasImages = gallery.length > 0;

      if (!hasImages) {
        return (
          <div className="flex items-center gap-2 text-slate-300">
            <Images className="w-4 h-4 opacity-40 shrink-0" />
            <span className="text-[9px] font-black uppercase tracking-widest leading-none italic">Kosong</span>
          </div>
        );
      }

      return (
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3 items-center group/images">
            {gallery.slice(0, 3).map((item: any, i: number) => (
              <div
                key={item.id}
                className={cn(
                  "relative w-8 h-8 rounded-lg overflow-hidden border-2 border-white shadow-sm transition-all duration-300 hover:scale-110",
                  i === 0 ? "z-30" : i === 1 ? "z-20 scale-90" : "z-10 scale-75"
                )}
              >
                <SafeImage src={item.imageUrl} alt={`Gallery ${i}`} fill className="object-cover" />
              </div>
            ))}
          </div>
          {gallery.length > 3 && (
            <div className="flex flex-col items-start leading-none gap-0.5 min-w-max">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">+{gallery.length - 3}</span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Deskripsi",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <p className="text-left text-wrap text-xs font-bold text-slate-500/70 max-w-[280px] leading-relaxed line-clamp-3 cursor-help hover:text-slate-600 transition-colors min-h-[3.6em]">
              {row.original.description}
            </p>
          </TooltipTrigger>
          <TooltipContent className="max-w-[300px] p-4 text-xs font-medium leading-relaxed bg-slate-900 text-white border-none shadow-2xl rounded-xl">
            {row.original.description}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "category",
    header: "Kategori",
    cell: ({ row }) => (
      <Badge variant="outline" className="rounded-full bg-white border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-widest px-3 py-1 shadow-sm">
        {row.original.category?.name || "Tanpa Kategori"}
      </Badge>
    ),
  },
  {
    accessorKey: "isPublished",
    header: "Status",
    cell: ({ row }) => {
      const isPublished = row.original.isPublished ?? false;
      return (
        <Badge
          variant="outline"
          className={cn(
            "rounded-full text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 border",
            isPublished
              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
              : "bg-slate-50 text-slate-400 border-slate-100"
          )}
        >
          {isPublished ? "PUBLISHED" : "UNPUBLISH"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => {
      const achievement = row.original;
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              className="h-8 w-8 inline-flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-slate-400 hover:text-primary transition-all active:scale-95 outline-none"
            >
              <span className="sr-only">Buka menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-1.5 rounded-xl border-slate-200 shadow-xl shadow-slate-200/50">
              <div className="px-2 py-1.5 mb-1.5 border-b border-slate-50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Opsi Manajemen</p>
              </div>
              <Link href={`/admin/prestasi/${achievement.id}`}>
                <DropdownMenuItem
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[11px] font-bold text-slate-600 hover:text-primary hover:bg-blue-50/50 cursor-pointer transition-colors outline-none"
                >
                  <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                  LIHAT DETAIL
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={() => onEdit(achievement)}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[11px] font-bold text-slate-600 hover:text-primary hover:bg-blue-50/50 cursor-pointer transition-colors outline-none"
              >
                <Edit2 className="w-3.5 h-3.5 stroke-[2.5]" />
                UBAH DETAIL
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => onToggleVisibility(achievement, !achievement.isPublished)}
                className={cn(
                  "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[11px] font-bold transition-colors cursor-pointer outline-none",
                  achievement.isPublished
                    ? "text-amber-600 hover:bg-amber-50/50"
                    : "text-emerald-600 hover:bg-emerald-50/50"
                )}
              >
                {achievement.isPublished ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5 stroke-[2.5]" />
                    UNPUBLISH PRESTASI
                  </>
                ) : (
                  <>
                    <Globe className="w-3.5 h-3.5 stroke-[2.5]" />
                    PUBLISH PRESTASI
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1.5 bg-slate-100" />
              <DropdownMenuItem
                onClick={() => onDelete(achievement)}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[11px] font-bold text-red-500 hover:text-red-600 hover:bg-red-50/50 cursor-pointer transition-colors outline-none"
              >
                <Trash2 className="w-3.5 h-3.5 stroke-[2.5]" />
                HAPUS PRESTASI
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
