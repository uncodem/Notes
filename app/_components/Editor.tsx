import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {EntryUI} from "../_lib/Entry";

type EditorProps = {
    currentNote: EntryUI | null | undefined;
    onContentChange: (_: string) => void;
    onRename: (id: number, newTitle: string) => void;
};

export default function Editor({currentNote, onRename, onContentChange}: EditorProps) {
    const [preview, setPreview] = useState(false);

    if (!currentNote) {
        return <textarea className="w-full h-full p-4 bg-gray-50 dark:bg-black dark:text-white resize-none outline-none" disabled={true} value="" placeholder="Select or create a note to start editing..."/>
    }

    function handleRename() {
        if (!currentNote) return;
        const newTitle = prompt("Rename note: ", currentNote?.title);
        if (newTitle && newTitle.trim() !== "") {
            onRename(currentNote.id, newTitle);
        }
    }

    return (
        <div className="flex flex-col h-full bg-white dark:bg-black w-full">
            <div className="flex-none h-14 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center px-4">
                <div className="w-20"/>
                <button onClick={handleRename} className="font-bold text-lg hover:underline truncate max-w-sm dark:text-white" title="Click to rename">{currentNote.title}</button>
                <button onClick={() => setPreview(!preview)} className="w-20 px-3 py-11 bg-gray-200 dark:bg-gray-800 dark:text-gray-200 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
                    {preview ? "Edit" : "Preview"}
                </button>
            </div>
            <div className="flex-1 min-h-0 w-full relative">
                { preview ? (
                    <div className="w-full h-full prose dark:prose-invert max-w-none dark:bg-black p-4 overflow-y-auto pt-12">
                        <ReactMarkdown>{currentNote.content}</ReactMarkdown>
                    </div>
                ) :
                    (<textarea className="w-full h-full p-4 bg-white dark:text-white dark:bg-black resize-none outline-none" value={currentNote.content || ""} onChange={(e) => onContentChange(e.target.value)}/>)
                }
            </div>
        </div>
    )
}
