import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
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

export default function Header(props) {
  const classes = useStyles();
  const { sections, title } = props;
  const {rootState,logoutUser, updateSubscription} = useContext(MyContext);
  const {theUser} = rootState;

  useEffect(() => {
  }, [theUser]);

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button size="small" onClick={updateSubscription}>{theUser.subscription === "0" ? "Subscribe" : "Unsubscribe"}</Button>
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
        {/*<IconButton>*/}
        {/*  <SearchIcon />*/}
        {/*</IconButton>*/}
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

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
