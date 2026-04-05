import {NextRequest} from "next/server";
import {notes} from "@/app/_lib/dummy";

export async function DELETE(req: NextRequest, {params}: {params: Promise<{id: string, tagName: string}>}) {
    const {id, tagName} = await params;
    const noteId = Number(id);

    const idx = notes.findIndex(e => e.id === noteId);
    if (idx === -1) return Response.json({ok: false, error: "Note not found"}, {status: 404});

    const normalized = tagName.toLowerCase().trim();

    const entry = notes[idx];
    const tagIdx = entry.tags.findIndex(t => t === normalized);
    if (tagIdx === -1) return Response.json({ok: false, error: "Tag not found"}, {status: 404});

    entry.tags.splice(tagIdx,1);

    return Response.json({ok: true});
}
