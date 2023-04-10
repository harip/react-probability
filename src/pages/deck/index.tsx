// @ts-nocheck
import { HeaderComponentProps } from "@/lib/models/HeaderModel";
import styles from './deck.module.css';
import ToolBarComponent from "@/components/toolbar";
import { Chip, Container, Divider, Paper, Stack, Typography, styled } from "@mui/material";
import { useDispatch } from "react-redux";
import CardSuitComponent from "./components/card-suit"; 
import { Card, CardSuitType, SuitSymbols } from "@/lib/models/DeckModel";
import { RootState } from "@/store/types";
import { useSelector } from "react-redux";
import { setDeck,setRemovedDeck } from "@/store/deck/deck-action";
import { useState } from "react";
import { CardMapper, getProbabiltyWithoutReplacement } from "@/lib/deck.utils";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const DeckComponent = () => {
    const dispatch = useDispatch();
    const cardSuites = useSelector((state: RootState) => {
        return state.deck;
    }); 
    const [currentRemovedItems,setCurrentRemovedItems]=useState<Array<Card>>([]);
    
    function getHeaderData(): HeaderComponentProps {
        return {
            previousComponent: 'coin',
            title: 'Deck Probability'
        }
    }
 
    const onItemClick = (item: Card) => {
        // Get selected type and current cards
        const selectedType = item.suitType.toString().toLowerCase();
        const cards: Array<string> = cardSuites.deck[`${selectedType}`];

        // Remove selected item from cart
        const newCards:any = cards.filter(f=>f !== item.cardName);
        const deck = Object.assign({},cardSuites.deck);
        deck[`${selectedType}`] = newCards; 

        //Add the removed item to removed list
        const removedDecks = Object.assign({},cardSuites.removedItems);
        // debugger
        removedDecks[`${selectedType}`] = [...removedDecks[`${selectedType}`],item.cardName]

        dispatch(setDeck(deck,removedDecks));

        const currentItems = [...currentRemovedItems,item];
        setCurrentRemovedItems(currentItems);
    }

    const OnRemoveItemClick = (item: Card) => {
        // Get selected type and current cards
        const selectedType = item.suitType.toString().toLowerCase();
        const cards: Array<string> = cardSuites.deck[`${selectedType}`];
        const deck = Object.assign({},cardSuites.deck);
        deck[`${selectedType}`] = [...deck[`${selectedType}`],item.cardName];

        // Update remove panel data 
        const removedItems: Array<string> = cardSuites.removedItems[`${selectedType}`];
        const newCards:any = removedItems.filter(f=>f !== item.cardName);
        const removedDecks = Object.assign({},cardSuites.removedItems);
        removedDecks[`${selectedType}`] = newCards; 

        dispatch(setDeck(deck,removedDecks));

        // Remove this item from the removedItems state
        const itemsForProb = currentRemovedItems.filter(m=>m.cardName !== item.cardName);
        setCurrentRemovedItems(itemsForProb);
    }

    const probability = () => {
        const items:Array<string> = currentRemovedItems.map(c=>{
            const type=c.suitType.toString();
            const cardName = c.cardName.replace(type,"");
            return `${CardMapper[cardName]}${SuitSymbols[c.suitType]}`
        });
        if (!items || items.length === 0) {
            return (
                <>
                    Draw by clicking on the cards and get the probability
                </>
            )
        }
        const prob = getProbabiltyWithoutReplacement(items);
        const drawnCards = items.join(', ');
        return (
            <>
                Probability of drawing {drawnCards} without replacement is {prob}
            </>
        );
    }

    return (
        <>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <ToolBarComponent {...getHeaderData()} />
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} className={styles.mainCard}>
                    <Typography component="h1" variant="h4" align="center">       
                        Deck Probability                  
                    </Typography> 
                        <Stack
                            spacing={{ xs: 1, sm: 2 }}
                            direction="row"
                            useFlexGap
                            flexWrap="wrap"
                            sx={{ '& > *': { flexGrow: 1 }, alignItems: { lg: 'center' } }}
                        >
                            <Item>
                                <Typography>
                                    Probability without replacement
                                </Typography>
                                <Divider/> 

                                <Typography variant="subtitle2">
                                    Cards at hand
                                </Typography>
                                <CardSuitComponent  
                                    suitType = {CardSuitType.Spades} 
                                    displayItems={cardSuites.deck.spades}
                                    onItemClick={onItemClick} 
                                />  
                                <CardSuitComponent  
                                    suitType = {CardSuitType.Hearts} 
                                    displayItems={cardSuites.deck.hearts}
                                    onItemClick={onItemClick}
                                />  
                                <CardSuitComponent  
                                    suitType = {CardSuitType.Diamonds} 
                                    displayItems={cardSuites.deck.diamonds}
                                    onItemClick={onItemClick}
                                />  
                                <CardSuitComponent  
                                    suitType = {CardSuitType.Clubs} 
                                    displayItems={cardSuites.deck.clubs}
                                    onItemClick={onItemClick}
                                />  
                                <Divider/>

                                <Typography variant="subtitle2">
                                    Cards drawn
                                </Typography>
                                <CardSuitComponent  
                                    suitType = {CardSuitType.Spades} 
                                    displayItems={cardSuites.removedItems.spades} 
                                    onItemClick={OnRemoveItemClick}
                                    sort={false}
                                />
                                <CardSuitComponent  
                                    suitType = {CardSuitType.Hearts} 
                                    displayItems={cardSuites.removedItems.hearts}
                                    onItemClick={OnRemoveItemClick}
                                    sort={false}
                                />      
                                <CardSuitComponent  
                                    suitType = {CardSuitType.Diamonds} 
                                    displayItems={cardSuites.removedItems.diamonds}
                                    onItemClick={OnRemoveItemClick}
                                    sort={false}
                                />         
                                <CardSuitComponent  
                                    suitType = {CardSuitType.Clubs} 
                                    displayItems={cardSuites.removedItems.clubs}
                                    onItemClick={OnRemoveItemClick}
                                    sort={false}
                                />                                                                                                                             
                                <Divider/>

                                {probability()}
                            </Item>
                            <Item sx={{ width: { xs: '100%', lg: '100%' } }}>
                                <Typography variant="subtitle2"  >
                                    Redux store to keep track of cards drawn
                                </Typography>
                                <Typography variant="subtitle2"  >
                                    Component State/Local State
                                </Typography>
                            </Item>
                        </Stack>             
                </Paper>
            </Container>
        </>
    )
}

export default DeckComponent;