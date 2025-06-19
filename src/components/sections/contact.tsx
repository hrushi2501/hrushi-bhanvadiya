"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Mail,
    Send,
    MessageSquare,
    AlertCircle,
    Loader2,
    User,
    Building
} from "lucide-react";
import { useState } from "react";

interface ContactProps {
    className?: string;
}

interface SocialLink {
    name: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

// Custom icons
const GitHubIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
);

export default function Contact({ className }: ContactProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const socialLinks: SocialLink[] = [
        {
            name: "GitHub",
            url: "https://github.com/yourusername",
            icon: GitHubIcon,
            color: "hover:text-gray-700 dark:hover:text-gray-300"
        },
        {
            name: "LinkedIn",
            url: "https://linkedin.com/in/yourprofile",
            icon: LinkedInIcon,
            color: "hover:text-blue-600"
        },
        {
            name: "Email",
            url: "mailto:your.email@example.com",
            icon: Mail,
            color: "hover:text-red-500"
        },
        {
            name: "Instagram",
            url: "https://instagram.com/yourusername",
            icon: InstagramIcon,
            color: "hover:text-pink-500"
        }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors: string[] = [];
        
        if (!formData.name.trim()) newErrors.push("Name is required");
        if (!formData.email.trim()) newErrors.push("Email is required");
        if (!formData.email.includes('@')) newErrors.push("Please enter a valid email");
        if (!formData.subject.trim()) newErrors.push("Subject is required");
        if (!formData.message.trim()) newErrors.push("Message is required");
        
        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 2000);
    };

    if (isSubmitted) {
        return (
            <section id="contact" className={`py-24 ${className}`}>
                <div className="max-w-6xl mx-auto px-8">
                    <div className="text-center space-y-6">
                        <div className="text-6xl">✨</div>
                        <h3 className="text-3xl font-thin tracking-tight text-black dark:text-white">
                            Thank you!
                        </h3>
                        <p className="text-black/70 dark:text-white/70 max-w-md mx-auto">
                            Your message has been sent. I&apos;ll get back to you soon.
                        </p>
                        <Button 
                            onClick={() => {
                                setIsSubmitted(false);
                                setFormData({ name: '', email: '', subject: '', message: '' });
                                setErrors([]);
                            }} 
                            variant="outline"
                            className="border-black/[0.08] dark:border-white/[0.08] hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                        >
                            Send Another Message
                        </Button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" className={`py-24 ${className}`}>
            <div className="max-w-6xl mx-auto px-8">
                {/* Section Header */}
                <div className="space-y-8 mb-16">
                    <div className="space-y-4">
                        <div className="flex justify-left">
                            <Badge
                                variant="default"
                                className="bg-black dark:bg-white text-white dark:text-black px-5 py-2 text-xs font-mono rounded-full tracking-wider border-0 font-medium"
                            >
                                GET IN TOUCH
                            </Badge>
                        </div>

                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-thin leading-[0.9] tracking-tighter text-left">
                            Let&apos;s connect
                            <br />
                            <span className="text-black/55 dark:text-white/55">& collaborate</span>
                        </h2>

                        <div className="flex justify-left">
                            <p className="text-lg text-black/70 dark:text-white/70 max-w-2xl leading-relaxed font-light text-left">
                                Have something in mind? I&apos;d love to hear about it. Drop me a line and let&apos;s start a conversation about your next project.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-left">
                        <Separator className="bg-black/10 dark:bg-white/10" />
                    </div>
                </div>

                {/* Content */}
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="space-y-6">
                        <Card className="border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-black/60 backdrop-blur-xl rounded-2xl shadow-sm">
                            <CardContent className="p-8">
                                <div className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-sm font-medium text-black/80 dark:text-white/80">
                                                Name
                                            </Label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black/40 dark:text-white/40" />
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    placeholder="Your name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="pl-10 border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-black/60 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-sm font-medium text-black/80 dark:text-white/80">
                                                Email
                                            </Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black/40 dark:text-white/40" />
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="your@email.com"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="pl-10 border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-black/60 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="subject" className="text-sm font-medium text-black/80 dark:text-white/80">
                                            Subject
                                        </Label>
                                        <div className="relative">
                                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black/40 dark:text-white/40" />
                                            <Input
                                                id="subject"
                                                name="subject"
                                                type="text"
                                                placeholder="What's this about?"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                className="pl-10 border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-black/60 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-sm font-medium text-black/80 dark:text-white/80">
                                            Message
                                        </Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Tell me more about your project or just say hello..."
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            className="min-h-[120px] border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-black/60 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all resize-y"
                                            required
                                        />
                                    </div>

                                    {errors.length > 0 && (
                                        <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
                                            <AlertCircle className="h-4 w-4 text-red-600" />
                                            <AlertDescription className="text-red-700 dark:text-red-400">
                                                Please check the form for errors and try again.
                                            </AlertDescription>
                                        </Alert>
                                    )}

                                    <Button
                                        onClick={onSubmit}
                                        disabled={isSubmitting}
                                        className="w-full bg-black hover:bg-black/90 dark:bg-white dark:hover:bg-white/90 text-white dark:text-black rounded-xl py-3 font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Sending...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Send className="w-4 h-4" />
                                                Send Message
                                            </div>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-8">
                        <div className="space-y-6 text-center">
                            <h3 className="text-xl font-medium text-black dark:text-white">
                                Find me online
                            </h3>
                            
                            <div className="flex justify-center flex-wrap gap-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-3 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-black/60 backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
                                        title={social.name}
                                    >
                                        <social.icon className="w-6 h-6 text-black/60 dark:text-white/60 transition-colors duration-300" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Separator className="bg-black/10 dark:bg-white/10 max-w-md" />
                        </div>

                        <div className="space-y-4 text-center">
                            <h4 className="text-lg font-medium text-black dark:text-white">
                                Quick note
                            </h4>
                            <p className="text-sm text-black/60 dark:text-white/60 font-light leading-relaxed max-w-md mx-auto">
                                Whether you have a project in mind, want to collaborate, or just want to say hello, I&apos;m always open to new conversations and opportunities.
                            </p>
                        </div>

                        {/* Response Time Info */}
                        <div className="flex justify-center">
                            <Card className="border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-black/60 backdrop-blur-xl rounded-2xl shadow-sm max-w-md w-full">
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="p-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.04]">
                                            <MessageSquare className="w-4 h-4 text-black/60 dark:text-white/60" />
                                        </div>
                                        <div className="text-center">
                                            <h5 className="text-sm font-medium text-black/80 dark:text-white/80">Response Time</h5>
                                            <p className="text-xs text-black/50 dark:text-white/50 font-mono">Usually within 24 hours</p>
                                        </div>
                                    </div>
                                    <Separator className="bg-black/[0.06] dark:bg-white/[0.06]" />
                                    <div className="text-xs text-black/60 dark:text-white/60 font-light text-center">
                                        I check messages regularly and try to respond as quickly as possible. For urgent matters, feel free to reach out on multiple platforms.
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}