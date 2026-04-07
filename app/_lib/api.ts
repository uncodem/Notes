export async function fetchNotes() {
    const res = await fetch("/api/notes");
    return res.json();
}

export async function fetchNoteById(id: number) {
    const res = await fetch(`/api/notes/${id}`);
    return res.json();
}

export async function createNote(title: string) {
    const res = await fetch("/api/notes", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title})
    });
    return res.json();
}

export async function saveNote(id: number, content: string, time: number) {
    const res = await fetch(`/api/notes/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({content, time}),
    });
    if (!res.ok) return {ok: false, error: "Network request failed"};
    return res.json();
}

export async function deleteNote(id: number) {
    const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE"
    });
    return res.json();
}

export async function addTag(id: number, tag: string) {
    const res = await fetch(`/api/notes/${id}/tags`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({tag}),
    });
    if (!res.ok) return {ok: false, error: "Network request failed"};
    return res.json();
}

export async function removeTag(id: number, tag: string) {
    const res = await fetch(`/api/notes/${id}/tags/${tag}`, {
        method: "DELETE"
    });
    if (!res.ok) return {ok: false, error: "Network request failed"};
    return res.json();
}
