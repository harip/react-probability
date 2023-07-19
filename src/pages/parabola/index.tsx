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
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Area, AreaChart } from "recharts";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ParabolaComponent = () => {
    function getHeaderData(): HeaderComponentProps {
        return {
            previousComponent: 'coin',
            title: 'Parabola'
        }
    }

    const getChartData = () => {
        const vals = Array.from({ length: 100 }, (_, i) => i - 50).map((x) => x);        
        return vals;
    };

    const drawChart = () => {
        const data = getChartData().map((x) =>  {
            return {
                name: x, 
                pv: x * x
            }
        });
        return (
            <>
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart width={730} height={250} data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
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