import { NextRequest } from "next/server";
import { getFullNote, updateNote, deleteNote } from "@/app/_lib/db";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const entry = getFullNote(Number(id));

        if (!entry)
            return Response.json(
                { ok: false, error: "Not Found" },
                { status: 404 },
            );

        return Response.json({
            ok: true,
            title: entry.title,
            content: entry.content,
            tags: entry.tags,
            id: entry.id,
        });
    } catch (err) {
        console.error("GET Error : ", err);
        return Response.json(
            { ok: false, error: "Internal Server Error" },
            { status: 500 },
        );
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id: id_str } = await params;
        const id = Number(id_str);

        const { content, time } = await req.json();
        if (typeof content !== "string")
            return Response.json(
                { ok: false, error: "Invalid Content" },
                { status: 400 },
            );

        const updateTime = typeof time === "number" ? time : Date.now();
        updateNote(id, content, time);

        return Response.json({ ok: true, id, content });
    } catch (err) {
        console.error("PATCH Error : ", err);
        return Response.json(
            { ok: false, error: "Internal Server Error" },
            { status: 500 },
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id: id_str } = await params;
        const id = Number(id_str);

        deleteNote(id);

        return Response.json({ ok: true });
    } catch (err) {
        console.error("DELETE Error : ", err);
        return Response.json(
            { ok: false, error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
