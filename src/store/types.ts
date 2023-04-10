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
    removedItems : Deck;
}

export interface Deck {
    spades: Array<string>;
    clubs: Array<string>;
    hearts: Array<string>;
    diamonds: Array<string>;
}