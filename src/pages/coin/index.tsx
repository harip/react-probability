import { Box, Chip, Divider, Slider, Checkbox, AppBar, Button, Toolbar, Tooltip, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography'; 
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import styles from './coin.module.css'
import { useDispatch } from "react-redux";
import { setNumberOfFlips, setNumberOfTrails } from "../../store/coin-action";
import { useSelector } from 'react-redux';
import { RootState, CoinProbabilityState } from '../../store/types';
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, ResponsiveContainer } from "recharts";
import {
    binomialDistribution,
    getCoinFlipCombinations,
    getExperimentationProbabilty
} from "../../lib/coin.utils";
import { HeaderComponentProps } from "@/lib/models/HeaderModel";
import HeaderComponent from "@/components/header";
import { InfiniteScrollProps, InfiniteScrollItem } from "@/lib/models/InfiniteScrollModel";
import InfiniteScrollComponent from "@/components/infinite-scroll";

interface ChartDataItem {
    outcome: number,
    probability: string
}

const CoinComponent = () => {
    const dispatch = useDispatch();
    const [distributionValues, setDistributionValues] = useState<Map<number, string>>(new Map<number, string>());
    const [coinFlipCombos, setCoinFlipCombos] = useState<Array<string>>([])
    const numberOfTrials = useSelector((state: RootState) => {
        return state.coin.numberOfTrials;
    });
    const [selectedOutcome,setSelectedOutcome] = useState<ChartDataItem>();
    const [selectedHeads,setSelectedHeads] = useState<number>(0);

    const numberOfFlips = useSelector((state: RootState) => {
        return state.coin.numberOfFlips;
    });

    useEffect(() => {
        const distribution = binomialDistribution(numberOfTrials);
        setDistributionValues(distribution);
    }, [numberOfTrials])

    useEffect(() => {
        const coinFlipCombos = getCoinFlipCombinations(numberOfFlips);
        setCoinFlipCombos(coinFlipCombos);
    }, [numberOfFlips]) 

    const onNumberOfTrialsChange = (event: any, value: any) => {
        dispatch(setNumberOfTrails(value))
    }

    const onNumberOfFlips = (event: any, value: any) => {
        dispatch(setNumberOfFlips(value))
    }

    const onBinomailChartClick = (e: any) => {
        if (e?.activePayload?.length>0) {
            setSelectedOutcome(e.activePayload[0]?.payload);
        }
    }

    const onSelectHeads = (event: any, value: any) => {
        setSelectedHeads(value);
    }

    const drawChart = () => {
        const data: ChartDataItem[] = [];
        distributionValues.forEach((val: any, key: any) => {
            data.push({
                outcome: key,
                probability: val
            })
        });
        return (
            <>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                        className={styles.item4}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                        onClick={onBinomailChartClick}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="outcome" />
                        <YAxis label={{ value: 'Probability', angle: -90, position: 'insideLeft' }} />
                        <Bar dataKey="probability" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </>
        )
    }

    const showCombinations = () => {
        return numberOfFlips <= 10;
    } 

    const getHeaderData = ():HeaderComponentProps => {
        return {
            previousComponent: 'dice',
            title: 'Coin Probablilty'
        }
    }

    function createInfiniteScrollData(data: any[]) : InfiniteScrollProps {
        const outcomes:Array<InfiniteScrollItem> = data.map((d, i) => {
            return {
                value: d
            }
        });
        return {
            items: outcomes,
            displayItemSize: 200
        };   
    }    

    return (
        <>
            <div className={styles.title}>
                <HeaderComponent {...getHeaderData()}></HeaderComponent>
                <div>
                    <Typography variant="subtitle2"  >
                        Redux Store
                    </Typography>
                    <Link href="https://github.com/harip/react-probability/blob/904f6e2d7218a2796e92a3c14174504d19cdeb85/src/lib/coin.utils.ts#L38">Coin combinations algorithm</Link>
                    <div>
                        <Link href="https://github.com/harip/react-probability/blob/main/src/components/infinite-scroll/index.tsx">More Button Component</Link>
                    </div>
                </div>               
            </div>

            <div className={styles.binomial}>
                <Card  className={styles.chartItem}>
                    <CardHeader
                        title="Binomial Distribution"
                        subheader={`number of trials : ${numberOfTrials}`}
                    />
                    <CardContent>
                        {
                            distributionValues && drawChart()
                        }
                        <Typography>
                            Number of successful heads
                        </Typography>
                        <div className={styles.divider}>
                            <Divider />
                        </div>
                        <Box  >
                            <Slider
                                defaultValue={2}
                                onChange={(e, v) => onNumberOfTrialsChange(e, v)}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={2}
                                max={50}
                            />
                        </Box> 
                        <Typography>
                            Number of coin flips
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: 345 }} className={styles.item}>
                    <CardHeader
                        title="Click on bar to know probability"
                    />
                    <CardContent>
                        {  selectedOutcome && 
                            (<Typography variant="subtitle2">
                                The probability of getting {selectedOutcome.outcome} 
                                {numberOfTrials > 1 ? ' heads' : ' head'} in {numberOfTrials} coin flips is {` ${selectedOutcome.probability}`} (bar height at x-axis = {selectedOutcome.outcome})
                            </Typography>)
                        }
                    </CardContent>
                </Card>
            </div>

            <div className={styles.divider}>
                <Divider />
            </div>

            <div className={styles.binomial}>

                <Card  className={styles.chartItem}>
                    <CardHeader
                        title="Experimentation"
                        subheader={`number of flips : ${numberOfFlips}`}
                    />
                    <CardContent>
                        <Box  >
                            <Slider
                                defaultValue={2}
                                onChange={(e, v) => onNumberOfFlips(e, v)}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={2}
                                max={20}
                            />
                        </Box>
                        <div className={styles.divider}>
                            <Divider />
                        </div>     
                        <Typography>
                            total combinations = {coinFlipCombos.length}
                        </Typography>
                        <div>
                            <InfiniteScrollComponent 
                                {...createInfiniteScrollData(coinFlipCombos)}
                            />
                        </div>                                                                   
                     </CardContent>
                </Card>

                <Card  sx={{ maxWidth: 345 }} className={styles.chartItem}>
                    <CardHeader
                        title="Probability"
                    />
                    <CardContent>
                        <Box  >
                            <Slider
                                defaultValue={2}
                                onChange={(e, v) => onSelectHeads(e, v)}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={numberOfFlips}
                            />
                            Select number of heads
                        </Box>
                        <div className={styles.divider}>
                            <Divider />
                        </div>     
                        <Typography>
                            Probability of getting {selectedHeads} heads
                            when coin is flipped {numberOfFlips} times(s)
                            is {getExperimentationProbabilty(coinFlipCombos, selectedHeads)}
                        </Typography> 
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
export default CoinComponent;
