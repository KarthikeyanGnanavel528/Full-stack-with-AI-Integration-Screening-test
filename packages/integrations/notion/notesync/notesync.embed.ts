export function embedNote(note: { id: string; title: string }) {
  return `<div><b>${note.title}</b></div>`;
}
