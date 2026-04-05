import {NextRequest} from "next/server";
import {notes} from "@/app/_lib/dummy";

export async function POST(req: NextRequest, {params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const noteId = Number(id);

    const idx = notes.findIndex(e => e.id === noteId);
    if (idx == -1) return Response.json({ok: false, error: "Not found"}, {status: 404});

    const {tag} = await req.json();

    if (typeof tag !== "string" || tag.trim() == "") return Response.json({ok: false, error: "Invalid tag"}, {status: 400});

    const normalized = tag.toLowerCase().trim();

    if (!notes[idx].tags.includes(normalized)) {
        notes[idx].tags.push(normalized);
    }

    return Response.json({ok: true});
}
