import { HeaderComponentProps } from "@/lib/models/HeaderModel";
import styles from './deck.module.css';
import ToolBarComponent from "@/components/toolbar";
import { Container, Paper, Typography } from "@mui/material";

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
                        Card Deck Probability
                    </Typography>
                </Paper>
            </Container>
        </>
    )
}

export default DeckComponent;