import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import Footer from './Footer';
import Sidebar from "./Sidebar";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {Paper} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));

export default function BehindTheLinesOfCode() {
    const classes = useStyles();
    const title = "Movie Radar";
    const description = "A small creation for people who like movies, made with React, Context API, Material UI client, PHP server and MySQL Database.";
    const image = require("../images/online_magazine_ER.png");
    console.log(image)

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header />
                <Grid item xs={12} md={8}>
                    <Paper variant="outlined">
                        <img src={image.default} alt={"DB"} />
                    </Paper>
                    <Typography component="h1" variant="h3" gutterBottom>
                        {title}
                    </Typography>
                    <Divider />
                    <Typography paragraph={true}>
                        {description}
                    </Typography>
                </Grid>
                <Grid container spacing={5} className={classes.mainGrid}>
                    <Sidebar />
                </Grid>
            </Container>
            <Footer />
        </React.Fragment>
    );
}