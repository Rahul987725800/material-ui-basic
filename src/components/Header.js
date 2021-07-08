import {
  AppBar,
  Toolbar,
  Grid,
  InputBase,
  IconButton,
  Badge,
  makeStyles,
} from '@material-ui/core';
import {
  NotificationsNone as NotificationsNoneIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  PowerSettingsNew as PowerSettingsNewIcon,
  Search as SearchIcon,
} from '@material-ui/icons';

import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fff',
  },
  searchInput: {
    opacity: '0.6',
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: '0.8rem',
    '&:hover': {
      backgroundColor: '#f2f2f2',
    },
    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(1),
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <InputBase
              placeholder="Search Topics"
              className={classes.searchInput}
              startAdornment={<SearchIcon fontSize="small" />}
            />
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
            <IconButton>
              <Badge badgeContent={4} color="secondary">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={3} color="primary">
                <ChatBubbleOutlineIcon />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge>
                <PowerSettingsNewIcon />
              </Badge>
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
