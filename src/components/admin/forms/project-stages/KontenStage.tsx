"use client";

import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Target, AlertCircle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface KontenStageProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

const labelClass = "text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2";
const textareaClass = "bg-white border-slate-200 rounded-xl text-sm p-4 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all text-slate-700 leading-relaxed";

export function KontenStage({ register, errors }: KontenStageProps) {
  return (
    <div className="space-y-6 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
      <div className="flex flex-col gap-1 pb-1">
        <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          Narasi & Deskripsi <Target className="w-5 h-5 text-amber-500" />
        </h3>
        <p className="text-[13px] text-slate-400 font-medium">Tuliskan cerita di balik proyek ini.</p>
      </div>

      <div className="space-y-4">
        <Field>
          <FieldLabel className={labelClass}>Ringkasan Singkat (Short Description)</FieldLabel>
          <FieldContent>
            <Textarea {...register("description")} placeholder="Tuliskan ringkasan 1-2 kalimat..." className={cn(textareaClass, "min-h-[100px]")} />
            <FieldError className="mt-1">{errors.description?.message as string}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel className={labelClass}>Detail Overview (Long Description)</FieldLabel>
          <FieldContent>
            <Textarea {...register("longDescription")} placeholder="Jelaskan secara mendalam..." className={cn(textareaClass, "min-h-[120px]")} />
            <FieldError className="mt-1">{errors.longDescription?.message as string}</FieldError>
          </FieldContent>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50 italic opacity-80">
        <Field>
          <FieldLabel className={labelClass}>
            <span className="flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5 text-red-500" /> Tantangan</span>
          </FieldLabel>
          <FieldContent>
            <Textarea {...register("challenge")} placeholder="Tantangan teknis..." rows={2} className={cn(textareaClass, "min-h-[80px]")} />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel className={labelClass}>
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-emerald-500" /> Solusi</span>
          </FieldLabel>
          <FieldContent>
            <Textarea {...register("solution")} placeholder="Solusi tim..." rows={2} className={cn(textareaClass, "min-h-[80px]")} />
          </FieldContent>
        </Field>
      </div>
    </div>
  );
}
