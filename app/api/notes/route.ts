import {type NextRequest} from "next/server";
import {db, getAllNotes, addNewNote} from "@/app/_lib/db";

export async function GET(req: NextRequest) {
    try {
        const notes = getAllNotes();
        return Response.json({ok: true, notes});
    } catch (err) {
        console.error("Failed to fetch notes : ", err);
        return Response.json({ok: false, error: "Internal Server Error"}, {status: 500});
    }
}

export async function POST(req: NextRequest) {
    try {
        const {title} = await req.json();
        if (!title || typeof title !== "string") return Response.json({ok: false, error: "Invalid Title"}, {status: 400});
        const new_entry = addNewNote(title, Date.now());
        return Response.json({ok: true, entry: new_entry});
    } catch (err) {
        console.error("Failed to create new note : ", err);
        return Response.json({ok: false, error: "Internal Server Error"}, {status: 500});
    }
}
