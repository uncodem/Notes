import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {EntryUI} from "../_lib/Entry";

type EditorProps = {
    currentNote: EntryUI | null | undefined;
    onContentChange: (_: string) => void;
};

export default function Editor({currentNote, onContentChange}: EditorProps) {
    const [preview, setPreview] = useState(false);

    if (!currentNote) {
        return <textarea className="w-full h-full p-4 bg-gray-50 dark:bg-black dark:text-white resize-none outline-none" disabled={true} value="" placeholder="Select or create a note to start editing..."/>
    }

    return (
        <div className="flex flex-col h-full bg-white relative">
            <button onClick={() => setPreview(!preview)} className="absolute top-2 right-4 px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300 transition-colors z-10">
                {preview ? "Edit" : "Preview"}
            </button>
            { preview ? (
                <div className="w-full h-full prose dark:prose-invert max-w-none dark:bg-black p-4 overflow-y-auto pt-12">
                    <ReactMarkdown>{currentNote.content}</ReactMarkdown>
                </div>
            ) :
                (<textarea className="w-full h-full p-4 bg-white dark:text-white dark:bg-black resize-none outline-none" value={currentNote.content || ""} onChange={(e) => onContentChange(e.target.value)}/>)
            }
        </div>
    )
}
