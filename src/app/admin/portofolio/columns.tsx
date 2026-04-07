import { Project } from "@/data/portfolio";
import { ColumnDef } from "@tanstack/react-table";
import SafeImage from "@/components/ui/safe-image";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Eye, Edit2, Trash2, MoreHorizontal, Globe, EyeOff } from "lucide-react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface ColumnProps {
    onEdit: (project: Project) => void;
    onDelete: (project: Project) => void;
    onPreview: (project: Project) => void;
    onToggleVisibility: (project: Project, isPublished: boolean) => void;
}

const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
        case "sistem informasi": return "bg-blue-50 text-blue-600 border-blue-100";
        case "website": return "bg-emerald-50 text-emerald-600 border-emerald-100";
        case "mobile app": return "bg-purple-50 text-purple-600 border-purple-100";
        default: return "bg-slate-50 text-slate-500 border-slate-100";
    }
};

export const getColumns = ({ onEdit, onDelete, onPreview, onToggleVisibility }: ColumnProps): ColumnDef<Project>[] => [
    {
        accessorKey: "title",
        header: "Proyek",
        cell: ({ row }) => {
            const project = row.original;
            return (
                <div className="flex items-center gap-6 group/row">
                    <Link href={`/admin/portofolio/${project.id}`}>
                        <div
                            className="w-20 h-14 rounded-xl overflow-hidden bg-white border border-slate-100 shrink-0 relative shadow-sm group-hover/row:scale-105 transition-transform duration-500 cursor-pointer"
                        >
                            <SafeImage src={project.image} alt={project.title} fill className="object-cover" />
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center">
                                <Eye className="w-5 h-5 text-white drop-shadow-md" />
                            </div>
                        </div>
                    </Link>
                    <div>
                        <Link href={`/admin/portofolio/${project.id}`}>
                            <p className="font-extrabold text-slate-900 text-base tracking-tight leading-tight mb-1 hover:text-primary transition-colors cursor-pointer">{project.title}</p>
                        </Link>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100/50">SLUG</span>
                            <p className="text-[10px] font-bold text-slate-400 tracking-wider">/{project.slug}</p>
                        </div>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "client",
        header: "Klien & Tahun",
        cell: ({ row }) => {
            const project = row.original;
            return (
                <div className="space-y-1">
                    <p className="font-extrabold text-slate-700 text-sm tracking-tight capitalize">{project.client}</p>
                    <div className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100">
                        <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{project.year}</p>
                    </div>
                </div>
            );
        },
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
        accessorKey: "category",
        header: "Kategori",
        cell: ({ row }) => {
            const category = row.getValue("category") as string;
            return (
                <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline" className={`rounded-full text-[10px] font-black uppercase tracking-widest px-3 py-1 border ${getCategoryColor(category)}`}>
                        {category}
                    </Badge>
                </div>
            );
        },
    },
    {
        id: "actions",
        header: () => <div className="text-right">Aksi</div>,
        cell: ({ row }) => {
            const project = row.original;
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
                            <Link href={`/admin/portofolio/${project.id}`}>
                                <DropdownMenuItem
                                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[11px] font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 cursor-pointer transition-colors outline-none"
                                >
                                    <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
                                    LIHAT DETAIL
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem
                                onClick={() => onEdit(project)}
                                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[11px] font-bold text-slate-600 hover:text-primary hover:bg-blue-50/50 cursor-pointer transition-colors outline-none"
                            >
                                <Edit2 className="w-3.5 h-3.5 stroke-[2.5]" />
                                UBAH DATA
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => onToggleVisibility(project, !project.isPublished)}
                                className={cn(
                                    "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[11px] font-bold transition-colors cursor-pointer outline-none",
                                    project.isPublished
                                        ? "text-amber-600 hover:bg-amber-50/50"
                                        : "text-emerald-600 hover:bg-emerald-50/50"
                                )}
                            >
                                {project.isPublished ? (
                                    <>
                                        <EyeOff className="w-3.5 h-3.5 stroke-[2.5]" />
                                        UNPUBLISH PROYEK
                                    </>
                                ) : (
                                    <>
                                        <Globe className="w-3.5 h-3.5 stroke-[2.5]" />
                                        PUBLISH PROYEK
                                    </>
                                )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1.5 bg-slate-100" />
                            <DropdownMenuItem
                                onClick={() => onDelete(project)}
                                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[11px] font-bold text-red-500 hover:text-red-600 hover:bg-red-50/50 cursor-pointer transition-colors outline-none"
                            >
                                <Trash2 className="w-3.5 h-3.5 stroke-[2.5]" />
                                HAPUS PROYEK
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];
