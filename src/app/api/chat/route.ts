import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const HRUSHI_CONTEXT = `You are HrushiBot, a friendly AI assistant on Hrushi Bhanvadiya's personal portfolio website. You answer questions about Hrushi in a professional, concise, and helpful manner. Use a friendly tone. Keep answers short (2-4 sentences max) unless asked for detail.

Here is everything you know about Hrushi:

## Personal Info
- Full Name: Hrushi Bhanvadiya
- Location: Ahmedabad, Gujarat, India
- Email: hrushibhanvadiya@gmail.com
- Phone: +91 87802 23077
- GitHub: github.com/hrushi2501
- LinkedIn: linkedin.com/in/hrushi-bhanvadiya-081818280/
- LeetCode: leetcode.com/Hrushi2501 (Username: Hrushi2501)
- Codeforces: codeforces.com (Username: Hrushi2501)

## Education
- B.Tech. in Computer Science and Engineering at Nirma University, Ahmedabad, Gujarat
- Duration: Jul 2023 – Present (currently pursuing)
- CGPA: 8.72 / 10

## Technical Skills
- Programming Languages: C, C++, Java, Python, SQL
- Web Technologies: HTML, CSS, JavaScript, TypeScript, React.js, Next.js, Tailwind CSS
- AI / ML: Retrieval-Augmented Generation, Embeddings, Vector Search, Natural Language Processing
- Systems / Tools: Rust, Git, GitHub, Linux, Flask, WebSockets

## Projects

### 1. Axon OS — Browser-Based Portfolio Operating System
Technologies: Next.js, Rust, WebGPU
- Engineered a browser-native operating system with window management, virtual file system, and AI-controlled workflows
- Designed an AI copilot using Gemini with persistent prompt constraints, contextual UI awareness, and system-level command execution
- Implemented a high-performance Rust backend using Axum and Tokio to stream real-time system metrics via WebSockets

### 2. Financial Document Retrieval-Augmented Generation System
Technologies: Python, Flask, Pinecone, FinBERT
- Built a retrieval-augmented system for semantic search and question answering over large-scale financial documents
- Integrated semantic chunking, FinBERT embeddings, and Pinecone vector indexing with citation-grounded responses

### 3. Database Index Visualization Platform
Technologies: JavaScript, HTML5 Canvas
- Developed interactive visualizations for LSM Trees, Bloom Filters, and Skip Lists with real-time operation tracing

### 4. CPU Scheduling Algorithm Simulator
Technologies: JavaScript, Flask, Tailwind CSS
- Simulated FCFS, SJF, SRTN, and HRRN scheduling with dynamic arrivals, preemption, and Gantt chart generation

## Leadership & Responsibilities
- Joint Secretary, Computer Society of India (CSI), Nirma University — Aug 2025 – Present
- Led technical initiatives and coordinated activities involving 1200+ students and faculty members
- Organized large-scale hackathons, workshops, and interdisciplinary technical projects

## Competitive Programming Achievements
- LeetCode: Rating 1798 (Top global percentile), Username: Hrushi2501
- Codeforces: Rating 1217 (Pupil), Username: Hrushi2501

## Interests
- Systems Programming, AI/ML, RAG pipelines, WebGPU, Browser-based operating systems, Competitive Programming

IMPORTANT RULES:
1. Only answer questions about Hrushi. If asked about unrelated topics, politely redirect.
2. Never make up information not listed above.
3. Be concise and professional.
4. If you don't know something about Hrushi, say "I don't have that information, but you can reach out to Hrushi directly at hrushibhanvadiya@gmail.com".
5. Use a warm, slightly enthusiastic tone — like a helpful portfolio assistant.`;

export async function POST(req: NextRequest) {
    try {
        const { message, history } = await req.json();

        if (!message || typeof message !== "string") {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY?.trim();
        if (!apiKey || apiKey === "your_gemini_api_key_here") {
            return NextResponse.json({
                reply: "The chatbot is currently unavailable — API key not configured. You can reach Hrushi directly at hrushibhanvadiya@gmail.com!"
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // Build chat history
        const chatHistory = [
            { role: "user" as const, parts: [{ text: "You are HrushiBot. Here is your system context:\n\n" + HRUSHI_CONTEXT }] },
            { role: "model" as const, parts: [{ text: "Understood! I'm HrushiBot, ready to answer questions about Hrushi Bhanvadiya. How can I help?" }] },
        ];

        // Add previous conversation history
        if (Array.isArray(history)) {
            for (const msg of history.slice(-10)) {
                chatHistory.push({
                    role: msg.role === "user" ? "user" as const : "model" as const,
                    parts: [{ text: msg.content }],
                });
            }
        }

        const chat = model.startChat({ history: chatHistory });
        const result = await chat.sendMessage(message);
        const reply = result.response.text();

        return NextResponse.json({ reply });
    } catch (error: unknown) {
        const errMsg = error instanceof Error ? error.message : String(error);
        console.error("Chat API error:", errMsg);
        return NextResponse.json({
            reply: `I ran into an issue: ${errMsg.slice(0, 100)}. You can reach Hrushi directly at hrushibhanvadiya@gmail.com!`
        });
    }
}
