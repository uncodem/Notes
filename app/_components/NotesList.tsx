import {EntryUI} from "../_lib/Entry";
import NoteEntry from "./NoteEntry";

type NotesListParams = {
    notes: EntryUI[],
    onToggleExpand: (_: number) => void,
    onSelect: (_: number) => void,
    onDelete: (_: number) => void,
    onNoteAdd: () => void,
    onTagAdd: (_: number) => void,
    onTagDelete: (_: number, _2: string) => void,
};

export default function NotesList({notes, onDelete, onToggleExpand, onSelect, onNoteAdd, onTagAdd, onTagDelete}: NotesListParams) {
    return (
        <div className="bg-gray-100 h-full text-center">
            <h1 className="text-4xl font-bold">Notes</h1>
            {notes.map(note => {
                return <NoteEntry key={note.id} note={note} 
                            onToggleExpand={() => onToggleExpand(note.id)} 
                            onSelect={() => onSelect(note.id)}
                            onTagAdd={() => onTagAdd(note.id)}
                            onTagDelete={(tag) => onTagDelete(note.id, tag)}
                            onDelete={() => onDelete(note.id)}></NoteEntry>
            })}
            <button onClick={onNoteAdd} className="p-2 border-single border-2 border-white rounded-lg m-2 bg-gray-200">+ Create Note</button>
        </div>
    );
}
