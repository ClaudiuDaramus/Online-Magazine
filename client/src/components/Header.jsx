import React, {useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {MyContext} from '../contexts/MyContext'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
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

const title = "Movie Radar";

export default function Header() {
  const classes = useStyles();
  const {rootState,logoutUser, updateSubscription} = useContext(MyContext);
  const {theUser} = rootState;

  useEffect(() => {
  }, [theUser]);

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button size="small" onClick={updateSubscription}>{theUser.subscription === "0" ? "Subscribe" : "Unsubscribe"}</Button>
        {theUser.user_type_id === "1" || theUser.user_type_id === "2" ?
            <Button size="small" href="/add">
              Add New Article
            </Button>
            : ''}
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <span style={{marginRight:"10px"}}>
          {theUser.name}
        </span>
        <Button variant="outlined" size="small" onClick={logoutUser}>
          Logout
        </Button>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section, index) => (
          <Link
            color="inherit"
            noWrap
            key={index}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}