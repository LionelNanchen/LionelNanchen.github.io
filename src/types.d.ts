interface Riddle {
    id: string,
    index: number,
    title: string,
    response: string,
    availableTime: string,
}

type Matrix = (string | undefined)[][];