export interface RootState {
    coin: CoinProbabilityState
    dummy: any
}

export interface CoinProbabilityState {
    numberOfTrials: number;
}