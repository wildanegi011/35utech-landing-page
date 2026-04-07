import { ColumnDef } from "@tanstack/react-table";
import { Service } from "@/hooks/use-services";
import {
  Code2,
  Layout,
  Zap,
  Shield,
  Cpu,
  BarChart3,
  Globe2,
  Smartphone,
  Search,
  Mail,
  MessageSquare,
  Monitor,
  Briefcase,
  Layers,
  Settings,
  Activity,
  HardDrive,
  Cloud,
  Edit2,
  Trash2,
  Globe,
  EyeOff,
  MoreHorizontal
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const IconMap = {
  Code2: Code2,
  Layout: Layout,
  Zap: Zap,
  Shield: Shield,
  Cpu: Cpu,
  BarChart3: BarChart3,
  Globe2: Globe2,
  Smartphone: Smartphone,
  Search: Search,
  Mail: Mail,
  MessageSquare: MessageSquare,
  Monitor: Monitor,
  Briefcase: Briefcase,
  Layers: Layers,
  Settings: Settings,
  Activity: Activity,
  HardDrive: HardDrive,
  Cloud: Cloud,
};

interface ColumnProps {
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
  onToggleVisibility: (service: Service, isPublished: boolean) => void;
}

export const getColumns = ({ onEdit, onDelete, onToggleVisibility }: ColumnProps): ColumnDef<Service>[] => [
  {
    accessorKey: "title",
    header: "Ikon & Layanan",
    cell: ({ row }) => {
      const service = row.original;
      const Icon = IconMap[service.icon as keyof typeof IconMap] || Code2;
      return (
        <div className="flex items-center gap-6 group/row">
          <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-primary shadow-[0_8px_16px_-4px_rgba(37,99,235,0.1)] group-hover/row:scale-110 transition-transform duration-500">
            <Icon className="w-8 h-8 stroke-[2.5]" />
          </div>
          <div className="space-y-1.5 text-left">
            <p className="font-extrabold text-slate-900 text-base tracking-tight leading-none">{service.title}</p>
            <Badge variant="outline" className="rounded-full bg-slate-50 border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 py-0.5">
              {service.category?.name || "Uncategorized"}
            </Badge>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Deskripsi Strategis",
    cell: ({ row }) => (
      <p className="text-xs font-bold text-slate-500/70 max-w-sm leading-relaxed  line-clamp-2">
        {row.getValue("description")}
      </p>
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
      const service = row.original;
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
              <DropdownMenuItem
                onClick={() => onEdit(service)}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[11px] font-bold text-slate-600 hover:text-primary hover:bg-blue-50/50 cursor-pointer transition-colors outline-none"
              >
                <Edit2 className="w-3.5 h-3.5 stroke-[2.5]" />
                UBAH DATA
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => onToggleVisibility(service, !service.isPublished)}
                className={cn(
                  "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[11px] font-bold transition-colors cursor-pointer outline-none",
                  service.isPublished
                    ? "text-amber-600 hover:bg-amber-50/50"
                    : "text-emerald-600 hover:bg-emerald-50/50"
                )}
              >
                {service.isPublished ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5 stroke-[2.5]" />
                    UNPUBLISH LAYANAN
                  </>
                ) : (
                  <>
                    <Globe className="w-3.5 h-3.5 stroke-[2.5]" />
                    PUBLISH LAYANAN
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1.5 bg-slate-100" />
              <DropdownMenuItem
                onClick={() => onDelete(service)}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[11px] font-bold text-red-500 hover:text-red-600 hover:bg-red-50/50 cursor-pointer transition-colors outline-none"
              >
                <Trash2 className="w-3.5 h-3.5 stroke-[2.5]" />
                HAPUS LAYANAN
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
