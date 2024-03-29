import React from "react";
import { HeaderComponentProps } from "@/lib/models/HeaderModel";
import {
    Paper,
    styled,
    Divider,
    Container,
    Stack,
    Typography,
    Tooltip,
    Slider,
    Button
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
    const [chartData, setChartData] = React.useState<any[]>([]);

    const [intercept, setIntercept] = React.useState<number>(0);
    const [quadCoefficient, setQuadCoefficient] = React.useState<number>(1);
    const [quadReducer, setQuadReducer] = React.useState<number>(0);

    React.useEffect(() => {
        setChartData(getChartData());
    }, [intercept, quadCoefficient, quadReducer]);

    const interceptMarks = [
        {
            value: intercept,
            label: `c = ${intercept}`,
        }
    ];

    const quadCoefficientMarks = [
        {
            value: quadCoefficient,
            label: `a = ${quadCoefficient}`,
        }
    ];

    const quadReducerMarks = [
        {
            value: quadReducer,
            label: `i = ${quadReducer}`,
        }
    ];

    // This is a stest
    function getHeaderData(): HeaderComponentProps {
        return {
            previousComponent: 'coin',
            title: 'Parabola'
        }
    }

    const getChartData = () => {
        const vals = Array.from({ length: 2000 }, (_, i) => i - 1000).filter(x => x % 4 === 0).map((x) => x);
        const data = vals.map((x) => {
            return {
                x: x,
                y: (quadCoefficient * ((x + quadReducer) * (x + quadReducer))) + intercept
            }
        });
        return data;
    };

    const drawChart = () => {
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
                            domain={[-1000, 1000]}
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

                        <YAxis domain={[-250000, 250000]} orientation="left" allowDataOverflow={true} />

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
                            data={chartData}
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

    const trueEquation = () => {
        
        const xTerm = quadReducer === 0
            ? (<code>x</code>)
            : (<code>(x{quadReducer >= 0 ? '+' : '-'}{Math.abs(quadReducer)})</code>)
        const quadTerm = quadCoefficient === 0 ? (<code> y = </code>) : (<code> y = {quadCoefficient}{xTerm}<sup>2</sup> </code>);
        return (
            <>
                <code> {quadTerm} {intercept >= 0 ? '+' : '-'} {Math.abs(intercept)}</code>
            </>
        );
    }

    function onConstantChange(event: any, value: any) {
        setIntercept(value);
    }
    function onQuadCoefficientChange(event: any, value: any) {
        setQuadCoefficient(value);
    }
    function onQuadReducerChange(event: any, value: any) {
        setQuadReducer(value);
    }

    const handleReset = () => {
        setIntercept(0);
        setQuadCoefficient(1);
        setQuadReducer(0);
    }

    return (
        <>
            <Typography component="h1" variant="h4" align="center">
                Parabola
            </Typography>

            <div className={styles.equationHeader}>
                <code>y = a(x+i)<sup>2</sup> + c</code>
                {
                    trueEquation()
                }
            </div>

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

                <Item sx={{ width: { xs: '100%', lg: '100%' } }}>
                    <div className={styles.slider}>
                        <Slider
                            defaultValue={0}
                            onChange={(e, v) => onConstantChange(e, v)}
                            valueLabelDisplay="auto"
                            step={50}
                            min={-50000}
                            max={50000}
                            marks={interceptMarks}
                        />
                    </div>

                    <div className={styles.slider}>
                        <Slider
                            defaultValue={1}
                            onChange={(e, v) => onQuadCoefficientChange(e, v)}
                            valueLabelDisplay="auto"
                            step={0.1}
                            min={-3}
                            max={3}
                            marks={quadCoefficientMarks}
                        />
                    </div>

                    <div className={styles.slider}>
                        <Slider
                            defaultValue={1}
                            onChange={(e, v) => onQuadReducerChange(e, v)}
                            valueLabelDisplay="auto"
                            step={1}
                            min={-500}
                            max={500}
                            marks={quadReducerMarks}
                        />
                    </div>
                </Item>

                <Item sx={{ width: { xs: '100%', lg: '100%' } }}>
                    <Button variant="contained" color="primary" onClick={handleReset}>
                        Reset
                    </Button>
                </Item>
            </Stack>

        </>
    )
}

export default ParabolaComponent;