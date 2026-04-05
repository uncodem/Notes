'use client';
import {useEffect, useState, useRef} from "react";
import NotesList from "./_components/NotesList";
import {Entry, EntryUI} from "./_lib/Entry";

function save(v: object) {
  console.log("Autosave : ", {v})
}

export default function Page() {

  const [notes, setNotes] = useState<EntryUI[]>([]);

  const [selectedNote, setSelectedNote] = useState<number | null>(null);

  const currentNote = notes.find(n => n.id === selectedNote);
  const noteId = currentNote?.id;
  const content = currentNote?.content;

  const prevNoteRef = useRef<{id: number | null, content: string | undefined }>({
      id: null,
      content: undefined
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function clearTimeoutRef() {
    if (!timeoutRef.current) return;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }

  useEffect(() => {
    async function fn() {
      const res = await fetch("/api/notes");
      const entries = await res.json();
      setNotes(entries.map((e: Entry) => ({...e, expanded: false})));
    }
    fn();
  }, []);

  useEffect(() => {
    if (!noteId) return;
    if (timeoutRef.current) clearTimeoutRef();
    timeoutRef.current = setTimeout(() => save({id: noteId, content, time: Date.now()}), 2000);
    return () => {
      if (timeoutRef.current) clearTimeoutRef();
    };
  }, [noteId, content]);

  useEffect(() => {
    prevNoteRef.current = {id: noteId ?? null, content};
  }, [noteId, content]);

  async function onNoteAdd() {
    const name = prompt("Name of the note : ");
    const title = name ? name : `Untitled-Note`;

    const res = await fetch("/api/notes", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({title})});
    const {ok, entry} = await res.json();
    if (ok) {
      setNotes(prev => [...prev, entry]);
    }
  }

  function onTagAdd(id: number) {
    let tag = prompt("Tag name?");
    if (!tag) return;
    tag = tag.toLowerCase();
    setNotes(prev => prev.map(e => {
      return e.id === id ? {...e, tags: e.tags.includes(tag) ? e.tags : [...e.tags, tag] } : e;
    }));
  }

  function onTagDelete(id: number, tag: string) {
    setNotes(prev => prev.map(e => {
      return e.id === id ? {...e, tags: e.tags.filter(t => t !== tag)} : e;
    }));
  } 

  function handleSelect(id: number) {
    const prev = prevNoteRef.current;
    if (timeoutRef.current) clearTimeoutRef();
    if (prev.id !== null) {
      save({
        id: prev.id,
        content: prev.content,
        time: Date.now(),
      });
    }
    setSelectedNote(id);
  }

  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <div className="border-r">
        <NotesList notes={notes} onNoteAdd={onNoteAdd} onToggleExpand={(id: number) => {
          setNotes(prev => 
            prev.map(n => n.id === id ? {...n, expanded: !n.expanded} : n)
          );
        }} onSelect={handleSelect} onTagAdd={onTagAdd} onTagDelete={onTagDelete}/>
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
