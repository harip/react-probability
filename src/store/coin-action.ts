export enum CoinActionTypesEnum {
    SET_NUMBER_OF_TRIALS = 'SET_NUMBER_OF_TRIALS'
}

interface NumberOfTrailsAction {
    type: CoinActionTypesEnum.SET_NUMBER_OF_TRIALS
}

export type CoinActionTypes =  {
    type: CoinActionTypesEnum.SET_NUMBER_OF_TRIALS
    data: number
};

export function setNumberOfTrails(numberOfTrails: number) {
    return {
        type: CoinActionTypesEnum.SET_NUMBER_OF_TRIALS,
        data: numberOfTrails
    }
}