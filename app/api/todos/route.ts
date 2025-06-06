import { NextResponse } from 'next/server';
type Todo = {
  id: number;
  title: string;
  completed: boolean;
};
let todos: Todo[] = [
  { id: 1, title: 'Read for Iot Examination', completed: false },
  { id: 2, title: 'Sleep for 7 hours', completed: true }
];
export async function GET() {
  return NextResponse.json(todos);
}
export async function POST(req: Request) {
  const body = await req.json();

  const newTodo: Todo = {
    id: todos.length + 1,
    title: body.title,
    completed: false
  };

  todos.push(newTodo);

  return NextResponse.json(newTodo, { status: 201 });
}

