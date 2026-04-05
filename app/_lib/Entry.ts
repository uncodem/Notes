export type Entry = {
    id: number,
    title: string,
    content: string,
    tags: string[],
};

export type EntryUI = Entry & {
    expanded: boolean
}
