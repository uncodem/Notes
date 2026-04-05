import {Entry} from "../_lib/Entry";
import NoteEntry from "./NoteEntry";

type NotesListParams = {
    notes: Entry[],
    onToggleExpand: (_: number) => void,
    onSelect: (_: number) => void,
    onNoteAdd: () => void,
};

export default function NotesList({notes, onToggleExpand, onSelect, onNoteAdd}: NotesListParams) {
    return (
        <div className="bg-gray-180 h-full text-center">
            <h1 className="text-4xl font-bold">Notes</h1>
            {notes.map(note => {
                return <NoteEntry key={note.id} note={note} onToggleExpand={() => onToggleExpand(note.id)} onSelect={() => onSelect(note.id)}></NoteEntry>
            })}
            <button onClick={onNoteAdd} className="p-2 border-single border-2 border-white rounded-lg m-2 bg-gray-200">+ Create Note</button>
        </div>
    );
}
