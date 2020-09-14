export type Room = {
    id: number,
    contestants: Contestant[],
    max_contestants: number,
    time_limit: number,
    code: string,
    completed: boolean,
    start_time: Date | null,
    website: string | null,
    website_image: string,
}

export type Contestant = {
    username: string,
}
