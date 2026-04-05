import {NextRequest} from "next/server";
import {tagNote, getFullNote} from "@/app/_lib/db";

export async function POST(req: NextRequest, {params}: {params: Promise<{id: string}>}) {
    try {
        const {id} = await params;
        const noteId = Number(id);

        const {tag} = await req.json();

        if (typeof tag !== "string" || tag.trim() == "") return Response.json({ok: false, error: "Invalid tag"}, {status: 400});

        const note = getFullNote(noteId);
        if (!note) return Response.json({ok: false, error: "Not Found"}, {status: 404});

        tagNote(noteId, tag.trim());

        return Response.json({ok: true});
    } catch (err) {
        console.error("POST Error : ", err);
        return Response.json({ok: false, error: "Internal Server Error"}, {status: 500});
    }
}
