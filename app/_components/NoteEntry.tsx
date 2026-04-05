import {Entry} from "../_lib/Entry";
import {MouseEventHandler} from "react";

type NotesEntryParams = {
    note: Entry,
    onToggleExpand: MouseEventHandler,
    onSelect: MouseEventHandler,
};

export default function NoteEntry({note, onToggleExpand, onSelect}: NotesEntryParams) {
    return (
        <div className="p-2 border-single border-2 border-white rounded-lg m-2 bg-gray-200">
            <div className="flex justify-between">
                <button onClick={onSelect}>{note.title}</button>
                <br/>
            {note.expanded && (
                <div className="mt-2 text-left">
                    {note.tags.map(tag => (
                        <div key={tag}>
                            <span className="mr-2 text-sm grid gap-1 grid-cols-[1fr_30px]">
                                #{tag}
                                <button className="bg-red-300">-</button>
                            </span>
                        </div>
                    ))}
                    <button className="text-sm text-center w-24 mr-2 bg-green-300 ">+</button>
                </div>
            )}
                <button onClick={onToggleExpand} className="h-full text-center">{note.expanded ? "-" : "+"}</button>
            </div>
        </div>
    );
}
