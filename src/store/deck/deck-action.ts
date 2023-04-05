export enum DeckActionTypesEnum {
    SET_NUMBER_OF_DECKS = 'SET_NUMBER_OF_DECKS'
}

export type DeckActionTypes = {
    type: DeckActionTypesEnum.SET_NUMBER_OF_DECKS,
    data: number
}

export function setNumberOfDecks(numberOfDecks: number) {
    return {
        type: DeckActionTypesEnum.SET_NUMBER_OF_DECKS,
        data: numberOfDecks
    }
}