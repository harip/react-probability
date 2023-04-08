import { Chip, Slider, Link, Paper, Stack, Container } from "@mui/material";
import { useMemo, useState } from "react";
import Typography from '@mui/material/Typography';
import DiceComponent from "./components/dice";
import OutcomeDisplayComponent from "./components/outcome-display";
import styles from './dice.module.css'
import { getProbabilityInfo } from "../../lib/dice.utils";
import { HeaderComponentProps } from "@/lib/models/HeaderModel";
import InfiniteScrollComponent from "@/components/infinite-scroll";
import { InfiniteScrollProps, InfiniteScrollItem } from "@/lib/models/InfiniteScrollModel";
import { styled } from '@mui/material/styles';
import ToolBarComponent from "@/components/toolbar";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const DiceProbabilityComponent = () => {
    const [dice, setDice] = useState(1);
    const [sum, setSum] = useState(1);
    const [showDiceValues, setShowDiceValues] = useState<[]>([]);

    const getProbablityCalculations = useMemo(
        () => getProbabilityInfo(dice, sum),
        [sum, dice]
    );

    function onDiceSliderChange(event: any, value: any) {
        setShowDiceValues([])
        setDice(value)
    }

    function onDiceSumSliderChange(event: any, value: any) {
        setShowDiceValues([])
        setSum(value)
    }

    function createDice() {
        const dices = Array.from({ length: dice }, (_, index) => index).map(f => {
            return (<DiceComponent key={`dice-${f}`} value={showDiceValues[f]} />)
        });
        return dices;
    }

    function createOutcomeDisplay(data: any[][], key: string) {
        const outcomes = data.map((d, i) => {
            return (
                <OutcomeDisplayComponent data={d} key={`outcome-${key}-${i}`} onOutcomeClick={onOutcomeClick} />
            )
        });
        return outcomes;
    }

    function createInfiniteScrollData(data: any[][]): InfiniteScrollProps {
        const outcomes: Array<InfiniteScrollItem> = data.map((d, i) => {
            return {
                value: d
            }
        });
        return {
            items: outcomes,
            onItemSelect: onOutcomeClick,
            displayItemSize: 200
        };
    }

    const onOutcomeClick = (data: any) => {
        setShowDiceValues(data)
    }

    const getHeaderData = (): HeaderComponentProps => {
        return {
            nextComponent: 'coin',
            title: 'Dice Probability'
        }
    }

    return (
        <>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <ToolBarComponent {...getHeaderData()} />
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} className={styles.mainCard}>
                    <Typography component="h1" variant="h4" align="center">
                        Dice Probability
                    </Typography>

                    <Stack
                        spacing={{ xs: 1, sm: 2 }}
                        direction={{ xs: 'column', lg: 'column' }}
                        useFlexGap
                        flexWrap={{ xs: 'wrap', lg: 'nowrap' }}
                        sx={{ '& > *': { flexGrow: 1 }, alignItems: { lg: 'center' } }}
                    >
                        <Item sx={{ width: { xs: '100%', lg: '100%' } }}>
                            {createDice()}
                            <Slider
                                defaultValue={1}
                                onChange={(e, v) => onDiceSliderChange(e, v)}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={1}
                                max={6}
                            />
                            Number of dice - {dice}
                        </Item>

                        <Item sx={{ width: { xs: '100%', lg: '100%' } }}>
                            <Slider
                                aria-label="Sum"
                                defaultValue={1}
                                valueLabelDisplay="auto"
                                onChange={onDiceSumSliderChange}
                                step={1}
                                marks
                                min={1}
                                max={dice * 6}
                            />
                            Sum of rolled dice - {sum}
                        </Item>
                        <Item sx={{ width: { xs: '100%', lg: '100%' } }}>
                            Probability of getting sum {sum} when {dice} dice are rolled = {getProbablityCalculations.probability}
                            <Typography variant="subtitle2" className={styles.likelyEventItem}>
                                {`(likely events/possible outcomes)=(${getProbablityCalculations.numberOfWaysEventCanOccur.length}/${getProbablityCalculations.totalPossibleOutcomes.length})`}
                            </Typography>
                        </Item>

                        <Item sx={{ width: { xs: '100%', lg: '100%' } }}>
                            <Typography variant="h6" className={styles.likelyEventItem}>
                                Number of likely events
                            </Typography>
                            <Typography variant="subtitle2" className={styles.likelyEventItem}>
                                {'getting '}
                                {<Chip color="primary" label={`sum of ${sum}`} />} with
                                {' '}
                                {<Chip color="primary" label={`${dice} dice `} />} is
                                {' '}
                                {<Chip color="success" label={getProbablityCalculations.numberOfWaysEventCanOccur.length} />}
                            </Typography>
                            <div>
                                {createOutcomeDisplay(getProbablityCalculations.numberOfWaysEventCanOccur, 'ev')}
                            </div>
                        </Item>

                        <Item sx={{ width: { xs: '100%', lg: '100%' } }}>
                            <Typography variant="h6" className={styles.likelyEventItem}>
                                Total possible outcomes - {getProbablityCalculations.totalPossibleOutcomes.length}
                            </Typography>
                            <div>
                                <InfiniteScrollComponent
                                    {...createInfiniteScrollData(getProbablityCalculations.totalPossibleOutcomes)}
                                />
                            </div>
                        </Item>

                        <Item sx={{ width: { xs: '100%', lg: '100%' } }}>
                            <Typography variant="subtitle2"  >
                                Component State/Local State
                            </Typography>
                            <Link href="https://github.com/harip/react-probability/blob/59d65cafa409355c888b8c37586266b3d9c6a06c/src/lib/dice.utils.ts#L18">Dice combinations algorithm</Link>
                            <div>
                                <Link href="https://github.com/harip/react-probability/blob/main/src/components/infinite-scroll/index.tsx">More Button Component</Link>
                            </div>
                        </Item>
                    </Stack>
                </Paper>
            </Container>
        </>
    )
};

export default DiceProbabilityComponent;
