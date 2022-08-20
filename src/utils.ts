import moment from "moment";

export enum RiddleId {
    Hieroglyphs = "hieroglyphs",
    DoubleMemories = "doubleMemories",
    Cats = "cats",
    WorldMap = "worldMap",
    Axe = "axe",
    Souvenir = "souvenir",
}

export const startingTime = moment("2022-08-20 17:15", "YYYY-MM-DD HH:mm");

export const riddles: Riddle[] = [
    {
        id: RiddleId.Hieroglyphs,
        index: 1,
        title: "Hiéroglyphes",
        response: "",
        availableTime: moment(startingTime).format("YYYY-MM-DD HH:mm"),
    },
    {
        id: RiddleId.DoubleMemories,
        index: 2,
        title: "Mémoires doubles",
        response: "",
        availableTime: moment(startingTime).add(25, 'minutes').format("YYYY-MM-DD HH:mm"),
    },
    {
        id: RiddleId.Cats,
        index: 3,
        title: "Chats",
        response: "",
        availableTime: moment(startingTime).add(30, 'minutes').format("YYYY-MM-DD HH:mm"),
    },
    {
        id: RiddleId.WorldMap,
        index: 4,
        title: "World Map",
        response: "",
        availableTime: moment(startingTime).add(50, 'minutes').format("YYYY-MM-DD HH:mm"),
    },
    {
        id: RiddleId.Axe,
        index: 5,
        title: "Bûcheron",
        response: "",
        availableTime: moment(startingTime).add(55, 'minutes').format("YYYY-MM-DD HH:mm"),
    },
    {
        id: RiddleId.Souvenir,
        index: 6,
        title: "Souvenir perturbé",
        response: "",
        availableTime: moment(startingTime).add(70, 'minutes').format("YYYY-MM-DD HH:mm"),
    },
];