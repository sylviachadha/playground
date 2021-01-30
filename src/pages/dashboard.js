import React, {useState,useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import DateSelection from "/Users/sylviachadha/WebstormProjects/playground/src/components/dateselection";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Typography} from "@material-ui/core";
import axios from "axios";   // HTTP Client


import Plot from "react-plotly.js";


const useStyles = makeStyles(theme => ({
    mainContainer1: {
        padding: 0,
        margin: 0
    },
    mainContainer2: {
        padding: 0,
        margin: 0
    },
    Typo: {
        marginTop: '1.5rem',
        marginLeft: '2rem',
        marginRight: '3rem',
    },
    DateGrid: {
       backgroundColor: '#e8eae6'
    },
}))

export default function Dashboard() {

    const [recentData,setRecentData] = useState([])
    const [ltData,setLt] = useState([])

    useEffect(async () => {
        const resp = await axios.get('http://localhost:8080/python-hiv-cases-by-age');
        const responseObjParent = await JSON.parse(resp.data)
        const  respObj = responseObjParent.result;
        console.log(respObj)

        // const respObj =  await JSON.parse(resp.data.result)
        // setRecentData(respObj.recent)
        // setLt(respObj.longTerm)
    }, []);

    const classes = useStyles();

    const Gauge1data = [
        {
            domain: {x: [0, 1], y: [0, 1]},
            value: 90.1, number: {suffix: "%"},
            title: {text: "Tested by RTRI"},
            type: "indicator",
            mode: "gauge+number",
            delta: {reference: 100},
            gauge: {axis: {range: [null, 100]}}
        }
    ];

    const ageGroup = ['15-25', '25-35', '35-45', '45-55'];




    const recent = {
        x: ageGroup,
        y: recentData,
        type: 'bar',
        text: recentData.map(String),
        textposition: 'auto',
        hoverinfo: 'none',
        name: "LT",
        opacity: 0.5,
        marker: {
            color: 'rgb(158,202,225)',
            line: {
                color: 'rgb(8,48,107)',
                width: 1.5
            }
        }
    };

    const longTerm = {
        x: ageGroup,
        y: ltData,
        type: 'bar',
        text: ltData.map(String),
        textposition: 'auto',
        hoverinfo: 'none',
        name: "Recent",
        marker: {
            color: 'rgba(58,200,225,.5)',
            line: {
                color: 'rgb(8,48,107)',
                width: 1.5
            }
        }
    };

    const Bar2Data = [recent, longTerm];

    const Bar2Layout = {
        width: 430,
        height: 350,
        title: "Age Group Impacted",
        xaxis: {title: 'Age group'},
        yaxis: {title: 'No of HIV Cases'}
    };

    return (
        <Grid container className={classes.mainContainer1} direction={"column"}>
            <Grid item>
                <Grid container className={classes.DateGrid}>
                    <Grid item >
                        <Typography className={classes.Typo}variant="h5">
                            Select Date
                        </Typography>
                    </Grid>
                    <Grid item>
                        <DateSelection></DateSelection>
                    </Grid>
                </Grid>
            </Grid>
            < Grid item>
                <Grid container>
                    <Grid item>
                        <Card className={classes.root} variant="outlined">
                            <CardContent>
                                <Plot
                                    data={Gauge1data}
                                    layout={{
                                        width: 300, height: 180, margin: {t: 0, b: 0},
                                        paper_bgcolor: "#eaeaea"
                                    }}

                                    // To disable trace
                                    config={{displayModeBar: false, staticPlot: false}}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card className={classes.root} variant="outlined">
                            <CardContent>
                                <Plot
                                    data={Bar2Data}
                                    layout={Bar2Layout}

                                    // To disable trace
                                    config={{displayModeBar: false, staticPlot: false}}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    );
}
