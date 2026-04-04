import {Entry} from "../_lib/Entry";
import NoteEntry from "./NoteEntry";

type NotesListParams = {
    notes: Entry[],
    onToggleExpand: (_: number) => void,
    onSelect: (_: number) => void,
};

export default function NotesList({notes, onToggleExpand, onSelect}: NotesListParams) {
    return (
        <div className="bg-gray-180 h-full text-center">
            <h1 className="text-4xl font-bold">Notes</h1>
            {notes.map(note => {
                return <NoteEntry key={note.id} note={note} onToggleExpand={() => onToggleExpand(note.id)} onSelect={() => onSelect(note.id)}></NoteEntry>
            })}
        </div>
    );
}
