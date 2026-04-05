import {type NextRequest} from "next/server";
import {Entry} from "../../_lib/Entry";

const notes: Entry[] = [{
        id: 1,
        title: "First note",
        content: "Hello, World!",
        tags: ["work"],
    },
    {
        id: 2,
        title: "Second note",
        content: "Yet another notes app",
        tags: ["personal", "yet again"],
    },
    {
        id: 3,
        title: "Third note",
        content: "Yet yet another note",
        tags: ["work", "personal"]
    }
];

let id_counter = 4;

export async function GET(req: NextRequest) {
    return Response.json(notes.map(({id, tags, title}: Entry) => ({id, tags, title})));
}

export async function POST(req: NextRequest) {
    const {title} = await req.json();
    if (!title || typeof title !== "string") return Response.json({ok: false, error: "Invalid Title"}, {status: 400});
    const new_entry = {
        id: id_counter++,
        title,
        content: "",
        tags: [],
    };
    notes.push(new_entry);
    return Response.json({ok: true, entry: new_entry});
}
