"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Send, AlertCircle, Loader2, User } from "lucide-react";
import { useState } from "react";
import { ChaosContainer } from "@/components/ui/chaos-container";

interface ContactProps {
    className?: string;
}

export default function Contact({ className }: ContactProps) {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newErrors: string[] = [];
        if (!formData.name.trim()) newErrors.push("Name required");
        if (!formData.email.includes("@")) newErrors.push("Valid email required");
        if (!formData.message.trim()) newErrors.push("Message required");
        setErrors(newErrors);
        if (newErrors.length > 0) return;

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };

    if (isSubmitted) {
        return (
            <section id="contact" className={`py-16 md:py-20 ${className}`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-4">
                    <div className="text-5xl">✨</div>
                    <h3 className="text-2xl font-thin">Thank you!</h3>
                    <p className="text-black/50 dark:text-white/50 text-sm">Message sent. I&apos;ll get back to you soon.</p>
                    <Button
                        onClick={() => { setIsSubmitted(false); setFormData({ name: "", email: "", message: "" }); setErrors([]); }}
                        variant="outline"
                        className="rounded-full text-xs"
                    >
                        Send Another
                    </Button>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" className={`py-16 md:py-20 ${className}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-8">
                {/* Header */}
                <ChaosContainer intensity="medium" direction="top" delay={0.1}>
                    <div className="text-center mb-10">
                        <p className="text-xs font-mono text-black/35 dark:text-white/35 uppercase tracking-[0.2em] mb-3">Get in touch</p>
                        <h2 className="text-3xl sm:text-4xl font-extralight tracking-tight">
                            Let&apos;s work
                            <span className="text-black/40 dark:text-white/40"> together</span>
                        </h2>
                        <p className="text-sm text-black/45 dark:text-white/45 font-light mt-3 max-w-sm mx-auto leading-relaxed">
                            Have a project in mind or just want to say hello? I&apos;d love to hear from you.
                        </p>
                    </div>
                </ChaosContainer>

                {/* Form Card */}
                <ChaosContainer intensity="low" direction="bottom" delay={0.15}>
                    <Card className="border border-black/[0.06] dark:border-white/[0.06] bg-white/30 dark:bg-white/[0.015] backdrop-blur-sm rounded-2xl overflow-hidden">
                        <CardContent className="p-5 sm:p-8 space-y-5">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-[11px] font-mono text-black/50 dark:text-white/50 uppercase tracking-wider">Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/25 dark:text-white/25" />
                                        <Input
                                            id="name" name="name" placeholder="Your name"
                                            value={formData.name} onChange={handleInputChange}
                                            className="pl-9 text-sm border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] rounded-xl h-11 focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 focus:border-black/20 dark:focus:border-white/20 transition-all placeholder:text-black/25 dark:placeholder:text-white/25"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-[11px] font-mono text-black/50 dark:text-white/50 uppercase tracking-wider">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/25 dark:text-white/25" />
                                        <Input
                                            id="email" name="email" type="email" placeholder="you@email.com"
                                            value={formData.email} onChange={handleInputChange}
                                            className="pl-9 text-sm border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] rounded-xl h-11 focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 focus:border-black/20 dark:focus:border-white/20 transition-all placeholder:text-black/25 dark:placeholder:text-white/25"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-[11px] font-mono text-black/50 dark:text-white/50 uppercase tracking-wider">Message</Label>
                                <Textarea
                                    id="message" name="message"
                                    placeholder="Tell me about your project..."
                                    value={formData.message} onChange={handleInputChange}
                                    className="min-h-[140px] text-sm border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] rounded-xl resize-y focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 focus:border-black/20 dark:focus:border-white/20 transition-all placeholder:text-black/25 dark:placeholder:text-white/25"
                                />
                            </div>

                            {errors.length > 0 && (
                                <Alert className="border-red-200/50 bg-red-50/50 dark:bg-red-900/10 dark:border-red-800/20 py-2.5 rounded-xl">
                                    <AlertCircle className="h-3.5 w-3.5 text-red-500/80" />
                                    <AlertDescription className="text-red-600 dark:text-red-400 text-xs">
                                        {errors.join(" · ")}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <Button
                                onClick={onSubmit} disabled={isSubmitting}
                                className="w-full rounded-xl py-3 text-sm font-medium transition-all duration-300 active:scale-[0.98] disabled:opacity-50 bg-black/90 hover:bg-black dark:bg-white/90 dark:hover:bg-white text-white dark:text-black border-0"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 animate-spin" />Sending...</span>
                                ) : (
                                    <span className="flex items-center gap-2"><Send className="w-3.5 h-3.5" />Send Message</span>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </ChaosContainer>
            </div>
        </section>
    );
}