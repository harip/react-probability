import { Box, Chip, Divider, Slider, Checkbox, AppBar, Button, Toolbar, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import { useRouter } from "next/router";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './coin.module.css'
import { useDispatch } from "react-redux";
import { setNumberOfFlips, setNumberOfTrails } from "../../store/coin-action";
import { useSelector } from 'react-redux';
import { RootState, CoinProbabilityState } from '../../store/types';
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, ResponsiveContainer } from "recharts";
import {
    binomialDistribution,
    getCoinFlipCombinations
} from "../../lib/coin.utils";

interface ChartDataItem {
    outcome: number,
    probability: string
}

const CoinComponent = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [distributionValues, setDistributionValues] = useState<Map<number, string>>(new Map<number, string>());
    const [coinFlipCombos, setCoinFlipCombos] = useState<Array<string>>([])
    const numberOfTrials = useSelector((state: RootState) => {
        return state.coin.numberOfTrials;
    });
    const [selectedOutcome,setSelectedOutcome] = useState<ChartDataItem>();

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

    const navigateToNextPage = () => {

    }
    const navigateToPreviousPage = () => {
        router.push('dice');
    }

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

    return (
        <div >
            <AppBar position="static" >
                <Toolbar>
                    <Button color="inherit" onClick={navigateToPreviousPage}>
                        <ArrowBackIcon fontSize='large' />
                    </Button>
                    <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                        <div className={styles.title}>
                            Coin Probablilty
                        </div>
                    </Typography>
                    <Button color="inherit" onClick={navigateToNextPage}>
                        <ArrowForwardIcon fontSize='large' />
                    </Button>
                </Toolbar>
            </AppBar>

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

            {/* <div className={styles.divider}>
                <Divider />
            </div>

            <div className={styles.binomial}>
                <div  >
                    <Box sx={{ height: 300 }}>
                        <Slider
                            aria-label="Temperature"
                            defaultValue={3}
                            onChange={(e, v) => onNumberOfFlips(e, v)}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={2}
                            max={10}
                            orientation="vertical"
                            sx={{
                                '& input[type="range"]': {
                                    WebkitAppearance: 'slider-vertical',
                                },
                            }}
                        />
                    </Box>
                    <div>
                        {`${numberOfFlips}`}
                    </div>
                </div>
                <Card sx={{ minWidth: 500, maxWidth: 500 }} className={styles.item}>
                    <CardHeader
                        title="Coin Flip Combinations"
                    />
                    <CardContent>
                        <Typography>
                            {`number of flips : ${numberOfFlips}`}
                        </Typography>
                        <Typography>
                            total combinations {coinFlipCombos.length}
                        </Typography>
                        {
                            coinFlipCombos.map((c, i) => {
                                return <Chip label={`${c}`} variant="outlined" color="primary" key={`chip-allcombo-${i}`} />
                            })
                        }
                    </CardContent>
                </Card>
                <Card sx={{ minWidth: 345 }} className={styles.item}>
                    <CardContent>
                        <Box sx={{ height: 400 }} className={styles.item}>
                            <Slider
                                aria-label="Temperature"
                                defaultValue={2}
                                onChange={(e, v) => onNumberOfTrialsChange(e, v)}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={2}
                                max={10}
                            />
                        </Box>
                        <Typography variant="subtitle2">
                            The probability of getting 2 heads in n coin flips is the bar height at x-axis = 2
                        </Typography>
                    </CardContent>
                </Card>
            </div> */}

        </div>
    )
}
export default CoinComponent;
