import React, {useState, useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button, Grid} from "@material-ui/core";
import DateSelection from "../components/dateselection";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Typography} from "@material-ui/core";
import axios from "axios";   // HTTP Client


import Plot from "react-plotly.js";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";


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
    button: {
        marginTop: '1.5rem',
        marginLeft: '1.5rem',
        color: 'yellow'
    },
}))

export default function Dashboard() {

    const [ageRecentData, setAgeRecentData] = useState([])
    const [ageLtData, setAgeLtData] = useState([])
    const [rtriGaugeData, setRtriGaugeData] = useState(0)

    const [startDate, setStartDate] = useState(new Date('2020-01-18'));
    const [endDate, setEndDate] = useState(new Date()); // today's date

    const [radioValue, setRadioValue] = React.useState('all');


    const handleDashboardInteraction = async () => {

        const resp = await axios.get('http://localhost:8080/python-retrieve-dashboard-data', {
            params: {

                start_date: startDate.yyyymmdd(),
                end_date: endDate.yyyymmdd(),
                radio: radioValue,
            }
        });
        const respPython = resp.data
        setAgeRecentData(respPython.age_group.recent)
        setAgeLtData(respPython.age_group.longTerm)
        setRtriGaugeData(respPython.gauge)
    }


    useEffect(() => {
        (handleDashboardInteraction)();
    }, [radioValue]);


    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);
    };

    const classes = useStyles();

    const Gauge1data = [
        {
            domain: {x: [0, 1], y: [0, 1]},
            value: rtriGaugeData, number: {suffix: "%"},
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
        y: ageRecentData,
        type: 'bar',
        text: ageRecentData.map(String),
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
        y: ageLtData,
        type: 'bar',
        text: ageLtData.map(String),
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
                    <Grid item>
                        <Typography className={classes.Typo} variant="h5">
                            Select Date
                        </Typography>
                    </Grid>
                    <Grid item>
                        <DateSelection
                            startDate={startDate}
                            setStartDate={setStartDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                        >
                        </DateSelection>
                    </Grid>

                    <Grid item className={classes.button}>
                        <Button variant="contained" onClick={handleDashboardInteraction}>
                            Go
                        </Button>
                    </Grid>

                    <Grid item>
                        <FormControl component="fieldset">
                            <RadioGroup row value={radioValue} onChange={handleRadioChange}>
                                <FormControlLabel value="recent" control={<Radio color="primary"/>} label="Recent"/>
                                <FormControlLabel value="longTerm" control={<Radio color="primary"/>} label="LongTerm"/>
                                <FormControlLabel value="all" control={<Radio color="primary"/>} label="All"/>
                            </RadioGroup>
                        </FormControl>
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

Date.prototype.yyyymmdd = function () {
    const mm = this.getMonth() + 1; // getMonth() is zero-based
    const dd = this.getDate();

    return [this.getFullYear(), "-",
        (mm > 9 ? '' : '0') + mm, "-",
        (dd > 9 ? '' : '0') + dd
    ].join('');
};
