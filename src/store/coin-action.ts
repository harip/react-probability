export enum CoinActionTypesEnum {
    SET_NUMBER_OF_TRIALS = 'SET_NUMBER_OF_TRIALS',
    SET_NUMBER_OF_FLIPS = 'SET_NUMBER_OF_FLIPS',
} 

export type CoinActionTypes =  {
    type: CoinActionTypesEnum.SET_NUMBER_OF_TRIALS
    data: number
} | {
    type: CoinActionTypesEnum.SET_NUMBER_OF_FLIPS
    data: number
};

export function setNumberOfTrails(numberOfTrails: number) {
    return {
        type: CoinActionTypesEnum.SET_NUMBER_OF_TRIALS,
        data: numberOfTrails
    }
}

export function setNumberOfFlips(numberOfFlips: number) {
    return {
        type: CoinActionTypesEnum.SET_NUMBER_OF_FLIPS,
        data: numberOfFlips
    }
}
