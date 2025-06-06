import { notesInputCheck, NotesInputType } from "./notesync.schema";

const dummyNotes = [
  { id: "1", title: "Plan", content: "Future work panrathu" },
  { id: "2", title: "Team Meet", content: "Daily discussion summary" },
  { id: "3", title: "List", content: "Soap, Brush, Charger" },
  { id: "4", title: "Ideas", content: "AI related thoughts" },
];

export async function listNotes(input: NotesInputType) {
  const check = notesInputCheck.safeParse(input);
  if (!check.success) {
    throw new Error("Input sari illa da: " + JSON.stringify(check.error.format()));
  }

  const { query, maxResults } = check.data;

  let data = dummyNotes;

  if (query) {
    data = data.filter((one) =>
      one.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (maxResults) {
    data = data.slice(0, maxResults);
  }

  return data;
}
