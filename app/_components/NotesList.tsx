'use client';

import NoteEntry from "./NoteEntry";

export default function NotesList({notes, onToggleExpand, onSelect}) {
    return (
        <div>
            {notes.map(note => {
                return <NoteEntry key={note.id} note={note} onToggleExpand={() => onToggleExpand(note.id)} onSelect={() => onSelect(note.id)}></NoteEntry>
            })}
        </div>
    );
}
