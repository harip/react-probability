import { CardSuitType, SuitSet, SuitSymbols, SuiteCard } from "./models/DeckModel";

const CommonSuite: Array<string> = [
     "GiCardAce", "GiCard2", "GiCard3", "GiCard4", "GiCard5", "GiCard6",
     "GiCard7", "GiCard8", "GiCard9", "GiCard10", "GiCardJack", "GiCardQueen",
     "GiCardKing"
];

export const getAllSuites = ():Map<CardSuitType,SuitSet> => {
     const cardDeck = new Map<CardSuitType,SuitSet>();
     for (let suit in CardSuitType ) {
          const key = suit as CardSuitType;
          const symbol = SuitSymbols[key];
     
          const cards = CommonSuite.map((c,i) =>{
               const card : SuiteCard = {
                    cardName : `${c}${suit}`,
                    cardOrder: i
               };
               return card;
          })
          const suitSet: SuitSet = {
               suitCards : cards,
               suitSymbol : symbol
          };
          cardDeck.set(key,suitSet);
     }
     return cardDeck;
}