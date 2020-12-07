import React, {useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Sidebar from './Sidebar';
import Footer from './Footer';
import {MyContext} from "../contexts/MyContext";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [
  { title: 'Home', url: '/' },
  { title: 'Behind The Lines Of Code', url: '/behind-the-lines-of-code' },
  { title: 'Reviews', url: '/reviews' },
  { title: 'Trailers', url: '/trailers' },
  { title: 'Movies', url: '/movies' },
  { title: 'TV Shows', url: '/tv-shows' },
  { title: 'Interviews', url: '/interviews' },
  { title: 'Festivals & Events', url: '/festivals-&-events' },
  { title: 'Filmmaking', url: '/filmmaking' },
  { title: 'Short Films', url: '/short-films' },
];

const sidebar = {
  title: 'About',
  description:
    "A small creation for people who like movies, made with React, Context API, Material UI client, PHP server and MySQL Database.",
};

export default function Blog() {
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
        <Header title="Movie Radar" sections={sections} />
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
            {/*<Main title="From the firehose" posts={articles} />*/}
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
            />
          </Grid>
        </main>
      </Container>
      <Footer title="Movie Radar" description="By Claudiu Daramus" />
    </React.Fragment>
  );
}
