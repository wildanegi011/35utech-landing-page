"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Phone, Clock, Send, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { siteConfig } from "@/config/site-config";

export default function Contact({ configs }: { configs?: any[] }) {
  const getConfig = (key: string) => configs?.find(c => c.configKey === key)?.configValue;

  const CONTACT_INFO = [
    {
      icon: MapPin,
      label: "Alamat",
      value: getConfig("contactAddress") || siteConfig.contact.address,
    },
    {
      icon: Mail,
      label: "Email",
      value: getConfig("contactEmail") || siteConfig.contact.email,
      href: `mailto:${getConfig("contactEmail") || siteConfig.contact.email}`,
    },
    {
      icon: Phone,
      label: "Telepon",
      value: getConfig("contactPhone") || siteConfig.contact.phone,
      href: `tel:${(getConfig("contactPhone") || siteConfig.contact.phone).replace(/\s/g, "")}`,
    },
    {
      icon: Clock,
      label: "Jam Operasional",
      value: getConfig("officeHours") || siteConfig.contact.hours,
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with backend
    alert("Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="kontak" className="max-w-7xl mx-auto px-8 py-32">
      <div className="flex flex-col items-center text-center mb-20">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-primary/10"
        >
          Hubungi Kami
        </motion.span>
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight text-on-surface">
          Mari <span className="text-primary">Berkolaborasi</span>
        </h2>
        <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed font-medium">
          Siap memulai proyek berikutnya? Hubungi tim kami dan ceritakan visi digital Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Contact Info Cards */}
        <div className="lg:col-span-2 space-y-5">
          {CONTACT_INFO.map((item, idx) => {
            const Icon = item.icon;
            const Wrapper = item.href ? "a" : "div";
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Wrapper
                  {...(item.href ? { href: item.href } : {})}
                  className={cn(
                    "flex items-start gap-5 p-6 rounded-2xl bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all duration-300 group",
                    item.href && "hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] hover:-translate-y-0.5 cursor-pointer"
                  )}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-[0.15em] mb-1.5">{item.label}</p>
                    <p className="text-on-surface font-semibold text-sm leading-relaxed group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                  </div>
                  {item.href && (
                    <ArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity ml-auto mt-1 shrink-0" />
                  )}
                </Wrapper>
              </motion.div>
            );
          })}

          {/* Map Placeholder */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-2xl overflow-hidden h-48 bg-slate-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253840.64910519975!2d106.6894285!3d-6.229728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta!5e0!3m2!1sid!2sid!4v1709000000000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi 35utech"
            />
          </motion.div> */}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3"
        >
          <Card className="rounded-3xl border-none ring-0 p-0 gap-0 shadow-[0_2px_20px_rgba(0,0,0,0.04)] bg-white">
            <CardContent className="p-10 md:p-14">
              <h3 className="text-2xl font-extrabold text-on-surface mb-2 tracking-tight">Kirim Pesan</h3>
              <p className="text-on-surface-variant text-sm font-medium mb-10">Isi formulir di bawah dan tim kami akan merespons dalam 1 hari kerja.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-on-surface uppercase tracking-[0.15em] mb-2.5">Nama Lengkap</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-surface-variant/50 rounded-xl px-5 py-3.5 text-sm font-medium text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all border border-transparent focus:border-primary/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-on-surface uppercase tracking-[0.15em] mb-2.5">Alamat Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="w-full bg-surface-variant/50 rounded-xl px-5 py-3.5 text-sm font-medium text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all border border-transparent focus:border-primary/20"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-on-surface uppercase tracking-[0.15em] mb-2.5">Subjek</label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-surface-variant/50 rounded-xl px-5 py-3.5 text-sm font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all border border-transparent focus:border-primary/20 appearance-none"
                  >
                    <option value="" disabled>Pilih topik diskusi...</option>
                    <option value="software">Rekayasa Perangkat Lunak</option>
                    <option value="design">Desain Pengalaman</option>
                    <option value="consulting">Konsultasi Bisnis</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-on-surface uppercase tracking-[0.15em] mb-2.5">Pesan</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Ceritakan tentang proyek atau kebutuhan Anda..."
                    className="w-full bg-surface-variant/50 rounded-xl px-5 py-3.5 text-sm font-medium text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all border border-transparent focus:border-primary/20 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-sm py-7 rounded-2xl transition-all h-auto shadow-lg shadow-primary/20 group"
                >
                  <span className="flex items-center justify-center gap-3">
                    Kirim Pesan
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
