import { CardSuitType } from "@/lib/models/DeckModel"
import { Deck } from "../types"

export enum DeckActionTypesEnum {
    SET_NUMBER_OF_DECKS = 'SET_NUMBER_OF_DECKS',
    SET_DECK = 'SET_DECk',
    SET_REMOVED_DECK= 'SET_REMOVED_DECK'
}

export type DeckActionTypes = {
    type: DeckActionTypesEnum.SET_NUMBER_OF_DECKS,
    data: number
} | {
    type: DeckActionTypesEnum.SET_DECK,
    data: any    
}| {
    type: DeckActionTypesEnum.SET_REMOVED_DECK,
    data: Deck    
}

export function setNumberOfDecks(numberOfDecks: number) {
    return {
        type: DeckActionTypesEnum.SET_NUMBER_OF_DECKS,
        data: numberOfDecks
    }
}

export function setDeck(deck: Deck,removedDecks: Deck) {
    return {
        type: DeckActionTypesEnum.SET_DECK,
        data: { deck, removedDecks }
    }
}

export function setRemovedDeck(deck: Deck) {
    return {
        type: DeckActionTypesEnum.SET_REMOVED_DECK,
        data: deck
    }
}
