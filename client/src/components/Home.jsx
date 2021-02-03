import React, {useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import {MyContext} from "../contexts/MyContext";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

export default function Home() {
  // const classes = useStyles();

  // const {getArticles} = useContext(MyContext);
  // const [articles,setArticles] = useState([]);

  // useEffect( () => {
  //     getArticles().then(data => {
  //       setArticles(data);
  //   });
  // }, [getArticles]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <Grid container spacing={4}>
            {/* {articles.map((post, index) => (
              <FeaturedPost key={index} post={post} />
            ))} */}
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
}
