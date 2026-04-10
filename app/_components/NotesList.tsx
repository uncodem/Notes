import { EntryUI } from "../_lib/Entry";
import NoteEntry from "./NoteEntry";

type NotesListParams = {
    notes: EntryUI[];
    onToggleExpand: (_: number) => void;
    onSelect: (_: number) => void;
    onDelete: (_: number) => void;
    onNoteAdd: () => void;
    onTagAdd: (_: number) => void;
    onTagDelete: (_: number, _2: string) => void;
    onFilterNotes: () => void;
};

export default function NotesList({
    notes,
    onDelete,
    onToggleExpand,
    onSelect,
    onNoteAdd,
    onTagAdd,
    onTagDelete,
    onFilterNotes,
}: NotesListParams) {
    return (
        <div className="bg-gray-100 dark:bg-black h-full text-center">
            <h1 className="text-4xl font-bold dark:text-white">Notes</h1>
            <button onClick={onFilterNotes} className="dark:text-white">Filter</button>
            {notes.map((note) => {
                return (
                    <NoteEntry
                        key={note.id}
                        note={note}
                        onToggleExpand={() => onToggleExpand(note.id)}
                        onSelect={() => onSelect(note.id)}
                        onTagAdd={() => onTagAdd(note.id)}
                        onTagDelete={(tag) => onTagDelete(note.id, tag)}
                        onDelete={() => onDelete(note.id)}
                    ></NoteEntry>
                );
            })}
            <button
                onClick={onNoteAdd}
                className="p-2 border-single border-2 border-white dark:border-black rounded-lg m-2 bg-gray-200 dark:bg-gray-800 dark:text-white"
            >
                + Create Note
            </button>
        </div>
    );
}
