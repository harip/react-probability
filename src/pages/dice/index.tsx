import { Box, Chip, Divider, Slider, Checkbox, AppBar, Button, Toolbar } from "@mui/material";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DiceComponent from "./components/dice";
import OutcomeDisplayComponent from "./components/outcome-display";
import { getProbabilityInfo } from "./dice-utils";
import styles from './dice.module.css'

const DiceProbabilityComponent = () => {
    const [dice, setDice] = useState(1);
    const [sum, setSum] = useState(1);
    const [showAllOutcomes, setShowAllOutcomes] = useState<boolean>(false);
    const [showDiceValues, setShowDiceValues] = useState<[]>([]);
    const router = useRouter();

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
            return (<DiceComponent key={`dice-{f}`} value={showDiceValues[f]} />)
        });
        return dices;
    }

    function createOutcomeDisplay(data: any[][]) {
        const outcomes = data.map(d => {
            return (
                <OutcomeDisplayComponent data={d} onOutcomeClick={onOutcomeClick} />
            )
        });
        return outcomes;
    }

    function navigateToNextPage() {
        router.push('coin');
    }

    const onOutcomeClick = (data: any) => {
        setShowDiceValues(data)
    }

    const canShowAllOutcomes = () => {
        return showAllOutcomes && dice <= 4;
    }

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                        <div className={styles.title}>
                            Dice Probablilty
                        </div>
                    </Typography>
                    <Button color="inherit" onClick={navigateToNextPage}>
                        <ArrowForwardIcon fontSize='large' />
                    </Button>
                </Toolbar>
            </AppBar>
            <div className={styles.center}>
                <div>
                    {createDice()}
                </div>
                <Box sx={{ width: 600 }}>
                    <Slider
                        aria-label="Temperature"
                        defaultValue={1}
                        onChange={(e, v) => onDiceSliderChange(e, v)}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={6}
                    />
                </Box>
                <div>
                    Number of dice - {dice}
                </div>
            </div>
            <Divider />
            <div className={styles.center}>
                <div >
                    {sum}
                </div>
                <Box sx={{ width: 600 }}>
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
                </Box>
                <div>
                    Sum of rolled numbers - {sum}
                </div>
            </div>
            <Divider />
            <div className={styles.center}>
                <span className={styles.probability}>Probability of getting sum {sum} when {dice} dice are rolled = {getProbablityCalculations.probability}</span>
            </div>
            <Divider />
            {getProbablityCalculations &&
                <div className={styles.center}>
                    Number of ways event can occur - {getProbablityCalculations.numberOfWaysEventCanOccur.length}
                    <div>
                        {createOutcomeDisplay(getProbablityCalculations.numberOfWaysEventCanOccur)}
                    </div>
                </div>
            }
            <Divider />
            {getProbablityCalculations &&
                <div className={styles.center}>
                    Total possible outcomes - {getProbablityCalculations.totalPossibleOutcomes.length}
                    <span >
                        <Checkbox
                            {...label}
                            color="success"
                            className={styles.success}
                            onChange={(e) => setShowAllOutcomes(e.target.checked)} /> Show
                    </span>
                    {canShowAllOutcomes() && (
                        <div >
                            {createOutcomeDisplay(getProbablityCalculations.totalPossibleOutcomes)}
                        </div>
                    )
                    }
                </div>
            }
        </>
    )
};

export default DiceProbabilityComponent;