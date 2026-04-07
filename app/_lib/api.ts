export async function onNoteAdd() {
    const name = prompt("Name of the note : ");
    if (name == null) return;
    const title = name ? name : `Untitled-Note`;

    const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
    });
    const { ok, entry, error } = await res.json();
    if (ok) {
        setNotes((prev) => [...prev, { ...entry, expanded: false }]);
        await handleSelect(entry.id);
    } else {
        alert(error);
    }
}

async function onTagAdd(id: number) {
    let tag = prompt("Tag name?");
    if (!tag || tag.trim() == "") return;
    tag = tag.toLowerCase();

    const res = await fetch(`/api/notes/${id}/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tag }),
    });

    if (!res.ok) {
        alert("Request failed");
        return;
    }

    const { ok, error } = await res.json();

    if (ok) {
        setNotes((prev) =>
            prev.map((e) => {
                return e.id === id
                    ? {
                          ...e,
                          tags: e.tags.includes(tag)
                              ? e.tags
                              : [...e.tags, tag],
                      }
                    : e;
            }),
        );
    } else {
        alert(error);
    }
}

async function onTagDelete(id: number, tag: string) {
    const normalized = tag.toLowerCase().trim();

    const res = await fetch(`/api/notes/${id}/tags/${normalized}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        alert("Request failed");
        return;
    }

    const { ok, error } = await res.json();

    if (ok) {
        setNotes((prev) =>
            prev.map((e) => {
                return e.id === id
                    ? { ...e, tags: e.tags.filter((t) => t !== normalized) }
                    : e;
            }),
        );
    } else {
        alert(error);
    }
}

async function onDelete(id: number) {
    const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
    if (!res.ok) {
        alert("Request failed");
        return;
    }
    const { ok, error } = await res.json();
    if (!ok) {
        alert(error);
        return;
    }
    setNotes((prev) => prev.filter((e) => e.id !== id));
}

async function handleSelect(id: number) {
    const prev = prevNoteRef.current;
    if (timeoutRef.current) clearTimeoutRef();
    if (prev.id !== null && prev.content !== undefined) {
        save({
            id: prev.id,
            content: prev.content,
            time: Date.now(),
        });
    }

    const res = await fetch(`/api/notes/${id}`);
    const { ok, ...entry } = await res.json();

    if (ok) {
        setNotes((prev) =>
            prev.map((e) =>
                e.id === id ? { expanded: e.expanded, ...entry } : e,
            ),
        );
        setSelectedNote(id);
    }
}
