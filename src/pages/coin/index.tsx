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
    probability: number
}

const CoinComponent = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [distributionValues, setDistributionValues] = useState<Map<number, number>>(new Map<number, number>());
    const [coinFlipCombos, setCoinFlipCombos] = useState<Array<string>>([])
    const numberOfTrials = useSelector((state: RootState) => {
        return state.coin.numberOfTrials;
    });

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

    const drawChart = () => {
        const data: ChartDataItem[] = [];
        distributionValues.forEach((val: number, key: number) => {
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
        <>
            <AppBar position="static">
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
                <div  >
                    <Box sx={{ height: 400 }}>
                        <Slider
                            aria-label="Temperature"
                            defaultValue={2}
                            onChange={(e, v) => onNumberOfTrialsChange(e, v)}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={2}
                            max={50}
                            orientation="vertical"
                            sx={{
                                '& input[type="range"]': {
                                    WebkitAppearance: 'slider-vertical',
                                },
                            }}
                        />
                    </Box>
                </div>
                <Card sx={{ minWidth: 650 }}>
                    <CardHeader
                        title="Binomial Distribution"
                        subheader={`number of trials : ${numberOfTrials}`}
                    />
                    <CardContent>
                        {
                            distributionValues && drawChart()
                        }
                        <Typography>
                            Number of successful outcomes
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ minWidth: 345 }} className={styles.item}>
                    <CardContent>
                        <Typography variant="subtitle2">
                            The probability of getting 2 heads in n coin flips is the bar height at x-axis = 2
                        </Typography>
                    </CardContent>
                </Card>
            </div>

            <div className={styles.divider}>
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
                <Card sx={{ minWidth: 500, maxWidth: 500 }}>
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
                            coinFlipCombos.map(c=>{
                                return <Chip label={`${c}`} variant="outlined" color="primary" />
                            })
                        } 
                    </CardContent>
                </Card>
                <Card sx={{ minWidth: 345 }} className={styles.item}>
                    <CardContent>
                        <Typography variant="subtitle2">
                            The probability of getting 2 heads in n coin flips is the bar height at x-axis = 2
                        </Typography>
                    </CardContent>
                </Card>
            </div>

        </>
    )
}
export default CoinComponent;
