"use client";

import React from "react";
import { UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Zap, Plus, Trash2, CheckCircle2, Cpu } from "lucide-react";
import { TechStackLibrary } from "./TechStackLibrary";

interface FiturStageProps {
  register: UseFormRegister<any>;
  techStackFields: any[];
  appendTech: (value: any) => void;
  removeTech: (index: number) => void;
  featureFields: any[];
  appendFeature: (value: any) => void;
  removeFeature: (index: number) => void;
}

const inputClass = "h-11 bg-white border-slate-200 rounded-xl text-sm focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all text-slate-700 font-medium";
const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2 px-1";

export function FiturStage({
  register,
  techStackFields,
  appendTech,
  removeTech,
  featureFields,
  appendFeature,
  removeFeature
}: FiturStageProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
      <div className="flex flex-col gap-1 pb-1">
        <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          Fitur & Teknologi <Zap className="w-5 h-5 text-emerald-500" />
        </h3>
        <p className="text-[13px] text-slate-400 font-medium tracking-tight">Tentukan teknologi dan fitur utama.</p>
      </div>

      <div className="space-y-10">
        {/* Tech Pack - Section 1 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className={labelClass + " mb-0"}>Teknologi Utama</span>
            </div>
            <TechStackLibrary 
              onSelect={(tech) => appendTech({ name: tech.name, icon: tech.icon || "" })} 
              selectedTechNames={techStackFields.map(field => field.name)} 
            />
          </div>

          <div className="space-y-3">
            {techStackFields.length === 0 ? (
              <div className="p-8 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center bg-slate-50/20">
                <Cpu className="w-8 h-8 text-slate-200 mb-3" />
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Belum ada tech pack...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {techStackFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-4 bg-slate-50/20 p-3 rounded-2xl group transition-all hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 pr-4">
                    <Input {...register(`techStack.${index}.name` as any)} placeholder="Name" className={inputClass + " flex-1 bg-white border-transparent focus:ring-primary/10"} />
                    <Input {...register(`techStack.${index}.icon` as any)} placeholder="Icon" className={inputClass + " w-24 bg-white border-transparent focus:ring-primary/10 text-[9px] uppercase font-black tracking-tighter"} />
                    <button type="button" onClick={() => removeTech(index)} className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-red-500 transition-colors shrink-0">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <Button type="button" variant="ghost" onClick={() => appendTech({ name: "", icon: "" })}
              className="w-full text-[10px] font-bold text-slate-400 hover:text-primary gap-2 h-11 border-2 border-dashed border-slate-100 rounded-2xl italic tracking-wider">
              <Plus className="w-3.5 h-3.5" /> Tambah Manual...
            </Button>
          </div>
        </div>

        {/* Features List - Section 2 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className={labelClass + " mb-0"}>Highlight Fitur</span>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => appendFeature("")}
              className="h-8 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest gap-2 bg-slate-50 border-none transition-all active:scale-95 shadow-sm">
              <Plus className="w-3.5 h-3.5" /> Tambah Fitur
            </Button>
          </div>

          <div className="space-y-3">
            {featureFields.length === 0 ? (
              <div className="p-8 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center bg-slate-50/20">
                <CheckCircle2 className="w-8 h-8 text-slate-200 mb-3" />
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Belum ada fitur unggulan...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {featureFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-4 bg-slate-50/20 p-3 rounded-2xl group transition-all hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 pr-4">
                    <Input {...register(`features.${index}` as any)} placeholder="Fitur Highlight" className={inputClass + " flex-1 bg-white border-transparent focus:ring-primary/10"} />
                    <button type="button" onClick={() => removeFeature(index)} className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-red-500 transition-colors shrink-0">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
