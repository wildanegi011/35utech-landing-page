"use client";

import React from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Project } from "@/data/portfolio";
import { useProjectCategories, useProjectStatuses } from "@/hooks/use-projects";
import {
  ImageIcon,
  Zap,
  Target,
  InfoIcon
} from "lucide-react";

// Sub-components
import { StageStepper, Stage } from "./project-stages/StageStepper";
import { IdentitasStage } from "./project-stages/IdentitasStage";
import { KontenStage } from "./project-stages/KontenStage";
import { VisualStage } from "./project-stages/VisualStage";
import { FiturStage } from "./project-stages/FiturStage";
import { FormFooter } from "./project-stages/FormFooter";

const projectSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  slug: z.string().optional(),
  client: z.string().min(2, "Nama klien harus diisi"),
  year: z.string().regex(/^\d{4}$/, "Tahun harus 4 digit"),
  categoryId: z.number().int("Pilih kategori"),
  statusId: z.number().int("Pilih status"),
  image: z.string().url("URL gambar tidak valid"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  longDescription: z.string().min(20, "Deskripsi panjang minimal 20 karakter"),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  impact: z.string().optional(),
  link: z.string().url("URL proyek tidak valid").optional().or(z.literal("")),
  gallery: z.array(z.string()),
  techStack: z.array(z.object({ name: z.string().min(1, "Nama tech harus diisi"), icon: z.string().optional() })),
  features: z.array(z.string().min(1, "Fitur tidak boleh kosong")),
  isPublished: z.boolean(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  initialData?: Partial<Project> & { categoryId?: number };
  onSubmit: SubmitHandler<ProjectFormValues>;
  onCancel: () => void;
  loading?: boolean;
}

const STAGES: Stage[] = [
  { id: "identitas", label: "Identitas", icon: InfoIcon, color: "blue" },
  { id: "konten", label: "Konten", icon: Target, color: "amber" },
  { id: "visual", label: "Visual", icon: ImageIcon, color: "pink" },
  { id: "fitur", label: "Fitur", icon: Zap, color: "emerald" },
];

export function ProjectForm({ initialData, onSubmit, onCancel, loading }: ProjectFormProps) {
  const { data: categories = [] } = useProjectCategories();
  const { data: statuses = [] } = useProjectStatuses();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    trigger,
    formState: { errors }
  } = useForm<ProjectFormValues>({
    mode: "onChange",
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      client: initialData?.client || "",
      year: initialData?.year || new Date().getFullYear().toString(),
      categoryId: (initialData as any)?.categoryId || (categories.length > 0 ? categories[0].id : undefined),
      statusId: (initialData as any)?.statusId || (statuses.length > 0 ? statuses[0].id : undefined),
      image: initialData?.image || "",
      description: initialData?.description || "",
      longDescription: initialData?.longDescription || "",
      challenge: initialData?.challenge || "",
      solution: initialData?.solution || "",
      impact: initialData?.impact || "",
      link: initialData?.link || "",
      gallery: initialData?.gallery ? (typeof initialData.gallery[0] === 'string' ? initialData.gallery : (initialData.gallery as any).map((g: any) => g.imageUrl)) : [],
      features: initialData?.features ? (typeof initialData.features[0] === 'string' ? initialData.features : (initialData.features as any).map((f: any) => f.name)) : [],
      techStack: initialData?.techStack?.map((t: any) => ({ name: t.name, icon: t.icon || "" })) || [],
      isPublished: initialData?.isPublished ?? false,
    } as any,
  });

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({ control, name: "features" as any });
  const { fields: galleryFields, append: appendGallery, remove: removeGallery, move: moveGallery } = useFieldArray({ control, name: "gallery" as any });
  const { fields: techStackFields, append: appendTech, remove: removeTech } = useFieldArray({ control, name: "techStack" as any });

  const [currentStage, setCurrentStage] = React.useState(0);

  const stageFields: Record<string, (keyof ProjectFormValues)[]> = {
    identitas: ["title", "client", "year", "categoryId", "statusId", "link"],
    konten: ["description", "longDescription", "challenge", "solution"],
    visual: ["image", "gallery"],
    fitur: ["features", "techStack"],
  };

  const handleNext = async () => {
    const fields = stageFields[STAGES[currentStage].id];
    const isStepValid = await trigger(fields);

    if (isStepValid && currentStage < STAGES.length - 1) {
      setCurrentStage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStage > 0) {
      setCurrentStage(prev => prev - 1);
    }
  };

  const isStageComplete = (stageId: string) => {
    const vals = watch();
    switch (stageId) {
      case "identitas": return !!(vals.title && vals.client && vals.year && vals.categoryId && vals.statusId);
      case "konten": return !!(vals.description && vals.longDescription);
      case "visual": return !!vals.image;
      case "fitur": return (vals.features?.length ?? 0) > 0 && (vals.techStack?.length ?? 0) > 0;
      default: return false;
    }
  };

  const handleStageClick = async (index: number) => {
    if (index < currentStage) {
      setCurrentStage(index);
    } else if (index > currentStage) {
      const fields = stageFields[STAGES[currentStage].id];
      const isStepValid = await trigger(fields);
      if (isStepValid) {
        setCurrentStage(index);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="font-sans relative mx-auto max-w-full pb-32">
      <div className="sticky top-[-8px] bg-slate-50/95 backdrop-blur-md z-20 pt-4 pb-4 px-2 -mx-2 border-b border-slate-100 mb-6">
        <StageStepper
          currentStage={currentStage}
          stages={STAGES}
          onStageClick={handleStageClick}
          isStageComplete={isStageComplete}
        />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
        {currentStage === 0 && (
          <IdentitasStage
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
            categories={categories}
            statuses={statuses}
          />
        )}
        {currentStage === 1 && <KontenStage register={register} errors={errors} />}
        {currentStage === 2 && (
          <VisualStage
            watch={watch}
            setValue={setValue}
            errors={errors}
            galleryFields={galleryFields}
            appendGallery={appendGallery}
            removeGallery={removeGallery}
            moveGallery={moveGallery}
          />
        )}
        {currentStage === 3 && (
          <FiturStage
            register={register}
            techStackFields={techStackFields}
            appendTech={appendTech}
            removeTech={removeTech}
            featureFields={featureFields}
            appendFeature={appendFeature}
            removeFeature={removeFeature}
          />
        )}
      </div>

      <FormFooter
        currentStage={currentStage}
        stages={STAGES}
        handleNext={handleNext}
        handlePrev={handlePrev}
        onCancel={onCancel}
        loading={loading}
      />
    </form>
  );
}
