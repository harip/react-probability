import { HeaderComponentProps } from "@/lib/models/HeaderModel";
import styles from './deck.module.css';
import ToolBarComponent from "@/components/toolbar";
import { Container, Paper, Stack, Typography, styled } from "@mui/material";
import { useDispatch } from "react-redux";
import CardSuitComponent from "./components/card-suit"; 
import { Card, CardSuitType } from "@/lib/models/DeckModel";
import { RootState } from "@/store/types";
import { useSelector } from "react-redux";
import { setDeck,setRemovedDeck } from "@/store/deck/deck-action";

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
                            <Item  >
                                Drag and Drop cards
                                <CardSuitComponent  
                                    suitType = {CardSuitType.Spades} 
                                    displayItems={cardSuites.deck.spades}
                                    onItemClick={onItemClick}
                                />  
                                <CardSuitComponent  suitType = {CardSuitType.Hearts} />  
                                <CardSuitComponent  suitType = {CardSuitType.Diamonds} />  
                                <CardSuitComponent  suitType = {CardSuitType.Clubs} />  
                            </Item>
                            <Item>
                                <CardSuitComponent  
                                    suitType = {CardSuitType.Spades} 
                                    displayItems={cardSuites.removedItems.spades} 
                                />                                  
                            </Item> 
                        </Stack>             
                </Paper>
            </Container>
        </>
    )
}

export default DeckComponent;