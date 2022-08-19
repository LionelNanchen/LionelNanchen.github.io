import moment from "moment";

export enum RiddleId {
    Hieroglyphs = "hieroglyphs",
    DoubleMemories = "doubleMemories",
    Cats = "cats",
    WorldMap = "worldMap",
    Axe = "axe",
    Souvenir = "souvenir",
}

export const startingTime = moment("17:15", "HH:mm");

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
        availableTime: moment(startingTime).add(25, 'minutes').format("HH:mm"),
    },
    {
        id: RiddleId.Cats,
        index: 3,
        title: "Chats",
        response: "",
        availableTime: moment(startingTime).add(30, 'minutes').format("HH:mm"),
    },
    {
        id: RiddleId.WorldMap,
        index: 4,
        title: "World Map",
        response: "",
        availableTime: moment(startingTime).add(50, 'minutes').format("HH:mm"),
    },
    {
        id: RiddleId.Axe,
        index: 5,
        title: "Bûcheron",
        response: "",
        availableTime: moment(startingTime).add(55, 'minutes').format("HH:mm"),
    },
    {
        id: RiddleId.Souvenir,
        index: 6,
        title: "Souvenir perturbé",
        response: "",
        availableTime: moment(startingTime).add(70, 'minutes').format("HH:mm"),
    },
];