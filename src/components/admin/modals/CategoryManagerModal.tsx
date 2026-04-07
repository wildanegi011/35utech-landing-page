"use client";

import React, { useState } from "react";
import {
  X,
  Plus,
  Trash2,
  Tag,
  Loader2,
  AlertCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface CategoryManagerModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  useDataHook: () => { data?: any[]; isLoading: boolean } | any;
  useCreateHook: () => { mutateAsync: (data: any) => Promise<any>; isPending: boolean } | any;
  useUpdateHook: () => { mutateAsync: (params: { id: number; data: any }) => Promise<any>; isPending: boolean; variables?: any } | any;
  useDeleteHook: () => { mutateAsync: (id: number) => Promise<any>; isPending: boolean; variables?: any } | any;
}

export function CategoryManagerModal({
  isOpen,
  onOpenChange,
  title,
  description,
  useDataHook,
  useCreateHook,
  useUpdateHook,
  useDeleteHook
}: CategoryManagerModalProps) {
  const [newCategory, setNewCategory] = useState("");
  const [newOrder, setNewOrder] = useState<number>(0);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingOrder, setEditingOrder] = useState<number>(0);

  const { data: categories = [], isLoading } = useDataHook();
  const createMutation = useCreateHook();
  const updateMutation = useUpdateHook();
  const deleteMutation = useDeleteHook();

  const handleCreate = async () => {
    if (!newCategory.trim()) return;
    try {
      await createMutation.mutateAsync({ name: newCategory, order: newOrder });
      setNewCategory("");
      setNewOrder(0);
    } catch (err) { }
  };

  const handleUpdate = async (id: number) => {
    if (!editingName.trim()) return;
    try {
      await updateMutation.mutateAsync({ id, data: { name: editingName, order: editingOrder } });
      setEditingId(null);
    } catch (err) { }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (err) { }
  };

  const startEditing = (id: number, name: string, order: number) => {
    setEditingId(id);
    setEditingName(name);
    setEditingOrder(order);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white rounded-3xl border-none shadow-2xl p-0 overflow-hidden">
        <DialogHeader className="p-8 pb-4 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/10">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-black text-slate-900 uppercase tracking-tighter">{title}</DialogTitle>
              <DialogDescription className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="p-8 pt-4 space-y-6">
          {/* Create New Category */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <Input
                placeholder="Tambah Kategori Baru..."
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="pl-10 h-11 bg-slate-50 border-slate-200 focus-visible:ring-primary/20 rounded-xl text-sm font-medium"
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              />
            </div>
            <div className="w-20">
              <Input
                type="number"
                placeholder="Urutan"
                value={newOrder}
                onChange={(e) => setNewOrder(parseInt(e.target.value) || 0)}
                className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-primary/20 rounded-xl text-sm font-medium text-center"
              />
            </div>
            <Button
              onClick={handleCreate}
              disabled={createMutation.isPending || !newCategory.trim()}
              className="h-11 px-4 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20 transition-all font-bold"
            >
              {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            </Button>
          </div>

          {/* Categories List */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Daftar Kategori</h4>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              </div>
            ) : categories.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                <AlertCircle className="w-6 h-6 text-slate-300 mb-2" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Belum ada kategori</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {categories.map((cat: any) => (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100 hover:border-primary/20 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0" />
                      {editingId === cat.id ? (
                        <div className="flex gap-2 flex-1">
                          <Input
                            autoFocus
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleUpdate(cat.id);
                              if (e.key === "Escape") setEditingId(null);
                            }}
                            className="h-8 py-0 px-2 bg-slate-50 border-slate-200 focus-visible:ring-primary/20 rounded-lg text-sm font-bold"
                          />
                          <Input
                            type="number"
                            value={editingOrder}
                            onChange={(e) => setEditingOrder(parseInt(e.target.value) || 0)}
                            className="h-8 w-16 py-0 px-2 bg-slate-50 border-slate-200 focus-visible:ring-primary/20 rounded-lg text-sm font-bold text-center"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-sm font-bold text-slate-700 truncate">{cat.name}</span>
                          <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-slate-50 text-slate-400 font-bold border-slate-100">
                            #{cat.order}
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1 ml-2">
                      {editingId === cat.id ? (
                        <>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleUpdate(cat.id)}
                            disabled={updateMutation.isPending || !editingName.trim()}
                            className="w-8 h-8 rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                          >
                            {updateMutation.isPending && updateMutation.variables?.id === cat.id ?
                              <Loader2 className="w-3.5 h-3.5 animate-spin" /> :
                              <Plus className="w-3.5 h-3.5 stroke-[3]" />
                            }
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setEditingId(null)}
                            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-500 hover:bg-slate-50"
                          >
                            <X className="w-3.5 h-3.5 stroke-[3]" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => startEditing(cat.id, cat.name, cat.order)}
                            className="w-8 h-8 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-50 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Tag className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(cat.id)}
                            disabled={deleteMutation.isPending}
                            className="w-8 h-8 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            {deleteMutation.isPending && deleteMutation.variables === cat.id ?
                              <Loader2 className="w-3.5 h-3.5 animate-spin" /> :
                              <Trash2 className="w-3.5 h-3.5" />
                            }
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-50/50 px-8 py-4 flex justify-end">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 rounded-xl"
          >
            Selesai
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
