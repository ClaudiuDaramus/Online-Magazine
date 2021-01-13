import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  aboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  }
}));

export default function About() {
  const classes = useStyles();
  const title= 'About';
  const description = "A small creation for people who like movies, made with React, Context API, Material UI client, PHP server and MySQL Database.";

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} className={classes.aboutBox}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
    </Grid>
  );
}

About.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};
