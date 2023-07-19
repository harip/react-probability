import React from "react";
import { HeaderComponentProps } from "@/lib/models/HeaderModel";
import {
    Paper,
    styled,
    Divider,
    Container,
    Stack,
    Typography,
    Tooltip
} from "@mui/material";
import ToolBarComponent from "@/components/toolbar";
import styles from './parabola.module.css';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Area, AreaChart, ScatterChart, ReferenceLine, Label } from "recharts";
import { Scatter } from "recharts";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ParabolaComponent = () => {
    // This is a stest
    function getHeaderData(): HeaderComponentProps {
        return {
            previousComponent: 'coin',
            title: 'Parabola'
        }
    }

    const getChartData = () => {
        const vals = Array.from({ length: 10001 }, (_, i) => i - 5000).filter(x => x % 4 === 0).map((x) => x);
        return vals;
    };

    const drawChart = () => {
        const data = getChartData().map((x) => {
            return {
                x: x,
                y: x * x
            }
        });
        return (
            <>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        width={500}
                        height={300}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey="x"
                            domain={['auto', 'auto']}
                            interval={0}
                            type="number"
                            label={{
                                key: 'xAxisLabel',
                                value: 'x',
                                position: 'bottom',
                            }}
                            allowDataOverflow={true}
                            strokeWidth={1}
                        />
                        
                        <ReferenceLine
                            x={0}
                            stroke="gray"
                            strokeWidth={1.5}
                            strokeOpacity={0.65}
                        >
                        </ReferenceLine>

                        <ReferenceLine
                            y={0}
                            stroke="gray"
                            strokeWidth={1.5}
                            strokeOpacity={0.65}
                        />

                        <Line
                            strokeWidth={2}
                            data={data}
                            dot={false}
                            type="monotone"
                            dataKey="y"
                            stroke="black"
                            tooltipType="none"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </>
        )
    }

    return (
        <>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <ToolBarComponent {...getHeaderData()} />
                <Paper
                    variant="outlined"
                    sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                    className={styles.mainCard}
                >
                    <Typography component="h1" variant="h4" align="center">
                        Parabola
                    </Typography>

                    <Stack
                        spacing={{ xs: 1, sm: 2 }}
                        direction={{ xs: 'column', lg: 'column' }}
                        useFlexGap
                        flexWrap={{ xs: 'wrap', lg: 'nowrap' }}
                        sx={{ '& > *': { flexGrow: 1 }, alignItems: { lg: 'center' } }}
                    >
                        <Item sx={{ width: { xs: '100%', lg: '100%' } }}>
                            {
                                drawChart()
                            }
                        </Item>
                    </Stack>

                </Paper>
            </Container >
        </>
    )
}

export default ParabolaComponent;