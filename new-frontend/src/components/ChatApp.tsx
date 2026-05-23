import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Plus, BookOpen, Feather } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  references?: string[];
};

const SUGGESTIONS = [
  "How do I find inner peace amid chaos?",
  "What does the Gita say about purpose?",
  "How to act without attachment to results?",
  "Teach me about the eternal soul",
];

export function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://krishna-ai-production-7b0a.up.railway.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.response ?? "...",
          references: data.references ?? [],
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "I could not reach the wisdom source right now. Please ensure the backend at 127.0.0.1:8000 is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const newChat = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-hero">
      {/* Ambient aura */}
      <div className="pointer-events-none absolute inset-0 bg-aura animate-float" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />

      {/* Sidebar */}
      <aside
        className={`absolute z-30 h-full w-72 transform border-r border-border/60 glass transition-transform duration-300 md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-5">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-gradient shadow-glow">
              <Feather className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-xl leading-none text-gold-gradient">Krishna AI</h1>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Gita Wisdom
              </p>
            </div>
          </div>

          <button
            onClick={newChat}
            className="group flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/60 hover:bg-primary/10 hover:shadow-glow"
          >
            <Plus className="h-4 w-4 text-primary transition-transform group-hover:rotate-90" />
            New Chat
          </button>

          <div className="mt-10 flex-1 space-y-6 overflow-y-auto pr-1">
            <section>
              <h2 className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <BookOpen className="h-3.5 w-3.5 text-primary" /> About
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Krishna AI is a contemplative companion drawing wisdom from the
                <span className="text-foreground"> Bhagavad Gita</span>. Ask any question
                about life, purpose, or the self — receive answers grounded in timeless
                verse.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Try asking
              </h2>
              <div className="space-y-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="w-full rounded-lg border border-border/50 bg-card/40 px-3 py-2 text-left text-xs text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </section>
          </div>

          <p className="mt-6 text-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60">
            ॐ • Eternal Wisdom
          </p>
        </div>
      </aside>

      {/* Main */}
      <main className="relative z-10 flex flex-1 flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-border/40 px-5 py-4 md:px-8">
          <button
            onClick={() => setSidebarOpen((s) => !s)}
            className="rounded-lg border border-border/60 px-3 py-1.5 text-xs text-muted-foreground transition hover:text-foreground md:hidden"
          >
            Menu
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-display text-lg text-gold-gradient">Krishna AI</span>
          </div>
          <div className="hidden text-xs text-muted-foreground md:block">
            Wisdom Inspired by the Bhagavad Gita
          </div>
          <div className="md:hidden w-12" />
        </header>

        {/* Chat region */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-8 md:px-8">
          {messages.length === 0 ? (
            <Hero onPick={sendMessage} />
          ) : (
            <div className="mx-auto flex max-w-3xl flex-col gap-6">
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
              {loading && <TypingIndicator />}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-border/40 bg-background/40 px-4 py-4 backdrop-blur-xl md:px-8 md:py-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="mx-auto flex max-w-3xl items-end gap-3"
          >
            <div className="relative flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
                rows={1}
                placeholder="Ask Krishna anything…"
                className="w-full resize-none rounded-2xl border border-border/60 bg-card/60 px-5 py-4 pr-14 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-primary/60 focus:shadow-glow"
                style={{ maxHeight: "180px" }}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-gradient text-primary-foreground shadow-glow transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            >
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
          <p className="mx-auto mt-3 max-w-3xl text-center text-[11px] text-muted-foreground/60">
            Krishna AI offers reflections, not religious authority. Verses are paraphrased.
          </p>
        </div>
      </main>
    </div>
  );
}

function Hero({ onPick }: { onPick: (s: string) => void }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center pt-10 text-center animate-fade-up md:pt-20">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gold-gradient shadow-glow">
        <Feather className="h-9 w-9 text-primary-foreground" />
      </div>
      <p className="mb-3 text-xs uppercase tracking-[0.35em] text-primary/80">
        ॐ Namo Bhagavate
      </p>
      <h1 className="font-display text-5xl leading-tight text-gold-gradient md:text-7xl">
        Krishna AI
      </h1>
      <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
        Wisdom Inspired by the Bhagavad Gita — a calm space to reflect, question,
        and discover the timeless within the timely.
      </p>

      <div className="mt-12 grid w-full grid-cols-1 gap-3 md:grid-cols-2">
        {SUGGESTIONS.map((s, i) => (
          <button
            key={s}
            onClick={() => onPick(s)}
            className="group rounded-2xl border border-border/60 bg-card/40 p-4 text-left text-sm text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-card/70 hover:text-foreground hover:shadow-card animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <Sparkles className="mb-2 h-4 w-4 text-primary opacity-70 group-hover:opacity-100" />
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div
      className={`flex animate-fade-up ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex max-w-[85%] flex-col gap-3 ${isUser ? "items-end" : "items-start"}`}>
        {!isUser && (
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary/80">
            <Feather className="h-3 w-3" /> Krishna
          </div>
        )}
        <div
          className={
            isUser
              ? "rounded-2xl rounded-br-md bg-gold-gradient px-5 py-3 text-sm text-primary-foreground shadow-card"
              : "rounded-2xl rounded-bl-md border border-border/60 bg-card/70 px-5 py-4 text-[15px] leading-relaxed text-foreground backdrop-blur-xl shadow-card"
          }
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>

        {!isUser && message.references && message.references.length > 0 && (
          <div className="flex flex-wrap gap-2 pl-1">
            {message.references.map((ref) => (
              <span
                key={ref}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-medium text-primary transition hover:border-primary/60 hover:bg-primary/10"
              >
                <BookOpen className="h-3 w-3" />
                {ref}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex animate-fade-up justify-start">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary/80">
          <Feather className="h-3 w-3" /> Krishna is reflecting
        </div>
        <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-border/60 bg-card/70 px-5 py-4 shadow-card backdrop-blur-xl">
          <span className="h-2 w-2 animate-shimmer rounded-full bg-primary" style={{ animationDelay: "0ms" }} />
          <span className="h-2 w-2 animate-shimmer rounded-full bg-primary" style={{ animationDelay: "200ms" }} />
          <span className="h-2 w-2 animate-shimmer rounded-full bg-primary" style={{ animationDelay: "400ms" }} />
        </div>
      </div>
    </div>
  );
}
