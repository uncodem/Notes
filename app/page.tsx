'use client';
import {useEffect, useState} from "react";
import NotesList from "./_components/NotesList";

export default function Page() {

  const [notes, setNotes] = useState([
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
  const [contents, setContent] = useState("");
  const [debounced, setDebounced] = useState(contents);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(contents)
    }, 2000);
    return () => clearTimeout(timeout);
  }, [contents]);

  useEffect(() => {
    if (!debounced) return
    console.log("Autosave: ", debounced);
  }, [debounced]);

  const currentNote = notes.find(n => n.id === selectedNote);

  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <div className="border-r">
        <NotesList notes={notes} onToggleExpand={(id) => {
          setNotes(prev => 
            prev.map(n => n.id === id ? {...n, expanded: !n.expanded} : n)
          );
        }} onSelect={(id) => setSelectedNote(id)}/>
      </div>
      <div>
        <textarea className="w-full h-full p-4" value={currentNote?.content || ""} onChange={(e) => setContent(e.target.value)}/>
      </div>
    </div>
  );
}
