import { NextRequest } from "next/server";
import { untagNote, getFullNote } from "@/app/_lib/db";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string; tagName: string }> },
) {
    try {
        const { id, tagName } = await params;
        const noteId = Number(id);

        const entry = getFullNote(noteId);
        if (!entry)
            return Response.json(
                { ok: false, error: "Not Found" },
                { status: 404 },
            );
        untagNote(noteId, tagName.trim());

        return Response.json({ ok: true });
    } catch (err) {
        console.error("DELETE Error : ", err);
        return Response.json(
            { ok: false, error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
