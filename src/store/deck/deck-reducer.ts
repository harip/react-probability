import { Reducer } from "redux";
import { DeckActionTypes, DeckActionTypesEnum } from "./deck-action";
import { DeckProbabilityState } from "../types";

const initialState: DeckProbabilityState = {
    numberOfDecks: 0,
    deck: {
        numberOfCards: 0
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
        default:
            return state;
    }
}

export default deckReducer;