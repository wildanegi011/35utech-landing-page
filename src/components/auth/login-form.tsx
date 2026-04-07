"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Loader2,
  Mail,
  Lock,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const loginSchema = z.object({
  email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
  password: z.string().min(1, "Password wajib diisi").min(6, "Password minimal 6 karakter"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setError("root", { 
          message: "Email atau password yang Anda masukkan salah." 
        });
        toast.error("Login Gagal", {
          description: "Silakan periksa kembali kredensial Anda.",
          icon: <AlertCircle className="w-4 h-4" />,
        });
      } else {
        toast.success("Login Berhasil", {
          description: "Selamat datang kembali di Dashboard 35utech.",
        });
        router.push("/admin");
        router.refresh();
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <form 
        onSubmit={handleSubmit((values) => {
          clearErrors("root");
          onSubmit(values);
        })} 
        className="space-y-5"
      >
        <AnimatePresence mode="wait">
          {errors.root && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-red-50 border border-red-100 flex items-start gap-3 shadow-sm"
            >
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-[11px] font-black uppercase tracking-widest text-red-600">Terjadi Kesalahan</p>
                <p className="text-xs font-bold text-red-500/80 leading-relaxed">
                  {errors.root.message}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Field>
          <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
            Email
          </FieldLabel>
          <FieldContent>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="admin@35utech.com"
                {...register("email")}
                className="pl-11 h-14 bg-slate-50 border-slate-100 focus-visible:ring-primary/20 rounded-2xl text-sm font-bold placeholder:text-slate-300 placeholder:font-medium transition-all"
              />
            </div>
          </FieldContent>
          {errors.email && <FieldError className="text-[10px] font-bold uppercase tracking-wider text-red-500">{errors.email.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
            Kredensial Keamanan
          </FieldLabel>
          <FieldContent>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className="pl-11 pr-12 h-14 bg-slate-50 border-slate-100 focus-visible:ring-primary/20 rounded-2xl text-sm font-bold placeholder:text-slate-300 placeholder:font-medium transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary transition-colors outline-none px-2 py-1"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </FieldContent>
          {errors.password && <FieldError className="text-[10px] font-bold uppercase tracking-wider text-red-500">{errors.password.message}</FieldError>}
        </Field>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span className="flex items-center gap-3">
                Masuk ke Dashboard <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </div>
      </form>

      <div className="flex items-center gap-3 justify-center text-[10px] font-bold text-slate-300 uppercase tracking-widest pt-4">
        <ShieldCheck className="w-4 h-4 opacity-40" />
        <span>Sistem Autentikasi 35utech Enterprise</span>
      </div>
    </div>
  );
}
