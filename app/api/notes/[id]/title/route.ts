import {NextRequest} from "next/server";
import {renameNote} from "@/app/_lib/db";

export async function PATCH(req: NextRequest, {params}: {params: Promise<{id: string}>}) {

    try {
        const {id: id_str} = await params;
        const id = Number(id_str);

        const {title} = await req.json();

        if (typeof title !== "string" || title.trim() === "") return Response.json({ok: false, error: "Invalid Title"}, {status: 400});

        renameNote(id, title, Date.now());
        return Response.json({ok: true, title: title.trim()});
    } catch (err) {
        console.error("PATCH error : ", err);
        return Response.json({ok: false, error: "Internal Server Error"}, {status: 500});
    }

}
