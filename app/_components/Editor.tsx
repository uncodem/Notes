import {EntryUI} from "../_lib/Entry";

type EditorProps = {
    currentNote: EntryUI | null | undefined;
    onContentChange: (_: string) => void;
};

export default function Editor({currentNote, onContentChange}: EditorProps) {
    if (!currentNote) {
        return <textarea className="w-full h-full p-4 bg-gray-50 resize-none outline-none" disabled={true} value="" placeholder="Select or create a note to start editing..."/>
    }
    return (
        <textarea className="w-full h-full p-4 bg-white resize-none outline-none" value={currentNote.content || ""} onChange={(e) => onContentChange(e.target.value)}/>
    )
}
