This is a [Next.js](https://nextjs.org) full stack project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

It includes 4 parts:
- ✅ Part 1 – Simple REST API (GET & POST methods for Todos)
- ✅ Part 2 – Integration with Notion API using Zod validation
- ✅ Part 3 – AI Chat with OpenAI API
- ✅ Part 4 – PDF answer upload (you can check the PDF inside project folder)

---

Getting Started

First, install the dependencies:

npm install

Then, run the development server:

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
Now open http://localhost:3000 in your browser to check the app.

📦 Project Parts
▶️ Part 1 – REST API with Frontend (GET & POST for todos)
app/page.tsx → Contains buttons and input for getting and adding todos.

API routes:

app/api/todos/route.ts → GET and POST methods.

Visit home page http://localhost:3000

Click Get Todos or type and add your own.

▶️ Part 2 – Notion Integration with Validation
Notion-related logic:

packages/integrations/notion/notesync/notesync.functions.ts

notesync.schema.ts and notesync.embed.ts

API route:

app/api/notesync/list/route.ts (uses GET method with query params like ?query=value)

Try example:


http://localhost:3000/api/notesync/list?query=hello&maxResults=2
▶️ Part 3 – AI Chat using OpenAI
Frontend component:

app/chat/page.tsx

API route:

app/api/chat/route.ts

Page:

app/chat/page.tsx → Go to http://localhost:3000/chat

Type your message, click send, and wait for AI reply.

⚠️ Note: If you see 429 error, the OpenAI key quota may be finished.

▶️ Part 4 – PDF Answer
One PDF file is uploaded inside the folder itself (part-3_and_part-4.pdf)

