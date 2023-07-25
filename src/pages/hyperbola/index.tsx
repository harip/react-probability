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
import styles from './hyperbola.module.css';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Area, AreaChart, ScatterChart, ReferenceLine, Label } from "recharts";
import { getLeftVerticalParabola, getLinePoints } from "@/lib/conic.utils";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const HyperbolaComponent = () => {
    const [chartData, setChartData] = React.useState<any[]>([]);
    const [asymptote1, setAsymptote1] = React.useState<any[]>([]);
    const [asymptote2, setAsymptote2] = React.useState<any[]>([]);
    const [leftParabola, setLeftParabola] = React.useState<any[]>([]);
    const [intercept, setIntercept] = React.useState<number>(0);
    const [quadCoefficient, setQuadCoefficient] = React.useState<number>(1);
    const [quadReducer, setQuadReducer] = React.useState<number>(0);

    React.useEffect(() => {
        const {data,a1, a2, leftParabola} = getChartData();
        setChartData(data);
        setAsymptote1(a1);
        setAsymptote2(a2);
        setLeftParabola(leftParabola);
    }, [intercept, quadCoefficient, quadReducer]); 
 
    const getChartData = () => {
        const k=0;
        const h=0;
        const a = 4;
        const b= 5;

        const vals = Array.from({ length: 2000 }, (_, i) => i - 1000).filter(x => x % 4 === 0).map((x) => x);
        const data = vals.map((x) => {
            const y =  Math.sqrt(((Math.pow((x - h), 2) / Math.pow(a, 2) )-1)) * b + k;
            return {
                x: x,
                y: y
            }
        });

        vals.map((x) => {
            const y =  -Math.sqrt(((Math.pow((x - h), 2) / Math.pow(a, 2) )-1)) * b + k;
            data.push({
                x: x,
                y: y
            })
        });

        // Asymptote 1
        const a1 = getLinePoints(b,a,k);
        const a2 = getLinePoints(-b,a,k);

        // Left side of the hyperbola
        const c = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
        const leftVertex = {x: h-a, y: k};
        const leftFoci = {x: h-c, y: k};
        const leftParabola = getLeftVerticalParabola(leftVertex, leftFoci);

        return {data, a1, a2, leftParabola};
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

                        <YAxis domain={[-2000, 2500]} orientation="left" allowDataOverflow={true} />

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

                        {/* <Line
                            strokeWidth={2}
                            data={chartData}
                            dot={false}
                            type="monotone"
                            dataKey="y"
                            stroke="black"
                            tooltipType="none"
                        /> */}

                        {/* <Line
                            strokeWidth={2}
                            data={asymptote1}
                            dot={false}
                            type="monotone"
                            dataKey="y"
                            stroke="red"
                            tooltipType="none"
                        /> */}
                        <Line
                            strokeWidth={2}
                            data={asymptote2}
                            dot={false}
                            type="monotone"
                            dataKey="y"
                            stroke="red"
                            tooltipType="none"
                        />
                        <Line
                            strokeWidth={2}
                            data={leftParabola}
                            dot={false}
                            type="monotone"
                            dataKey="y"
                            stroke="red"
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

    const handleReset = () => {
        setIntercept(0);
        setQuadCoefficient(1);
        setQuadReducer(0);
    }

    const getHyperbolaEquation = () => {
        return (
            <code>
            <sup>(x - h)<sup>2</sup></sup>&frasl;<sub>(a<sup>2</sup>)</sub> - <sup>(y - k)<sup>2</sup></sup>&frasl;<sub>b<sup>2</sup></sub> = 1
          </code>
        );
      };

    return (
        <>
            <Typography component="h1" variant="h4" align="center">
                Hyperbola
            </Typography>

            <div className={styles.equationHeader}>
                {getHyperbolaEquation()}
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
                    <Button variant="contained" color="primary" onClick={handleReset}>
                        Reset
                    </Button>
                </Item>
            </Stack>
        </>
    )
}

export default HyperbolaComponent;