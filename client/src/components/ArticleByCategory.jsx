import React, {useContext, useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import FeaturedPost from './FeaturedPost';
import Footer from './Footer';
import {MyContext} from "../contexts/MyContext";
import Sidebar from "./Sidebar";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));

export default function ArticleByCategory() {
    const classes = useStyles();
    const {getArticles} = useContext(MyContext);
    const [articles,setArticles] = useState([]);

    useEffect( () => {
        getArticles().then(data => {
            setArticles(data);
        });
    }, [getArticles]);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header />
                <main>
                    <Grid container spacing={4}>
                        {articles.map((post, index) => (
                            <FeaturedPost key={index} post={post} />
                        ))}
                    </Grid>
                    <Grid container spacing={5} className={classes.mainGrid}>
                        <Sidebar />
                    </Grid>
                </main>
            </Container>
            <Footer />
        </React.Fragment>
    );
}