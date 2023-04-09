export enum CardSuitType {
    Spades = 'Spades',
    Hearts = 'Hearts',
    Diamonds = 'Diamonds',
    Clubs = 'Clubs'
}

export const enum SuitSymbols {
    Clubs = '♣',
    Diamonds = '♦',
    Hearts = '♥',
    Spades = '♠'
};

export interface SuiteCard {
    cardName: string,
    cardOrder: number;
}

export interface SuitSet {
    suitSymbol: SuitSymbols,
    suitCards: Array<SuiteCard>
}

export interface CardSuitModel {
    suitType : CardSuitType
}