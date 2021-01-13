import React, {useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import About from './About';
import Footer from './Footer';
import {MyContext} from "../contexts/MyContext";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

export default function Home() {
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
          <MainFeaturedPost key={"main"} post={articles.length !== 0 ? articles[0] : {title:"", body:""}} />
          <Grid container spacing={4}>
            {articles.map((post, index) => (
                index !== 0 ?
              <FeaturedPost key={index} post={post} />
              : ''
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            {/*<Article title="From the firehose" posts={articles} />*/}
            <About />
          </Grid>
        </main>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
