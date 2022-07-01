export enum RiddleId {
    Hieroglyphs = "hieroglyphs",
    DoubleMemories = "doubleMemories",
    TimeTravel = "timeTravel",
    WorldMap = "worldMap",
    Axe = "axe",
    Souvenir = "souvenir",
}

export const riddles: Riddle[] = [
    {
        id: RiddleId.Hieroglyphs,
        index: 1,
        title: "Hiéroglyphes",
        response: "",
        availableTime: "16:45",
    },
    {
        id: RiddleId.DoubleMemories,
        index: 2,
        title: "Mémoires double",
        response: "",
        availableTime: "17:00",
    },
    {
        id: RiddleId.TimeTravel,
        index: 3,
        title: "Voyage dans le temps",
        response: "",
        availableTime: "17:30",
    },
    {
        id: RiddleId.WorldMap,
        index: 4,
        title: "World Map",
        response: "",
        availableTime: "17:45",
    },
    {
        id: RiddleId.Axe,
        index: 5,
        title: "Bûcheron",
        response: "",
        availableTime: "18:00",
    },
    {
        id: RiddleId.Souvenir,
        index: 6,
        title: "Souvenir",
        response: "",
        availableTime: "18:30",
    },
    {
        id: "",
        index: 7,
        title: "???",
        response: "",
        availableTime: "18:45",
    },
];