import React, {useContext, useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Link from "@material-ui/core/Link";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./Header";
import About from "./About";
import Container from "@material-ui/core/Container";
import Footer from "./Footer";
import {makeStyles} from "@material-ui/core/styles";
import {useLocation} from "react-router-dom";
import {MyContext} from "../contexts/MyContext";
import {Paper} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));

export default function Article() {
    let location = useLocation();
    const classes = useStyles();
    const {getArticle} = useContext(MyContext);
    const [post,setPost] = useState({title:"", user:{name:""}, body:"", create_date:""});
    const image = post !== undefined && post.id !== undefined ? require("../images/" + post.id + ".jpg") : "";

    useEffect( () => {
        const id = parseInt(location.pathname.split("/article/")[1]);
        getArticle(id).then(data => {
            if(data.message !== "No article found"){
                setPost(data);
            } else {
                setPost({title:data.message, user:{name:""}, body:"", create_date:""});
            }
        });
    }, [getArticle, location]);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header />
                <Grid item xs={12} md={8}>
                    <Paper variant="outlined" xs={12} md={8}>
                        <img src={image.default} alt={"main"} style={{maxWidth: "100%", maxHeight: "100%"}} />
                    </Paper>
                    <Typography component="h1" variant="h3" gutterBottom>
                        {post.title}
                    </Typography>
                    <Typography variant="caption" gutterBottom paragraph={true}>
                        {post.create_date !== undefined && post.create_date !== "" ? post.create_date + " by " : ""}
                        <Link>
                            {post.user.name}
                        </Link>
                    </Typography>
                    <Divider />
                    <Typography paragraph={true}>
                        {post.body}
                    </Typography>
                </Grid>
                <Grid container spacing={5} className={classes.mainGrid}>
                    <About />
                </Grid>
            </Container>
            <Footer />
        </React.Fragment>
    );
}
