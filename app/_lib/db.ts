import {Entry} from "./Entry";

import {Database} from "bun:sqlite";

export const db = new Database("yanotes.db");

db.run("PRAGMA foreign_keys = ON;");
db.run(`
    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        updated_at INTEGER
    );
    CREATE TABLE IF NOT EXISTS tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
    );
    CREATE TABLE IF NOT EXISTS note_tags (
        note_id INTEGER,
        tag_id INTEGER,
        PRIMARY KEY (note_id, tag_id),
        FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
    );
`);

const insertNote = db.prepare("INSERT INTO notes (title, content, updated_at) VALUES (?, '', ?)");
const updateNoteEntry = db.prepare(`
    UPDATE notes SET content = ?, updated_at = ?
    WHERE id = ? AND (updated_at IS NULL or updated_at < ?)
`);

const insertTag = db.prepare(`
    INSERT INTO tags (name)
    VALUES (?)
    ON CONFLICT(name) DO NOTHING
`);

const getTagId = db.prepare("SELECT id FROM tags WHERE name = ?");

const linkTag = db.prepare(`
    INSERT INTO note_tags (note_id, tag_id)
    VALUES (?, ?)
    ON CONFLICT(note_id, tag_id) DO NOTHING
`);

const unlinkTag = db.prepare(`
    DELETE FROM note_tags
    WHERE note_id = ? AND tag_id = ?
`);

const listNoteTags = db.prepare(`
    SELECT t.name FROM tags t
    JOIN note_tags nt ON t.id = nt.tag_id
    WHERE nt.note_id = ?
`);

const getNotes = db.prepare(`SELECT id, title FROM notes`);
const getNoteById = db.prepare(`SELECT id, title, content FROM notes WHERE id = ?`);

const tagNoteTxn = db.transaction((id: number, rawTag: string) => {
    const tag = rawTag.toLowerCase();
    insertTag.run(tag);
    const tagRow = getTagId.get(tag);
    if (!tagRow) throw new Error("Tag lookup failed");
    linkTag.run(id, tagRow.id);
});

const untagNoteTxn = db.transaction((id: number, rawTag: string) => {
    const tag = rawTag.toLowerCase();
    const row = getTagId.get(tag) as {id: number} | undefined;
    if (!row) return;
    unlinkTag.run(id, row.id);
});

export function getFullNote(id: number) {
    const note = getNoteById.get(id);
    if (!note) return null;
    const tags = listNoteTags.all(id).map(t => t.name);
    return {...note, tags};
}

export function tagNote(id: number, rawTag: string) {
    tagNoteTxn(id, rawTag);
}

export function untagNote(id: number, rawTag: string) {
    untagNoteTxn(id, rawTag);
}

export function getAllNotes() {
    return getNotes.all();
}

export function addNewNote(title: string, updated_at: number) {
    insertNote.run(title, updated_at);
}

export function updateNote(id: number, content: string, updated_at: number) {
    updateNoteEntry.run(content, updated_at, id, updated_at);
}
