"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Loader2, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const SUGGESTIONS = [
    "What projects has Hrushi built?",
    "What are Hrushi's skills?",
    "Tell me about Hrushi's education",
    "How can I contact Hrushi?",
];

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hi! I'm HrushiBot 👋 Ask me anything about Hrushi — his skills, projects, achievements, or how to reach him!" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const sendMessage = async (text?: string) => {
        const messageText = text || input.trim();
        if (!messageText || isLoading) return;

        const userMessage: Message = { role: "user", content: messageText };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: messageText,
                    history: messages.map(m => ({ role: m.role === "assistant" ? "model" : "user", content: m.content })),
                }),
            });

            const data = await res.json();
            setMessages(prev => [...prev, { role: "assistant", content: data.reply || "Sorry, something went wrong." }]);
        } catch {
            setMessages(prev => [...prev, { role: "assistant", content: "I'm having trouble connecting. Try again or reach Hrushi at hrushibhanvadiya@gmail.com!" }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="fixed bottom-5 right-5 z-50"
                    >
                        <Button
                            onClick={() => setIsOpen(true)}
                            className="rounded-full w-14 h-14 bg-black dark:bg-white text-white dark:text-black shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 transition-all duration-300 border-0 p-0"
                        >
                            <MessageSquare className="w-6 h-6" />
                        </Button>
                        {/* Pulse ring */}
                        <span className="absolute inset-0 rounded-full bg-black/20 dark:bg-white/20 animate-ping pointer-events-none" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-5 right-5 z-50 w-[calc(100vw-2.5rem)] sm:w-[400px] h-[min(600px,calc(100vh-3rem))] flex flex-col rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06] dark:border-white/[0.06]">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-black dark:bg-white flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-white dark:text-black" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">HrushiBot</p>
                                    <p className="text-[10px] text-black/40 dark:text-white/40 font-mono flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                        Powered by Gemini
                                    </p>
                                </div>
                            </div>
                            <Button
                                onClick={() => setIsOpen(false)}
                                variant="ghost"
                                size="icon"
                                className="rounded-full w-8 h-8 hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 space-y-4 scrollbar-thin">
                            {messages.map((msg, i) => (
                                <div key={i} className={cn("flex gap-2.5 max-w-[90%]", msg.role === "user" ? "ml-auto flex-row-reverse" : "")}>
                                    <div className={cn(
                                        "w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                                        msg.role === "user"
                                            ? "bg-black dark:bg-white"
                                            : "bg-black/[0.05] dark:bg-white/[0.05]"
                                    )}>
                                        {msg.role === "user"
                                            ? <User className="w-3 h-3 text-white dark:text-black" />
                                            : <Bot className="w-3 h-3" />
                                        }
                                    </div>
                                    <div className={cn(
                                        "px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed break-words overflow-hidden",
                                        msg.role === "user"
                                            ? "bg-black dark:bg-white text-white dark:text-black rounded-tr-md"
                                            : "bg-black/[0.04] dark:bg-white/[0.04] rounded-tl-md"
                                    )}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex gap-2.5">
                                    <div className="w-6 h-6 rounded-lg bg-black/[0.05] dark:bg-white/[0.05] flex items-center justify-center shrink-0">
                                        <Bot className="w-3 h-3" />
                                    </div>
                                    <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-md bg-black/[0.04] dark:bg-white/[0.04]">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-black/30 dark:bg-white/30 animate-bounce [animation-delay:0ms]" />
                                            <span className="w-1.5 h-1.5 rounded-full bg-black/30 dark:bg-white/30 animate-bounce [animation-delay:150ms]" />
                                            <span className="w-1.5 h-1.5 rounded-full bg-black/30 dark:bg-white/30 animate-bounce [animation-delay:300ms]" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggestions — only show when conversation is fresh */}
                        {messages.length <= 1 && (
                            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                                {SUGGESTIONS.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => sendMessage(s)}
                                        className="text-[11px] px-3 py-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] text-black/60 dark:text-white/60 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 active:scale-95"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div className="px-4 py-3 border-t border-black/[0.06] dark:border-white/[0.06]">
                            <div className="flex items-center gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask about Hrushi..."
                                    className="flex-1 text-sm bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] rounded-xl px-4 py-2.5 outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 transition-all placeholder:text-black/25 dark:placeholder:text-white/25"
                                    disabled={isLoading}
                                />
                                <Button
                                    onClick={() => sendMessage()}
                                    disabled={!input.trim() || isLoading}
                                    className="rounded-xl w-10 h-10 p-0 bg-black dark:bg-white text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80 active:scale-95 transition-all disabled:opacity-30 border-0 shrink-0"
                                >
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
