"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check, LucideIcon } from "lucide-react";

export interface Stage {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

interface StageStepperProps {
  currentStage: number;
  stages: Stage[];
  onStageClick: (index: number) => void;
  isStageComplete: (stageId: string) => boolean;
}

export function StageStepper({ currentStage, stages, onStageClick, isStageComplete }: StageStepperProps) {
  return (
    <div className="mb-0">
      <div className="flex items-center justify-between relative px-2">
        {/* Progress Bar Background */}
        <div className="absolute top-[22px] left-8 right-8 h-[2px] bg-slate-100 -z-10" />
        {/* Active Progress Bar */}
        <div 
          className="absolute top-[22px] left-8 h-[2px] bg-primary transition-all duration-500 ease-in-out -z-10" 
          style={{ width: `${(currentStage / (stages.length - 1)) * 88}%` }}
        />

        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = currentStage === index;
          const isCompleted = isStageComplete(stage.id) && currentStage !== index;
          const isPast = index < currentStage;

          return (
            <div key={stage.id} className="flex flex-col items-center group">
              <button
                type="button"
                onClick={() => onStageClick(index)}
                className={cn(
                  "w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-500 border-2",
                  isActive ? "bg-white border-primary shadow-[0_0_20px_rgba(37,99,235,0.15)] scale-110" : 
                  isPast ? "bg-primary border-primary text-white" : "bg-white border-slate-100 text-slate-300 hover:border-slate-300"
                )}
              >
                {isCompleted || isPast ? (
                  <Check className="w-5 h-5 stroke-3" />
                ) : (
                  <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-slate-300")} />
                )}
              </button>
              <span className={cn(
                "mt-3 text-[10px] font-black uppercase tracking-widest transition-colors duration-300",
                isActive ? "text-primary" : "text-slate-400"
              )}>
                {stage.label}
              </span>
              <span className={cn(
                "mt-1 text-[8px] font-bold uppercase transition-opacity duration-300",
                isActive ? "opacity-100 text-primary/50" : "opacity-0"
              )}>
                 Tahap {index + 1}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
