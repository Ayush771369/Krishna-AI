import { useState, useRef, useEffect } from "react";

const GOLD = "#C8972A";
const SAFFRON = "#E8873A";
const DEEP_BLUE = "#0A0E1A";
const PANEL_BG = "#0D1221";
const CARD_BG = "rgba(255,255,255,0.04)";
const BORDER = "rgba(200,151,42,0.18)";

const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
`;

const globalCSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${DEEP_BLUE}; font-family: 'DM Sans', sans-serif; color: #E8E4D9; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(200,151,42,0.3); border-radius: 2px; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.4; transform: scale(0.85); }
    50% { opacity: 1; transform: scale(1.1); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(200,151,42,0.15); }
    50% { box-shadow: 0 0 40px rgba(200,151,42,0.35); }
  }
`;

function OmSymbol({ size = 32, color = GOLD, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={style}>
      <text
        x="50" y="72"
        textAnchor="middle"
        fontSize="72"
        fill={color}
        fontFamily="serif"
        opacity="0.9"
      >ॐ</text>
    </svg>
  );
}

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 5, alignItems: "center", padding: "12px 16px" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: "50%",
          background: GOLD,
          animation: `pulse 1.2s ease-in-out infinite`,
          animationDelay: `${i * 0.2}s`
        }} />
      ))}
    </div>
  );
}

function CitationTag({ text }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: "rgba(200,151,42,0.1)",
      border: `1px solid rgba(200,151,42,0.3)`,
      borderRadius: 20,
      padding: "3px 10px",
      fontSize: 11,
      color: "#D4A84B",
      letterSpacing: "0.03em",
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 500,
      whiteSpace: "nowrap",
      marginRight: 6,
      marginTop: 4,
    }}>
      <span style={{ fontSize: 10, opacity: 0.7 }}>📖</span> {text}
    </span>
  );
}

function Message({ msg, isNew }) {
  const isUser = msg.role === "user";
  return (
    <div style={{
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: 20,
      animation: isNew ? "fadeUp 0.4s ease both" : "none",
      padding: "0 4px",
    }}>
      {!isUser && (
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: `linear-gradient(135deg, rgba(200,151,42,0.25), rgba(232,135,58,0.15))`,
          border: `1px solid rgba(200,151,42,0.35)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, marginRight: 10, marginTop: 2,
        }}>
          <OmSymbol size={20} color={GOLD} />
        </div>
      )}
      <div style={{ maxWidth: "72%", minWidth: 60 }}>
        <div style={{
          background: isUser
            ? `linear-gradient(135deg, rgba(200,151,42,0.22), rgba(232,135,58,0.15))`
            : "rgba(255,255,255,0.05)",
          border: isUser
            ? `1px solid rgba(200,151,42,0.4)`
            : `1px solid rgba(255,255,255,0.08)`,
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          padding: "12px 16px",
          backdropFilter: "blur(12px)",
          fontSize: 14.5,
          lineHeight: 1.7,
          color: isUser ? "#F0E8D0" : "#DDD8C8",
          fontWeight: 300,
        }}>
          {msg.content}
        </div>
        {!isUser && msg.references && msg.references.length > 0 && (
          <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", paddingLeft: 2 }}>
            {msg.references.map((ref, i) => <CitationTag key={i} text={ref} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function Sidebar({ onNewChat, isMobile, onClose }) {
  return (
    <div style={{
      width: isMobile ? "100vw" : 240,
      background: PANEL_BG,
      borderRight: `1px solid ${BORDER}`,
      display: "flex",
      flexDirection: "column",
      padding: "24px 16px",
      gap: 24,
      backdropFilter: "blur(20px)",
      position: isMobile ? "fixed" : "relative",
      top: 0, left: 0, bottom: 0,
      zIndex: isMobile ? 50 : "auto",
    }}>
      {isMobile && (
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16,
          background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 20
        }}>✕</button>
      )}
      <div style={{ textAlign: "center", paddingBottom: 16, borderBottom: `1px solid ${BORDER}` }}>
        <OmSymbol size={40} color={GOLD} style={{ animation: "float 4s ease-in-out infinite" }} />
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 18, fontWeight: 500, color: GOLD,
          letterSpacing: "0.05em", marginTop: 6,
        }}>KRISHNA AI</div>
      </div>
      <button onClick={onNewChat} style={{
        background: `linear-gradient(135deg, rgba(200,151,42,0.2), rgba(232,135,58,0.12))`,
        border: `1px solid rgba(200,151,42,0.4)`,
        borderRadius: 10,
        color: "#D4A84B",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13, fontWeight: 500,
        padding: "10px 16px",
        cursor: "pointer",
        display: "flex", alignItems: "center", gap: 8,
        transition: "all 0.2s",
        letterSpacing: "0.02em",
      }}>
        <span style={{ fontSize: 16 }}>+</span> New Chat
      </button>
      <div style={{
        background: CARD_BG,
        border: `1px solid ${BORDER}`,
        borderRadius: 12,
        padding: "14px",
        flex: 1,
      }}>
        <div style={{ fontSize: 11, color: GOLD, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10, fontWeight: 500 }}>About</div>
        <p style={{ fontSize: 12.5, color: "#9A9488", lineHeight: 1.7, fontWeight: 300 }}>
          Krishna AI channels the eternal wisdom of the Bhagavad Gita, offering guidance rooted in dharma, equanimity, and self-realization.
        </p>
        <div style={{ marginTop: 14, padding: "10px 0", borderTop: `1px solid ${BORDER}` }}>
          <div style={{ fontSize: 11, color: "#7A7468", lineHeight: 1.6, fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif", fontSize: 13 }}>
            "You have the right to perform your actions, but never to the fruits of your actions."
          </div>
          <div style={{ fontSize: 10, color: GOLD, marginTop: 6, opacity: 0.7 }}>— Bhagavad Gita 2.47</div>
        </div>
      </div>
      <div style={{ fontSize: 10, color: "#4A4840", textAlign: "center", letterSpacing: "0.05em" }}>
        KRISHNA AI · DIVINE INTELLIGENCE
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      flex: 1, padding: "40px 24px", textAlign: "center", animation: "fadeUp 0.6s ease both",
    }}>
      <div style={{
        width: 90, height: 90, borderRadius: "50%",
        background: `linear-gradient(135deg, rgba(200,151,42,0.15), rgba(232,135,58,0.08))`,
        border: `1.5px solid rgba(200,151,42,0.35)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 24,
        animation: "glow 3s ease-in-out infinite",
      }}>
        <OmSymbol size={56} color={GOLD} style={{ animation: "float 5s ease-in-out infinite" }} />
      </div>
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(28px, 5vw, 42px)",
        fontWeight: 300,
        color: "#F0E8D0",
        letterSpacing: "0.06em",
        marginBottom: 10,
        background: `linear-gradient(135deg, #E8E0C8, ${GOLD}, ${SAFFRON})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundSize: "200%",
        animation: "shimmer 4s linear infinite",
      }}>
        KRISHNA AI
      </h1>
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 16, color: "#9A9080", fontStyle: "italic",
        letterSpacing: "0.04em", marginBottom: 40, fontWeight: 300,
      }}>
        Wisdom Inspired by the Bhagavad Gita
      </p>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 12, maxWidth: 600, width: "100%",
      }}>
        {[
          { icon: "🌸", title: "Dharma & Duty", desc: "Understand your righteous path" },
          { icon: "🪷", title: "Inner Peace", desc: "Find equanimity amidst chaos" },
          { icon: "✨", title: "Self-Realization", desc: "Discover your true nature" },
        ].map((item, i) => (
          <div key={i} style={{
            background: CARD_BG,
            border: `1px solid ${BORDER}`,
            borderRadius: 12,
            padding: "16px",
            animation: `fadeUp 0.6s ease ${0.15 + i * 0.1}s both`,
            backdropFilter: "blur(10px)",
          }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{item.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#D4C8A8", marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 12, color: "#6A6458", lineHeight: 1.5 }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 36, fontSize: 13, color: "#5A5448", letterSpacing: "0.05em" }}>
        Ask anything · Receive timeless wisdom
      </p>
    </div>
  );
}

export default function KrishnaAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newMsgIndex, setNewMsgIndex] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    const userMsg = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setNewMsgIndex(messages.length);
    setIsLoading(true);
    try {
      const res = await fetch("https://krishna-ai-production-7b0a.up.railway.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const aiMsg = {
        role: "assistant",
        content: data.response,
        references: data.references || [],
      };
      setMessages(prev => {
        setNewMsgIndex(prev.length);
        return [...prev, aiMsg];
      });
    } catch {
      setMessages(prev => {
        setNewMsgIndex(prev.length);
        return [...prev, {
          role: "assistant",
          content: "The divine connection is momentarily disrupted. Please ensure the backend is running and try again.",
          references: [],
        }];
      });
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const newChat = () => {
    setMessages([]);
    setNewMsgIndex(-1);
    setSidebarOpen(false);
  };

  return (
    <>
      <style>{fonts + globalCSS}</style>
      <div style={{
        display: "flex", height: "100vh", width: "100vw",
        background: DEEP_BLUE, overflow: "hidden", position: "relative",
      }}>
        {/* Ambient background */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          background: `
            radial-gradient(ellipse 60% 50% at 20% 20%, rgba(200,151,42,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 80% 80%, rgba(10,20,60,0.8) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 60% 10%, rgba(232,135,58,0.04) 0%, transparent 50%)
          `,
        }} />

        {/* Sidebar (desktop always visible, mobile overlay) */}
        {!isMobile && (
          <Sidebar onNewChat={newChat} isMobile={false} />
        )}
        {isMobile && sidebarOpen && (
          <Sidebar onNewChat={newChat} isMobile={true} onClose={() => setSidebarOpen(false)} />
        )}

        {/* Main area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", zIndex: 1, minWidth: 0 }}>
          {/* Top bar */}
          <div style={{
            height: 56,
            borderBottom: `1px solid ${BORDER}`,
            display: "flex", alignItems: "center", padding: "0 20px",
            justifyContent: "space-between",
            background: "rgba(10,14,26,0.7)",
            backdropFilter: "blur(20px)",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {isMobile && (
                <button onClick={() => setSidebarOpen(true)} style={{
                  background: "none", border: "none", color: "#888", cursor: "pointer",
                  fontSize: 20, marginRight: 4, padding: 4,
                }}>☰</button>
              )}
              <OmSymbol size={24} color={GOLD} />
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 17, fontWeight: 500, color: GOLD, letterSpacing: "0.05em",
              }}>KRISHNA AI</span>
            </div>
            <span style={{
              fontSize: 11, color: "#6A6458", letterSpacing: "0.08em",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
              display: isMobile ? "none" : "block",
            }}>
              WISDOM INSPIRED BY THE BHAGAVAD GITA
            </span>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "#3ECF8E",
              boxShadow: "0 0 8px rgba(62,207,142,0.5)",
            }} />
          </div>

          {/* Chat area */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 0 8px" }}>
            {messages.length === 0 ? (
              <HeroSection />
            ) : (
              <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 20px" }}>
                {messages.map((msg, i) => (
                  <Message key={i} msg={msg} isNew={i === newMsgIndex} />
                ))}
                {isLoading && (
                  <div style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    marginBottom: 20, animation: "fadeUp 0.3s ease",
                  }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: "50%",
                      background: `linear-gradient(135deg, rgba(200,151,42,0.25), rgba(232,135,58,0.15))`,
                      border: `1px solid rgba(200,151,42,0.35)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <OmSymbol size={20} color={GOLD} />
                    </div>
                    <div style={{
                      background: "rgba(255,255,255,0.05)",
                      border: `1px solid rgba(255,255,255,0.08)`,
                      borderRadius: "18px 18px 18px 4px",
                      backdropFilter: "blur(12px)",
                    }}>
                      <TypingDots />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            )}
          </div>

          {/* Input area */}
          <div style={{
            borderTop: `1px solid ${BORDER}`,
            padding: "16px 20px",
            background: "rgba(10,14,26,0.85)",
            backdropFilter: "blur(24px)",
            flexShrink: 0,
          }}>
            <div style={{ maxWidth: 760, margin: "0 auto" }}>
              <div style={{
                display: "flex", gap: 10, alignItems: "flex-end",
                background: "rgba(255,255,255,0.04)",
                border: `1px solid rgba(200,151,42,0.25)`,
                borderRadius: 16,
                padding: "10px 14px",
                backdropFilter: "blur(10px)",
                transition: "border-color 0.2s",
              }}
                onFocus={e => e.currentTarget.style.borderColor = "rgba(200,151,42,0.5)"}
                onBlur={e => e.currentTarget.style.borderColor = "rgba(200,151,42,0.25)"}
              >
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={e => {
                    setInput(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                  }}
                  onKeyDown={handleKey}
                  placeholder="Seek divine wisdom..."
                  style={{
                    flex: 1, background: "none", border: "none", outline: "none",
                    color: "#E0D8C0", fontSize: 14, lineHeight: 1.6,
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                    resize: "none", maxHeight: 120, overflowY: "auto",
                    caretColor: GOLD,
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  style={{
                    width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                    background: input.trim() && !isLoading
                      ? `linear-gradient(135deg, ${GOLD}, ${SAFFRON})`
                      : "rgba(255,255,255,0.06)",
                    border: "none", cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s", opacity: input.trim() && !isLoading ? 1 : 0.4,
                    transform: "translateY(-1px)",
                  }}
                >
                  {isLoading ? (
                    <div style={{
                      width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff", borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }} />
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
              <p style={{ textAlign: "center", fontSize: 10.5, color: "#3A3830", marginTop: 8, letterSpacing: "0.04em" }}>
                Connect backend at localhost:8000 · Press Enter to send
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}