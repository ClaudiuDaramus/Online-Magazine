import React, {useContext, useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import FeaturedPost from './FeaturedPost';
import Footer from './Footer';
import {MyContext} from "../contexts/MyContext";
import About from "./About";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));

export default function ArticleByCategory(props) {
    const {categoryId} = props;
    const classes = useStyles();
    const {getArticlesByCategory} = useContext(MyContext);
    const [articles,setArticles] = useState([]);

    useEffect( () => {
        getArticlesByCategory(categoryId).then(data => {
            setArticles(data);
        });
    }, [getArticlesByCategory, categoryId]);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header />
                <main>
                    {articles.length > 0 ?
                        <Grid container spacing={4}>
                            {articles.map((post, index) => (
                                <FeaturedPost key={index} post={post} />
                            ))}
                        </Grid>
                        : <Typography align="center">"No articles found!"</Typography >
                    }
                    <Grid container spacing={5} className={classes.mainGrid}>
                        <About />
                    </Grid>
                </main>
            </Container>
            <Footer />
        </React.Fragment>
    );
}