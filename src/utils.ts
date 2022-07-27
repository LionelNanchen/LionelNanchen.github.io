import moment from "moment";

export enum RiddleId {
    Hieroglyphs = "hieroglyphs",
    DoubleMemories = "doubleMemories",
    TimeTravel = "timeTravel",
    WorldMap = "worldMap",
    Axe = "axe",
    Souvenir = "souvenir",
}

const startingTime = moment("10:45", "HH:mm");

export const riddles: Riddle[] = [
    {
        id: RiddleId.Hieroglyphs,
        index: 1,
        title: "Hiéroglyphes",
        response: "",
        availableTime: moment(startingTime).format("HH:mm"),
    },
    {
        id: RiddleId.DoubleMemories,
        index: 2,
        title: "Mémoires double",
        response: "",
        availableTime: moment(startingTime).add(15, 'minutes').format("HH:mm"),
    },
    {
        id: RiddleId.TimeTravel,
        index: 3,
        title: "Voyage dans le temps",
        response: "",
        availableTime: moment(startingTime).add(30, 'minutes').format("HH:mm"),
    },
    {
        id: RiddleId.WorldMap,
        index: 4,
        title: "World Map",
        response: "",
        availableTime: moment(startingTime).add(45, 'minutes').format("HH:mm"),
    },
    {
        id: RiddleId.Axe,
        index: 5,
        title: "Bûcheron",
        response: "",
        availableTime: moment(startingTime).add(60, 'minutes').format("HH:mm"),
    },
    {
        id: RiddleId.Souvenir,
        index: 6,
        title: "Souvenir",
        response: "",
        availableTime: moment(startingTime).add(75, 'minutes').format("HH:mm"),
    },
];