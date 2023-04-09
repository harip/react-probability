import { IconContext } from 'react-icons';
import * as allIcons from 'react-icons/gi';
import { getAllSuites } from "../../../../lib/deck.utils";
import { useEffect, useMemo, useState } from 'react';
import styles from "./card.suit.module.css";
import { CardSuitModel } from '@/lib/models/DeckModel';

const CardSuitComponent: React.FC<CardSuitModel> = ({ suitType }) => {
    const allSuites = useMemo(() => getAllSuites(), []);
    const suitSet = allSuites.get(suitType);

    const [icons, setIcons] = useState<any[]>([]);
    useEffect(() => {
        let icons: any[] = Object.keys(allIcons).reduce((acc: any, iconName: string) => {
            const findIcon = suitSet?.suitCards.find(s => s.cardName === iconName);
            if (findIcon) {
                acc.push({
                    icon: allIcons[iconName],
                    order: findIcon.cardOrder
                })
            }
            return acc;
        }, []);

        // Sort
        icons = icons.sort((a, b) => a.order - b.order);
        setIcons(icons);
    }, [suitType])

    return (
        <>
            <div className={styles.deckCardSize}>
                <IconContext.Provider value={{ size: '2em' }}>
                    {
                        icons.map(m => {
                            const Icon = m.icon;
                            return (
                                <div key={m.icon} className={styles.item}>
                                    <Icon />
                                </div>
                            )
                        })
                    }

                    <div className={styles.item}>
                        {suitSet?.suitSymbol}
                    </div>
                </IconContext.Provider>
            </div>
        </>
    )
}

export default CardSuitComponent;