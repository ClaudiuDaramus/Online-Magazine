import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import Footer from './Footer';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {Paper} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
    typography: {
        whiteSpace: "pre-wrap"
    }
}));

export default function BehindTheLinesOfCode() {
    const classes = useStyles();
    const title = "Movie Radar";
    const description = "Movie Radar is a website where you can find the latest news and review about films on any scale, medium and length. \n" +
        "The client is made with React, Context API and Material UI. \n" +
        "The server is made with PHP language, PHP PDO and login/registration implemented with JWT. \n" +
        "The Database is made with MySQL. \n" +
        "Next you can see the Entity Relationship Diagram of the database.";
    const image = require("../images/online_magazine_ER.png");

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header />
                <Grid item xs={12} md={8}>
                    <Typography component="h1" variant="h3" gutterBottom>
                        {title}
                    </Typography>
                    <Divider />
                    <Typography paragraph={true} className={classes.typography}>
                        {description}
                    </Typography>
                    <Paper variant="outlined">
                        <img src={image.default} alt={"DB"} />
                    </Paper>
                </Grid>
            </Container>
            <Footer />
        </React.Fragment>
    );
}