import { HeaderComponentProps } from "@/lib/models/HeaderModel";
import styles from './deck.module.css';
import ToolBarComponent from "@/components/toolbar";
import { Container, Paper, Stack, Typography, styled } from "@mui/material";
import CardSuitComponent from "./components/card-suit"; 
import { CardSuitType } from "@/lib/models/DeckModel";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const DeckComponent = () => {
    function getHeaderData(): HeaderComponentProps {
        return {
            previousComponent: 'coin',
            title: 'Deck Probability'
        }
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
                                <CardSuitComponent  suitType = {CardSuitType.Spades} />  
                                <CardSuitComponent  suitType = {CardSuitType.Hearts} />  
                                <CardSuitComponent  suitType = {CardSuitType.Diamonds} />  
                                <CardSuitComponent  suitType = {CardSuitType.Clubs} />  
                            </Item>
                            <Item>Item 2</Item>
                            <Item>Item 2</Item>
                        </Stack>             
                </Paper>
            </Container>
        </>
    )
}

export default DeckComponent;