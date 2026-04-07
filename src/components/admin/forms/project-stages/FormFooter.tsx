"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Rocket } from "lucide-react";

interface FormFooterProps {
  currentStage: number;
  stages: any[];
  handleNext: () => void;
  handlePrev: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function FormFooter({
  currentStage,
  stages,
  handleNext,
  handlePrev,
  onCancel,
  loading
}: FormFooterProps) {
  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 px-8 pointer-events-none">
      <div className="max-w-4xl mx-auto w-full pointer-events-auto">
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/50 shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-4 pr-6 pl-6 rounded-[32px] flex items-center justify-between overflow-hidden relative">

          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="ghost"
              onClick={handlePrev}
              disabled={currentStage === 0}
              className="h-14 px-8 rounded-2xl text-xs font-black uppercase tracking-wider disabled:opacity-20 transition-all active:scale-95 flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Kembali
            </Button>


          </div>

          <div className="flex items-center gap-4">
            {currentStage < stages.length - 1 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="h-14 px-10 rounded-2xl bg-slate-900 hover:bg-black text-white text-[11px] font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex items-center gap-3 active:scale-95 transition-all group"
              >
                Tahap Selanjutnya
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onCancel}
                  className="h-14 px-8 rounded-2xl text-xs font-black text-slate-400 hover:text-red-500 uppercase tracking-widest active:scale-95 transition-all"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-14 px-12 rounded-2xl bg-primary hover:bg-blue-700 text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_12px_40px_-8px_rgba(37,99,235,0.45)] flex items-center gap-4 active:scale-[0.98] transition-all"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sedang Menyimpan...
                    </div>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5" />
                      Simpan Karya
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
