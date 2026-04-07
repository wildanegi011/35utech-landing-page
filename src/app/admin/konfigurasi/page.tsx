"use client";

import React, { useEffect, useMemo } from "react";
import {
  Settings,
  Globe,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Save,
  Loader2,
  Info,
  Link as LinkIcon,
  Layout,
  Share2
} from "lucide-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useSettings, useUpdateSettings, SiteConfig } from "@/hooks/use-settings";
import { PageHeader } from "@/components/admin/PageHeader";
import { ImageUpload } from "@/components/admin/forms/ImageUpload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
  FieldDescription
} from "@/components/ui/field";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Icon mapping based on Group Name
const GROUP_ICONS: Record<string, any> = {
  "Main": Globe,
  "Kontak": Phone,
  "Media Sosial": Share2,
  "Tampilan": Layout,
  "Default": Settings
};

const GROUP_COLORS: Record<string, string> = {
  "Main": "bg-blue-50 text-primary border-blue-100",
  "Kontak": "bg-orange-50 text-orange-600 border-orange-100",
  "Media Sosial": "bg-purple-50 text-purple-600 border-purple-100",
  "Tampilan": "bg-emerald-50 text-emerald-600 border-emerald-100",
  "Default": "bg-slate-50 text-slate-600 border-slate-100"
};

export default function KonfigurasiPage() {
  const { data: configs, isLoading } = useSettings();
  const updateMutation = useUpdateSettings();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isDirty }
  } = useForm<{ items: { configKey: string; configValue: string | null; label: string; group: string; type: string }[] }>({
    defaultValues: {
      items: []
    }
  });

  const { fields } = useFieldArray({
    control,
    name: "items"
  });

  useEffect(() => {
    if (configs) {
      reset({
        items: configs.map(c => ({
          configKey: c.configKey,
          configValue: c.configValue || "",
          label: c.configLabel,
          group: c.configGroup,
          type: c.configType
        }))
      });
    }
  }, [configs, reset]);

  // Group fields by their group property
  const groupedFields = useMemo(() => {
    const groups: Record<string, typeof fields> = {};
    fields.forEach((field, index) => {
      const g = field.group || "Default";
      if (!groups[g]) groups[g] = [];
      // Attach original index to keep track for register
      (groups[g] as any).push({ ...field, originalIndex: index });
    });
    return groups;
  }, [fields]);

  const onSubmit = (data: any) => {
    const payload = data.items.map((item: any) => ({
      configKey: item.configKey,
      configValue: item.configValue
    }));
    updateMutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Memuat Konfigurasi...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto space-y-10 pb-20 max-w-5xl">
      <PageHeader
        title="Konfigurasi Situs"
        description="Kelola identitas digital, informasi kontak, dan kehadiran media sosial platform Anda secara dinamis."
        icon={Settings}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
        {Object.entries(groupedFields).map(([groupName, groupItems], gIdx) => {
          const Icon = GROUP_ICONS[groupName] || GROUP_ICONS.Default;
          const colorClass = GROUP_COLORS[groupName] || GROUP_COLORS.Default;

          return (
            <motion.section
              key={groupName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gIdx * 0.1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border", colorClass)}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 leading-none">{groupName}</h2>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider"> Pengaturan Kelompok {groupName} </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                {(groupItems as any[]).map((field) => (
                  <div key={field.id} className={cn((field.type === "textarea" || field.type === "image") && "md:col-span-2")}>
                    <Field>
                      <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                        {field.label}
                      </FieldLabel>
                      <FieldContent>
                        {field.type === "textarea" ? (
                          <Textarea
                            {...register(`items.${field.originalIndex}.configValue`)}
                            rows={4}
                            className="bg-slate-50/50 border-transparent focus-visible:bg-white rounded-2xl text-sm font-medium p-4"
                          />
                        ) : field.type === "image" ? (
                          <Controller
                            control={control}
                            name={`items.${field.originalIndex}.configValue`}
                            render={({ field: { value, onChange } }) => (
                              <ImageUpload
                                value={value || ""}
                                onChange={onChange}
                                onRemove={() => onChange("")}
                                label={`Pilih ${field.label}`}
                                aspectRatio={field.configKey === "faviconUrl" ? "aspect-square" : "aspect-video"}
                                className={field.configKey === "faviconUrl" ? "max-w-[150px]" : ""}
                              />
                            )}
                          />
                        ) : (
                          <div className="relative group">
                            <Input
                              {...register(`items.${field.originalIndex}.configValue`)}
                              className="h-12 bg-slate-50/50 border-transparent focus-visible:bg-white rounded-xl text-sm font-bold"
                            />
                          </div>
                        )}
                      </FieldContent>
                    </Field>
                  </div>
                ))}
              </div>
            </motion.section>
          );
        })}

        {/* Action Button */}
        <div className="fixed bottom-10 right-10 z-50">
          <Button
            type="submit"
            disabled={updateMutation.isPending || !isDirty}
            className="h-16 px-8 rounded-2xl bg-primary hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-primary/40 transition-all hover:-translate-y-1 group"
          >
            {updateMutation.isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                Simpan Perubahan
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
