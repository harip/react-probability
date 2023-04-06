import { Box, Chip, Divider, Slider, Checkbox, AppBar, Button, Toolbar, Link } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useMemo, useState } from "react"; 
import Typography from '@mui/material/Typography'; 
import DiceComponent from "./components/dice";
import OutcomeDisplayComponent from "./components/outcome-display";
import styles from './dice.module.css'
import { getProbabilityInfo } from "../../lib/dice.utils";
import { HeaderComponentProps } from "@/lib/models/HeaderModel";
import HeaderComponent from "@/components/header"; 
import InfiniteScrollComponent from "@/components/infinite-scroll";
import { InfiniteScrollProps, InfiniteScrollItem } from "@/lib/models/InfiniteScrollModel";

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

    function createInfiniteScrollData(data: any[][]) : InfiniteScrollProps {
        const outcomes:Array<InfiniteScrollItem> = data.map((d, i) => {
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

    const getHeaderData = ():HeaderComponentProps => {
        return {
            nextComponent: 'coin',
            title: 'Dice Probability'
        }
    }

    return (
        <>
            <div className={styles.title}>
                <HeaderComponent {...getHeaderData()}></HeaderComponent>
                <div>
                    <Typography variant="subtitle2"  >
                        Component State/Local State
                    </Typography>
                    <Link href="https://github.com/harip/react-probability/blob/59d65cafa409355c888b8c37586266b3d9c6a06c/src/lib/dice.utils.ts#L18">Dice combinations algorithm</Link>
                    <div>
                        <Link href="https://github.com/harip/react-probability/blob/main/src/components/infinite-scroll/index.tsx">More Button Component</Link></div>
                    </div>
            </div>
            <div className={styles.center}>
                <div>
                    {createDice()}
                </div>
                <div className={styles.item}>

                    <Slider
                        defaultValue={1}
                        onChange={(e, v) => onDiceSliderChange(e, v)}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={6}
                    />

                </div>
                <div>
                    Number of dice - {dice}
                </div>
            </div>
            <Divider />
            <div className={styles.center}>
                <div >
                    {sum}
                </div>
                <div className={styles.item}>
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
                </div>
                <div>
                    Sum of rolled numbers - {sum}
                </div>
            </div>
            <Divider />
            <div className={styles.center}>
                <div className={styles.probability}> 
                    Probability of getting sum {sum} when {dice} dice are rolled = {getProbablityCalculations.probability}
                </div>
                <Typography variant="subtitle2" className= {styles.likelyEventItem}>
                        {`(likely events/possible outcomes)=(${getProbablityCalculations.numberOfWaysEventCanOccur.length}/${getProbablityCalculations.totalPossibleOutcomes.length})`}
                </Typography>
            </div>
            <Divider />
            {getProbablityCalculations &&
                <div className={styles.center}>
                    <Typography variant="h6" className= {styles.likelyEventItem}>
                        Number of likely events
                    </Typography>
                    <Typography variant="subtitle2" className= {styles.likelyEventItem}>
                        {<Chip color="primary" label= {`sum of ${sum}`} />} with 
                        {' '}
                        {<Chip color="primary" label= {`${dice} dice `} />} is
                        {' '}
                        {<Chip color="success" label= {getProbablityCalculations.numberOfWaysEventCanOccur.length} />}
                    </Typography> 
                    <div>
                        {createOutcomeDisplay(getProbablityCalculations.numberOfWaysEventCanOccur, 'ev')}
                    </div>
                </div>
            }
            <Divider /> 
            <div className={styles.center}>
                <Typography variant="h6" className= {styles.likelyEventItem}>
                    Total possible outcomes - {getProbablityCalculations.totalPossibleOutcomes.length}
                </Typography> 
                <div>
                    <InfiniteScrollComponent 
                        {...createInfiniteScrollData(getProbablityCalculations.totalPossibleOutcomes)}
                    />
                </div>
            </div> 
        </>
    )
};

export default DiceProbabilityComponent;
