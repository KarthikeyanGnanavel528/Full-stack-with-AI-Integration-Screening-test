'use client';

import { useState } from 'react';

export default function TodoTestPage() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  async function fetchTodos() {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  }

  async function addTodo() {
    if (!title.trim()) {
      setMessage('Please enter a title!');
      return;
    }

    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    const newTodo = await res.json();
    setMessage(`Todo added: ${newTodo.title}`);
    setTitle('');
    fetchTodos();
  }

  return (
    <div style={{ maxWidth: 500, margin: '30px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Todo API Test</h1>

      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <button
          onClick={fetchTodos}
          style={{ padding: '8px 15px', cursor: 'pointer' }}
        >
          Show Todos (GET)
        </button>
      </div>

      <ul style={{ paddingLeft: 0, listStyleType: 'none' }}>
        {todos.map((todo: any) => (
          <li key={todo.id} style={{ padding: '6px 0', borderBottom: '1px solid #ccc' }}>
            {todo.title} - {todo.completed ? 'Done' : 'Not done'}
          </li>
        ))}
      </ul>

      <hr style={{ margin: '25px 0' }} />

      <h3>Add a Todo (POST)</h3>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ flex: 1, padding: 8, fontSize: 14 }}
        />
        <button
          onClick={addTodo}
          style={{ padding: '8px 15px', cursor: 'pointer' }}
        >
          Add Todo
        </button>
      </div>

      {message && (
        <p style={{ marginTop: 12, fontWeight: 'bold' }}>{message}</p>
      )}
    </div>
  );
}
