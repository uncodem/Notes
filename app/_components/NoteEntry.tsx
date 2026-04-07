import {EntryUI} from "../_lib/Entry";

type NotesEntryParams = {
    note: EntryUI,
    onDelete: () => void,
    onToggleExpand: () => void,
    onSelect: () => void,
    onTagAdd: () => void,
    onTagDelete: (_: string) => void,
};

export default function NoteEntry({note, onDelete, onToggleExpand, onSelect, onTagAdd, onTagDelete}: NotesEntryParams) {
    return (
        <div className="p-2 border-single border-2 border-white rounded-lg m-2 bg-gray-200">
            <div className="flex justify-between">
                <button onClick={onDelete}>X</button>
                <button onClick={onSelect}>{note.title}</button>
                <br/>
            {note.expanded && (
                <div className="mt-2 text-left">
                    {note.tags.length === 0 && (
                        <div className="text-sm text-gray-500">No Tags</div>
                    )}
                    {note.tags.map(tag => (
                        <div key={tag} className="mr-2 text-sm grid gap-1 grid-cols-[1fr_30px]">
                            #{tag}
                            <button className="bg-red-300" onClick={() => onTagDelete(tag)}>-</button>
                        </div>
                    ))}
                    <button className="text-sm text-center w-24 mr-2 bg-green-300" onClick={onTagAdd}>+</button>
                </div>
            )}
                <button onClick={onToggleExpand} className="text-center h-full p-1">{note.expanded ? "-" : "+"}</button>
            </div>
        </div>
    );
}
