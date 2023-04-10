import { Card, CardSuitType, SuitSet, SuitSymbols, SuiteCard } from "./models/DeckModel";

const CommonSuite: Array<string> = [
     "GiCardAce", "GiCard2", "GiCard3", "GiCard4", "GiCard5", "GiCard6",
     "GiCard7", "GiCard8", "GiCard9", "GiCard10", "GiCardJack", "GiCardQueen",
     "GiCardKing"
];

export const CardMapper: any = {
     "GiCardAce": "A",
     "GiCard2": "2",
     "GiCard3": "3",
     "GiCard4": "4",
     "GiCard5": "5",
     "GiCard6": "6",
     "GiCard7": "7",
     "GiCard8": "8",
     "GiCard9": "9",
     "GiCard10": "10",
     "GiCardJack": "J",
     "GiCardQueen": "Q",
     "GiCardKing": "K"
}

export const getSuiteNames = (type: CardSuitType) => {
     return CommonSuite.map(c => `${c}${type}`);
}

export const getAllSuites = (): Map<CardSuitType, SuitSet> => {
     const cardDeck = new Map<CardSuitType, SuitSet>();
     for (let suit in CardSuitType) {
          const key = suit as CardSuitType;
          const symbol = SuitSymbols[key];

          const cards = CommonSuite.map((c, i) => {
               const card: SuiteCard = {
                    cardName: `${c}${suit}`,
                    cardOrder: i
               };
               return card;
          })
          const suitSet: SuitSet = {
               suitCards: cards,
               suitSymbol: symbol
          };
          cardDeck.set(key, suitSet);
     }
     return cardDeck;
}

export const getProbabiltyWithoutReplacement = (items: Array<string>) => {
     let startNumberOfCards = 52;
     const prob = items.reduce((acc,i) =>{
          acc = acc *  startNumberOfCards;
          startNumberOfCards = startNumberOfCards -1;
          return acc;
     },1);
     return `(1/${prob})`
}