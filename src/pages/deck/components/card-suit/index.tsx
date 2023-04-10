import { IconContext } from 'react-icons';
import * as allIcons from 'react-icons/gi';
import { getAllSuites } from "../../../../lib/deck.utils";
import { useEffect, useMemo, useState } from 'react';
import styles from "./card.suit.module.css";
import { Card, CardSuitModel, SuitSet } from '@/lib/models/DeckModel';

const CardSuitComponent: React.FC<CardSuitModel> = ({ 
    suitType, 
    displayItems,
    onItemClick,
    sort=true
}) => {
    const allSuites = useMemo(() => getAllSuites(), []); 
    const [icons, setIcons] = useState<Array<Card>>([]);
    const [suiteSet,setSuiteSet] = useState<any>();

    useEffect(() => {
        const suitSet = getDisplayItems();
        let icons: Array<Card> = Object.keys(allIcons).reduce((acc: Array<Card>, iconName: string) => {
            const findIcon = suitSet?.suitCards.find(s => s.cardName === iconName);
            if (findIcon) {
                acc.push({
                    icon: allIcons[iconName],
                    order: findIcon.cardOrder,
                    cardName : iconName,
                    suitType: suitType
                })
            }
            return acc;
        }, []);

        // Sort
        if (sort) {
            icons = icons.sort((a, b) => a.order - b.order);
        }
        
        setIcons(icons);
        setSuiteSet(suitSet);
    }, [displayItems])

    const getDisplayItems = () => { 
        // Get all items in suite
        const suitSet = allSuites.get(suitType);
        if (!suitSet) {
            return;
        } 
        if (!displayItems) {
            return suitSet;
        } 
        const newSuitSet: SuitSet = {
            ...suitSet,
            suitCards: displayItems.map(d => {
                const item = suitSet.suitCards.find(f => f.cardName === d);
                return item!;
            })
        };
        return newSuitSet;
    }

    const onCardclick = (card: Card) =>{
        if (onItemClick) {
            onItemClick(card);
        }
    }

    return (
        <>
            <div className={styles.deckCardSize}>
                <IconContext.Provider value={{ size: '2em' }}>
                    {icons.length>0 && (
                        icons.map(m => {
                            const Icon = m.icon;
                            return (
                                <div 
                                    key={m.icon} 
                                    className={styles.item} 
                                    onClick={()=>onCardclick(m)}
                                >
                                    <Icon />
                                </div>
                            )
                        })
                    )}
                    <div className={styles.item}>
                        {suiteSet?.suitSymbol}
                    </div>
                </IconContext.Provider>
            </div>
        </>
    )
}

export default CardSuitComponent;