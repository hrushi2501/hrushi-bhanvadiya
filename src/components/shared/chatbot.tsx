"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Bot, User, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { track } from "@vercel/analytics";

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

function parseMessageContent(text: string) {
    const lines = text.split('\n');
    return lines.map((line, i) => {
        // Match **bold** or *italic*
        const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
        return (
            <span key={i}>
                {parts.map((part, j) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={j} className="font-semibold text-black dark:text-white">{part.slice(2, -2)}</strong>;
                    }
                    if (part.startsWith('*') && part.endsWith('*')) {
                        return <em key={j} className="italic">{part.slice(1, -1)}</em>;
                    }
                    return <span key={j}>{part}</span>;
                })}
                {i < lines.length - 1 && <br />}
            </span>
        );
    });
}

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

        track("Chatbot Message Sent", { length: messageText.length, isSuggestion: !!text });

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
                        className="fixed bottom-[90px] sm:bottom-5 right-5 z-[200]"
                    >
                        <Button
                            aria-label="Toggle Chatbot"
                            onClick={() => { setIsOpen(true); track("Chatbot Toggled", { state: "open" }); }}
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
                        className="fixed bottom-[90px] sm:bottom-5 right-5 z-[200] w-[calc(100vw-2.5rem)] sm:w-[400px] h-[min(600px,calc(100vh-120px))] sm:h-[min(600px,calc(100vh-3rem))] flex flex-col rounded-3xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-[#0a0a0a]/50 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.02)]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06] dark:border-white/[0.06]">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-black dark:bg-white flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-white dark:text-black" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">HrushiBot</p>
                                </div>
                            </div>
                            <Button
                                aria-label="Close Chatbot"
                                onClick={() => { setIsOpen(false); track("Chatbot Toggled", { state: "closed" }); }}
                                variant="ghost"
                                size="icon"
                                className="rounded-full w-8 h-8 hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Messages */}
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 space-y-4 scrollbar-thin">
                            {messages.map((msg, i) => (
                                <div key={i} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
                                    <div className={cn(
                                        "px-4 py-3 rounded-2xl text-sm leading-relaxed max-w-[85%] break-words shadow-sm",
                                        msg.role === "user"
                                            ? "bg-black dark:bg-white text-white dark:text-black rounded-br-sm"
                                            : "bg-white/80 dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08] border-b-black/[0.1] dark:border-b-white/[0.1] rounded-bl-sm text-black dark:text-white"
                                    )}>
                                        {parseMessageContent(msg.content)}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex w-full justify-start">
                                    <div className="px-5 py-4 rounded-2xl rounded-bl-sm bg-white/80 dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08]">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-black/40 dark:bg-white/40 animate-pulse [animation-delay:0ms]" />
                                            <span className="w-1.5 h-1.5 rounded-full bg-black/40 dark:bg-white/40 animate-pulse [animation-delay:150ms]" />
                                            <span className="w-1.5 h-1.5 rounded-full bg-black/40 dark:bg-white/40 animate-pulse [animation-delay:300ms]" />
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
                                        onClick={() => { track("Chatbot Suggestion Clicked", { text: s }); sendMessage(s); }}
                                        className="text-[12px] sm:text-[11px] px-4 py-2 sm:px-3 sm:py-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] text-black/60 dark:text-white/60 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 active:scale-95"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div className="px-4 py-3 border-t border-black/[0.06] dark:border-white/[0.06]">
                            <div className="flex items-center gap-2">
                                <div className="flex-1 rounded-2xl overflow-hidden bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] focus-within:ring-1 focus-within:ring-black/20 dark:focus-within:ring-white/20 transition-all">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Ask about Hrushi..."
                                        className="w-full text-sm bg-transparent px-4 py-3 outline-none placeholder:text-black/30 dark:placeholder:text-white/30"
                                        disabled={isLoading}
                                    />
                                </div>
                                <Button
                                    aria-label="Send Message"
                                    onClick={() => sendMessage()}
                                    disabled={!input.trim() || isLoading}
                                    className="rounded-full w-12 h-12 p-0 bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-95 transition-all disabled:opacity-30 border-0 shrink-0"
                                >
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
