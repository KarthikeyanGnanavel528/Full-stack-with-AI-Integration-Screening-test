"use client";

import { useState } from "react";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    setLoading(true);

    // Add user's message
    setMessages((prev) => [...prev, `You: ${input}`]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, `AI: ${data.reply}`]);
    } catch {
      setMessages((prev) => [...prev, "AI: Sorry, error happened."]);
    } finally {
      setLoading(false);
      setInput("");
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h1>Simple AI Chat</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: 10,
          minHeight: 200,
          marginBottom: 10,
          overflowY: "auto",
        }}
      >
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
        style={{ width: "80%", padding: 8 }}
        placeholder="Type your message"
      />
      <button onClick={sendMessage} disabled={loading} style={{ padding: 8, marginLeft: 8 }}>
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
