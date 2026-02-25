"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Send, AlertCircle, Loader2, User, CheckCircle2, XCircle } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { ChaosContainer } from "@/components/ui/chaos-container";
import { toast } from "sonner";
import { track } from "@vercel/analytics";

interface ContactProps {
    className?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function Contact({ className }: ContactProps) {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState<string[]>([]);

    // Formspree Integration Hook
    const [state, handleSubmit] = useForm("xdalpkvz");

    useEffect(() => {
        if (state.succeeded) {
            track("Contact Form Success");
            toast("Message sent!", { description: "I'll get back to you soon." });
            setFormData({ name: "", email: "", message: "" });
        }
    }, [state.succeeded]);

    useEffect(() => {
        if (state.errors) {
            track("Contact Form Error");
            toast("Couldn't send message", { description: "Please check your inputs and try again." });
        }
    }, [state.errors]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        // Clear errors when typing
        if (errors.length > 0) setErrors([]);
    };

    const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: string[] = [];
        if (!formData.name.trim()) newErrors.push("Name required");
        if (!formData.email.includes("@") || !formData.email.includes(".")) newErrors.push("Valid email required");
        if (!formData.message.trim()) newErrors.push("Message required");
        setErrors(newErrors);

        if (newErrors.length === 0) {
            track("Contact Form Submitted");
            await handleSubmit(e);
        }
    }, [formData, handleSubmit]);

    return (
        <section id="contact" className={`py-16 md:py-24 flex flex-col items-center justify-center ${className}`}>
            <div className="max-w-3xl w-full mx-auto px-4 sm:px-8 flex flex-col items-center justify-center">
                {/* Header */}
                <ChaosContainer intensity="medium" direction="top" delay={0.1} className="w-full flex flex-col items-center">
                    <div className="flex flex-col items-center justify-center text-center mb-14 w-full">
                        <p className="text-xs font-mono text-black/40 dark:text-white/40 uppercase tracking-[0.2em] mb-3 ml-[0.2em]">
                            Get in touch
                        </p>
                        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                            Let&apos;s work
                            <span className="text-black/60 dark:text-white/60 font-light"> together</span>
                        </h2>
                        <p className="text-sm text-black/70 dark:text-white/70 font-light mt-3 max-w-sm mx-auto leading-relaxed">
                            Have a project in mind or just want to say hello? I&apos;d love to hear from you.
                        </p>
                    </div>
                </ChaosContainer>



                {/* Form Card */}
                <ChaosContainer intensity="low" direction="bottom" delay={0.15}>
                    <Card className="border border-black/[0.06] dark:border-white/[0.06] bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm rounded-2xl overflow-hidden">
                        <CardContent className="p-5 sm:p-8">
                            <form onSubmit={onSubmit} className="space-y-5">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-[11px] font-mono text-black/70 dark:text-white/70 uppercase tracking-wider">Name</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/25 dark:text-white/25" />
                                            <Input
                                                id="name" name="name" placeholder="Your name"
                                                value={formData.name} onChange={handleInputChange}
                                                disabled={state.submitting}
                                                className="pl-9 text-sm border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] rounded-xl h-11 focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 focus:border-black/15 dark:focus:border-white/15 transition-all duration-200 placeholder:text-black/25 dark:placeholder:text-white/25"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-[11px] font-mono text-black/70 dark:text-white/70 uppercase tracking-wider">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/25 dark:text-white/25" />
                                            <Input
                                                id="email" name="email" type="email" placeholder="you@email.com"
                                                value={formData.email} onChange={handleInputChange}
                                                disabled={state.submitting}
                                                className="pl-9 text-sm border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] rounded-xl h-11 focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 focus:border-black/15 dark:focus:border-white/15 transition-all duration-200 placeholder:text-black/25 dark:placeholder:text-white/25"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-[11px] font-mono text-black/70 dark:text-white/70 uppercase tracking-wider">Message</Label>
                                    <Textarea
                                        id="message" name="message"
                                        placeholder="Tell me about your project..."
                                        value={formData.message} onChange={handleInputChange}
                                        disabled={state.submitting}
                                        className="min-h-[140px] text-sm border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] rounded-xl resize-y focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 focus:border-black/15 dark:focus:border-white/15 transition-all duration-200 placeholder:text-black/25 dark:placeholder:text-white/25"
                                    />
                                </div>

                                {errors.length > 0 && (
                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/[0.06] dark:bg-red-400/[0.06] border border-red-500/15 dark:border-red-400/15">
                                        <AlertCircle className="h-3.5 w-3.5 text-red-500 dark:text-red-400 shrink-0" />
                                        <p className="text-red-600 dark:text-red-400 text-xs">{errors.join(" · ")}</p>
                                    </div>
                                )}

                                <Button
                                    type="submit" disabled={state.submitting}
                                    className="w-full rounded-xl py-3 text-sm font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 bg-black/90 hover:bg-black dark:bg-white/90 dark:hover:bg-white text-white dark:text-black border-0"
                                >
                                    {state.submitting ? (
                                        <span className="flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 animate-spin" />Sending...</span>
                                    ) : (
                                        <span className="flex items-center gap-2"><Send className="w-3.5 h-3.5" />Send Message</span>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </ChaosContainer>
            </div>
        </section>
    );
}