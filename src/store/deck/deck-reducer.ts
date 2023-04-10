import { Reducer } from "redux";
import { DeckActionTypes, DeckActionTypesEnum } from "./deck-action";
import { DeckProbabilityState } from "../types";
import { CardSuitType } from "@/lib/models/DeckModel";
import { getSuiteNames } from "@/lib/deck.utils";

const initialState: DeckProbabilityState = {
    numberOfDecks: 0,
    deck: {
        spades : getSuiteNames(CardSuitType.Spades),
        hearts : getSuiteNames(CardSuitType.Hearts),
        diamonds : getSuiteNames(CardSuitType.Diamonds),
        clubs : getSuiteNames(CardSuitType.Clubs)
    },
    removedItems : {
        spades : [],
        hearts : [],
        diamonds : [],
        clubs : []
    }
}

const deckReducer: Reducer<DeckProbabilityState,DeckActionTypes> = (state=initialState, action: DeckActionTypes) => {
    switch (action.type) {
        case DeckActionTypesEnum.SET_NUMBER_OF_DECKS:
            return {
                ...state,
                numberOfDecks: action.data
            }
            break;
        case DeckActionTypesEnum.SET_DECK:
            const newState = { 
                ...state, 
                deck : {
                     ...state.deck,
                     ...action.data.deck
                },
                removedItems : {
                     ...state.removedItems,
                     ...action.data.removedDecks
                }
           }            
            return newState;
            break;                          
        default:
            return state;
    }
}

export default deckReducer;