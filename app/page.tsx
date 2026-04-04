'use client';
import {useEffect, useState} from "react";
import NotesList from "./_components/NotesList";
import {Entry} from "./_lib/Entry";

function save(v: object) {
  console.log("Autosave : ", {v})
}

export default function Page() {

  const [notes, setNotes] = useState<Entry[]>([
    {
      id: 1,
      title: "First note",
      content: "Hello, World!",
      tags: ["work"],
      expanded: false
    },
    {
      id: 2,
      title: "Second note",
      content: "Yet another notes app",
      tags: ["personal", "yet again"],
      expanded: false
    }
  ]);

  const [selectedNote, setSelectedNote] = useState<number | null>(null);

  const currentNote = notes.find(n => n.id === selectedNote);
  const noteId = currentNote?.id;
  const content = currentNote?.content;

  useEffect(() => {
    if (!noteId) return;
    const id = noteId;
    const timeout = setTimeout(() => save({id, content}), 2000);
    return () => {
      if (id !== selectedNote) save({id, content});
      clearTimeout(timeout);
    }
  }, [noteId, content, selectedNote]);


  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <div className="border-r">
        <NotesList notes={notes} onToggleExpand={(id: number) => {
          setNotes(prev => 
            prev.map(n => n.id === id ? {...n, expanded: !n.expanded} : n)
          );
        }} onSelect={(id: number) => setSelectedNote(id)}/>
      </div>
      <div>
        <textarea className="w-full h-full p-4 bg-white" disabled={currentNote === null} value={currentNote?.content || ""} onChange={(e) => {
          const value = e.target.value;
          setNotes(prev => prev.map(n => n.id === selectedNote ? {...n, content: value} : n))
        }}/>
      </div>
    </div>
  );
}
