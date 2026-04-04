import {Entry} from "../_lib/Entry";
import {MouseEventHandler} from "react";

type NotesEntryParams = {
    note: Entry,
    onToggleExpand: MouseEventHandler,
    onSelect: MouseEventHandler,
};

export default function NoteEntry({note, onToggleExpand, onSelect}: NotesEntryParams) {
    return (
        <div className="p-2 border b">
            <div className="flex justify-between">
                <button onClick={onSelect}>{note.title}</button>
                <button onClick={onToggleExpand}>{note.expanded ? "-" : "+"}</button>
                
            {note.expanded && (
                <div className="mt-2">
                    {note.tags.map(tag => (
                        <div key={tag}>
                            <span className="mr-2 text-sm">
                                #{tag}
                            </span>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>
    );
}
