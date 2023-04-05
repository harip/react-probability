export interface RootState {
    coin: CoinProbabilityState;
    deck: DeckProbabilityState;
    dummy: any;
}

export interface CoinProbabilityState {
    numberOfTrials: number;
    numberOfFlips: number;
}

export interface DeckProbabilityState {
    numberOfDecks: number;
    deck: Deck;
}

export interface Deck {
    numberOfCards: number;
}