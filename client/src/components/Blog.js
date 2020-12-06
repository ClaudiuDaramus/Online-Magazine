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
  { title: 'Home', url: '#' },
  { title: 'Behind The Lines Of Code', url: '#' },
  { title: 'Reviews', url: '#' },
  { title: 'Trailers', url: '#' },
  { title: 'Movies', url: '#' },
  { title: 'TV Shows', url: '#' },
  { title: 'Interviews', url: '#' },
  { title: 'Festivals & Events', url: '#' },
  { title: 'Filmmaking', url: '#' },
  { title: 'Short Films', url: '#' },
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

  useEffect(() => {
    getArticles().then(data => {
      setArticles(data);
    });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Movie Radar" sections={sections} />
        <main>
          {articles.map((post, index) => (
              index === 0 ?
            <MainFeaturedPost key={index} post={post} />
            : ''
          ))}
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
