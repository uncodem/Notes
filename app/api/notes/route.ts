import {type NextRequest} from "next/server";
import {Entry} from "../../_lib/Entry";

const notes: Entry[] = [{
        id: 1,
        title: "First note",
        content: "Hello, World!",
        tags: ["work"],
        expanded: false
    },
    {
        id: 2,
        title: "Second note",
        content: "Yet another notes app",
        tags: ["personal", "yet again"],
        expanded: false
    }
];

let id_counter = 3;

export async function GET(req: NextRequest) {
    return Response.json(notes);
}

export async function POST(req: NextRequest) {
    const {title} = await req.json();
    if (!title || typeof title !== "string") return Response.json({ok: false, error: "Invalid Title"}, {status: 400});
    const new_entry = {
        id: id_counter++,
        title,
        content: "",
        tags: [],
        expanded: false
    };
    notes.push(new_entry);
    return Response.json({ok: true, entry: new_entry});
}
