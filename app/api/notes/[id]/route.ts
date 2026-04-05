import {NextRequest} from "next/server";
import {notes} from "@/app/_lib/dummy";

export async function GET(req: NextRequest, {params} : {params: Promise<{id: string}>}) {
    const {id} = await params;
    const entry = notes.find(e => e.id === Number(id));
    if (!entry) return Response.json({ok: false}, {status: 404});
    return Response.json({ok: true, 
        title: entry.title,
        content: entry.content,
        tags: entry.tags,
        id: entry.id
    });
}

export async function PATCH(req: NextRequest, {params}:{params: Promise<{id: string}>}) {
    const {id: id_str} = await params;
    const id = Number(id_str);
    const entry = notes.find(e => e.id === id);
    if (!entry) return Response.json({ok: false, error: "Not Found"}, {status: 404});

    const {content, time} = await req.json();
    
    if (typeof content !== "string") return Response.json({ok: false, error: "Invalid Content"}, {status:400});
    
    if (typeof time === "number") {
        if ((entry as any).updatedAt && time < (entry as any).updatedAt) 
            return Response.json({ok: false, ignored: true});
        (entry as any).updatedAt = time;
    }

    entry.content = content;
    return Response.json({ok: true, id: entry.id, content: entry.content});
}

export async function DELETE(req: NextRequest, {params}:{params: Promise<{id: string}>}) {
    const {id: id_str} = await params;
    const id = Number(id_str);
    const entry = notes.findIndex(e => e.id === id);
    if (entry == -1) return Response.json({ok: false, error: "Not found"}, {status: 404});

    notes.splice(entry, 11);

    return Response.json({ok: true});
}
