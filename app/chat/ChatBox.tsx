'use client';

import { useState } from 'react';

export default function ChatPage() {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function sendMessage() {
    if (!input.trim()) return;
    setLoading(true);
    setMessages((prev) => [...prev, `You: ${input}`]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      if (res.ok && data.text) {
        setMessages((prev) => [...prev, `AI: ${data.text}`]);
      } else {
        const errorMessage = data.error || 'No response from AI.';
        setMessages((prev) => [...prev, `AI: Error: ${errorMessage}`]);
      }
    } catch (err: any) {
      setMessages((prev) => [...prev, 'AI: Oops! Something went wrong with your request.']);
    } finally {
      setLoading(false);
      setInput('');
    }
  }

  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto',
      padding: '20px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'calc(100vh - 80px)'
    }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Simple AI Chat</h1>
      <div style={{
        flexGrow: 1,
        border: '1px solid #dcdcdc',
        borderRadius: '6px',
        padding: '15px',
        marginBottom: '20px',
        overflowY: 'auto',
        backgroundColor: '#fff',
        maxHeight: '400px',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px' 
      }}>
        {messages.length === 0 ? (
          <p style={{ color: '#888', textAlign: 'center', fontStyle: 'italic' }}>Start a conversation!</p>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: msg.startsWith('You:') ? 'flex-end' : 'flex-start',
                width: '100%' 
              }}
            >
              <p
                style={{
                  margin: '0',
                  padding: '10px 15px',
                  borderRadius: '20px',
                  maxWidth: '85%',
                  wordBreak: 'break-word',
                  lineHeight: '1.4',
                  background: msg.startsWith('You:') ? '#e9f7fe' : '#f0f0f0',
                  color: '#333',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.08)'
                }}
              >
                {msg}
              </p>
            </div>
          ))
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !loading) {
              sendMessage();
            }
          }}
          disabled={loading}
          placeholder="Type your message here..."
          style={{
            flexGrow: 1,
            padding: '12px 18px',
            border: '1px solid #ccc',
            borderRadius: '25px',
            fontSize: '1em',
            outline: 'none',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.08)'
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{
            padding: '12px 25px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            fontSize: '1em',
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            opacity: loading || !input.trim() ? 0.6 : 1,
            transition: 'background-color 0.2s ease-in-out'
          }}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}