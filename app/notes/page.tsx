'use client';

import { useEffect, useState } from 'react';

type Note = {
  id: string;
  title: string;
  content: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/notesync/list')
      .then((res) => res.json())
      .then((data) => {
        setNotes(data.data); // access the "data" field from your JSON
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch notes:', err);
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Part 2 – Notion Notesync Results</h1>

      {loading ? (
        <p>Loading notes...</p>
      ) : notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notes.map((note) => (
            <li key={note.id} style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>{note.title}</h3>
              <p>{note.content}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
