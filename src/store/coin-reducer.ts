import { Reducer } from "redux";
import { CoinActionTypes, CoinActionTypesEnum } from "./coin-action";
import { CoinProbabilityState } from "./types";

const initialState: CoinProbabilityState = {
    numberOfTrials: 2
}

const coinReducer: Reducer<CoinProbabilityState,CoinActionTypes> = (state = initialState, action: CoinActionTypes) => {
    switch (action.type) { 
        case CoinActionTypesEnum.SET_NUMBER_OF_TRIALS:
            return {
                ...state,
                numberOfTrials: action.data
            } 
        default:
            return state;
    }
}

export default coinReducer;