import React, {useContext, useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Link from "@material-ui/core/Link";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Container from "@material-ui/core/Container";
import Footer from "./Footer";
import {makeStyles} from "@material-ui/core/styles";
import {useLocation} from "react-router-dom";
import {MyContext} from "../contexts/MyContext";

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));

export default function Article() {
    let location = useLocation();
    const classes = useStyles();
    const {getArticle} = useContext(MyContext);
    const [post,setPost] = useState({title:"", writer_id:"", body:"", create_date:""});

    useEffect( () => {
        const id = parseInt(location.pathname.split("/article/")[1]);
        getArticle(id).then(data => {
            setPost(data);
        });
    }, [getArticle, location]);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header />
                <Grid item xs={12} md={8}>
                    <Typography component="h1" variant="h3" gutterBottom>
                        {post.title}
                    </Typography>
                    <Typography variant="caption" gutterBottom paragraph={true}>
                        {post.create_date + " by "}
                        <Link>
                            {post.writer_id}
                        </Link>
                    </Typography>
                    <Divider />
                    <Typography paragraph={true}>
                        {post.body}
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
