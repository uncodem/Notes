'use client';
import {useEffect, useState} from "react";
import NotesList from "./_components/NotesList";

export default function Page() {

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

  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <div className="border-r">
        <NotesList />
      </div>
      <div>
        <textarea className="w-full h-full p-4" value={contents} onChange={(e) => setContent(e.target.value)}/>
      </div>
    </div>
  );
}
