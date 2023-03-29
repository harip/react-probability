import { Box, Chip, Divider, Slider, Checkbox, AppBar, Button, Toolbar, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import { useRouter } from "next/router";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './coin.module.css'
import { useDispatch } from "react-redux";
import { setNumberOfTrails } from "../../store/coin-action";
import { useSelector } from 'react-redux';
import { RootState, CoinProbabilityState } from '../../store/types';
import { binomialDistribution } from "./coin-utils";
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";

interface ChartDataItem {
    outcome: number,
    probability: number
}

const CoinComponent = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [distributionValues, setDistributionValues] = useState<Map<number, number>>(new Map<number, number>())
    const numberOfTrials = useSelector((state: RootState) => {
        return state.coin.numberOfTrials;
    });

    useEffect(() => {
        const distribution = binomialDistribution(numberOfTrials);
        setDistributionValues(distribution);
    }, [numberOfTrials])

    const navigateToNextPage = () => {

    }
    const navigateToPreviousPage = () => {
        router.push('dice');
    }

    const onNumberOfTrialsChange = (event: any, value: any) => {
        dispatch(setNumberOfTrails(value))
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
                <BarChart
                    className={styles.item4}
                    width={700}
                    height={600}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="outcome" label={<text dx={300} dy={600} fill="#666">Number of successful outcomes</text>}/>
                    <YAxis label={{ value: 'Probability', angle: -90, position: 'insideLeft' }}/>
                    <Bar dataKey="probability" fill="#8884d8" />
                </BarChart>
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
                            Coin Probablilty - Binomail Distribution
                        </div>
                    </Typography>
                    <Button color="inherit" onClick={navigateToNextPage}>
                        <ArrowForwardIcon fontSize='large' />
                    </Button>
                </Toolbar>
            </AppBar>

            <div className={styles.slider}>
                <Box sx={{ height: 600 }}>
                    <Slider
                        aria-label="Temperature"
                        defaultValue={2}
                        onChange={(e, v) => onNumberOfTrialsChange(e, v)}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={2}
                        max={100}
                        orientation="vertical"
                        sx={{
                            '& input[type="range"]': {
                                WebkitAppearance: 'slider-vertical',
                            },
                        }}
                    />
                </Box>
                <div>
                    Trials : {numberOfTrials}
                </div>
                {
                    distributionValues && drawChart()
                }
            </div>
        </>
    )
}
export default CoinComponent;