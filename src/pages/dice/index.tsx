import { Box, Chip, Divider, Slider, Checkbox } from "@mui/material";
import { useMemo, useState } from "react";
import DiceComponent from "./components/dice";
import OutcomeDisplayComponent from "./components/outcome-display";
import { getProbabilityInfo } from "./dice-utils";
import styles from './dice.module.css'

const DiceProbabilityComponent = () => {
    const [dice, setDice] = useState(1);
    const [sum, setSum] = useState(1);
    const [showAllOutcomes,setShowAllOutcomes] = useState<boolean>(false);

    const getProbablityCalculations = useMemo(
        ()=> getProbabilityInfo(dice, sum),
        [sum,dice]
    );

    function onDiceSliderChange(event: any, value: any) {
        setDice(value)
    }

    function onDiceSumSliderChange(event: any, value: any) {
        setSum(value)
    }

    function createDice() {
        const dices = Array.from({ length: dice }, (_, index) => index).map(f => {
            return (<DiceComponent key={`dice-{f}`} />)
        });
        return dices;
    }

    function createOutcomeDisplay(data: any[][]) {
        const outcomes = data.map(d => {
            return (
                <OutcomeDisplayComponent data={d} />
            )
        });
        return outcomes;
    }

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    return (
        <>
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
                <Chip label={`Probability of getting sum ${sum} when ${dice} dice are rolled = ${getProbablityCalculations.probability}`} variant="outlined" color="success"/>
            </div>
            <Divider />
            { getProbablityCalculations &&
                <div className={styles.center}>
                    Number of ways event can occur - {getProbablityCalculations.numberOfWaysEventCanOccur.length}
                    <div>
                        {createOutcomeDisplay(getProbablityCalculations.numberOfWaysEventCanOccur)}
                    </div>
                </div>
            }
            <Divider />
            { getProbablityCalculations &&
                <div className={styles.center}>
                    Total possible outcomes - {getProbablityCalculations.totalPossibleOutcomes.length}
                    <span >
                        <Checkbox  
                            {...label} 
                            color="success" 
                            className={styles.success} 
                            onChange={ (e)=> setShowAllOutcomes(e.target.checked) }/> Show
                    </span>
                    { showAllOutcomes &&
                        <div >
                            {createOutcomeDisplay(getProbablityCalculations.totalPossibleOutcomes)}
                        </div>                         
                    }
                </div>                            
            }   
        </>
    )
};

export default DiceProbabilityComponent;