import { Box, Chip, Divider, Slider, Checkbox, AppBar, Button, Toolbar, Tooltip, Link, Container, Paper, Stack, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
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
import { InfiniteScrollProps, InfiniteScrollItem } from "@/lib/models/InfiniteScrollModel";
import InfiniteScrollComponent from "@/components/infinite-scroll";
import ToolBarComponent from "@/components/toolbar";
import dice from "../dice";

interface ChartDataItem {
    outcome: number,
    probability: string
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const CoinComponent = () => {
    const dispatch = useDispatch();
    const [distributionValues, setDistributionValues] = useState<Map<number, string>>(new Map<number, string>());
    const [coinFlipCombos, setCoinFlipCombos] = useState<Array<string>>([])
    const numberOfTrials = useSelector((state: RootState) => {
        return state.coin.numberOfTrials;
    });
    const [selectedOutcome, setSelectedOutcome] = useState<ChartDataItem>();
    const [selectedHeads, setSelectedHeads] = useState<number>(0);

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
        if (e?.activePayload?.length > 0) {
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

    const getHeaderData = (): HeaderComponentProps => {
        return {
            previousComponent: 'dice',
            title: 'Coin Probablilty'
        }
    }

    function createInfiniteScrollData(data: any[]): InfiniteScrollProps {
        const outcomes: Array<InfiniteScrollItem> = data.map((d, i) => {
            return {
                value: d
            }
        });
        return {
            items: outcomes,
            displayItemSize: 200
        };
    }

    const flipMarks = [
        {
            value: 2,
            label: `flips ${numberOfFlips}`,
        }
    ];
    const headMarks = [
        {
            value: 0,
            label: `heads ${selectedHeads}`,
        }
    ];

    const getProbabilityDisplayText = () => {
        const prob = getExperimentationProbabilty(coinFlipCombos, selectedHeads);
        return `Probability of getting ${selectedHeads} heads
        when coin is flipped ${numberOfFlips} time(s)
        is ${prob}`;
    }

    const getBinomialProbabilityText = () => {
        if (!selectedOutcome) {
            return 'Click bar to get probability';
        }
        return `The probability of getting ${selectedOutcome?.outcome} 
        head in ${numberOfTrials} coin flips is ${selectedOutcome?.probability}`;
    }

    return (
        <>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <ToolBarComponent {...getHeaderData()} />
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} className={styles.mainCard}>
                    <Typography component="h1" variant="h4" align="center">
                        Coin Probability
                    </Typography>

                    <Stack
                        spacing={{ xs: 1, sm: 2 }}
                        direction={{ xs: 'column', lg: 'column' }}
                        useFlexGap
                        flexWrap={{ xs: 'wrap', lg: 'nowrap' }}
                        sx={{ '& > *': { flexGrow: 1 }, alignItems: { lg: 'center' } }}
                    >
                        <Item sx={{ width: { xs: '100%', lg: '100%' } }}>
                            Probability by Binomial Distribution
                            {
                                distributionValues && drawChart()
                            }
                            <div className={styles.slider}>
                                <Slider
                                    defaultValue={2}
                                    onChange={(e, v) => onNumberOfTrialsChange(e, v)}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={2}
                                    max={50}
                                />
                            </div>
                            Number of coin flips - {numberOfTrials}

                            <div>
                                <Chip color="success" label={getBinomialProbabilityText()} />
                            </div>
                        </Item>

                        <Item sx={{ width: { xs: '100%', lg: '100%' } }}>
                            Probability by Experimentation
                            <div className={styles.slider}>
                                <Slider
                                    defaultValue={2}
                                    onChange={(e, v) => onNumberOfFlips(e, v)}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks={flipMarks}
                                    min={2}
                                    max={20}
                                />
                            </div>

                            <div className={styles.slider}>
                                <Slider
                                    defaultValue={2}
                                    onChange={(e, v) => onSelectHeads(e, v)}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks={headMarks}
                                    min={0}
                                    max={numberOfFlips}
                                />
                            </div>

                            <div>
                                <Chip color="success" label={getProbabilityDisplayText()} />
                            </div>

                            <Divider className={styles.divider} />
                            <Typography>
                                Total combinations = {coinFlipCombos.length}
                            </Typography>
                            <div>
                                <InfiniteScrollComponent
                                    {...createInfiniteScrollData(coinFlipCombos)}
                                />
                            </div>
                        </Item>

                        <Item sx={{ width: { xs: '100%', lg: '100%' } }}>
                            <Typography variant="subtitle2"  >
                                Redux Store
                            </Typography>
                            <Link href="https://github.com/harip/react-probability/blob/904f6e2d7218a2796e92a3c14174504d19cdeb85/src/lib/coin.utils.ts#L38">Coin combinations algorithm</Link>
                            <div>
                                <Link href="https://github.com/harip/react-probability/blob/main/src/components/infinite-scroll/index.tsx">More Button Component</Link>
                            </div>
                        </Item> 
                    </Stack>
                </Paper>
            </Container> 
        </>
    )
}
export default CoinComponent;
