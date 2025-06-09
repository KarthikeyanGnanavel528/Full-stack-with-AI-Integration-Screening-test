'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '2rem' }}>Internship Screening Test – Dashboard</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: '0 auto' }}>
        <button onClick={() => router.push('/todo-test')} style={buttonStyle}>Part 1: TODO API</button>
        <button onClick={() => router.push('/notes')} style={buttonStyle}>Part 2: Notion Notesync</button>
        <button onClick={() => router.push('/chat')} style={buttonStyle}>Part 3: AI Chat Interface</button>
        <button onClick={() => router.push('/summary')} style={buttonStyle}>Part 4: Developer Mindset</button>
      </div>
    </main>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: '0.75rem 1rem',
  fontSize: '1rem',
  borderRadius: '8px',
  backgroundColor: '#0070f3',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  transition: 'background 0.3s ease',
};
