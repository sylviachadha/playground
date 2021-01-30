import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: {
        backgroundColor: "#3f72af"
        // backgroundColor: "#253b6e"
    },
    title: {
        flexGrow: 1
    },
    icon: {
        width:50,
        height:50
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar} >

                    <Typography variant={"h4"} className={classes.title}>
                        Bangkok HIV Epidemic Analysis
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
